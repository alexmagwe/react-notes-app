import React, { useEffect, useContext } from "react";
import Search from "../search/Search.jsx";
import { Loadingcontext, Datacontext } from "../../context";
import Recent from "../reusables/Recent";
const Landing = () => {
  const { setLoading } = useContext(Loadingcontext);
  const { data } = useContext(Datacontext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="landing">
      <div className="landing-content">
        {/* <img className="landing-logo" src={biblioteka} alt="Biblioteka" /> */}
        <div className="landing-info montserrat">
          <p className=" text-primary font-lg">
            Your Personal Campus Library
          </p>
          <span className='grey font-sm semi-bold '>Never have to worry about where to get notes ever again</span>
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
