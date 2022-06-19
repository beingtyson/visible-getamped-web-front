import { useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import { getCookies, setCookies } from "cookies-next";

import Rating from "@components/common/rating";
import LoadingIndicator from "@components/common/loadingIndicator";

import { selectedItemAtom } from "@recoil/selectedItem";
import { useCommentList, createComment } from "@api/useComment";

interface CommentInputProps {
  accessoryId: number;
  commentList?: Array<Comment>;
}

interface Comment extends CommentInputProps {
  ip: string;
  rate: number;
  comment: string;
}

const CommentList: React.FC = () => {
  const [selectedItem] = useRecoilState(selectedItemAtom);
  const { id: accessoryId } = selectedItem;
  const { data, isLoading } = useCommentList(accessoryId);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  const commentList = data.rates;

  return (
    <>
      {commentList.map((item: Comment, idx: number) => {
        return (
          <div
            key={idx}
            className="flex flex-row justify-start min-w-full items-center"
          >
            <div className="basis-1/4">
              <span>{item.ip}</span>
            </div>

            <div className="basis-3/4 ml-5">
              <span>{item.comment}</span>
            </div>
            <Rating point={item.rate} disabled={true} />
          </div>
        );
      })}

      <CommentInput accessoryId={accessoryId} commentList={commentList} />
    </>
  );
};

const CommentInput: React.FC<CommentInputProps> = ({
  accessoryId,
  commentList = [],
}) => {
  const client = useQueryClient();
  const { commentTerm } = getCookies();
  const [name, setName] = useState("");
  const [point, setPoint] = useState(5);
  const [comment, setComment] = useState("");
  const rateSum = commentList.reduce(
    (acc: number, curr: Comment) => (acc += curr.rate),
    0
  );
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      setCookies("commentTerm", true, { maxAge: 60 * 3 });
      setComment("");
      client.refetchQueries(["commentList", accessoryId]);
      client.refetchQueries(["accessories"]);
    },
    onError: () => {
      alert("실패");
    },
    useErrorBoundary: false,
  });

  const handleSubmit = () => {
    if (commentTerm) {
      return alert("코멘트는 3분에 한번씩 입력이 가능합니다.");
    }
    if (!isLoading && comment !== "") {
      mutate({
        ip: name ? name : "겟앰꿈나무",
        rate: point,
        comment,
        accessoryId,
        averageRate: (rateSum + point) / (commentList.length + 1),
      });
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="flex flex-row justify-start min-w-full items-center">
      <div className="basis-1/4">
        <input
          id="text-input"
          type="text"
          className="input input-bordered w-full max-w-xs"
          maxLength={15}
          value={name || ""}
          placeholder={"겟앰꿈나무"}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="basis-3/4 ml-5">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          maxLength={50}
          value={comment || ""}
          placeholder="착한 말 예쁜 말 고운 말 ^^"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Rating point={point} disabled={false} setPoint={setPoint} />
      <button className="btn" onClick={handleSubmit}>
        전송
      </button>
    </div>
  );
};

export default CommentList;
