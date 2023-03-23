import axios from 'axios'

const baseUrl = '/api/blogs'

// handle token
let token = null
const setToken = (newObject) => {
  token = `Bearer ${newObject}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newBlog, config).then(res => res.data)
}

const update = (id, newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${id}`, newBlog, config).then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }
