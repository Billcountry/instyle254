import React, { Component } from "react"
import styled from "styled-components"
import { BodyContainer } from "./containers"
import { random_colour } from "../tools"

export class Loader extends Component {
    constructor(props) {
        super(props)

        this.linear = [
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
            random_colour(),
        ]

        this.state = {
            circles: [
                { left: 0, top: 0, colour: this.linear[0] },
                { left: 0, top: 50, colour: this.linear[1] },
                { left: 0, top: 100, colour: this.linear[2] },
                { left: 0, top: 150, colour: this.linear[3] },
                { left: 0, top: 200, colour: this.linear[4] },
                { left: 50, top: 200, colour: this.linear[5] },
                { left: 100, top: 200, colour: this.linear[6] },
                { left: 150, top: 200, colour: this.linear[7] },
                { left: 200, top: 200, colour: this.linear[8] },
                { left: 200, top: 150, colour: this.linear[9] },
                { left: 200, top: 100, colour: this.linear[10] },
                { left: 200, top: 50, colour: this.linear[11] },
                { left: 200, top: 0, colour: this.linear[12] },
                { left: 150, top: 0, colour: this.linear[13] },
                { left: 100, top: 0, colour: this.linear[14] },
                { left: 50, top: 0, colour: this.linear[15] },
            ],
        }
    }
    componentDidMount() {
        setInterval(
            component => {
                component.linear.splice(0, 1)
                component.linear.push(random_colour())
                const circles = component.state.circles.map((circle, index) => {
                    circle.colour = component.linear[index]
                    return circle
                })

                component.setState({ circles })
            },
            1000,
            this
        )
    }
    render() {
        const { circles } = this.state
        const { children } = this.props
        return (
            <BodyContainer style={{ justifyContent: "center", height: "100%" }}>
                <LoaderContainer>
                    {circles.map(({ colour, top, left }, index) => (
                        <Item
                            key={index}
                            style={{
                                backgroundColor: colour,
                                top,
                                left,
                            }}
                        />
                    ))}
                    <div>{children ? children : "Loading..."}</div>
                </LoaderContainer>
            </BodyContainer>
        )
    }
}

const LoaderContainer = styled.div`
    margin: 0;
    padding: 0;
    height: 300px;
    width: 300px;
    align-self: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const Item = styled.div`
    margin: 0;
    height: 100px;
    width: 100px;
    border-radius: 100%;
    position: absolute;
`
