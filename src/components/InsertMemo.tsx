import { useState } from "react";
import { Button } from "react-bootstrap";
import MemoModal from "./MemoModal";

interface Props {
  onAddMemo: (title: string, content: string) => void;
}

const InsertMemo = ({ onAddMemo }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button className="w-100" onClick={() => setShowModal(true)}>
        메모 추가
      </Button>

      <MemoModal
        show={showModal} // 토글
        onClose={() => setShowModal(false)}
        onSubmit={onAddMemo}
        isEdit={false} // 신규 작성 false
      />
    </>
  );
};

export default InsertMemo;