import React, { useEffect, useContext } from "react";
import Search from "../search/Search.jsx";
import { Loadingcontext, Datacontext } from "../../context";
import Recent from "../reusables/Recent";
import laibu from "../../images/laibu.png";
const Landing = () => {
  const { setLoading } = useContext(Loadingcontext);
  const { data } = useContext(Datacontext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-info montserrat">
          <p className=" landing-logo">Laibu</p>
          <span className="landing-slogan  ">
           Your personal campus library
            {/* <img className="landing-logo-img" src={laibu} alt="Laibu" /> */}
          </span>
        </div>
        <div className="search-container">
          <Search
            source={data}
            placeholder={"Search Unit Code or Name"}
            clear={true}
          />
        </div>
        <Recent data={{ page: "landing" }} />
      </div>
      {/* {!isEmpty(notes) ? (<Notes showlink={true} notes={{ notes, setNotes }} />) : null} */}
    </div>
  );
};

export default Landing;
