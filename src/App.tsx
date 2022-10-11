import React, { useState } from "react";
import "./App.css";

function App() {
  let title = "왕 나도 리액트 공부한다.";
  let [contentList, setContentList] = useState([
    "나는 최윤정",
    "유후유후",
    "가나초코렡",
  ]);
  let [like, setLike] = useState(0);

  function onClickContent() {
    // let copy = [...contentList];
    // copy[0] = "나는 최윤정, who is hungry";
    // setContentList(copy);

    setContentList((prev) => {
      const copy = [...prev];
      copy[0] = "나는 최윤정, who is hungry";

      return copy;
    });
  }

  function onClickLike() {
    setLike(like + 1);
  }

  function onClickSort() {
    setContentList((prev) => {
      const copy = [...prev];
      copy.sort();

      return copy;
    });
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={title}>{title}</h4>
      </div>
      <button onClick={onClickSort}>가나다순정렬</button>
      <div className="item">
        <h4 style={{ color: "crimson" }} onClick={onClickContent}>
          {contentList[0]}
          <span onClick={onClickLike}>👍{like}</span>
        </h4>
        <p>{`${new Date()} 발행`}</p>
      </div>
      <div className="item">
        <h4 style={{ color: "crimson" }}>{contentList[1]}</h4>
        <p>{`${new Date()} 발행`}</p>
      </div>
      <div className="item">
        <h4 style={{ color: "crimson" }}>{contentList[2]}</h4>
        <p>{`${new Date()} 발행`}</p>
      </div>
    </div>
  );
}

export default App;
