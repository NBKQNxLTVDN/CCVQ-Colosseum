import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";
import "./fonts/Roboto/Roboto-Regular.ttf";
import "./fonts/Sigmar_One/SigmarOne-Regular.ttf";
import "./fonts/Teko/Teko-Regular.ttf";




const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);