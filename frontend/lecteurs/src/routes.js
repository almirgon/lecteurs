import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";

export default function RoutesManager(){
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}