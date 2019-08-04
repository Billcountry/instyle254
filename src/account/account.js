import React, { Component } from "react"
import Auth from "./auth"
import { Container, BodyContainer } from "../components/containers"
import Firebase, { db } from "firebase-orient"
import { User } from "../models"
import { Button } from "../components/buttons"

export default class Account extends Component {
    constructor(props) {
        super(props)
        this.firebase = new Firebase()
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        this.firebase.auth_state(g_user => {
            if (g_user) {
                db.get(g_user.uid, User)
                    .then(user => {
                        this.setState({ user })
                    })
                    .catch(error => {
                        // User does not exist probably
                        const user = new User(
                            g_user.displayName || null,
                            g_user.email,
                            g_user.uid
                        )
                        user.put()
                        this.setState({ user })
                    })
            } else {
                this.setState({ user: null })
            }
        })
    }
    render() {
        const user = this.state.user || {}

        return (
            <Auth>
                <BodyContainer>
                    <Container style={{ alignItems: "center" }}>
                        <h3>Welcome {user.name}</h3>
                        <Button onClick={() => this.firebase.sign_out()}>
                            Logout
                        </Button>
                    </Container>
                </BodyContainer>
            </Auth>
        )
    }
}
