import { Nav, Container, Navbar } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import Cookies from "js-cookie";

interface Props {
  setShowLogin: (value: boolean) => void;
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  setUserInfo: (value: null) => void;
  userInfo: {
    email: string;
    name: string;
    picture?: string;
  } | null;
}

const Header = ({ setShowLogin, isLogin, setIsLogin, setUserInfo, userInfo }: Props) => {
  const handleClick = () => {
    if (isLogin) {
      const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
      if (!confirmed) return;

      // 로그아웃 처리
      setIsLogin(false);
      setUserInfo(null);
      Cookies.remove('isLogin');
      Cookies.remove('userInfo');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <Navbar className="border-bottom" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <Navbar.Brand>
          <h1>🖇️ Web Clipboard</h1>
        </Navbar.Brand>
        <Nav.Link className="d-flex align-items-center" onClick={handleClick}>
          {isLogin ? (
            <>
              <span className="me-2">👋 {userInfo?.name} 님</span>
              <span className="text-danger">로그아웃</span>
            </>
          ) : (
            <>
              <PersonFill size={25} className="me-2" />
              로그인
            </>
          )}
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default Header;