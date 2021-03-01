import axios from 'axios'
export const recent = 'recentsearch'
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
//try catch block to catch invalid regexp characters that user types
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
      let data = JSON.parse(localStorage.getItem('units'))
      if (data) {
        if (checkIfExpired(data)) return null
        else {
          if (data.units) return data.units
        }
      }
      break
    case recent:
      let recentitems = JSON.parse(localStorage.getItem(recent))
      if (recentitems) {
        if (checkIfExpired(recent)) return null

        else return recentitems
      }
      break
    default:
      let other = JSON.parse(localStorage.getItem(type))
      return other
  }
}
//get no of items in a js object
export const getObjLength = (obj) => {
  return Object.keys(obj).length

}
export const geticonLink=(ext)=>{
switch(ext){
  case 'pdf':
    return 'https://drive-thirdparty.googleusercontent.com/16/type/application/pdf'
  case 'docx':
    return 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document'
   case 'doc':
    return 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  case 'ppt':
    return 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.presentationml.presentation'
  default:
    return null
  }
}

//LRU algorithm to remove least recently searched item
export const removeLru = (data) => {
  //:params an obj data type
  for (let unit in data) {
    delete data[unit]
    break// to only delete oldest item
  }
}
export const setLocalData = (key, value, ttl) => {
  const now = new Date()
  let item;
  switch (key) {
    case "units":
      // `item` is an object which contains the original value
      // as well as the time when it's supposed to expire
      item = {
        ...value,
        expiry: ttl ? now.getTime() + ttl * 3600 * 1000 : null
      }
      break
    case recent:
      item = {
        ...value
      }
      break
    default:
      return null
  }
  localStorage.setItem(key, JSON.stringify(item))
  return item
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
