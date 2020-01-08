import React, { useState, useEffect } from "react";

const Pay = () => {
  const [tot, setTot] = useState(0);
  useEffect(() => {
    setTot(sessionStorage.getItem("total"));
  }, []);
  return (
    <section>
      <p>Total : {tot}€</p>
    </section>
  );
};

export default Pay;
