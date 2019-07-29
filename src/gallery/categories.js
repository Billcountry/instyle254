import React from "react"
import styled from "styled-components"
import { BodyContainer } from "../components/containers"
import pencil from "../images/pencil.jpg"
import canvas from "../images/canvas.png"
import skulpture from "../images/skulpture.png"
import { Link } from "react-router-dom"
import { colors } from "../constants"

export default function Categories() {
    const menu_items = [
        { to: "/gallery/canvas", icon: canvas, title: "Canvas Painting" },
        { to: "/gallery/pencil", icon: pencil, title: "Pencil Drawing" },
        {
            to: "/gallery/skulptures",
            icon: skulpture,
            title: "Carved Skulptures",
        },
    ]
    return (
        <BodyContainer>
            <MainContainer>
                {menu_items.map(item => {
                    return (
                        <StyledLink key={item.to} to={item.to}>
                            <h2>{item.title}</h2>
                            <StyledThumb src={item.icon} alt="" />
                        </StyledLink>
                    )
                })}
            </MainContainer>
        </BodyContainer>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const StyledLink = styled(Link)`
    width: calc(50% - 80px);
    margin: 20px;
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffffee;
    text-decoration: none;
    color: ${colors.font.default} !important;
    &:hover {
        background-color: #ffffff99;
    }
`

const StyledThumb = styled.img`
    height: 200px !important;
    width: auto;
`
