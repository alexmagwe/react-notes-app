  const Search=(term,data,category)=>{
    if(term.length>0){
        let res=data.filter(item=>item[category].toLowerCase().match(term.toLowerCase()))
        return res
        }
    return ''
  }
  export default Search