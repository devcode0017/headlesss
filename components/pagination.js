/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'

const pagination = ({posts, currentPost}) => {
    const FilteredPost = (low, high) => {
        let arr= [];
        for(low; low <= high; low++){
            posts[low-1] && arr.push(posts[low - 1]);
            // console.log(low)
        }
        currentPost(arr);
    }


    const handlePagination = (e) => {
        let num = [];
        if(e >= 1 && e <= 4){
            let i = 0;
            console.log(i, e)
            for(i ; i <= e; i++){
                num.push(i+1);
            }
        }
        else {
            let i = e;
            for(i; i<= e+3; i++){
                num.push(i);
            }
        }
        setCurrentPages(num);
    }

    const handleRightClick = (e) => {
        let i = e;
        for(i; i<= e+3; i++){
            num.push(i);
        }
    }


    const [currentPages, setCurrentPages] = useState([])
    const totalPage = Math.ceil(posts.length / 6);
    const handleClick = (e) => {
        const low = (e*6) - (6-1);
        const high = e*6
        FilteredPost(low, high);
    }
    useEffect(() => {
        handleClick(1);
        handlePagination(1);
    }, [])
  return (
    <div style={{textAlign: 'center', marginTop: "20px"}}>
        {
            currentPages[0] > 5 && <><FaAngleLeft onClick={handleRightClick(currentPages[3])}/><a href='#' onClick={() => handleClick(1)}>{1}</a>...</>
        }
        {
            currentPages.map((e) => {
                console.log(e);
                return(
                        <a style={{padding: "20px"}} href="#" onClick={() => handleClick(e)} key={e}>{e}</a>
                )
            })
        }
        {
            currentPages[3] > 5 && <>...<a href='#' onClick={() => handleClick(totalPage)}>{totalPage}</a><FaAngleRight onClick={handleRightClick(currentPages[3])}/></>
        }
        
    </div>
  )
}

export default pagination;