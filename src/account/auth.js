import React, { Component } from "react"
import Firebase, { db } from "firebase-orient"
import { User } from "../models"

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.firebase = new Firebase()

        this.state = {
            user: null, // User object from db
            g_user: this.firebase.auth.currentUser, // User object provided by googgle
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
        const { user, request_data } = this.state
        if (user && !request_data) return children
    }
}
