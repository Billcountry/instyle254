import React, { Component } from "react"
import Auth from "../account/auth"
import Firebase from "firebase-orient"
import { BodyContainer, Container, GrayInput } from "../components/containers"
import { colors } from "../constants"

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_admin: false,
            admins: {},
            user: null,
            data: {},
            meta_data: {},
        }
        this.firebase = new Firebase()
    }

    componentDidMount() {
        this.firebase.rtdb.ref("/admins").on("value", snapshot => {
            let admins = snapshot.val()
            if (admins) {
                let { user, is_admin } = this.state
                if (user) {
                    is_admin = user.uid in admins
                }
                console.log(admins)
                this.setState({ admins, is_admin })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== prevState.user) {
            let { user, is_admin, admins } = this.state
            if (user) {
                is_admin = user.uid in admins
            }
            this.setState({ is_admin })
        }
    }

    render() {
        const { data, meta_data } = this.state
        return (
            <Auth>
                <BodyContainer>
                    <h2 style={{ textAlign: "center" }}>Admin Console</h2>
                    <Container>
                        <h3 style={{ textAlign: "center" }}>
                            Add art to gallery
                        </h3>
                        <GrayInput>
                            Title
                            <input
                                type="text"
                                placeholder="art name/title..."
                            />
                        </GrayInput>
                        <GrayInput>
                            Price(Ksh)
                            <input type="number" placeholder="cost..." />
                        </GrayInput>
                        <GrayInput>
                            Description
                            <textarea placeholder="description..." />
                        </GrayInput>

                        <GrayInput>
                            Image <small>(Choose one or multiple images)</small>
                            <input type="file" placeholder="description..." />
                        </GrayInput>
                        <h4 style={{ textAlign: "center", marginBottom: 5 }}>
                            Other details
                        </h4>
                        <span style={{ textAlign: "center" }}>
                            ( Extra details about the art such as size, style
                            e.t.c )
                        </span>
                        <GrayInput>
                            <input type="text" placeholder="Detail..." /> :
                            <input type="text" placeholder="Value..." />
                        </GrayInput>
                    </Container>
                </BodyContainer>
            </Auth>
        )
    }
}
