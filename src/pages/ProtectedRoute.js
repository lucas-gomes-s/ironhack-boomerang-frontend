import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import {AuthContext} from "../contexts/authContext";

function ProtectedRoute({ component: Component }) {
    const authContext = useContext(AuthContext)

  if (authContext.user) {
    return <Component />;
  } else {
    return <Navigate to="/signin" />;
  }
}

export default ProtectedRoute;