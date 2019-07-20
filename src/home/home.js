import React from "react"
import styled from "styled-components"
import background from "../images/home-background.jpg"
import banner from "../images/home-banner.png"
import { CardPanel } from "react-materialize"
import { colors, fonts } from "../constants"

export default function Home() {
    return (
        <div>
            <HomeContainer>
                <HomeCall>
                    <p>Show off Kenyan style</p>
                    <img
                        src={banner}
                        alt=""
                        style={{
                            width: "100%",
                            height: "auto",
                            marginBottom: 0,
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
    min-width: calc(100vh - 100px) !important;
    justify-content: center;
    @media screen and (max-width: 600px) {
        margin-top: 5px;
    }
`

const HomeCall = styled.div`
    width: 800px;
    margin: 70px 20px 0;
    padding-bottom: 0%;
    background-color: #ffffff;
    font-family: ${fonts.title};
    font-size: 3.2em;
    color: ${colors.theme.teal};
    text-align: center;
    @media screen and (max-width: 600px) {
        background-color: #ffffffdd;
        margin: 0;
        font-size: 2.5em;
    }
`
