import { Button, Card, Toast, ToastContainer } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import type { Memo } from '../data/Memo';
import { useState } from 'react';
import './MemoList.css';
import MemoModal from './MemoModal';
import { Modal } from 'react-bootstrap';

interface Props {
  folderId: string;
  memos: Memo[];
  onEditMemo?: (memo: Memo) => void;
  onDeleteMemo?: (id: string) => void;
}

const MemoList = ({ folderId, memos, onEditMemo, onDeleteMemo }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [deletingMemo, setDeletingMemo] = useState<Memo | null>(null);

  const filtered = memos.filter((memo) => memo.folderId === folderId);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const handleEdit = (memo: Memo) => {
    setEditingMemo(memo);
  };

  const handleDeleteConfirm = () => {
    if (deletingMemo) {
      onDeleteMemo?.(deletingMemo.id);
      setDeletingMemo(null);
    }
  };

  if (filtered.length === 0) {
    return <p className="text-muted text-center">메모가 없습니다.</p>;
  }

  return (
    <>
      <div className="mt-4">
        {filtered.map((memo) => (
          <Card
            key={memo.id}
            className="mb-3 shadow-sm memo-card"
            onClick={() => handleCopy(memo.content)}
          >
            <Card.Body className="position-relative">
              <Card.Title>{memo.title}</Card.Title>
              <Card.Text>{memo.content}</Card.Text>

              {/* 우측 하단 아이콘 */}
              <div
                className="memo-actions"
                onClick={(e) => e.stopPropagation()} // 복사 이벤트 방지
              >
                <PencilSquare
                  className="action-icon me-3"
                  onClick={() => handleEdit(memo)}
                />
                <Trash
                  className="action-icon"
                  onClick={() => setDeletingMemo(memo)}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <ToastContainer position="bottom-center" className="mb-3">
        <Toast
          bg="light"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body>📋 메모가 클립보드에 복사되었습니다!</Toast.Body>
        </Toast>
      </ToastContainer>

      <MemoModal
        show={!!editingMemo} // 명확한 boolean형
        onClose={() => setEditingMemo(null)}
        onSubmit={(title, content) => {
          if (editingMemo) {
            onEditMemo?.({
              ...editingMemo,
              title,
              content,
              updatedAt: new Date(),
            });
            setEditingMemo(null);
          }
        }}
        isEdit={true}
        defaultTitle={editingMemo?.title}
        defaultContent={editingMemo?.content}
      />

      <Modal show={!!deletingMemo} onHide={() => setDeletingMemo(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>메모 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말 이 메모를 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeletingMemo(null)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemoList;