import { Container } from "react-bootstrap";

const Footer : React.FC = () =>{
    return(
        <footer className="text-white py-1 mt-5" style = {{backgroundColor : '#4169E1'}}>
            <Container className = "text-light " >
              <br />
              <p className="m-0">
                <a href="https://github.com/tony96kimsh/WebClipboard" 
                  style={{color:'#ddd',}}
                  className="text-decoration-none"
                >
                  깃허브 링크 : https://github.com/tony96kimsh/WebClipboard
                </a>
              </p>
                <p style={{color:'#ddd',}} className="m-0">
                  이메일 : <a href = "mailto:tony96kimsh@naver.com" className="text-white text-decoration-none" style={{color:'#ddd'}}>tony96kimsh@naver.com</a>
                </p>
                <p style={{color:'#ddd',}}>
                  Copyright 김성훈 Corp. All rights Reserved.
                </p>
                <br />
            </Container>
        </footer>
    )
}

export default Footer;