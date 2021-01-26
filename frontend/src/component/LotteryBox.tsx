import React from "react";
import LotteryItem from "./LotteryItem";

const numbers = [...Array(45).keys()];



export default class LotteryBox extends React.Component<
    LotteryBoxProps,
    LotteryBoxState
> {
    constructor(props: LotteryBoxProps) {
        super(props);
        this.state = {
            number: [0, 0, 0, 0, 0, 0, 0],
            effect: false,
        };
        // this.onLetClicked = this.
    }

    randomize = () => {
        let arr = [];
        if (!this.state.effect) {
            const numberCopy = numbers.map((x) => x);
            // const arr = [];
            for (let i = 0; i <= 7; i++) {
                const random = Math.floor(
                    Math.random() * (numberCopy.length - 1)
                );
                arr.push(numberCopy[random] + 1);
                numberCopy.splice(random, 1);
            }
            this.setState({ number: arr, effect: true });
            setTimeout(() => {
                this.setState({ effect: false });
            }, 2000);
        }
        // const numbers = this.state.number;
        {this.props.onLetClicked([arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6]])}
        // this.props.onLetClicked(this.state.number);
    };

    getBallColor = (number: Number)=> {
        if (number <= 10) {
            return "yellow"
        }
        else if (number <= 20) {
            return "blue"
        }
        else if (number <= 30) {
            return "red"
        }
        else if (number <= 40) {
            return "grey"
        }
        else if (number <= 45) {
            return "green"
        }
        return ""
    }

    render() {
        // const { test} = this.props;
        
        return (
            <>
                <div id="numbers">
                    <LotteryItem
                        index="0"
                        color={this.getBallColor(this.state.number[0])}
                        number={this.state.number[0]}
                        decrypting={this.state.effect}
                    />
                    <LotteryItem
                        index="1"
                        color={this.getBallColor(this.state.number[1])}
                        number={this.state.number[1]}
                        decrypting={this.state.effect}
                    />
                    <LotteryItem
                        index="2"
                        color={this.getBallColor(this.state.number[2])}
                        number={this.state.number[2]}
                        decrypting={this.state.effect}
                    />
                    <LotteryItem
                        index="3"
                        color={this.getBallColor(this.state.number[3])}
                        number={this.state.number[3]}
                        decrypting={this.state.effect}
                    />
                    <LotteryItem
                        index="4"
                        color={this.getBallColor(this.state.number[4])}
                        number={this.state.number[4]}
                        decrypting={this.state.effect}
                    />
                    <LotteryItem
                        index="5"
                        color={this.getBallColor(this.state.number[5])}
                        number={this.state.number[5]}
                        decrypting={this.state.effect}
                    />
                    <div className="plus">+</div>
                    <LotteryItem
                        index="6"
                        color={this.getBallColor(this.state.number[6])}
                        number={this.state.number[6]}
                        decrypting={this.state.effect}
                    />
                </div>
                <div>
                    
                    <button
                        id="btn"
                        className={this.state.effect ? "hide" : ""}
                        onClick={this.randomize}
                    >

                        추첨!
                    </button>
                </div>
            </>
        );
    }
}
