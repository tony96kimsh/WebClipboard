import { useState, useEffect } from 'react';
import './App.css';
import FolderMenu from './components/FolderMenu';
import InsertMemo from './components/InsertMemo';
import MemoList from './components/MemoList';
import { Container } from 'react-bootstrap';
import { sampleFolders, sampleMemos } from './data/Sample';
import type { Memo } from './data/Memo';
import type { Folder } from './data/Folder';

function App() {
  // 스토리지에 값 없을 경우 샘플 데이터 출력
  const [folders, setFolders] = useState<Folder[]>(() => {
    const stored = localStorage.getItem('folders');
    return stored ? JSON.parse(stored) : sampleFolders;
  });

  const [selectedFolderId, setSelectedFolderId] = useState(folders[0].id);

  const [memos, setMemos] = useState<Memo[]>(() => {
    const stored = localStorage.getItem('memos');
    return stored ? JSON.parse(stored) : sampleMemos;
  });

  // 값 변경될 때마다, 로컬스토리지 갱신
  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const handleAddMemo = (title: string, content: string) => {
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      folderId: selectedFolderId,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMemos([newMemo, ...memos]);
  };

  const handleEditMemo = (editedMemo: Memo) => {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === editedMemo.id ? editedMemo : memo
      )
    );
  };

  const handleDeleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return (
    <Container className="app-container mt-3">
      <FolderMenu
        selectedId={selectedFolderId}
        setSelectedId={setSelectedFolderId}
        folders={folders}
        setFolders={setFolders}
      />
      <InsertMemo onAddMemo={handleAddMemo} />
      <MemoList
        folderId={selectedFolderId}
        memos={memos}
        onEditMemo={handleEditMemo}
        onDeleteMemo={handleDeleteMemo}
      />
    </Container>
  );
}

export default App;