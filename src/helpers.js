import axios from 'axios'
export const Fetch = (url, method, payload = '') => {
  let data = []
  switch (method) {
    case 'GET':
      return axios.get(url)
    case 'POST':
      return axios.post(url, payload)

    default:
      console.log('no method set')
  }
  return data
}
//try catch block t ocatch invalid regexp characters that user tpyes
export const Search = (term, data, category) => {
  const defaultcategory = 'name'
  try {
    let res1 = data.filter(item =>
      item[category].toLowerCase().match(term.toLowerCase())
    )

    let res2 = data.filter(item =>
      item[defaultcategory].toLowerCase().match(term.toLowerCase())
    )

    return [...res1, ...res2]
  } catch {
    return []
  }
}
export const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const isEmpty = obj => {
  if (!obj) return true
  return Object.keys(obj).length === 0
}
export const Categories = [
  { label: 'notes', category: 'document' },
  { label: 'assignments', category: 'assignment' },
  { label: 'videos', category: 'video' }
]
export const getLocalData = type => {
  switch (type) {
    case 'units':
      let data = JSON.parse(localStorage.getItem('data'))
      if (data) {
        if (checkIfExpired(data)) return null
        else {
          if (data.units) return data.units
        }
      }
      break
    case 'recent':
      let recent = localStorage.getItem('recent')
      if (recent) {
        if (checkIfExpired(recent)) return null
      } else return JSON.parse(recent)
      break
    default:
      return null
  }
}
export const setLocalDataWithExpiry = (key, value, ttl) => {
  const now = new Date()
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    ...value,
    expiry: now.getTime() + ttl * 3600 * 1000
  }
  localStorage.setItem(key, JSON.stringify(item))
}
//compares current date with expiry date of data and returns true if the current date is greater and viceversa
const checkIfExpired = data => {
  if (!data.expiry) {
    return false
  }
  const now = new Date()
  if (now > data.expiry) {
    return true
  }
  return false
}
