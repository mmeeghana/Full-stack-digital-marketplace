import {React,useState ,useEffect} from 'react'
import axios from 'axios';
function ProductCard({ productName, productDescription, price, productThumbnail }) {
    return (
      <div className="border-2 border-black shadow-[4px_4px_0px_0px_black] p-4 w-72">
        <div className="border-2 border-black shadow-[4px_4px_0px_0px_black] mb-3 h-40 flex items-center justify-center bg-white">
          <img src={`http://localhost:3000/public/imageUploads/${productThumbnail}`} alt={productName} className="max-h-full max-w-full object-contain" />
        </div>
        <h3 className="font-semibold text-lg mb-1">{productName}</h3>
        <p className="text-md mb-1">${price}</p>
        <p className="text-sm text-gray-600 mb-3">{productDescription}</p>
        <button onclick = {()=>{

        }} className="bg-blue-300 px-4 py-2 border-2 cursor-pointer border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110">
          Buy Now
        </button>
      </div>
    );
}

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const products = async () => {
            try {
                const productsRes = await axios.get("http://localhost:3000/api/v1/marketplace/bulk",{headers : {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }});
                if (productsRes.status === 200) setProducts(productsRes.data.data);
            } catch (error) {
                console.error('Error fetching user Products:', error);
            }
        };
        products();
    }, []);
    return (
        <div className="min-h-screen p-6">
          <h1 className="text-2xl font-semibold mb-6">Marketplace</h1>
          <div className="flex flex-wrap gap-6">
            {products.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        </div>
      );
}

export default Marketplace