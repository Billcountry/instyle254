import React, { Component } from "react"
import Firebase, { db } from "firebase-orient"
import { User } from "../models"
import { GrayInput, BodyContainer, Container } from "../components/containers"
import { Button, LightButton } from "../components/buttons"
import styled from "styled-components"
import { colors } from "../constants"
import googgle from "../images/google.png"
import { Loader } from "../components/loaders"
import toastr from "toastr"

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.firebase = new Firebase()

        this.state = {
            user: null, // User object from db
            g_user: this.firebase.auth.currentUser, // User object provided by googgle,
            login: true,
            input: {
                before_auth: {
                    name: "",
                    email: "",
                    password: "",
                    password_c: "",
                },
            },
            loading: "Loading...",
        }
    }

    componentDidMount() {
        this.firebase.auth_state(g_user => {
            if (g_user) {
                db.get(g_user.uid, User)
                    .then(user => {
                        this.setState({ user, g_user, loading: null })
                    })
                    .catch(error => {
                        // User does not exist probably
                        const user = new User(
                            g_user.displayName ||
                                this.state.input.before_auth.name ||
                                null,
                            g_user.email,
                            g_user.uid
                        )
                        user.put()
                        this.setState({ user, g_user, loading: null })
                    })
            } else {
                this.setState({ user: null, g_user: null, loading: null })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user && !prevState.g_user) {
            // Someone just logged in, this is a great opportunity to ask them for extra details
            let request_data = []
            const { user } = this.state
            if (!user.name) request_data.push("name")
            if (!user.phone) request_data.push("phone")
            if (!user.address) request_data.push("address")
            if (request_data.length) this.setState({ request_data })
        }
    }

    before_auth_input(key, evt) {
        const { input } = this.state
        input.before_auth[key] = evt.target.value
        this.setState({ input })
    }

    google_login() {
        this.setState({ loading: "Waiting..." }, () => {
            this.firebase
                .auth_google_login()
                .then(g_user => {
                    this.setState({ loading: null })
                    if (g_user) {
                        toastr.success("Login successful")
                    } else {
                        toastr.error("Login failed")
                    }
                })
                .catch(error => {
                    toastr.error(error)
                    this.setState({ loading: null })
                })
        })
    }

    email_password() {
        const {
            login,
            input: {
                before_auth: { name, email, password, password_c },
            },
        } = this.state
        if (!email) {
            return toastr.error("Email is required")
        }
        if (!password) {
            return toastr.error("Password is required")
        }
        if (!password_c && !login) {
            return toastr.error("Confirm password before registration")
        } else if (!login && password_c !== password) {
            return toastr.error("Passwords must match")
        }
        if (!name && !login) {
            return toastr.error("Name is required")
        }
        this.setState({
            loading: login ? "Logging in..." : "Creating user...",
        })

        const promise = login
            ? this.firebase.auth_email_signin(email, password)
            : this.firebase.auth_email_register(email, password)

        promise
            .then(user => {
                if (login) {
                    this.setState({ loading: null })
                    return toastr.success("Login successful")
                }
                user.updateProfile({ displayName: name })
                user.sendEmailVerification().then(() => {
                    toastr.success("Check inbox to confirm your email address")
                })
                toastr.success("Registration successful")
                this.setState({ loading: null })
            })
            .catch(error => {
                toastr.error(error.message || error, "Error")
                this.setState({ loading: null })
            })
    }

    render() {
        const { children } = this.props
        const {
            user,
            login,
            input: {
                before_auth: { name, email, password, password_c },
            },
            loading,
        } = this.state
        if (user) return children

        if (loading)
            return (
                <BodyContainer>
                    <Loader>{loading}</Loader>
                </BodyContainer>
            )

        return (
            <BodyContainer>
                <Container>
                    <LightButton
                        onClick={this.google_login.bind(this)}
                        style={{ alignSelf: "center", marginTop: 20 }}>
                        <img
                            src={googgle}
                            style={{
                                height: "20px",
                                width: "auto",
                                marginRight: 5,
                            }}
                            alt=""
                        />
                        Continue with google
                    </LightButton>
                    <h2 style={{ textAlign: "center" }}>Or</h2>
                    <Tabs>
                        <Tab
                            onClick={() => {
                                this.setState({ login: true })
                            }}
                            className={login ? "active" : ""}>
                            Login
                        </Tab>
                        <Tab
                            onClick={() => {
                                this.setState({ login: false })
                            }}
                            className={login ? "" : "active"}>
                            Register
                        </Tab>
                    </Tabs>
                    {!login && (
                        <GrayInput>
                            Name:{" "}
                            <input
                                type="text"
                                placeholder="full name..."
                                value={name}
                                onChange={this.before_auth_input.bind(
                                    this,
                                    "name"
                                )}
                            />
                        </GrayInput>
                    )}
                    <GrayInput>
                        Email:{" "}
                        <input
                            type="email"
                            placeholder="email address..."
                            value={email}
                            onChange={this.before_auth_input.bind(
                                this,
                                "email"
                            )}
                        />
                    </GrayInput>
                    <GrayInput>
                        Password:{" "}
                        <input
                            type="password"
                            placeholder="password..."
                            value={password}
                            onChange={this.before_auth_input.bind(
                                this,
                                "password"
                            )}
                        />
                    </GrayInput>
                    {!login && (
                        <GrayInput>
                            Confirm Password:{" "}
                            <input
                                type="password"
                                placeholder="password..."
                                value={password_c}
                                onChange={this.before_auth_input.bind(
                                    this,
                                    "password_c"
                                )}
                            />
                        </GrayInput>
                    )}
                    <Button
                        style={{ alignSelf: "center" }}
                        onClick={this.email_password.bind(this)}>
                        {login ? "Login" : "Register"}
                    </Button>
                </Container>
            </BodyContainer>
        )
    }
}

const Tabs = styled.div`
    display: flex;
    margin: 0;
    border-bottom: 1px solid ${colors.theme.teal};
`

const Tab = styled.div`
    cursor: pointer;
    padding: 10px 0;
    text-align: center;
    width: 50%;
    &:hover {
        color: ${colors.theme.orange};
    }
    &.active {
        border-bottom: 1px solid ${colors.theme.teal};
        color: ${colors.theme.teal};
    }
`
