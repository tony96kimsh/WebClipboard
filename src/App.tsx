import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import FolderMenu from './components/FolderMenu';
import InsertMemo from './components/InsertMemo';
import MemoList from './components/MemoList';
import { Container } from 'react-bootstrap';
import { sampleFolders, sampleMemos } from './data/Sample';
import type { Memo } from './data/Memo';
import type { Folder } from './data/Folder';
import Header from './layout/Header';
import LoginModal from './login/LoginModal';
import { supabase } from './lib/superbaseClient';

function App() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState(() => Cookies.get('isLogin') === 'true');
  const [userInfo, setUserInfo] = useState<{ email: string; name: string; picture?: string } | null>(() => {
    const cookieData = Cookies.get('userInfo');
    return cookieData ? JSON.parse(cookieData) : null;
  });

  useEffect(() => {
    const savedLogin = Cookies.get('isLogin') === 'true';
    const savedUser = Cookies.get('userInfo');
    if (savedLogin && savedUser) {
      setIsLogin(true);
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = userInfo?.email;

      if (isLogin && userEmail) {
        const { data: foldersData } = await supabase
          .from('folders')
          .select('*')
          .eq('user_email', userEmail);

        const { data: memosData } = await supabase
          .from('memos')
          .select('*')
          .eq('user_email', userEmail);

        if (!foldersData || foldersData.length === 0) {
          const foldersWithUser = sampleFolders.map((f) => ({
            id: f.id,
            name: f.name,
            created_at: f.createdAt,
            user_email: userEmail,
          }));
          await supabase.from('folders').upsert(foldersWithUser);
          setFolders(sampleFolders);
          setSelectedFolderId(sampleFolders[0].id);
        } else {
          setFolders(foldersData.map(f => ({ ...f, createdAt: new Date(f.created_at) })));
          setSelectedFolderId(foldersData[0].id);
        }

        if (!memosData || memosData.length === 0) {
          const memosWithUser = sampleMemos.map((m) => ({
            id: m.id,
            folderId: m.folderId,
            title: m.title,
            content: m.content,
            created_at: m.createdAt,
            updated_at: m.updatedAt,
            user_email: userEmail,
          }));
          await supabase.from('memos').upsert(memosWithUser);
          setMemos(sampleMemos);
        } else {
          setMemos(memosData.map(m => ({
            ...m,
            createdAt: new Date(m.created_at),
            updatedAt: new Date(m.updated_at),
          })));
        }
      } else {
        const storedFolders = localStorage.getItem('folders');
        const storedMemos = localStorage.getItem('memos');

        const loadedFolders = storedFolders ? JSON.parse(storedFolders) : sampleFolders;
        const loadedMemos = storedMemos ? JSON.parse(storedMemos) : sampleMemos;

        setFolders(loadedFolders);
        setMemos(loadedMemos);
        setSelectedFolderId(loadedFolders[0]?.id || '');
      }
    };

    fetchData();
  }, [isLogin, userInfo]);

  useEffect(() => {
    if (folders.length === 0) return;
    const userEmail = userInfo?.email;
    if (isLogin && userEmail) {
      folders.forEach(async (folder) => {
        const { error } = await supabase.from('folders').upsert({
          id: folder.id,
          name: folder.name,
          created_at: folder.createdAt,
          user_email: userEmail,
        });
        if (error) {
          console.error("❌ FOLDER 저장 실패:", folder, error.message);
        }
      });
    } else {
      localStorage.setItem('folders', JSON.stringify(folders));
    }
  }, [folders]);

  useEffect(() => {
    if (memos.length === 0) return;
    const userEmail = userInfo?.email;
    if (isLogin && userEmail) {
      memos.forEach(async (memo) => {
        const { error } = await supabase.from('memos').upsert({
          id: memo.id,
          folderId: memo.folderId,
          title: memo.title,
          content: memo.content,
          created_at: memo.createdAt,
          updated_at: memo.updatedAt,
          user_email: userEmail,
        });
        if (error) {
          console.error("❌ MEMO 저장 실패:", memo, error.message);
        }
      });
    } else {
      localStorage.setItem('memos', JSON.stringify(memos));
    }
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
      prev.map((memo) => (memo.id === editedMemo.id ? editedMemo : memo))
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return (
    <>
      <Header
        setShowLogin={setShowLogin}
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