import React from 'react'
import '../css/Header.css'
import lotto from '../lotto.png';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';

function Header() {
    return (
        <div className = "header">
            <img src={lotto} className = "logo" alt="lotto" />                

            <div className = 'header_center'>
                <input type='text' />
                <SearchIcon />    
            </div>

            <div className = 'header_right'>
                <ExpandMore />
                <p>사이트 바로가기</p>
            </div>

        </div>
    )
}

export default Header
