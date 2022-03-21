import {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ReviewPage from "./Pages/RegisterReview/ReviewPage";
import ReviewMobile from "./components/ReviewMobile/ReviewMobile";
import EditReview from "./Pages/EditReview/EditReview";
import NotFound from "./Pages/NotFound/NotFound";
import {UserContext} from "./context/UserContext";


export default function RoutesManager() {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/login/*" element={<Login />} />
        <Route exact path="/review/*" element={<ReviewPage />} />
        <Route exact path="/edit/review/:id" element={<EditReview />} />
        <Route exact path="/review-mobile/:id" element={<ReviewMobile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
