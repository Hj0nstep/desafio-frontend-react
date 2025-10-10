import { useState, useEffect } from "react"; 
import closeImage from "../assets/X.svg";
import deleteImage from "../assets/Trash.svg";
import plantImage from "../assets/Plant.png";
import cowImage from "../assets/Cow.png";
import plusImage from "../assets/Plus.svg";
import minusImage from "../assets/Minus.svg";
import "../css/cart.css";

export function Cart({ onClose }) {
  
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem("carrinho");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(cartProducts));
  }, [cartProducts]);

  
  const handlePlus = (id) => {
    setCartProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantidade: Number(p.quantidade) + 1 } : p
      )
    );
  };

  const handleMinus = (id) => {
    setCartProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, quantidade: Number(p.quantidade) > 1 ? Number(p.quantidade) - 1 : 1 }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setCartProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteAll = () => setCartProducts([]);

  const subtotal = cartProducts.reduce(
    (acc, p) => acc + p.preco * Number(p.quantidade),
    0
  );

  return (
    <div className="cart">
      <section className="cart__header">
        <h3 className="cart__title">Seu carrinho</h3>
        <button className="cart__close" onClick={onClose}>
          <img src={closeImage} alt="Fechar carrinho" />
        </button>
      </section>

      <section className="cart__body">
        <div className="cart__info">
          <h4 className="cart__quantityItems">{cartProducts.length} itens</h4>
          <button onClick={handleDeleteAll} className="cart__deleteAll">
            Excluir Tudo
          </button>
        </div>

        <div className="cart__products">
          {cartProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Seu carrinho está vazio.</p>
          ) : (
            cartProducts.map(produto => (
              <div key={produto.id} className="cart__product">
                <img src={produto.imagem} alt={produto.nome} className="cart__productImage" />

                <div className="cart__productInfo">
                  <div className="cart__productRow">
                    <div className="cart__productColumn">
                      <h2 className="cart__productName">{produto.nome}</h2>
                      <div className="product__tag">
                        <img
                          src={produto.vegano ? plantImage : cowImage}
                          alt={produto.vegano ? "Vegano" : "Contém lactose"}
                        />
                        <span>{produto.vegano ? "Vegano" : "Contém lactose"}</span>
                      </div>
                    </div>

                    <button onClick={() => handleDelete(produto.id)} className="cart__productDelete">
                      <img src={deleteImage} alt="Deletar produto" />
                    </button>
                  </div>

                  <div className="cart__productRow">
                    <h3 className="cart__productPrice">R$ {(produto.preco / 100).toFixed(2).replace(".", ",")}</h3>
                    <section className="product__quantity">
                      <button type="button" onClick={() => handleMinus(produto.id)} className="product__quantityMinus">
                        <img src={minusImage} alt="menos um" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        className="product__quantityInput"
                        value={produto.quantidade}
                      />
                      <button type="button" onClick={() => handlePlus(produto.id)} className="product__quantityPlus">
                        <img src={plusImage} alt="mais um" />
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="cart__footer">
        <div className="cart__footerRow cart__footerSubtotal">
          <h3 className="cart__footerTitle">Subtotal</h3>
          <h3 className="cart__footerPrice">R$ {(subtotal / 100).toFixed(2).replace(".", ",")}</h3>
        </div>
        <div className="cart__footerRow cart__footerDelivery">
          <h3 className="cart__footerTitle">Entrega</h3>
          <h3 className="cart__footerPrice">R$ 0,00</h3>
        </div>
        <div className="cart__footerRow cart__footerTotal">
          <h3 className="cart__footerTitle">Total</h3>
          <h3 className="cart__footerPrice">R$ {(subtotal / 100).toFixed(2).replace(".", ",")}</h3>
        </div>
        <div className="cart__footerRow cart__footerBuy">
          <button type="button" className="cart__buy">
            Finalizar compra
          </button>
        </div>
      </section>
    </div>
  );
}