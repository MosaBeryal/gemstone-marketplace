import axios from "axios";

const addProduct = async (newProduct) => {
    try {
        console.log(newProduct);
        const response = await axios.post(
            "http://localhost:8800/api/product/add",
            newProduct,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            // Handle unexpected status codes
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (err) {
        console.error("Add Product failed:", err);
        throw new Error(err.response?.data?.message || "Add Product failed");
    }
};


const getProduct = async ({search}) => {
    try {
        const response = await axios.get(`http://localhost:8800/api/product/all${search?`search?=${search}`:""}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Get Product failed");
    }
}

const getProductById = async (id) => {
    try {
        console.log("sata",id)
        const response = await axios.get(`http://localhost:8800/api/product/single/${id}}`);
        if (response.status === 200) {
            console.log(response)
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Get Product failed");
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8800/api/product/delete/${id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Delete Product failed");
    }
}

const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8800/api/product/update/${id}`, data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Update Product failed");
    }
}

// get files
const getFiles = async (name) => {
    try {
        const response = await axios.get(`http://localhost:8800/api/files/${name}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        throw new Error(err.response?.data?.message || "Get Files failed");
    }

}
export { addProduct, getProduct, deleteProduct, updateProduct,getFiles , getProductById}