import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getWinningNumber(lottoInfo)
{
    if(lottoInfo === undefined)
        return "";

    // return `<TableCell align="center" width="10%">${lottoInfo['drwtNo1']},${lottoInfo['drwtNo2']},${lottoInfo['drwtNo3']},${lottoInfo['drwtNo4']},${lottoInfo['drwtNo5']},${lottoInfo['drwtNo6']} + ${lottoInfo['bnusNo']}</TableCell>`
    return <TableCell align="center" width="10%">{lottoInfo['drwtNo1']},{lottoInfo['drwtNo2']},{lottoInfo['drwtNo3']},{lottoInfo['drwtNo4']},{lottoInfo['drwtNo5']},{lottoInfo['drwtNo6']} + {lottoInfo['bnusNo']}</TableCell>

  }

function getWinningAmount(rank,lottoInfo)
{
    if(lottoInfo === undefined)
    return "";

    // console.log('rank',rank,'lottoInfo',lottoInfo);
    let winningAmount = 0;
    if(rank === 1)
    {
        winningAmount = lottoInfo['firstWinamnt'];
    }
    else if(rank === 2)
    {
        winningAmount = lottoInfo['secondWinamnt'];
    }
    else if(rank === 3)
    {
        winningAmount = lottoInfo['thirdWinamnt'];
    }
    else if(rank === 4)
    {
        winningAmount = lottoInfo['fourthWinamnt'];
    }
    else if(rank === 5)
    {
        winningAmount = lottoInfo['fifthWinamnt'];
    }
    // const sum = amount + winningAmount;
    // setamount(sum);
    return `${numberWithCommas(winningAmount)} 원`;
}

function getDate(lottoInfo)
{
    if(lottoInfo === undefined)
    return "";

    const year = String(lottoInfo['drwNoDate']).substring(0,4);
    const month = String(lottoInfo['drwNoDate']).substring(4,6);
    const day = String(lottoInfo['drwNoDate']).substring(6,8);
    
    const str = `${year}-${month}-${day}`;
    return str
}


export function ResultTable(props) {
  const rows = props.resultList;
//   let amount = props.amount;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="10%">회차</TableCell>
            <TableCell align="center" width="30%">당첨번호</TableCell>
            <TableCell align="center" width="10%">당첨금액</TableCell>
            <TableCell align="center" width="10%">등수</TableCell>
            <TableCell align="center" width="20%">추첨일자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => {
            // console.log('row',row);
            //   console.log('props.amount',props.amount);
            // let winningAmount = getWinningAmount(row.rank,row.lottoInfo);
            // let sum = props.amount + winningAmount;
            // // amount += winningAmount;
            // props.setamount(sum);
            return(
                <TableRow key={index}>
                <TableCell  align="center" width="10%">{row.drwNo}</TableCell>
                {getWinningNumber(row.lottoInfo)}
                  <TableCell align="center" width="10%">{getWinningAmount(row.rank,row.lottoInfo)}</TableCell>
                  <TableCell align="center" width="10%">{row.rank}</TableCell>
                  <TableCell  align="center" width="20%">{getDate(row.lottoInfo)}</TableCell>
              </TableRow>
            );

            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}