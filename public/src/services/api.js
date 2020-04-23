import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async signup(newUser) {
    const response = await API.post('/auth/signup', {
      ...newUser
    })
    return response.data
  },
  async login(user) {
    const response = await API.post('/auth/login', {
      ...user
    })
    return response.data
  },

  // Función para crear nota
  async addNoteToUser(newNote) {
    try {
      const response = await API.post('/me/notes', newNote, {
        headers: {
          token: localStorage.token
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

// función para filtar por category
/* async getCategory(category) {
  let url = '/notes?'
  if (category) {
    url += `category=${category}&`
  }
  const response = await API.get(url)
  return response.data
} */