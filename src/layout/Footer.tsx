import { Container } from "react-bootstrap";

const Footer : React.FC = () =>{
    return(
        <footer className="text-white py-1 mt-5" style = {{backgroundColor : '#4169E1'}}>
            <Container className = "text-center">
                대표 : 김성훈<br/>
                이메일 : <a href = "mailto:tony96kimsh@naver.com" className="text-white">tony96kimsh@naver.com</a><br/>
                Copyright 김성훈 Corp. All rights Reserved.<br/>
            </Container>
        </footer>
    )
}

export default Footer;