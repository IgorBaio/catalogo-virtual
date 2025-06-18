import { ProductsCard } from "../components/ProductsCard";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  getProducts,
  createProduct,
  Product,
} from "@/services/productApi";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    description: "",
    image: "",
    whatsappMessage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createProduct(form);
      setProducts((prev) => [...prev, created]);
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        whatsappMessage: "",
      });
    } catch {
      // falha silenciosa
    }
  };

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
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
        <input
          className="border p-2"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          name="price"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2"
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          name="image"
          placeholder="Imagem (URL)"
          value={form.image}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="whatsappMessage"
          placeholder="Mensagem do WhatsApp"
          value={form.whatsappMessage}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 px-4"
        >
          Criar Produto
        </button>
      </form>
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
