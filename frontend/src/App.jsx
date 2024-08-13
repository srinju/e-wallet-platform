import {BrowserRouter , Navigate, Route , Routes} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { TransactionSucess } from "./pages/TransactionSuccess";

const isAuthenticated = () => { //so basically with the isAuthenticated we will give the user access to authenticated routes
  return !!localStorage.getItem('token'); //!! converts the result to a boolean value , if the token is there then the !! will return true and if the token is not there then !! will return false 
}

//private route component to protect routes>>
const PrivateRoute = ({children}) => { // if authenticated then go to the route which is being protected and else navigate to /signin and replace The replace prop ensures that the current entry in the history stack is replaced with the new one (in this case, /signin), which means the user cannot go back to the previous page using the back button.
  return isAuthenticated() ? children : <Navigate to={"/signin"} replace />;
}

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/send" element={
            <PrivateRoute>
              <SendMoney />
            </PrivateRoute>
          } />

          <Route path="/TransactionSuccess" element={
            <PrivateRoute>
              <TransactionSucess />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to={"/signin"} replace />} />

        </Routes>
        
      </BrowserRouter>
    </div>
  )
}  

export default App;
