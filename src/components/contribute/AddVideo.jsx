import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Searchcontext, Loadingcontext, Datacontext } from "../../context";
import Search from "../search/Search";
import { addContentUrl } from "../api/urls";
import axios from "axios";
import { isEmpty, getGid } from "../../helpers";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function AddVideos(props) {
  let [link, setLink] = useState("");
  const { setLoading } = useContext(Loadingcontext)
  let [videos, setVideos] = useState([]);
  const [disable, setDisable] = useState(false)
  const { setSelected } = useContext(Searchcontext);
  const { selected } = useContext(Searchcontext);
  const [unit, setUnit] = useState("");
  const { data } = useContext(Datacontext);

  let [name, setName] = useState("");
  const handleChange = (e) => {
    switch (e.target.name) {
      case "link":
        setLink(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleDelete = (e, i) => {
    let copy = [...videos];
    copy.splice(i, 1);
    setVideos(copy);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let id = getGid(link)
    if (id) {
      let data = { name, gid: id, category: "video" };
      setVideos([...videos, data]);
    }
    else {

      alert("invalid link,the link needs to be a google drive file link")
    }
  };
  useEffect(() => {
  }, [videos]);
  useEffect(() => {
    return () => {
      setSelected({});
    };
  }, [setSelected]);

  useEffect(() => {
    if (!isEmpty(selected)) {
      setUnit(selected);
    }
  }, [selected]);
  const handleUpload = async () => {
    if (isEmpty(selected)) {
      alert("Unit missing")
      return;
    }

    if (videos.length > 0) {
      const payload = { unit_code: selected.code, files: videos }
      console.log('uploading:', payload)
      setDisable(true)
      setLoading(true)
      const resp = await axios.post(addContentUrl, payload)
      if (resp.status === 201) {
        setVideos([])
        setSelected({})
        setLoading(false)
        setLink("")
        setName("")
        setDisable(false)

        alert("uploaded succesfully")
      }
    }

  }
  return (
    <div className="video-form-container flex-row sp-evenly container text-dark">
      <div className="w-30 video-first-container rel">
        <div className="top-content-section flex-row text-primary">
          {unit.code ? (
            <h3 className="text-center grey faded ">{unit.code}</h3>
          ) : null}
          {unit.name ? <h3 className="text-center mg-1">{unit.name}</h3> : null}
          <Search
            source={data}
            focus={true}
            clear={false}
            placeholder={"Enter Unit code or Name"}
            selected
            location={props.location.pathname}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="font-16"
            type="text"
            value={name}
            required
            name="name"
            placeholder="Lecture Video Name"
            onChange={handleChange}
          />
          <input
            className="font-16"
            type="url"
            required
            value={link}
            name="link"
            placeholder="Link"
            onChange={handleChange}
          />
          <Button type="submit" color="primary" variant="contained">
            Add
          </Button>
        </form>
      </div>
      {videos.length > 0 ? (
        <ul className="video-upload-list pd-1 w-40">
          <li className="flex-row pd-1 w-60 sp-between">
            <h3 className="">Name</h3>
            <h3 className="">File Id</h3>
          </li>
          {videos.map((video, i) => (
            <li className="flex-row sp-between font-sm mg-1" key={i}>
              <h3 className="video-name">{video.name}</h3>
              <h3 className="video-link">{video.gid}</h3>
              <span>
                <IconButton
                  key={i}
                  onClick={(e) => handleDelete(e, i)}
                  aria-label="delete"
                  className="margins"
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {videos.length > 0 ? (
        <div >
          <Button
            variant='contained'
            disabled={disable}
            aria-label='upload button'
            color='primary'
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      ) : null
      }

    </div>
  );
}

export default AddVideos;
