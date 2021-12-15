
import {Routes, Route} from "react-router-dom"
import Signin from "../pages/Signin"
import Homepage from "../pages/Homepage"
import Productlist from "../pages/ProductList"
import Productpage from "../pages/Productpage"
import dotenv from "dotenv"


function App() {
  //dotenv.config()
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Homepage/>}/>
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/category/:_id" element={<Productlist/>}/>
        <Route path = "/product/:_id" element= {<Productpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
