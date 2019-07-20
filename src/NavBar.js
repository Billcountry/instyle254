import React from "react"
import styled from "styled-components"
import logo from "./images/logo.png"
import { fonts, colors } from "./constants"
import { NavLink, Link } from "react-router-dom"

export default function NavBar(props) {
    const menu = [
        {
            label: "Gallery",
            icon: "insert_photo",
            to: "/gallery",
            color: colors.theme.teal,
        },
        {
            label: "Cart",
            icon: "shopping_basket",
            to: "/cart",
            color: colors.theme.red,
        },
        {
            label: "Support",
            icon: "contact_support",
            to: "/support",
            color: colors.theme.orange,
        },
        {
            label: "Account",
            icon: "account_circle",
            to: "/account",
            color: colors.theme.teal,
        },
    ]
    return (
        <NavContainer>
            <Brand to="/" />
            <MenuContainer>
                {menu.map(item => (
                    <MenuItem key={item.to} to={item.to}>
                        <i
                            style={{
                                color: item.color,
                                fontSize: 36,
                                marginBottom: 5,
                            }}
                            className="material-icons">
                            {item.icon}
                        </i>
                        <span style={{ color: item.color }}>{item.label}</span>
                    </MenuItem>
                ))}
            </MenuContainer>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
    @media screen and (min-width: 1200px) {
        margin: auto calc((100vw - 1200px) / 2);
    }
`

const MenuItem = styled(NavLink)`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    font-family: ${fonts.title};
    border-radius: 5px;
    background-color: #ffffff88;
    width: 90px;
    align-items: center;
    text-align: center;
    margin: 0 5px;
    padding: 5px;
    float: left;
    position: relative;
    &:hover {
        background-color: #ffffff;
    }
    &.active {
        background-color: #ffffff;
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-top-color: #ffffff;
            border-bottom: 0;
            margin-left: -10px;
            margin-bottom: -10px;
        }
    }
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`

const Brand = styled(Link)`
    &::before {
        content: "";
        display: inline-block;
        background: url(${logo}) no-repeat 0 0;
        background-size: 100%;
        height: 100px;
        width: 100px;
    }
    &::after {
        content: "254Instyle";
        color: #999999;
        font-size: 48px;
        font-family: ${fonts.title};
    }
    display: flex;
    align-items: center;
`
