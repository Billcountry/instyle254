import styled from "styled-components"
import { colors } from "../constants"

export const Button = styled.div`
    margin: 5px 10px;
    padding: 10px 16px;
    border-radius: 38px;
    background-color: ${colors.theme.teal};
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-size: 18px;
    &:hover {
        background-color: ${colors.theme.orange};
    }
`

export const LightButton = styled(Button)`
    background-color: #eeeeeedd;
    color: ${colors.theme.teal};
    &:hover {
        color: ${colors.theme.orange};
        background-color: #eeeeeedd;
    }
`
