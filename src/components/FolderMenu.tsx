import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "./FolderMenu.css";

import type { Folder } from "../data/Folder";

interface Props {
  selectedId: string;
  setSelectedId: (id: string) => void;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
}

const FolderMenu = ({ selectedId, setSelectedId, folders, setFolders }: Props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: newFolderName,
      createdAt: new Date(),
    };
    setFolders([...folders, newFolder]);
    setSelectedId(newFolder.id);
    setNewFolderName('');
    setShowAddModal(false);
  };

  const handleDeleteFolder = () => {
    const updated = folders.filter(folder => folder.id !== selectedId);
    setFolders(updated);
    if (updated.length > 0) {
      setSelectedId(updated[0].id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="folder-scroll-row">
      <div className="folder-scroll-left w-100">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant={selectedId === folder.id ? "primary" : "outline-secondary"}
            onClick={() => setSelectedId(folder.id)}
            className="folder-btn"
          >
            {folder.name}
          </Button>
        ))}
        <Button variant="secondary" onClick={() => setShowAddModal(true)}>추가</Button>
        <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>삭제</Button>
      </div>
      {/* Add Folder Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>폴더 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="추가할 폴더명을 입력하세요"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>취소</Button>
          <Button variant="primary" onClick={handleAddFolder}>저장</Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirm Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>폴더 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          현재 선택된 폴더를 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>취소</Button>
          <Button variant="danger" onClick={handleDeleteFolder}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FolderMenu;