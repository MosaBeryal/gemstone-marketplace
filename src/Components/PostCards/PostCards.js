import React, { useContext } from 'react';
import Heart from '../../assets/Heart';
import { useHistory } from 'react-router-dom';
import './postcards.css';
import { AuthContext } from '../../contextStore/AuthContext';
import moment from "moment"
import { getFiles } from '../../apis/Product';
import { FaHeart } from 'react-icons/fa';
import { addToWishList } from '../../apis/WishList';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';

function PostCards({ product }) {

  console.log(product)
  // User auth
  const { user } = useContext(AuthContext);
  console.log(user)

  // const { setPostContent } = useContext(PostContext);

  const history = useHistory();

  const path = user ? '/view' : '/login';


  //product Image
  const productImage = product && product.Images && product.Images.length > 0 ? `http://localhost:8800/api/files/${product.Images[0].url}` : '';


  console.log(productImage)
  //add to wishlist mutation
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

    if (!user) {
      history.push("/login")
      return
    }
    addToWishlistMutation.mutate({
      userId: user.data.id,
      productId: product.id
    })
  }
  return (
    <div
      className="card"
      onClick={() => {
        history.push(`${user ? `productDetails/${product?.id}` : "/login"}`)
      }}
    >
      <div className="favorite">
        <FaHeart
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer"
          }}
          onClick={handleAddToWishlist}
        />
      </div>
      <div className="image">
        <img
          src={productImage ? productImage : ""}
          alt={product?.Images ? "Product Image" : "Placeholder Image"}
        />
      </div>

      <div className="content">
        <p className="rate">Price: {product.price}</p>
        <p className="name"> {product.name}</p>
        <p className="category">{product.location}</p>
      </div>
      <div className="date">
        <span>{moment(product.createdAt).fromNow()}</span>
      </div>
    </div>
  );
}

export default PostCards;
