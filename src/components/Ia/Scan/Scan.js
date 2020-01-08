import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const Scan = () => {
  const [total, setTotal] = useState(0);
  const [prod, setProd] = useState([]);

  const dataURItoBlob = data => {
    let byteString;
    if (data.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(data.split(",")[1]);
    } else {
      byteString = unescape(data.split(",")[1]);
    }

    let mimeString = data
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  const fetchData = form => {
    fetch("http://localhost:5000/prediction", {
      method: "post",
      body: form
    })
      .then(res => res.json())
      .then(res => {
        let list = [];
        prod.forEach(ele => {
          list.push(ele);
        });
        list.push(res[0]);
        setProd(list);
      });
  };

  const takePhoto = data => {
    const blob = dataURItoBlob(data);
    const formData = new FormData();
    formData.append("file", blob);
    fetchData(formData);
  };

  useEffect(() => {
    let tot = 0;
    prod.forEach(ele => {
      tot += Number(ele[2]);
    });
    setTotal(tot);
    sessionStorage.setItem("total", tot);
  }, [prod]);

  return (
    <section>
      <Camera
        onTakePhoto={dataUri => {
          takePhoto(dataUri);
        }}
        isImageMirror={false}
      />
      <p>{total.toFixed(2)}</p>
      <section>
        {prod.map((ele, i) => {
          return (
            <article key={i}>
              <p>{ele[1]}</p>
              <p>Prix : {ele[2]}€</p>
            </article>
          );
        })}
      </section>
      <Link to="/pay">Payer</Link>
    </section>
  );
};

export default Scan;
