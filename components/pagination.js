/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from 'goober';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const pagination = ({ posts, currentPost }) => {
  const FilteredPost = (low, high) => {
    let arr = [];
    for (low; low <= high; low++) {
      posts[low - 1] && arr.push(posts[low - 1]);
    }
    currentPost(arr);
  };

  const handlePagination = (e) => {
    let num = [];
    if (e >= 1 && e <= 4) {
      let i = 0;
      console.log(i, e);
      for (i; i < 4; i++) {
        num.push(i + 1);
      }
    } else {
      let i = e;
      for (i; i <= e + 3; i++) {
        num.push(i);
      }
    }
    setCurrentPages(num);
  };

  const handleRightClick = (e) => {
    console.log(e);
    let num = [];
    let i = e;
    if (totalPage >= currentPages[3]) {
      for (i; i <= e + 3; i++) {
        i <= totalPage && num.push(i);
      }
      setCurrentPages(num);
    }
  };

  const handleLeftClick = (e) => {
    console.log(e);
    let num = [];
    if (e - 3 < 0) {
      let i = 1;
      for (i; i <= 4; i++) {
        num.push(i);
      }
      setCurrentPages(num);
    } else {
      let i = e - 3;
      for (i; i <= e; i++) {
        num.push(i);
      }
      setCurrentPages(num);
    }
  };

  const [currentPages, setCurrentPages] = useState([]);
  const totalPage = Math.ceil(posts.length / 6);

  const handleClick = (e) => {
    const low = e * 6 - (6 - 1);
    const high = e * 6;
    FilteredPost(low, high);

    window.history.pushState(null, null, `/blog/${e}`);
  };
  useEffect(() => {
    handleClick(1);
    handlePagination(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container style={{ textAlign: 'center', marginTop: '20px' }}>
      {currentPages[0] > 1 && (
        <>
          <FaAngleLeft style={{ cursor: 'pointer' }} onClick={() => handleLeftClick(currentPages[0])} />
          <a style={{ padding: '20px' }} onClick={() => handleClick(1)}>
            {1}
          </a>
          <span>...</span>
        </>
      )}
      {currentPages.map((e) => {
        return (
          <a style={{ padding: '20px' }} onClick={() => handleClick(e)} key={e}>
            {e}
          </a>
        );
      })}
      {totalPage > 5 && currentPages[currentPages.length - 1] != totalPage && (
        <>
          <span>...</span>
          <a style={{ padding: '20px' }} onClick={() => handleClick(totalPage)}>
            {totalPage}
          </a>
          <FaAngleRight style={{ cursor: 'pointer' }} onClick={() => handleRightClick(currentPages[3])} />
        </>
      )}
    </Container>
  );
};

export default pagination;

const Container = styled('div')`
  a {
    cursor: pointer;

    > * {
      pointer-events: none;
    }
  }
`;
