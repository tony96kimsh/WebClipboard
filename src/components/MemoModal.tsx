import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  isEdit?: boolean;
  defaultTitle?: string;
  defaultContent?: string;
}

const MemoModal = ({
  show,
  onClose,
  onSubmit,
  isEdit = false,
  defaultTitle = "",
  defaultContent = "",
}: Props) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    if (show) {
      setTitle(defaultTitle);
      setContent(defaultContent);
    }
  }, [show, defaultTitle, defaultContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title, content);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "메모 수정" : "메모 작성"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? "수정 완료" : "저장"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MemoModal;