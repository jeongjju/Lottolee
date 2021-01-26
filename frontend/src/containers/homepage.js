import React, { useState } from 'react'
import { getUserLottoNumbers } from '../actions/random'
// import { CreateTable } from '../component/table'
import { ResultTable } from '../component/resultTable'
import LotteryBox from "../component/LotteryBox";
import "../css/index.css";
// import Button from '@material-ui/core/Button';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/common.css'
import '../css/view.css'
let maxWinamnt = 0;
export default function () {
    // makeLottoList();
    console.log('test');
    // let userLottoNumbers =  getuserLottoNumbers();
    const [userLottoNumbers, setUserLottoNumbers] = React.useState(getUserLottoNumbers());
    const [resultList, setResultList] = React.useState([{}]);
    const [amount, setAmount] = React.useState(0);
    const [clickCount, setClickCount] = React.useState(0);

    const handleFindClicked = () => {
        // (async () => {
        //     const response = await fetch('http://localhost:3002/result');
        //     // waits until the request completes...
        //     const movies = await response.json();
        //     console.log('movies', movies)
        // })();
        // amount += 1;
        // let test = amount;
        // test++;
        // setAmount(test);
    }
    const handleLetClicked = (numbers) => {
        console.log('number',numbers);
        // let userLottoNumbers = getUserLottoNumbers();
        setUserLottoNumbers(numbers);
        console.log('userLottoNumbers', userLottoNumbers);
        (async () => {
            const rawResponse = await fetch('http://localhost:3002/result', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ numbers: numbers })
            });
            const resultJson = await rawResponse.json();
            setResultList(resultJson);
            const totalAmount = amount + getSumAmount(resultJson);
            setAmount(totalAmount);
            const totatlClickCont = clickCount + 1;
            setClickCount(totatlClickCont);
            // console.log(content);
        })();


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

    const getSumAmount = (resultList) => {
        let amount = 0;
        for (let i = 0; i < resultList.length; i++) {
            const rank = resultList[i]['rank'];
            let winamnt = 0;
            if (rank === 1) {
                winamnt += resultList[i]['lottoInfo']['firstWinamnt'];
            }
            else if (rank === 2) {
                winamnt += resultList[i]['lottoInfo']['secondWinamnt'];
            }
            else if (rank === 3) {
                winamnt += resultList[i]['lottoInfo']['thirdWinamnt'];
            }
            else if (rank === 4) {
                winamnt += resultList[i]['lottoInfo']['fourthWinamnt'];
            }
            else if (rank === 5) {
                winamnt += resultList[i]['lottoInfo']['fifthWinamnt'];
            }
            amount += winamnt;
            getMaxWinamnt(winamnt);
        }
        return amount;
    }

    const getMaxWinamnt = (winamnt) => {
        if(winamnt > maxWinamnt)   
        {
            maxWinamnt = winamnt;
        }
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    console.log('resultList', resultList);
    console.log('getSumAmount', getSumAmount(resultList));
    return (
        <div className="board">
            <section className="userBoard">
            <LotteryBox onLetClicked={handleLetClicked} />
                {/* <span className={getBallColorClassName(userLottoNumbers[0])}>{userLottoNumbers[0]}</span>
                <span className={getBallColorClassName(userLottoNumbers[1])}>{userLottoNumbers[1]}</span>
                <span className={getBallColorClassName(userLottoNumbers[2])}>{userLottoNumbers[2]}</span>
                <span className={getBallColorClassName(userLottoNumbers[3])}>{userLottoNumbers[3]}</span>
                <span className={getBallColorClassName(userLottoNumbers[4])}>{userLottoNumbers[4]}</span>
                <span className={getBallColorClassName(userLottoNumbers[5])}>{userLottoNumbers[5]}</span>
                <Button className="commonButton" variant="success" onClick={() => { handleLetClicked() }}>GO!</Button> */}

            </section>
            <section>
                <div className="textPosition1"> ₩ 누적금액 : {numberWithCommas(amount)} 원</div>
                <div className="textPosition1"> 총 횟수 : {numberWithCommas(clickCount)} 회</div>
                <div style={{textAlign:"center"}}>금일 최고 당첨금액 : {numberWithCommas(maxWinamnt)} 원</div>
                <div className="textPosition">(1~3 등 내)</div>
            </section>
            <section className="resultBoard">
                <div className="resultTable" style={{margin:"0 auto"}}>
                    <ResultTable resultList={resultList} amount={amount} setAmount={setAmount}></ResultTable>

                </div>
            </section>

        </div>
    );
}