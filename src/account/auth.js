import React, { Component } from "react"
import Firebase, { db } from "firebase-orient"
import { User } from "../models"
import { GrayInput, BodyContainer } from "../components/containers"
import styled from "styled-components"
import { colors } from "../constants"

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.firebase = new Firebase()

        this.state = {
            user: null, // User object from db
            g_user: this.firebase.auth.currentUser, // User object provided by googgle,
            login: true,
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

    render() {
        const { children } = this.props
        const { user, request_data, login } = this.state
        if (user && !request_data) return children

        return (
            <BodyContainer>
                <Container>
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
                            <input type="text" placeholder="full name..." />
                        </GrayInput>
                    )}
                    <GrayInput>
                        Email:{" "}
                        <input type="email" placeholder="email address..." />
                    </GrayInput>
                    <GrayInput>
                        Password:{" "}
                        <input type="password" placeholder="password..." />
                    </GrayInput>
                    {!login && (
                        <GrayInput>
                            Confirm Password:{" "}
                            <input type="password" placeholder="password..." />
                        </GrayInput>
                    )}
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

const Container = styled.div`
    width: 800px;
    background-color: #ffffff;
    align-self: center;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`
