import { useContext } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ReviewPage from "./Pages/Review/ReviewPage";
import ReviewMobile from "./components/ReviewMobile/ReviewMobile";
import NotFound from "./Pages/NotFound/NotFound";
import { UserContext } from "./context/UserContext";

const PrivateRoute = ({ component, path, redirect, exact }) => {

  const context = useContext(UserContext)
  const {authorized} = context;
  const redirectPath = redirect ?? '/login'

  return authorized ? (<Route path={path} component={component} exact={exact} />) : (<Navigate  to={redirectPath}/>);
}

export default function RoutesManager(){
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Home/>}/>
        <Route exact path="/login/*" element={<Login/>}/>
        <Route exact path="/review/*" element={<ReviewPage/>}/>
        <Route exact path="/review-mobile/:id" element={<ReviewMobile/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}