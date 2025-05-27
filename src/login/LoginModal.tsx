import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  showLogin: boolean;
  setShowLogin: (e: boolean) => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<{
    email: string;
    name: string;
    picture?: string;
  } | null>>;
}

const LoginModal = ({ setIsLogin, setUserInfo, showLogin, setShowLogin }: Props) => {
  return (   
    <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
      <Modal.Header closeButton />
      <Modal.Body className="text-center p-5">
        <h4 className="mb-4">로그인</h4>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential;
            const decoded: any = jwtDecode(token!);
            
            setUserInfo({
              email: decoded.email,
              name: decoded.name,
              picture: decoded.picture
            });
            setIsLogin(true);
            setShowLogin(false); // 로그인 성공 시 모달 닫기
            console.log(decoded);
          }}
          onError={() => {
            setUserInfo(null);
            setIsLogin(false);
            alert('❌ 로그인 실패');
          }}
        />

        <div className="my-3 border-top"></div>

        <Button variant="outline-secondary" 
          onClick={()=> {setShowLogin(false)}}
          className='mt-2 w-100'>
          로그인 없이 사용하기
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;