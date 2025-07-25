import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post("http://localhost:3000/api/v1/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" ,Authorization: "Bearer " + localStorage.getItem("token")},
      });

      const imageName = uploadRes.data.imageName;
      // Step 2: Upload the file
      const formData2 = new FormData();
      formData2.append("file", productFile);

      const uploadRes2 = await axios.post("http://localhost:3000/api/v1/file/upload", formData2, {
        headers: { "Content-Type": "multipart/form-data" , Authorization: "Bearer " + localStorage.getItem("token")},
      });

      const fileName = uploadRes2.data.fileName;

      // Step 3: Create the product using the uploaded image path
      const productData = {
        productName,
        productDescription : description,
        productThumbnail: imageName,
        productFile: fileName,
        price
      };

      await axios.put("http://localhost:3000/api/v1/product/new-product", productData ,{headers : {
        Authorization: "Bearer " + localStorage.getItem("token")
    }});

      alert("Product created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_black] w-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400 h-24"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
          required
        />
        <p>Product Thumbnail</p>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full mb-4 p-2 border-2 file:border-2 file:bg-amber-50 file:rounded file:p-1 cursor-pointer file:cursor-pointer border-black shadow-[4px_4px_0px_0px_black]"
          accept="image/*"
          required
          />
          <p>Product File</p>
        <input
          type="file"
          onChange={(e) => setProductFile(e.target.files[0])}
          className="w-full mb-4 p-2 border-2 file:border-2 file:bg-amber-50 file:rounded file:p-1 cursor-pointer file:cursor-pointer border-black shadow-[4px_4px_0px_0px_black]"
          accept="file/*"
          required
        />
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-300 px-4 py-2 border-2 border-black cursor-pointer shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 px-4 py-2 border-2 border-black cursor-pointer shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
