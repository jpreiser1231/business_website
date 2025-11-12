import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Cart, NavBar, Products} from './App.tsx'
import {HashRouter,Routes,Route} from "react-router";
import {Home} from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
        <Routes>
            <Route path = "/" element = {<NavBar />}>
                <Route index element = {<Home/>}/>
                <Route path = "products" element = {<Products/>}/>
                <Route path = "cart" element = {<Cart/>}/>
            </Route>
        </Routes>
    </HashRouter>
  </StrictMode>,
)
