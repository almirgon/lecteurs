import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Review from "./Pages/Review/Review";
import NotFound from "./Pages/NotFound/NotFound";

export default function RoutesManager(){
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Home/>}/>
        <Route exact path="/login/*" element={<Login/>}/>
        <Route exact path="/review/*" element={<Review/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}