import axios from 'axios';

class HomeBaristaApi {
  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL;
  }

  async getAllBeans() {
    try {
      const response = await axios.get(`${this.baseUrl}/beans`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getAllMethods() {
    try {
      const response = await axios.get(`${this.baseUrl}/methods`)
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async postBean(beanData) {
    try {
      const response = await axios.post(`${this.baseUrl}/beans`, beanData);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getBean(beanId) {
    try {
      const response = await axios.get(`${this.baseUrl}/beans/${beanId}`)
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getBeanMethods(beanId) {
    try {
      const response = await axios.get(`${this.baseUrl}/methods/${beanId}`)
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getRecipe(recipeId) {
    try {
      const response = await axios.get(`${this.baseUrl}/recipes/${recipeId}`)
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async editRecipe(recipeId, recipe) {
    try {
      const response = await axios.put(`${this.baseUrl}/recipes/${recipeId}`, recipe)
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default HomeBaristaApi