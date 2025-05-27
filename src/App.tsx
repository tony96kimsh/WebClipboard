import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import FolderMenu from './components/FolderMenu';
import InsertMemo from './components/InsertMemo';
import MemoList from './components/MemoList';
import { Container  } from 'react-bootstrap';
import { sampleFolders, sampleMemos } from './data/Sample';
import type { Memo } from './data/Memo';
import type { Folder } from './data/Folder';
import Header from './layout/Header';
import LoginModal from './login/LoginModal';
import { supabase } from './lib/superbaseClient';


function App() {
  
  // superbase 연결확인
  useEffect(() => {
  const testConnection = async () => {
    const { data, error } = await supabase.from('folders').select().limit(1);
    
    if (error) {
      console.error("❌ Supabase 연결 실패:", error.message);
    } else {
      console.log("✅ Supabase 연결 성공!", data);
    }
  };

    testConnection();
  }, []);



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

  // 로그인 모달
  const [showLogin, setShowLogin] = useState<boolean>(false);
  
  // OAuth 로그인
  const [isLogin, setIsLogin] = useState(() => {
    return Cookies.get('isLogin') === 'true';
  });
  const [userInfo, setUserInfo] = useState<{
    email: string;
    name: string;
    picture?: string;
  } | null>(() => {
    const cookieData = Cookies.get('userInfo');
    return cookieData ? JSON.parse(cookieData) : null;
  });

  // 계정 정보 쿠기 동기화(리렌더 시)
  useEffect(() => {
    const savedLogin = Cookies.get('isLogin') === 'true';
    const savedUser = Cookies.get('userInfo');

    if (savedLogin && savedUser) {
      setIsLogin(true);
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  
  // 쿠키 업데이트
  useEffect(() => {
    Cookies.set('isLogin', String(isLogin), { expires: 7 });
  }, [isLogin]);

  useEffect(() => {
    if (userInfo) {
      Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 7 });
    } else {
      Cookies.remove('userInfo');
    }
  }, [userInfo]);
  
  console.log(userInfo);
  console.log(isLogin);
  

  // 값 변경될 때마다, 로컬스토리지 갱신
  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const addMemo = (title: string, content: string) => {
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

  const editMemo = (editedMemo: Memo) => {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === editedMemo.id ? editedMemo : memo
      )
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return (
    <>
      <Header setShowLogin={setShowLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <LoginModal 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setUserInfo={setUserInfo}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />
      <Container className="app-container mt-5">
        <FolderMenu
          selectedId={selectedFolderId}
          setSelectedId={setSelectedFolderId}
          folders={folders}
          setFolders={setFolders}
        />
        <InsertMemo addMemo={addMemo} />
        <MemoList
          folderId={selectedFolderId}
          memos={memos}
          editMemo={editMemo}
          deleteMemo={deleteMemo}
        />
      </Container>
    </>
  );
}

export default App;