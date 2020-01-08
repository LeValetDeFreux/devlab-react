import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/products", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "get"
    })
      .then(res => res.json())
      .then(res => setProducts(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      {products.map(ele => {
        return (
          <article key={ele[0]}>
            <p>{ele[1]}</p>
            <p>Prix : {ele[2]}€</p>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
