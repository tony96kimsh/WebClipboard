import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="151386553094-hd4is4knm09m66o057sjc9bvitouc4bd.apps.googleusercontent.com">
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
