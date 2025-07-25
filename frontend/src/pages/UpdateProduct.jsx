import React, { useState } from 'react';
import { useNavigate ,useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const pid = searchParams.get('pid');
    const pname = searchParams.get('pname');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const productData = {
               productName : productName || "",
                productDescription : description || "",
                price : price || "",
            };
            setLoading(true);
            await axios.put("http://localhost:3000/api/v1/product/update-product/"+pid, productData ,{headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
            alert("Product Updated successfully!");
            navigate("/dashboard");
        }catch (err) {
            console.error("Error:", err);
            alert("Failed to update product. Please try again.");
        }
    };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_black] w-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4">Update {pname} </h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
          
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400 h-24"
          
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
          
        />
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-300 px-4 py-2 border-2 border-black cursor-pointer shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 px-4 py-2 border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct