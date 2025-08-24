import { ProductsCard } from "../components/ProductsCard";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getProducts } from "@/functions/getProducts";
import CartModal from "@/components/CartModal";
import { ProductType } from "@/types/ProductType";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([] as ProductType[]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = async (name?: string) => {
    const data = await getProducts(name);
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div
      className="flex flex-col p-0"
      style={{
        width: "-webkit-fill-available",
      }}
    >
      <Navbar onCartClick={() => setShowCart(!showCart)} />

      {showCart ? (
        <CartModal setShowCart={setShowCart} />
      ) : (
        <div className="p-4">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => loadProducts(searchTerm)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Buscar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((item) => (
              <div key={item.id} className="">
                <ProductsCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  whatsappMessage={
                    item.whatsappMessage ||
                    `Olá, tenho interesse no produto ${item.name}.`
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
