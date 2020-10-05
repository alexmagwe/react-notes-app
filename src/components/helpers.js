
import axios from 'axios'
export const Fetch=(url,method,payload='')=>{
    let data=[]
    switch(method){
        case 'GET':
            console.log('fetching data using usefetch metohd =get')
            return axios.get(url)
        case 'POST':
            return axios.post(url,payload)
            
        default:
            console.log('no method set')

           }
        return data
    }
  //try catch block t ocatch invalid regexp characters that user tpyes    
  export const Search=(term,data,category)=>{
    try{
        let res=data.filter(item=>item[category].toLowerCase().match(term.toLowerCase()))
        return res

    }
    catch{
        return []
    }
       
  }
export const Capitalize=(str)=>{

    return str.charAt(0).toUpperCase() + str.slice(1); 

}
export const isEmpty=(obj)=>{
    return Object.keys(obj).length === 0;
}