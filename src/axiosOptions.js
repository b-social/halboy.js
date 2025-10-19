import axios from 'axios'

// Add your allowed domains here
const allowedDomains = ['example.com']

const validateUrl = (url) => {
  try {
    const urlObj = new URL(url)
    
    // Verify protocol is http or https
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      throw new Error('Invalid protocol')
    }
    
    // Check if domain is allowed
    if (!allowedDomains.includes(urlObj.hostname)) {
      throw new Error('Domain not allowed')
    }
    
    return urlObj.href
  } catch (error) {
    throw new Error(`Invalid URL: ${error.message}`)
  }
}

const axiosGet = (url, params, config) =>
  axios.get(validateUrl(url), { ...config, params, validateStatus: () => true })
    .then((response) => ({
      status: response.status,
      body: response.data,
      location: response.config.url,
      response
    }))

const axiosPost = (url, body, config) =>
  axios.post(validateUrl(url), body, { ...config, validateStatus: () => true })
    .then((response) => ({
      status: response.status,
      body: response.data,
      location: response.config.url,
      response
    }))

const axiosPut = (url, body, config) =>
  axios.put(validateUrl(url), body, { ...config, validateStatus: () => true })
    .then((response) => ({
      status: response.status,
      body: response.data,
      location: response.config.url,
      response
    }))

const axiosPatch = (url, body, config) =>
  axios.patch(validateUrl(url), body, { ...config, validateStatus: () => true })
    .then((response) => ({
      status: response.status,
      body: response.data,
      location: response.config.url,
      response
    }))

const axiosDelete = (url, body, config) =>
  axios.delete(validateUrl(url),
    { ...config, data: body, validateStatus: () => true })
    .then((response) => ({
      status: response.status,
      body: response.data,
      location: response.config.url,
      response
    }))

module.exports = {
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  patch: axiosPatch,
  delete: axiosDelete
}
