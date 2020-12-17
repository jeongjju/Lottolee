import React, { useState } from 'react'
import { getUserLottoNumbers } from '../actions/random'
import { CreateTable } from '../components/Table'
import Nohda from '../actions/Nohda'
import Header from '../containers/Header'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Common.css'
import '../css/Ball.css'
import { checkResult } from '../actions/lotto'


export default function () {
    const [userLottoNumbers, setuserLottoNumbers] = useState(getUserLottoNumbers());

    const handleLetClicked = () => {
        let userLottoNumbers = getUserLottoNumbers();
        setuserLottoNumbers(userLottoNumbers);
        checkResult(5, false);
        return userLottoNumbers;
    }

    const getBallColorClassName = (number) => {
        if (number <= 10) {
            return "ball_645 lrg ball1 oneBall"
        }
        else if (number <= 20) {
            return "ball_645 lrg ball2 oneBall"
        }
        else if (number <= 30) {
            return "ball_645 lrg ball3 oneBall"
        }
        else if (number <= 40) {
            return "ball_645 lrg ball4 oneBall"
        }
        else if (number <= 45) {
            return "ball_645 lrg ball5 oneBall"
        }
    }
    return (
        <div className="allSize">
            <Header />
            <body className="commonBall">
                <lotto_ball>
                    <span className={getBallColorClassName(userLottoNumbers[0])}>{userLottoNumbers[0]}</span>
                    <span className={getBallColorClassName(userLottoNumbers[1])}>{userLottoNumbers[1]}</span>
                    <span className={getBallColorClassName(userLottoNumbers[2])}>{userLottoNumbers[2]}</span>
                    <span className={getBallColorClassName(userLottoNumbers[3])}>{userLottoNumbers[3]}</span>
                    <span className={getBallColorClassName(userLottoNumbers[4])}>{userLottoNumbers[4]}</span>
                    <span className={getBallColorClassName(userLottoNumbers[5])}>{userLottoNumbers[5]}</span>
                </lotto_ball>

                <Button className="ballButton" variant="success" onClick={() => { handleLetClicked()} }>
                    GO!
                </Button>
                
                {/* <Nohda number={userLottoNumbers} /> */}
        
                <CreateTable
                    products={[
                        { id: 1, round: '1', number: '123456', rank: 1, price: 21556758752 },
                        { id: 2, round: '2', number: '234567', rank: 2, price: 3592793151 },
                        { id: 3, round: '3', number: '345678', rank: 3, price: 3592796175 },
                        { id: 4, round: '4', number: '456789', rank: 2, price: 7277200000 },
                        { id: 5, round: '5', number: '345678', rank: 1, price: 11414255000 },
                    ]}
                />                
            </body>
        </div>
    );
}