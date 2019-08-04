import styled from "styled-components"

// A container trying not to occupy too much space
export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    @media screen and (min-width: 1200px) {
        margin: auto calc((100vw - 1200px) / 2) !important;
    }
`

// Small width centered container
export const Container = styled.div`
    width: 800px;
    background-color: #ffffff;
    align-self: center;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`

export const Input = styled.div`
    display: flex;
    padding: 10px 20px;
    border-radius: 38px;
    background-color: #ffffffee;
    input,
    textarea,
    select {
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 14px;
        margin-left: 5px;
        flex-grow: 1;
        padding-bottom: 5px;
        border-bottom: 1px solid #eeeeee;
    }
    margin: 10px;
    flex-grow: 1;
`

export const GrayInput = styled(Input)`
    background-color: #f1f1f199;
    input,
    textarea,
    select {
        padding-bottom: 5px;
        border-bottom: 1px solid #cccccc;
    }
`
