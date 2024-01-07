import axios from "axios";

//add to wishlist
const addToWishList = async ({
    userId,
    productId
}) => {
    try {
        
        const response = await axios.post(`http://localhost:8800/api/wishlist/add`, {
            userId,
            productId
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Add to wishlist failed");
    }
}
//get wishlisted
const getWishListedItems = async (userId) => {
    try {
        console.log(userId)
        const response = await axios.get(`http://localhost:8800/api/wishlist/all/${userId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Get wishlist failed");
    }
}

//remove from wishlist
const removeFromWishList = async (data) => {
    try {
        console.log(data)
        const response = await axios.delete(`http://localhost:8800/api/wishlist/delete`, {
            headers: {
                "Content-Type": "application/json",
            },
            data , // Pass the data directly
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Delete from wishlist failed");
    }
};
//export
export { addToWishList, getWishListedItems,
    removeFromWishList
}