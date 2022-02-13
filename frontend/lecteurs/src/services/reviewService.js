import axiosInstance from './axiosInstance';

class ReviewService{

  getAllReviews(){
    return axiosInstance.get('/review')
  }

  searchReview(name){
    return axiosInstance.get('/review/' + name)
  }

}

export default new ReviewService();