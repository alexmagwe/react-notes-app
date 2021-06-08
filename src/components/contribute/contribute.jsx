import React, { useEffect, useContext } from "react";
import { Loadingcontext } from "../../context";
import Card from "./Card";

function Contribute() {
  const { setLoading } = useContext(Loadingcontext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return (
    <div className='cards-container'>
      {/* <h2 className='center md pd2 primary'>Improve the site by adding more content</h2> */}
      <Card
        values={{
          desc: "Add Content",
          link: "add/content",
          style: "card contribute-img",
        }}
      />
      <Card
        values={{
          desc: "Contact us ",
          link: "contact",
          style: "card contact-img",
        }}
      />
      
    </div>
  );
}

export default Contribute;
