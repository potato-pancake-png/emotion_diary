import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";
import useTitle from "../hooks/useTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const params = useParams();
  const nav = useNavigate();

  useTitle(`${params.id}번 일기 수정`);
  const curDiaryItem = useDiary(params.id);

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"뒤로 가기"} onClick={() => nav(-1)} />}
          rightChild={
            <Button
              text={"삭제하기"}
              type={"NEGATIVE"}
              onClick={onClickDelete}
            />
          }
        />
      </div>
      <div>
        <Editor onSubmit={onSubmit} initData={curDiaryItem} />
      </div>
    </div>
  );
};

export default Edit;
