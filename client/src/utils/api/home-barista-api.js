import axios from 'axios';

class HomeBaristaApi {
  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";
  }

  async getAllBeans() {
    try {
      const response = await axios.get(`${this.baseUrl}/beans`);
      return response.data;
    } catch (error) {
      return error
    }
  }

  async getAllMethods() {
    try {
      const response = await axios.get(`${this.baseUrl}/methods`)
      return response.data;
    } catch (error) {
      return error
    }
  }
}

export default HomeBaristaApi