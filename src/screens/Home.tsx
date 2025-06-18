import { ProductsCard } from "../components/ProductsCard";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getProducts, Product } from "@/services/productApi";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        // Falha ao buscar produtos. Mantém lista vazia.
      });
  }, []);
  return (

    <div className="flex flex-col p-0" style={{
      width: "-webkit-fill-available",
    }}>
      <Navbar onCartClick={() => setShowCart(!showCart)} />
      {/* Modal simples com os produtos do carrinho */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>
            <p>Aqui vão os produtos adicionados ao carrinho...</p>
            <button
              onClick={() => setShowCart(false)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.map((item) => (
          <div key={item.id} className="">
            <ProductsCard
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              // image={item.image}
              whatsappMessage={
                item.whatsappMessage ||
                `Olá, tenho interesse no produto ${item.name}.`
              }
            />


          </div>
        ))}
      </div>
    </div>
  );
}
