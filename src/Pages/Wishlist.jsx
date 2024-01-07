import React, { useContext } from 'react';
import Header from '../Components/Header/Header';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getWishListedItems, removeFromWishList } from '../apis/WishList';
import { AuthContext } from '../contextStore/AuthContext';
import { RiDeleteBinLine } from 'react-icons/ri'; // Import the delete icon
import logo from '../olx-logo.png';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

const Wishlist = () => {
    //usequery
    const queryClient = useQueryClient()
    const { user } = useContext(AuthContext);
    const { data } = useQuery(['wishlist'], () => getWishListedItems(user.data.id));

    const removeItemMutation = useMutation(
        removeFromWishList,
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('wishlist');
                toast.success("Product Removed Successfully");
            },
            onError: (err) => {
                toast.error("Error");
            },
        }
    )

    const handleDelete = async (itemId) => {
        // Placeholder for delete functionality
        console.log(`Deleting item with ID: ${itemId}`);

        // You can call your delete API here and then refetch the wishlist data
        const data = {
            userId: user.data.id,
            productId: itemId
        }
        removeItemMutation.mutate(
            data
        )
    };



    return (
        <div>
            <Header />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '50px', // Adjusted padding for better spacing
                }}
            >
                <h1 style={{ marginBottom: '20px', fontSize: '28px' }}>Wishlist</h1>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '16px',
                        width: '80%',
                        maxWidth: '800px', // Adjusted max width for better responsiveness
                        margin: '0 auto',
                    }}
                >
                    {data?.data?.map((item) => {
                        const imageUrl = item?.Product?.Images[0]?.url;

                        return (
                            <div
                                key={item.id}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    overflow: 'hidden', // Prevent image overflow
                                }}
                            >
                                <img
                                    src={`http://localhost:8800/api/files/${imageUrl}`}
                                    alt={item?.Product.Images ? "Product Image" : "Placeholder Image"}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <div style={{ padding: '16px' }}>
                                    <h2 style={{ marginBottom: '10px' }}>{item?.Product.name}</h2>
                                    <button
                                        onClick={() => handleDelete(item.productId)}
                                        style={{
                                            padding: '5px',
                                            backgroundColor: '#ff6347',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    
                    }
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default Wishlist;
