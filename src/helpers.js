import axios from 'axios'
import {searchUrl} from './components/api/urls'
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
export const fileSearch=async(query,notes)=>{
  const payload={query:query}
  let resp=await axios.post(searchUrl,payload)
  if (resp.data.message){
    const message=resp.data.message
    const {files}=message
    // files.filter(file=>{
      let ids=[]
      files.map(file=>ids.push(file.id))
      let filteredNotes=notes.filter(file=>(ids.includes(file.gid)))//filter the unit notes for the ones that match the topic
      return filteredNotes
    }
  } 
export const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes:', newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};
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
export const getGid=(link)=>{
  const ptn=/\/d\/[\w-]+/g
  const res=ptn.exec(link)
  if (res){
    let match=res[0].split('/')
    let id=match.pop()
    return id//google drive id of video
  }
  else return null

  // console.log('hey')
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
export const getLinks=({ext,gid,category})=>{
  if (category==='video'){
    return {
      icon:"https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.video",
      link:`https://drive.google.com/file/d/${gid}/view`,
      downloadLink:null
    }
  }
switch(ext){
  case 'pdf':
    return {icon:'https://drive-thirdparty.googleusercontent.com/16/type/application/pdf',
            link:`https://drive.google.com/file/d/${gid}/view`,
            downloadLink:`https://drive.google.com/uc?id=${gid}&export=download`
        }
  case 'docx':
    return {icon:'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      link:`https://docs.google.com/document/d/${gid}/edit`,
      downloadLink:`https://drive.google.com/uc?id=${gid}&export=download`
        } 
  case 'doc':
    return {icon:'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      link:`https://docs.google.com/document/d/${gid}/edit`,
      downloadLink:`https://drive.google.com/uc?id=${gid}&export=download`
        } 
  case 'pptx':  
    return {icon:'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.presentationml.presentation',
      link:`https://docs.google.com/presentation/d/${gid}/edit?dls=true`,
      downloadLink:`https://drive.google.com/uc?id=${gid}&export=download`
        }
  case 'ppt':  
    return {icon:'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.presentationml.presentation',
      link:`https://docs.google.com/presentation/d/${gid}/edit?dls=true`,
      downloadLink:`https://drive.google.com/uc?id=${gid}&export=download`
        }
  
    default:
    return {
      icon:null,
      link:null,
      downloadLink:null
    }
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
