import React, { useState, useContext } from "react";
import SearchBar from "./SearchBar.jsx";
import Results from "./Results";
import { Searchcontext, Datacontext,Alertcontext } from "../../context";
import { useSearch } from "../hooks";
import { fileSearch } from "../../helpers";

const Search = (props) => {
  let [ref, desc] = ["Enter Unit Code or Name", "name"]; //change this to what your data returns,ref is what will be searched for as user types, desc is what will bew displayed
  const [results, setResults] = useState([]);
  const {setSelected } = useContext(Searchcontext);
  const { setAlert,setShowAlert} = useContext(Alertcontext)
  const { updateRecent } = useContext(Datacontext);
  const [formSubmissionLoading,setFormSubmissionLoading]=useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  useSearch(searchTerm, props.source, setResults, "code", 3); //last argument specifies min characters typed for it to start searching

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle form submission for topic search in unit page
    // let ptn = /^\/unit/;
    if (searchTerm.length > 2){
      try{

        setFormSubmissionLoading(true)
        let filteredNotes = await fileSearch(
          searchTerm,
          ); 
          if (filteredNotes.length===0){
            setShowAlert(true)
            setAlert({message:"Content not found",type:"info"})
            setFormSubmissionLoading(false)
          }
          setResults(filteredNotes);
          setFormSubmissionLoading(false)
        }
        catch(err){
          setShowAlert(true)
          setAlert({message:err.message,type:"error"})
          setFormSubmissionLoading(false)
  }
    }

  };
  const handleClose = async (choice) => {
    let mutatedSelect;
    if (props.location === "/add/videos") {
      mutatedSelect = { ...choice, changeRoute: false };
    }
    else{
      updateRecent(choice);
      mutatedSelect = { ...choice, changeRoute: true };
    }
    setResults([]);
    setSelected(mutatedSelect);
    if(props.clear){
      setSearchTerm("");
    }
  };
  return (
    <>
      <SearchBar focus={props.focus} form={{ handleSearch,formSubmissionLoading, searchTerm, handleSubmit, placeholder:props.placeholder }} />
      {results.length > 0 && searchTerm.length > 0 ? (
        <Results props={{ handleClose, setResults, results, ref, desc }} />
      ) : null}
    </>
  );
};

export default Search;
