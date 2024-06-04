import axios from 'axios';

class HomeBaristaApi {
  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL;
  }

  async getAllBeans() {
    try {
      const response = await axios.get(`${this.baseUrl}/beans`);
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async getBean(beanId) {
    try {
      const response = await axios.get(`${this.baseUrl}/beans/${beanId}`)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async getAllMethods() {
    try {
      const response = await axios.get(`${this.baseUrl}/methods`)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async getBeanMethods(beanId) {
    try {
      const response = await axios.get(`${this.baseUrl}/methods/${beanId}`)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async getOtherMethods(beanId) {
    try {
      const response = await axios.get(`${this.baseUrl}/methods/${beanId}/other`)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async postBean(beanData) {
    try {
      const response = await axios.post(`${this.baseUrl}/beans`, beanData);
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async getRecipe(recipeId) {
    try {
      const response = await axios.get(`${this.baseUrl}/recipes/${recipeId}`)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async editRecipe(recipeId, recipe) {
    try {
      const response = await axios.put(`${this.baseUrl}/recipes/${recipeId}`, recipe)
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async postRecipe(recipeData) {
    try {
      const response = await axios.post(`${this.baseUrl}/recipes`, recipeData);
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async deleteBean(beanId) {
    try {
      await axios.delete(`${this.baseUrl}/beans/${beanId}`);
      return {data: '204-Success', error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }

  async deleteRecipe(recipeId) {
    try {
      await axios.delete(`${this.baseUrl}/recipes/${recipeId}`);
      return {data: '204-Success', error: null}
    } catch (error) {
      return {data: null, error: error}
    }
  }
}

export default HomeBaristaApi