import React, { useState } from 'react'
import {getUserLottoNumbers} from '../actions/random'
import { CreateTable } from '../component/table'
// import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/common.css'
import '../css/view.css'
import {checkCorrectCount,checkCorrectBouns,checkResult,makeLottoList,lottoAllList} from '../actions/lotto'
export default function()
{
    // makeLottoList();
    let tmp = 1;
    let numbers;
    // let userLottoNumbers =  getuserLottoNumbers();
    const [userLottoNumbers,setuserLottoNumbers] = useState(getUserLottoNumbers());
    const [okClicked, setOkClicked] = useState(false);

    // function decryptEffect(element, time) {
    //     const effect = setInterval(() => {
    //         <span className={getBallColorClassName(element)}>{element}</span>
    //         // element.innerText = Math.floor(Math.random() * 44 + 1);
    //     }, 10);
    
    //     setTimeout(() => {
    //         // const random = Math.floor(Math.random() * numbers.length);
    
    //         clearInterval(effect);
    //         // element.classList.add("done");
    //         // element.innerText = numbers[random];
    //         // numbers.splice(random, 1);
    //     }, time * 100 + 1000);
    // }

    const lottery =() =>{
        
        document.querySelectorAll(".ball").forEach((element, index) => {
            console.log("element",element,"index",index);
            // element.classList.remove("done");
            // decryptEffect(element, index);
        });
    }

    const handleLetClicked = () => {
        if(tmp === 1){
            numbers = Array.from({length:45},(_,i)=>i+1);
            tmp = 0;
            setOkClicked(!okClicked);
            lottery();
            console.log('numbers',numbers);
        }
        // let userLottoNumbers = getUserLottoNumbers();
        // setuserLottoNumbers(userLottoNumbers);
        // getAllNumbers();
        // let result = checkCorrectCount([1,2,3,4,5,6],[1,11,3,4,8,9]);
        // let result = checkResult(5,false);
        // console.log(lottoAllList);
        
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

                    {/* <span className={getBallColorClassName(userLottoNumbers[0])}>{userLottoNumbers[0]}</span>
                <span className={getBallColorClassName(userLottoNumbers[1])}>{userLottoNumbers[1]}</span>
                <span className={getBallColorClassName(userLottoNumbers[2])}>{userLottoNumbers[2]}</span>
                <span className={getBallColorClassName(userLottoNumbers[3])}>{userLottoNumbers[3]}</span>
                <span className={getBallColorClassName(userLottoNumbers[4])}>{userLottoNumbers[4]}</span>
                <span className={getBallColorClassName(userLottoNumbers[5])}>{userLottoNumbers[5]}</span> */}

    return(
        <div className="commonBall">
            <p>
                {
                okClicked === false ?
                userLottoNumbers.map((element,index)=>{
                    console.log('element',element);
                    // decryptEffect(element,index);
                })
                    : 
                    null
                }
            </p>
            {okClicked === false ? 
                        <Button className="commonButton" variant="success" onClick={() => { handleLetClicked() }}>GO!</Button>
            : null
            }

            <div className="textPosition1"> ₩ 누적금액 </div>
            <div className="textPosition">(1~3 등 내)</div>
            <CreateTable 
                products={[
                    { id: 1, round: '1', number: '123456', rank: 1, price: 45620000 },
                    { id: 2, round: '2', number: '234567', rank: 2, price: 90000 },
                    { id: 3, round: '3', number: '345678', rank: 3, price: 3450000 },
                    { id: 4, round: '4', number: '456789', rank: 2, price: 567320000 },
                    { id: 5, round: '5', number: '345678', rank: 1, price: 345720000 },
                ]}
            />
        </div>
    );
}