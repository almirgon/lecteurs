import axiosInstance from "./AxiosInstance";

class AuthService {
  async login(credentials) {
    const response = await axiosInstance.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("id", JSON.stringify(response.data.id));
      localStorage.setItem("username", JSON.stringify(response.data.username));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response;
  }

  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }
}

export default new AuthService();
