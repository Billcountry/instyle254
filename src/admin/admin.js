import React, { Component } from "react"
import Auth from "../account/auth"
import Firebase from "firebase-orient"
import { BodyContainer, Container, GrayInput } from "../components/containers"
import { colors } from "../constants"
import styled from "styled-components"
import { Button } from "../components/buttons"

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_admin: false,
            admins: {},
            user: null,
            data: {},
            meta_data: [],
            images: [],
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

    onImageUpload(event) {
        const files = event.target.files
        console.log(files)
    }

    addMetaData() {
        let { meta_data } = this.state
        meta_data.push({ key: "", value: "" })
        this.setState({ meta_data })
    }

    updateMetaData(index, key, event) {
        let { meta_data } = this.state
        meta_data[index][key] = event.target.value
        this.setState({ meta_data })
    }

    render() {
        const { data, meta_data, images } = this.state
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
                            <input
                                onChange={this.onImageUpload.bind(this)}
                                type="file"
                                multiple
                                accept="image/*"
                            />
                        </GrayInput>
                        <h4 style={{ textAlign: "center", marginBottom: 5 }}>
                            Other details
                        </h4>
                        <span style={{ textAlign: "center" }}>
                            ( Extra details about the art such as size, style
                            e.t.c,{" "}
                            <StyledSpan onClick={this.addMetaData.bind(this)} />{" "}
                            )
                        </span>
                        {meta_data.map((meta_item, index) => (
                            <GrayInput key={index}>
                                <input
                                    type="text"
                                    onChange={this.updateMetaData.bind(
                                        this,
                                        index,
                                        "key"
                                    )}
                                    value={meta_item.key}
                                    placeholder="Detail..."
                                />{" "}
                                :
                                <input
                                    type="text"
                                    onChange={this.updateMetaData.bind(
                                        this,
                                        index,
                                        "value"
                                    )}
                                    value={meta_item.value}
                                    placeholder="Value..."
                                />
                            </GrayInput>
                        ))}

                        <Button style={{ alignSelf: "center" }}>
                            Publish Item
                        </Button>
                    </Container>
                </BodyContainer>
            </Auth>
        )
    }
}

const StyledSpan = styled.span`
    color: ${colors.theme.teal};
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: ${colors.theme.orange};
    }
    &::before {
        content: "Click here to add";
    }
`
