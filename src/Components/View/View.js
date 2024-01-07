// View.jsx

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { getProductById } from "../../apis/Product";
import Header from "../Header/Header";
import styles from "./View.module.css"; // Import module CSS
import { addToWishList } from "../../apis/WishList";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contextStore/AuthContext";

const View = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // Fetch product details using react-query
  const { data: postContent } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductById(id),
  });

  const addToWishlistMutation = useMutation(
    addToWishList,
    {
      onSuccess: () => {
        // Invalidate and refetch
        toast.success("Product Added Successfully");
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  )


  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    addToWishlistMutation.mutate({
      userId: user.data.id,
      productId: id
    })
  }
  // Generate product image URL
  const productImage =
    postContent?.data.Images?.[0]?.url ?
      `http://localhost:8800/api/files/${postContent?.data.Images?.[0]?.url}` : "";

  console.log(productImage);

  return (
    <>
      <Header />

      <div
        className={styles.mainContainer} // Use styles as an object
        style={{
          paddingTop: "100px",
        }}
      >
        <div className={styles.viewParentDiv}>
          <div className={styles.productImageContainer}>
            <img
              src={productImage}
              alt="productImage"
              className={styles.productImage}
            />
          </div>
          <div className={styles.productDetailsContainer}>
            <div className={styles.productDetails}>
              <h1 className={styles.productName}>
                {postContent?.data.name}
              </h1>
              <p className={styles.category}>
                {postContent?.data.category}
              </p>
              <p className={styles.price}>${postContent?.data.price}</p>
              <p className={styles.createdAt}>
                Posted on: {moment(postContent?.data.createdAt).fromNow()}
              </p>
              <button className={styles.addToCartButton}
              onClick={handleAddToWishlist}
              >Add to wishlist</button>
              <div className={styles.productDescription}>
                <h2 className={styles.descriptionHeader}>
                  Product Description
                </h2>
                <p className={styles.descriptionText}>
                  {postContent?.data.description}
                </p>
              </div>
              <div className={styles.productDescription}>
                <h2 className={styles.descriptionHeader}>
                  Seller Contact Information
                </h2>
                <p className={styles.descriptionText}>
                  Contact No  :  {postContent?.data.contact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default View;
