import styled from "styled-components"
import { colors } from "../constants"

export const Button = styled.button`
    margin: 5px 10px;
    padding: 10px 16px;
    border-radius: 38px;
    background-color: ${colors.theme.teal};
    color: #ffffff;
    &:hover {
        background-color: ${colors.theme.orange};
    }
`
