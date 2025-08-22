import { useCartStore } from "@/stores/CartStore";
import { CartStoreType } from "@/types/CartStoreType";
import "./CartModal.css";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";
import { CartItemType } from "@/types/CartItemType";
export default function CartModal({ setShowCart }: any) {
/**
 * TODO
 * - [ ] Adicionar a quantidade de produtos no carrinho
 * - [ ] Adicionar opçao de aumentar e dimnuir itens no carrinho
 * - [ ] Adicionar o valor total do carrinho
 * - [ ] Adicionar a opção de finalizar compra
 * - [X] Adicionar a opção de continuar comprando
 * - [ ] Adicionar a opção de limpar o carrinho
 * - [X] Diminuir o tamanho do botao de remover item
 * 
 */

  const {cart, setCart } = useCartStore((state: CartStoreType) => state);

  const [cartItems, setCartItems] = useState([] as CartItemType[]);

// const [cartItem]

  const removeItem = (id: number, idx:number) => {

    const quantityOfItems = cart.filter((item) => item.id === id).length;
    console.log('quantityOfItems', quantityOfItems)
    if(quantityOfItems === 1){
        const updatedCart = cart.filter((item) => item.id !== id);
        console.log('updatedCart', updatedCart)
        setCart(updatedCart );
    }
    else{

      console.log('else', )
        const newCart: ProductType[] = []
        cart.forEach((item, index) => {
            if(item.id !== id && index !== idx){
                newCart.push({
                    ...item,
                    // quantity: item.quantity - 1
                })
                
            }
            // return item;
        }
        )
        console.log('newCart', newCart)
        const updatedCart = cart.filter((item, index) => item.id !== id && index !== idx);
        console.log('updatedCart', updatedCart)
        setCart(updatedCart );
    }
    
  }

  useEffect(() => {
    const cartItemsAux = [] as CartItemType[];
    console.log('cartItemsAux', cartItemsAux)
    console.log('cart', cart)
    cart.forEach((item) => {
        if(cartItemsAux.some((cartItem) => cartItem.product.id === item.id)) {
            const itemToAdd = cartItemsAux.find((cartItem) => cartItem.product.id === item.id);
            if(itemToAdd) {
                itemToAdd.quantity += 1;
                itemToAdd.totalPrice += item.price;
            }
        }else{
// debugger
            cartItemsAux.push({
                product: item,
            quantity: 1,
            totalPrice: item.price,
            // totalPriceWithDiscount: item.price - (item.price * (item.discount / 100)),
        })
    }
        // cartItemsAux.push({
        //     id: item.id,
        //     name: item.name,
        //     description: item.description,
        //     price: item.price,
        //     quantity: 1,
        //     totalPrice: item.price,
        // });
        })

    setCartItems(
      cartItemsAux  
    );
  }
    , [cart]);

  return (
    <div className="ModalContainer">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cartItems.map((item, idx) => (
              <div key={item.product.id} className="flex items-center justify-between">
                <div>
                  <span className="CartNameProduct">{item.product.name}</span>
                  <p className="CartDescriptionProduct">{item.product.description}</p>
                  <p className="CartDescriptionProduct">Quantidade:</p>
                  <div className="QuantityContainer">
                    
                    <button
                      onClick={() => {
                        removeItem(item.product.id, idx)
                        // Aqui você pode adicionar a lógica para aumentar a quantidade
                      }}
                      className="QuantityButton"
                    >
                      -
                    </button>
                    <span className="QuantityText">{item.quantity}</span>
                    <button
                      onClick={() => {
                        // Aqui você pode adicionar a lógica para diminuir a quantidade
                      }}
                      className="QuantityButton"
                    >
                      +
                    </button>
                    </div>
                  <span className="text-lg font-bold">{item.totalPrice}</span>
                </div>
                <button
                  onClick={() => {
                    console.log('cart', cart)
                    console.log('idx', idx)
                    console.log('item.product.id', item.product.id)
                    removeItem(item.product.id, idx);
                    // Aqui você pode adicionar a lógica para remover o item do carrinho
                  }}
                  className="RemoveItemButton"
                >
                  {/* Adicionar icone de lixeira */}
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
        <button
          onClick={() => setShowCart(false)}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
