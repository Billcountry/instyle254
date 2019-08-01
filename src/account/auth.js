import React, { Component } from "react"
import Firebase, { db } from "firebase-orient"
import { User } from "../models"
import { GrayInput, BodyContainer, Container } from "../components/containers"
import { Button, LightButton } from "../components/buttons"
import styled from "styled-components"
import { colors } from "../constants"
import googgle from "../images/google.png"

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
        }
    }

    componentDidMount() {
        this.firebase.auth_state(g_user => {
            if (g_user) {
                db.get(g_user.uid, User).then(user => {
                    this.setState({ user, g_user })
                })
            } else {
                this.setState({ user: null, g_user: null })
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

    render() {
        const { children } = this.props
        const {
            user,
            request_data,
            login,
            input: {
                before_auth: { name, email, password, password_c },
            },
        } = this.state
        if (user && !request_data) return children

        return (
            <BodyContainer>
                <Container>
                    <LightButton style={{ alignSelf: "center", marginTop: 20 }}>
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
                    <Button style={{ alignSelf: "center" }}>
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
    &:hover,
    &.active {
        border-bottom: 1px solid ${colors.theme.teal};
        color: ${colors.theme.teal};
    }
`
