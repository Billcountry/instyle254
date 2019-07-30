import React, { Component } from "react"
import { BodyContainer } from "../components/containers"
import styled from "styled-components"
import images from "../images/gallery_files"
import { colors } from "../constants"

const sorting = [
    { label: "Latest", value: "latest" },
    { label: "Price Highest", value: "high" },
    { label: "Price Lowest", value: "low" },
    { label: "Oldest", value: "oldest" },
]

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.gallery = [
            {
                image: images.drawing,
                type: "Drawing",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
            {
                image: images.photo,
                type: "Photo",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
            {
                image: images.jewel,
                type: "Jewellery",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
            {
                image: images.jewel2,
                type: "Jewellery",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
            {
                image: images.photo2,
                type: "Photo",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
            {
                image: images.drawing2,
                type: "Drawing",
                title: "Something something",
                published: "Jun 20 2019",
                amount: Math.round(Math.random() * 10) * 100,
            },
        ]
    }

    render() {
        return (
            <BodyContainer>
                <HeaderContainer>
                    <Input>
                        <i className="material-icons">search</i>
                        <input type="search" placeholder="Search..." />
                    </Input>
                    <RightContainer>
                        <Input>
                            Sort
                            <i className="material-icons">chevron_right</i>
                            <select>
                                {sorting.map(item => (
                                    <Option key={item.value} value={item.value}>
                                        {item.label}
                                    </Option>
                                ))}
                            </select>
                        </Input>
                    </RightContainer>
                </HeaderContainer>
                {this.gallery.map((item, index) => {
                    return (
                        <GalleryItem key={item.image}>
                            <GalleryItemContent
                                className={index % 2 ? "even" : "odd"}>
                                <img src={item.image} alt="" />
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>
                                        Eiusmod et aliqua nisi duis laboris in
                                        deserunt excepteur anim. Excepteur Lorem
                                        labore proident dolore. Est commodo ex
                                        veniam eiusmod enim commodo anim
                                        consectetur qui ex do laboris
                                    </p>
                                </div>
                            </GalleryItemContent>
                            <GalleryFoot>
                                <p>
                                    Published: <strong>{item.published}</strong>
                                </p>
                                <Buy>Buy @ {item.amount || 100}</Buy>
                            </GalleryFoot>
                        </GalleryItem>
                    )
                })}
            </BodyContainer>
        )
    }
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
    }
`

const RightContainer = styled.div`
    display: flex;
`

const Input = styled.div`
    display: flex;
    padding: 10px 20px;
    border-radius: 38px;
    background-color: #ffffffee;
    input[type="search"],
    select {
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 14px;
        margin-left: 5px;
        flex-grow: 1;
    }
    margin: 10px;
    flex-grow: 1;
`

const Option = styled.option`
    padding: 20px 30px !important;
`

const GalleryItem = styled.div`
    display: flex;
    margin: 10px;
    background-color: #ffffffdd;
    padding: 20px;
    flex-direction: column;
    h2 {
        line-height: 1em;
        margin-bottom: 0;
    }
    @media screen and (max-width: 800px) {
        position: relative;
    }
`

const GalleryItemContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 22px;
    text-align: justify;
    line-height: 1.5em;
    img {
        height: 300px;
        width: auto;
        margin: 0 10px 0 0;
    }
    &.even {
        flex-direction: row-reverse;
        img {
            margin: 0 0 0 10px;
        }
    }
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
        &.even {
            flex-direction: column;
        }
        img {
            height: auto;
        }
        h2 {
            top: 0;
            position: absolute;
            z-index: 3;
            background-color: #ffffffcc;
        }
    }
`

const GalleryFoot = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const Buy = styled.div`
    font-size: 22px;
    font-style: italic;
    text-decoration: none;
    font-weight: 700;
    color: #ffffff;
    background-color: ${colors.theme.teal};
    cursor: pointer;
    &:hover {
        background-color: ${colors.theme.red};
    }
    padding: 16px;
    border-radius: 38px;
    text-align: center;
    align-items: flex-end;
`
