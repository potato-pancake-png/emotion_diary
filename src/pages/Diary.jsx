import { useParams, useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-Stringed-date";

import useDiary from "../hooks/useDiary";
import useTitle from "../hooks/useTitle";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";

const Diary = () => {
  const params = useParams();
  useTitle(`${params.id}번 일기`);

  const curDiaryItem = useDiary(params.id);
  const nav = useNavigate();
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title}  기록`}
        leftChild={
          <Button
            text={"< 뒤로가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button
            text={"수정하기"}
            onClick={() => {
              nav(`/edit/${params.id}`);
            }}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
