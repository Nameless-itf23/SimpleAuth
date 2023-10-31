import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx"
import "./index.css"
import "modern-css-reset"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
)
