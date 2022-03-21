import axiosInstance from "./AxiosInstance";
import authHeader from "../helpers/authHeader";

class ReviewService {
  createReview(review) {
    return axiosInstance.post("/review", review, {headers: authHeader()});
  }

  sendBookCover(cover) {
    let formData = new FormData();
    formData.append("image", cover[0].data_url);
    formData.append("file", cover[0].file.name);
    return axiosInstance.post("/review/cover", formData, {
      headers: authHeader(),
    });
  }

  searchReview(review) {
    return axiosInstance.get("/review?q=" + review, null);
  }

  filterReviews(note) {
    return axiosInstance.get("/review/filter/note?q=" + note, null);
  }

  getAllReviews() {
    return axiosInstance.get("/review/all");
  }

  getReviewById(id) {
    return axiosInstance.get("/review/" + id);
  }

  putReview(id, review) {
    return axiosInstance.put("/review/" + id, review, {
      headers: authHeader(),
    });
  }

  like(id) {
    return axiosInstance.post("/review/like/" + id, null, {
      headers: authHeader(),
    });
  }
}

export default new ReviewService();
