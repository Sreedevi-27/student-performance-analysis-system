import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import 'react-toastify/dist/ReactToastify.css';

import Main from "./Main/Main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
