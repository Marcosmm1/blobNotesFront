import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  async getAllNotes(category, date) {
    var url = '/me/notes'
    if (category && date) {
      url += `?category=${category}&date=${date}`
    }
    const response = await API.get(url, {
      headers: {
        token: localStorage.token // eslint-disable-line
      }
    })
    return response.data
  },
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
  async addNoteToUser(newNote) {
    try {
      const response = await API.post('/me/notes', newNote, {
        headers: {
          token: localStorage.token // eslint-disable-line
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  async editNote(note, noteId) {
    const response = await API.put(`/me/notes/${noteId}`, note, {
      headers: {
        token: localStorage.token // eslint-disable-line
      }
    })
    return response.data
  },
  async deleteNote(note) {
    try {
      const response = await API.delete(`/me/notes/${note}`, {
        headers: {
          token: localStorage.token // eslint-disable-line
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
}