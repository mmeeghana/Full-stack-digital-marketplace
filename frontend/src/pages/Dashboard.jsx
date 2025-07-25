import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Dashboard = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const products = async () => {
          try {
              const productsRes = await axios.get("http://localhost:3000/api/v1/product/bulk",{headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
              if (productsRes.status === 200) setProducts(productsRes.data.userProducts);
          } catch (error) {
              console.error('Error fetching user Products:', error);
          }
    };
    products();
}, []);
  

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="border-2 m-4 p-6 shadow-[4px_4px_0px_0px_black]">
        <div className="flex justify-end">
          <button
            onClick={() => {
              Navigate("/create-product");
            }}
            className="bg-green-300 border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] px-4 py-2 mb-6 transition-transform transform hover:scale-110"
          >
            Create New Product
          </button>
        </div>
        <div className='text-2xl font-bold mb-4'>
          My Products
        </div>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border-4 shadow-[4px_4px_0px_0px_black] border-black w-60 p-4"
            >
              <div className="border-2  border-black mb-2">
                <img
                  src={"/uploadedImages/" + product.productThumbnail}
                  alt="Image"
                  className="w-full h-50"
                />
              </div>
              <p className="font-bold">{product.productName}</p>
              <p>₹{product.price}</p>
              <p>{product.productDescription}</p>
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    Navigate("/update-product?pid="+product._id+"&pname="+product.productName);
                  }}
                  className="bg-green-300 border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] px-4 py-1 mt-2 transition-transform transform hover:scale-110">
                  Update
                </button>
                <button onClick={async()=>{
                  const response = await axios.delete("http://localhost:3000/api/v1/product/delete-product/"+product._id, {headers : { 
                      Authorization: "Bearer " + localStorage.getItem("token")
                    }});
                    if(response.status === 200){
                      alert("Product Deleted successfully!");
                      window.location.reload();
                    }else{
                      alert("Failed to delete product. Please try again.");
                    }
                  }} className="bg-red-300 border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] px-4 py-1 mt-2 transition-transform transform hover:scale-110">
                  Delete
                </button>
                <div>
                  {!product.published ? (
                    <button onClick={async()=>{
                      try {
                        const body = {};
                        const response2 = await axios.post("http://localhost:3000/api/v1/marketplace/publish-product/"+product._id,body, {headers : { 
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }});
                        if(response2.status === 200){
                          alert("Product Published successfully!");
                          Navigate("/marketplace");
                        }
                      }catch (error) {
                        console.log('Error publishing product:', error);
                      }
                }} className="bg-blue-300 w-full border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] px-4 py-1 mt-2 transition-transform transform hover:scale-110">
                  Publish
                </button>
                ) : (
                  <button className="bg-orange-300 w-full border-2 cursor-not-allowed border-black shadow-[4px_4px_0px_0px_black] px-4 py-1 mt-2 transition-transform transform hover:scale-110">
                    Published
                  </button>
                )}
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard