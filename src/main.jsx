import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import {BrowserRouter} from "react-router-dom";
import Routers from "./essentials/Routers.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </StrictMode>,
)
