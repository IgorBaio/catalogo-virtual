import { useCartStore } from "@/stores/CartStore";
import { CartStoreType } from "@/types/CartStoreType";
import "./CartModal.css";
import { finalizeOrder } from "@/functions/finalizeOrder";
import { normalizeCurrency } from "@/functions/normalizeCurrency";
export default function CartModal({ setShowCart }: any) {
  /**
   * TODO
   * - [ ] Adicionar a quantidade de produtos no carrinho
   * - [ ] Adicionar opçao de aumentar e dimnuir itens no carrinho
   * - [ ] Adicionar o valor total do carrinho
   * - [X] Adicionar a opção de finalizar compra
   * - [X] Adicionar a opção de continuar comprando
   * - [ ] Adicionar a opção de limpar o carrinho
   * - [X] Diminuir o tamanho do botao de remover item
   *
   */

  const {  
    addToCartItem, 
    cartItem, 
    removeFromCartItem,
    decreaseFromCart 
  } = useCartStore((state: CartStoreType) => state);


  return (
    <div className="ModalContainer">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <button
          onClick={() => setShowCart(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>
        {cartItem.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cartItem?.map((item, idx) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="CartNameProduct">{item.product.name}</span>
                  <p className="CartDescriptionProduct">
                    {item.product.description}
                  </p>
                  <p className="CartDescriptionProduct">Quantidade:</p>
                  <div className="QuantityContainer">
                    <button
                      onClick={() => {
                        decreaseFromCart(item.product.id);
                      }}
                      className="QuantityButton"
                    >
                      -
                    </button>
                    <span className="QuantityText">{item.quantity}</span>
                    <button
                      onClick={()=>{
                        addToCartItem({ 
                          product: item.product,
                          quantity: 1,
                          totalPrice: item.product.price
                        })
                      }}
                      className="QuantityButton"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-bold">{normalizeCurrency(item.totalPrice)}</span>
                </div>
                <button
                  onClick={() => {
                    console.log("idx", idx);
                    console.log("item.product.id", item.product.id);
                    if (removeFromCartItem) {
                      removeFromCartItem(item.product.id);
                    }
                  }}
                  className="RemoveItemButton"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
        {cartItem.length > 0 && (
          <a
            href={finalizeOrder({cartItems:cartItem})}
            className="block mt-2 text-white bg-green-700 text-center rounded py-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Finalizar Pedido
          </a>
        )}
      </div>
    </div>
  );
}
