import "../configs/firebase"
import {Routes, Route} from "react-router-dom"
import Signin from "../pages/Signin"
import Homepage from "../pages/Homepage"




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Homepage/>}/>
        <Route path = "/signin" element={<Signin/>}/>
      </Routes>
    </div>
  );
}

export default App;
