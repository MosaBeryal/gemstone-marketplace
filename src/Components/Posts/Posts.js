import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import { useQuery } from "react-query";
import { getProduct } from "../../apis/Product";
import PostCards from "../PostCards/PostCards";
import DataContext from "../../contextStore/DataContext";

function Posts() {
  const { productsData, setProductsData } = useContext(DataContext)
  console.log(productsData)

  // console.log(data)

  //use query
  const { data } = useQuery('products', getProduct)
  console.log(data)



  // console.log(productData)

  useEffect(() => {
    if (data) {
      setProductsData(data)
    }
  }, [data,
    setProductsData])


  return (
    <div className="postParentDiv">
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#002f34",
          margin: "20px 0px 20px 0px",
          marginLeft: "20px"
        }}
      >
        Explore All Products
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "10px"
        }}
      >
        {
          productsData?.data && productsData.data.map(item => (
            <PostCards product={item} key={item.id} />
          ))
        }

      </div>
    </div>
  );
}

export default Posts;
