
import {Routes, Route} from "react-router-dom"
import Signin from "../pages/Signin"
import Homepage from "../pages/Homepage"
import Productlist from "../pages/ProductList"
import Productpage from "../pages/Productpage"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import PartnerProductlist from "../pages/PartnerProductList"
import ProtectedRoute from "../pages/ProtectedRoute"



function App() {
  //dotenv.config()
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Homepage/>}/>
        <Route path = "/signin" element={<Signin/>}/>
        <Route path = "/category/:_id" element={<Productlist/>}/>
        <Route path = "/store/:_id" element={<PartnerProductlist/>}/>
        <Route path = "/product/:_id" element= {<Productpage/>}/>
        <Route path = "/cart" element= {<ProtectedRoute component={Cart}/>}/>
        <Route path = "/checkout" element= {<ProtectedRoute component={Checkout}/>}/>
      </Routes>
    </div>
  );
}

export default App;
