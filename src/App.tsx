import React, { useState } from "react";
import "./App.css";

function App() {
  let title = "왕 나도 리액트 공부한다.";
  let [contentList, setContentList] = useState([
    { title: "나는 최윤정", createdAt: "2022,10,17" },
    { title: "유후유후", createdAt: "2022,10,17" },
    { title: "가나초코렡", createdAt: "2022,10,17" },
  ]);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [selectedContentIndex, setSelectedContentIndex] = useState<number | null>(
    null
  );
  let [newContent, setNewContent] = useState("");

  function onClickEditContent() {
    // let copy = [...contentList];
    // copy[0] = "나는 최윤정, who is hungry";
    // setContentList(copy);

    setContentList((prev) => {
      if (selectedContentIndex === null) {
        return prev;
      }

      const copy = [...prev];
      copy[selectedContentIndex].title = `who is hungry`;

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

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContent(e.target.value);
  }

  function onClickAddContent() {
    if (newContent) {
      setContentList((prev) => {
        const copy = [...prev];
        copy.unshift({ title: newContent, createdAt: new Date().toString() });
        return copy;
      });
      setNewContent("");
    }
  }

  function onClickDeleteContent(targetIndex: number) {
    setContentList((prev) => {
      const copy = [...prev];
      copy.splice(targetIndex, 1);
      return copy;
    });
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
        <div key={content.title} className="item">
          <h4
            style={{ color: "crimson" }}
            onClick={() => onClickContent(index)}
          >
            {content.title}
          </h4>
          <Like />
          <p>{`${new Date(content.createdAt)} 발행`}</p>
          <button onClick={() => onClickDeleteContent(index)}>삭제</button>
        </div>
      ))}
      <input value={newContent} onChange={onChangeInput} />
      <button onClick={onClickAddContent}>콘텐츠 추가</button>
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

function Modal(props: {
  content?: { title: string; createdAt: string };
  onClickEditContent: () => void;
}) {
  if (!props.content) {
    return null;
  }
  return (
    <div className="modal">
      <h4>{props.content.title}</h4>
      <p>{`날짜: ${new Date(props.content.createdAt)}`}</p>
      <p>상세내용</p>
      <button onClick={props.onClickEditContent}>글수정</button>
    </div>
  );
}

export default App;
