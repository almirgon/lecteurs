import axiosInstance from "./AxiosInstance";

class UserService {
  createUser(user) {
    return axiosInstance.post("/user", user);
  }

  getUser(id) {
    return axiosInstance.get(`/user/${id}`);
  }
}

export default new UserService();
