import axios from 'axios'

function validateUrl(url) {
  try {
    // Minimal path validation
    if (url.includes('/../') || /\/%2e%2e\//i.test(url)) {
      throw new Error('Invalid path');
    }
    
    const parsedUrl = new URL(url);
    
    // Protocol check
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
    
    // Domain allowlist
    const allowedDomains = ['example.com']; // add your allowed domains here
    if (!allowedDomains.includes(parsedUrl.hostname)) {
      throw new Error('Invalid host');
    }
    
    return parsedUrl.href;
  } catch {
    throw new Error('Invalid URL');
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
