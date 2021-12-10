import "../configs/firebase"
import {Routes, Route} from "react-router-dom"
import Signin from "../pages/Signin"
import theme from "../configs/materialUiTheme"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Signin/>}/>
      </Routes>
    </div>
  );
}

export default App;
