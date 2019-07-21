import React from "react"
import { BodyContainer } from "../components/containers"
import styled from "styled-components"

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
    return (
        <BodyContainer>
            <HeaderContainer>
                <Input>
                    <i className="material-icons">search</i>
                    <input type="search" placeholder="Search..." />
                </Input>
                <RightContainer>
                    <Input>
                        Category
                        <i className="material-icons">chevron_right</i>
                        <select>
                            {categories.map(item => (
                                <Option key={item.value} value={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </select>
                    </Input>
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
    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: stretch;
    }
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
