import React from "react"
import { BodyContainer } from "../components/containers"
import styled from "styled-components"
import { Link } from "react-router-dom"
import images from "../images/gallery_files"

export default function Gallery() {
    const categories = [
        { label: "All", value: "" },
        { label: "Drawing", value: "drawing" },
        { label: "Pictures", value: "pictures" },
        { label: "Jewellery", value: "jewels" },
    ]
    const sorting = [
        { label: "Latest", value: "latest" },
        { label: "Price Highest", value: "high" },
        { label: "Price Lowest", value: "low" },
        { label: "Oldest", value: "oldest" },
    ]
    const gallery = [
        {
            image: images.drawing,
            type: "Drawing",
            title: "Something something",
            published: "Jun 20 2019",
        },
        {
            image: images.photo,
            type: "Photo",
            title: "Something something",
            published: "Jun 20 2019",
        },
        {
            image: images.jewel,
            type: "Jewellery",
            title: "Something something",
            published: "Jun 20 2019",
        },
        {
            image: images.jewel2,
            type: "Jewellery",
            title: "Something something",
            published: "Jun 20 2019",
        },
        {
            image: images.photo2,
            type: "Photo",
            title: "Something something",
            published: "Jun 20 2019",
        },
        {
            image: images.drawing2,
            type: "Drawing",
            title: "Something something",
            published: "Jun 20 2019",
        },
    ]
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
            {gallery.map(item => {
                return (
                    <GalleryItem key={item.image}>
                        <img src={item.image} alt="" />
                        <GalleryItemContent>
                            <h2>{item.title}</h2>
                            <p>
                                Eiusmod et aliqua nisi duis laboris in deserunt
                                excepteur anim. Excepteur Lorem labore proident
                                dolore. Est commodo ex veniam eiusmod enim
                                commodo anim consectetur qui ex do laboris
                                labore. Aliqua esse duis labore incididunt
                                aliqua ullamco dolor magna aliquip do nisi
                                officia. Mollit anim excepteur commodo culpa
                                incididunt laboris veniam anim nulla amet.
                                Deserunt et adipisicing do pariatur consectetur
                                ad mollit esse enim quis pariatur nostrud.
                            </p>
                            <GalleryFoot>
                                <small>
                                    Published: <strong>{item.published}</strong>
                                </small>
                                <Buy to="" />
                            </GalleryFoot>
                        </GalleryItemContent>
                    </GalleryItem>
                )
            })}
        </BodyContainer>
    )
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
    img {
        height: 300px;
        width: auto;
    }
    :nth-child(2n) {
        flex-direction: row-reverse;
    }
    h2 {
        line-height: 1em;
        margin-bottom: 0;
    }
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
        position: relative;
        :nth-child(2n) {
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

const GalleryItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 22px;
    margin: 0 10px;
    text-align: justify;
    line-height: 1.5em;
`

const GalleryFoot = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const Buy = styled(Link)`
    font-size: 22px;
    font-style: italic;
    text-decoration: none;
    font-weight: 700;
    color: #444444;
    border-bottom: 2px solid #444444;
    ::before {
        content: "View & Buy";
    }
`
