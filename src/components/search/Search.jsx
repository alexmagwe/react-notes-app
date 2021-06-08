import React, { useState, useContext } from "react";
import SearchBar from "./SearchBar.jsx";
import Results from "./Results";
import { Searchcontext, SearchQuerycontext, Datacontext } from "../../context";
import { useSearch } from "../hooks";
import { fileSearch } from "../../helpers";

const Search = (props) => {
  let [ref, desc] = ["Enter Unit Code or Name", "name"]; //change this to what your data returns,ref is what will be searched for as user types, desc is what will bew displayed
  const [results, setResults] = useState([]);
  const {setSelected } = useContext(Searchcontext);
  const { setfilteredNotes } = useContext(SearchQuerycontext);
  const { updateRecent } = useContext(Datacontext);
  const [searchTerm, setSearchTerm] = useState("");

  useSearch(searchTerm, props.source, setResults, "code", 3); //last argument specifies min characters typed for it to start searching

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle form submission for topic search in unit page
    let ptn = /^\/unit/;
    if (ptn.test(props.location) & (searchTerm.length > 2)) {
      let filteredNotes = await fileSearch(
        searchTerm,
        props.data.notes.document//all pdfs for the unit
      ); //filters notes that match search term
      setfilteredNotes(filteredNotes);
    }
  };
  const handleClose = async (choice) => {
    console.log(props.location, choice);
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
      <SearchBar focus={props.focus} form={{ handleSearch, searchTerm, handleSubmit, placeholder:props.placeholder }} />
      {results.length > 0 && searchTerm.length > 0 ? (
        <Results props={{ handleClose, setResults, results, ref, desc }} />
      ) : null}
    </>
  );
};

export default Search;
