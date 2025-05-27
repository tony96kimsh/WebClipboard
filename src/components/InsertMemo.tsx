import { useState } from "react";
import { Button } from "react-bootstrap";
import MemoModal from "./MemoModal";

interface Props {
  addMemo: (title: string, content: string) => void;
}

const InsertMemo = ({ addMemo }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="outline-primary" className="w-100 pb-3 pt-3" onClick={() => setShowModal(true)}>
        메모 추가
      </Button>

      <MemoModal
        show={showModal} // 토글
        onClose={() => setShowModal(false)}
        addMemo={addMemo}
        isEdit={false} // 신규 작성 false
      />
    </>
  );
};

export default InsertMemo;