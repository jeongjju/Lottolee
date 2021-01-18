const express = require('express');
const Number = require('../schemas/number');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const numbers = await Number.find({
      // "drwtNo1":{"$in":[1,2,3,4,5]}
      "drwtNo1": { "$in": [1, 2, 3, 4, 5] }
    });
    console.log('numbers', numbers)
    res.json(numbers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.post('/', async (req, res) => {
  const TOTAL_NO = 944;
  // console.log('req.body', req.body.numbers);
  console.log(`시작 ~~~~~~~~~~~~~~~~~~ ${req.body.numbers}`);
  const arr = Array.from(Array(TOTAL_NO), () => Array(6).fill(0));
  // const arrNumStorage = Array.from(Array(TOTAL_NO + 1), () => Array(6).fill(0)); //앞에 6개는 당첨번호, 뒤에 1개는 보너스
  const arrLottoInfo = new Array(TOTAL_NO);

  let sumArr = [];
  let userNumbers = req.body.numbers;

  for (let cnt = 1; cnt <= 6; cnt++) {
    let strNo = `drwtNo${cnt}`
    const rows = await Number.find({
      [strNo]: { "$in": userNumbers }
    });
    // console.log('rows',rows);
    // for (let i = 0; i < rows.length; i++) {
    //   // console.log(rows["drwtNo1"]);
    //   // console.log(rows["drwtNo1"]);
    //   arrNumStorage[rows[i]["drwNo"]][cnt-1] = rows[i][`drwtNo${cnt}`];
    //   // console.log(arrNumStorage[rows[i]["drwNo"]][cnt-1]);
    // }

    for (let i = 0; i < rows.length; i++) {
      arr[rows[i].drwNo - 1][cnt - 1] += 1;
      arrLottoInfo[rows[i].drwNo -1] = rows[i];
    }
  }

  // 3개 이상 일치하는 수 수 조회
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  for (let i = 0; i < TOTAL_NO; i++) {
    let sum = arr[i].reduce(reducer);
    if (sum === 5) {
      const index = arr[i].findIndex((element) => element === 0);
      if (index === -1) {
        continue;
      }
      const bunsNo = await Number.find({ 
        "bnusNo": userNumbers[index], "drwNo": i + 1
      });
      sum = bunsNo.length > 0 ? 5.5 : 5;
    }
    sumArr.push(sum)

  }

  let resultJson = [];

  for (let i = 0; i < TOTAL_NO; i++) {
    // console.log(sumArr[i]);
    const rank = getRank(sumArr[i]);
    if (rank != -1) {
      // console.log(arrNumStorage[i+1][0]);
      // console.log('arrLottoInfo[i]',arrLottoInfo[i]);
      const obj = { "drwNo": i + 1, "rank": rank ,"lottoInfo":arrLottoInfo[i]}
      resultJson.push(obj);
    }
    // res.json()

  }
  resultJson.sort(function (a,b){
    return a.rank < b.rank ? -1: a.rank > b.rank ? 1: 0;
  });
  res.send(resultJson);
});


function getRank(cnt) {
  if (cnt === 6) {
    return 1
  }
  else if (cnt === 5.5) {
    return 2
  }
  else if (cnt === 5) {
    return 3
  }
  else if (cnt === 4) {
    return 4
  }
  else if (cnt === 3) {
    return 5
  }
  else {
    return -1
  }
}

module.exports = router;