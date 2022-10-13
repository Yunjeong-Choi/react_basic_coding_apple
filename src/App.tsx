import React, { useState } from "react";
import "./App.css";

function App() {
  let title = "왕 나도 리액트 공부한다.";
  let [contentList, setContentList] = useState([
    "나는 최윤정",
    "유후유후",
    "가나초코렡",
  ]);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [selectedContentIndex, setSelectedContentIndex] = useState<number | null>(
    null
  );

  function onClickEditContent() {
    // let copy = [...contentList];
    // copy[0] = "나는 최윤정, who is hungry";
    // setContentList(copy);

    setContentList((prev) => {
      const copy = [...prev];
      copy[0] = "나는 최윤정, who is hungry";

      return copy;
    });
  }

  function onClickSort() {
    setContentList((prev) => {
      const copy = [...prev];
      copy.sort();

      return copy;
    });
  }

  function onClickContent(index: number) {
    setIsModalOpen(!isModalOpen);
    setSelectedContentIndex(index);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={title}>{title}</h4>
      </div>
      <button onClick={onClickSort}>가나다순정렬</button>
      {/* <div className="item">
        <h4 style={{ color: "crimson" }} onClick={onClickContent}>
          {contentList[0]}
          <span onClick={onClickLike}>👍{like}</span>
        </h4>
        <p>{`${new Date()} 발행`}</p>
      </div> */}
      {contentList.map((content, index) => (
        <div key={content} className="item">
          <h4
            style={{ color: "crimson" }}
            onClick={() => onClickContent(index)}
          >
            {content}
          </h4>
          <Like />
          <p>{`${new Date()} 발행`}</p>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          content={
            selectedContentIndex !== null
              ? contentList[selectedContentIndex]
              : undefined
          }
          onClickEditContent={onClickEditContent}
        />
      )}
    </div>
  );
}

function Like() {
  let [like, setLike] = useState(0);

  function onClickLike() {
    setLike(like + 1);
  }
  return <span onClick={onClickLike}>👍{like}</span>;
}

function Modal(props: { content?: string; onClickEditContent: () => void }) {
  return (
    <div className="modal">
      <h4>{props.content}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.onClickEditContent}>글수정</button>
    </div>
  );
}

export default App;
