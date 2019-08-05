import React, { Component } from "react"
import Auth from "../account/auth"
import Firebase from "firebase-orient"
import { BodyContainer, Container, GrayInput } from "../components/containers"
import { colors } from "../constants"
import styled from "styled-components"
import { Button } from "../components/buttons"
import toastr from "toastr"
import { Gallery } from "../models"

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_admin: false,
            admins: {},
            user: null,
            data: { title: "", price: "", description: "" },
            meta_data: [{ key: "", value: "" }],
            images: {},
            publishing: false,
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

    updateData(key, event) {
        let { data } = this.state
        data[key] = event.target.value
        this.setState({ data })
    }

    updateDownload(task_id, downloadUrl, progress) {
        let { images } = this.state
        if (downloadUrl) images[task_id].downloadUrl = downloadUrl
        if (progress) images[task_id].progress = progress
        this.setState({ images })
    }

    onImageUpload(event) {
        const files = event.target.files
        let { images } = this.state
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const task_id = `img_${i}_${new Date().getTime()}`
            this.firebase.upload(
                `/gallery/${task_id}_${file.name}`,
                file,
                task_id,
                {
                    complete: this.updateDownload.bind(this),
                    error: (task_id, err) => {
                        toastr.error(err.message || err)
                        this.updateDownload(task_id, null, "Error")
                    },
                    progress: (task_id, progress) => {
                        this.updateDownload(task_id, null, progress)
                    },
                }
            )
            images[task_id] = {
                name: file.name,
                downloadUrl: null,
                progress: 0,
            }
        }
        this.setState({ images })
    }

    addMetaData() {
        let { meta_data } = this.state
        if (meta_data.length >= 5) {
            return toastr.warning("A maximum of 5 properties are allowed")
        }
        meta_data.push({ key: "", value: "" })
        this.setState({ meta_data })
    }

    updateMetaData(index, key, event) {
        let { meta_data } = this.state
        meta_data[index][key] = event.target.value
        this.setState({ meta_data })
    }

    removeMetadata(index) {
        let { meta_data } = this.state
        meta_data.splice(index, 1)
        this.setState({ meta_data })
    }

    publishItem() {
        this.setState({ publishing: true })
        let {
            images,
            meta_data,
            data: { title, price, description },
        } = this.state

        if (!title || !price) {
            return toastr.error("Title and price required")
        }

        for (let task_id in images) {
            if (images[task_id].progress === "Error") {
                delete images[task_id]
                continue
            }
            if (images[task_id].progress < 100) {
                return toastr.warning(
                    "Wait for all images to finish uploading..."
                )
            }
        }

        if (!Object.keys(images).length) {
            return toastr.error("At least one image is needed per item")
        }

        let db_meta = {}
        meta_data.forEach(({ key, value }) => {
            if (key && value) {
                db_meta[key] = value
            }
        })

        const gallery = new Gallery(
            title,
            price,
            description,
            10000000,
            db_meta,
            images
        )
        gallery
            .put()
            .then(() => {
                toastr.success(`${title} published successfully`)
                this.setState({
                    publishing: false,
                    data: { title: "", price: "", description: "" },
                    meta_data: [{ key: "", value: "" }],
                    images: {},
                })
            })
            .catch(error => {
                toastr.error("An error occured, please retry")
                toastr.error(error.message || error)
                this.setState({ publishing: false })
            })
    }

    render() {
        const {
            data: { title, price, description },
            meta_data,
            images,
            publishing,
        } = this.state
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
                                value={title}
                                onChange={this.updateData.bind(this, "title")}
                                placeholder="art name/title..."
                            />
                        </GrayInput>
                        <GrayInput>
                            Price(Ksh)
                            <input
                                type="number"
                                placeholder="cost..."
                                value={price}
                                onChange={this.updateData.bind(this, "price")}
                            />
                        </GrayInput>
                        <GrayInput>
                            Description
                            <textarea
                                placeholder="description..."
                                value={description}
                                onChange={this.updateData.bind(
                                    this,
                                    "description"
                                )}
                            />
                        </GrayInput>

                        <ImageContainer>
                            <ImageInput>
                                Select image/Images
                                <input
                                    onChange={this.onImageUpload.bind(this)}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                />
                            </ImageInput>
                            {Object.keys(images).map(task_id => {
                                const { downloadUrl, name, progress } = images[
                                    task_id
                                ]
                                return (
                                    <ImageDisplay key={task_id}>
                                        <span>{name}</span>
                                        {!!downloadUrl && (
                                            <img src={downloadUrl} alt="" />
                                        )}
                                        {!downloadUrl && (
                                            <span>
                                                Uploading... {progress}%
                                            </span>
                                        )}
                                    </ImageDisplay>
                                )
                            })}
                        </ImageContainer>
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
                                <Close
                                    onClick={this.removeMetadata.bind(
                                        this,
                                        index
                                    )}
                                    className="material-icons">
                                    close
                                </Close>
                            </GrayInput>
                        ))}

                        <Button
                            style={{ alignSelf: "center" }}
                            onClick={
                                publishing
                                    ? undefined
                                    : this.publishItem.bind(this)
                            }>
                            {publishing ? "Publishing..." : "Publish Item"}
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

const ImageContainer = styled(GrayInput)`
    flex-direction: column;
`

const ImageInput = styled.label`
    display: flex;
    justify-content: center;
    input {
        display: none;
    }
    border-bottom: 1px solid #cccccc;
    padding: 5px;
    cursor: pointer;
    :hover {
        border-bottom: 2px solid ${colors.theme.teal};
    }
`

const Close = styled.i`
    cursor: pointer;
    margin: 5px;
    padding: 2px;
    border-radius: 50%;
    :hover {
        background-color: #f002;
        color: #f00;
    }
`

const ImageDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    img {
        height: 200px;
        width: auto;
    }

    @media screen and (max-width: 600px) {
        flex-direction: column-reverse;
        align-items: center;
    }
    margin: 5px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 10px;
`
