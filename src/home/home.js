import React from "react"
import styled from "styled-components"
import background from "../images/home-background.jpg"
import banner from "../images/home-banner.png"
import { Link } from "react-router-dom"
import { colors, fonts } from "../constants"

export default function Home() {
    return (
        <div>
            <HomeContainer>
                <HomeCall>
                    <p style={{ marginBottom: 0 }}>We are a one stop solution for Art and media advertisements</p>
                    <GalleryButton to="/gallery">Get Started</GalleryButton>
                    <img
                        src={banner}
                        alt=""
                        style={{
                            width: "100%",
                            height: "auto",
                            marginBottom: -20,
                        }}
                    />
                </HomeCall>
            </HomeContainer>
        </div>
    )
}

const HomeContainer = styled.div`
    background: url(${background}) no-repeat;
    background-size: cover;
    display: flex;
    width: 100%;
    min-height: calc(100vh - 100px);
    align-items: flex-end;
    justify-content: center;

    @media screen and (max-width: 800px) {
        align-items: flex-start;
    }
    @media screen and (max-width: 600px) {
        margin-top: 5px;
        min-height: auto;
        align-items: stretch;
    }
`

const HomeCall = styled.div`
    width: 800px;
    margin: 70px 0 0;
    background-color: #ffffff;
    font-family: ${fonts.title};
    font-size: 3.2em;
    color: ${colors.theme.teal};
    text-align: center;
    @media screen and (max-width: 800px) {
        width: calc(100% - 40px);
        font-size: 2.5em;
    }
    @media screen and (max-width: 600px) {
        background-color: #ffffffdd;
        margin: 0;
        font-size: 2.2em;
        width: 100%;
    }
`

const GalleryButton = styled(Link)`
    border-radius: 38px;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 22px;
    font-family: ${fonts.body};
    background-color: ${colors.theme.teal};
    :hover {
        background-color: ${colors.theme.orange};
    }
`
