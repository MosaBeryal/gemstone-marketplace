import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../contextStore/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { addProduct } from "../../apis/Product";
import toast, { Toaster } from "react-hot-toast";

const Create = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const addProductMutation = useMutation(
    addProduct,
    {
      onSuccess: () => {
        setLoading(false);
        toast.success("Product Added Successfully");
        queryClient.invalidateQueries("products");
        // Clear form fields and previews after successful submission
        setDescription("");
        setLocation("");
        setName("");
        setPrice("");
        setImages([]);
        setPreviews([]);
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err.message || "Error adding product");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !location || images.length === 0) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("userId", user?.data.id);
    formData.append("contact", contact);
    formData.append("images",images[0])

    if (images.length > 0) {
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
    // }
}
    try {
      await addProductMutation.mutate(formData);
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error(err.message || "Add Product failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
    setImages(filesArray);
  };

  return (
    <Fragment>
      <Header />
      {loading && <div className="loading">Loading...</div>}
      <div className="centerDiv">
        <form encType="multipart/form-data">
          <label>Name</label>
          <br />
          <input
            className="input"
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Price</label>
          <br />
          <input
            className="input"
            type="number"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label>Contact</label>
          <br />
          <input
            className="input"
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br />
          <br />
          <label>Description</label>
          <br />
          <input
            className="input"
            type="text"
            name="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Location</label>
          <br />
          <input
            className="input"
            type="text"
            name="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <div className="image-preview">
            {previews.length > 0 ? (
              previews.map((preview, index) => (
                <img
                  key={index}
                  alt={`Preview ${index}`}
                  width="100"
                  height="100"
                  src={preview}
                />
              ))
            ) : (
              <p>No image previews</p>
            )}
          </div>
          <br />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            Upload and Submit
          </button>
        </form>
      </div>
      <Toaster />
    </Fragment>
  );
};

export default Create;
