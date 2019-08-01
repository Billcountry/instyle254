import React, { Component } from "react"
import Auth from "./auth"
import { Container, BodyContainer } from "../components/containers"

export default class Account extends Component {
    render() {
        return (
            <Auth>
                <BodyContainer>
                    <Container>
                        <h5>Velcome</h5>
                    </Container>
                </BodyContainer>
            </Auth>
        )
    }
}
