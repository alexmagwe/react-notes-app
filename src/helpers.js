
import axios from 'axios'
export const Fetch=(url,method,payload='')=>{
    let data=[]
    switch(method){
        case 'GET':
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
      const defaultcategory='name'
    try{
        let res1=data.filter(item=>item[category].toLowerCase().match(term.toLowerCase()))
      
        let res2=data.filter(item=>item[defaultcategory].toLowerCase().match(term.toLowerCase()))
            
        return [...res1,...res2]
    

    }
    catch{
        return []
    }
       
  }
export const Capitalize=(str)=>{

    return str.charAt(0).toUpperCase() + str.slice(1); 

}
export const isEmpty=(obj)=>{
    if (!obj)return true;
    return Object.keys(obj).length === 0;
}