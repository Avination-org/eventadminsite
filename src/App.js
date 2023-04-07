import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashbard from "./pages/Dashboard/Dashbard";
import AddEvent from "./pages/Event/AddEvent";
import EditEvent from "./pages/Event/EditEvent";
import Event from "./pages/Event/Event";
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/Login/ChangePassword";
import ForgetPassword from "./pages/Login/Forget";
import Login from "./pages/Login/Login";
import VerifyOTP from "./pages/Login/VerifyOtp";
import User from "./pages/User/User";
import AuthRoute from "./utility/Routes";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={AuthRoute(Home)} >
            <Route exact path="/" element={AuthRoute(Dashbard)}/>
            <Route exact path="/event" element={AuthRoute(Event)}/>
            <Route exact path="/addevent" element={AuthRoute(AddEvent)}/>
            <Route exact path="/edit/event/:id" element={AuthRoute(EditEvent)}/>
            <Route exact path="/users" element={AuthRoute(User)}/>
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forget" element={<ForgetPassword/>}/>
          <Route exact path="/otpverify" element={<VerifyOTP/>}/>
          <Route exact path="/changePassword" element={<ChangePassword/>}/>


        </Routes>
    </div>
  );
}

export default App;
