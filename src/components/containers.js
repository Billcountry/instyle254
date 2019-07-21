import styled from "styled-components"

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    @media screen and (min-width: 1200px) {
        margin: auto calc((100vw - 1200px) / 2) !important;
    }
`
