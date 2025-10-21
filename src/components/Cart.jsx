import { useState, useEffect } from "react";
import closeImage from "../assets/X.svg";
import deleteImage from "../assets/Trash.svg";
import plantImage from "../assets/Plant.png";
import cowImage from "../assets/Cow.png";
import plusImage from "../assets/Plus.svg";
import minusImage from "../assets/Minus.svg";
import "../css/cart.css";

const API_URL = "http://localhost:3001/carrinho"; // URL base da API do carrinho

export function Cart({ onClose }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCartProducts(data);
      })
      .catch(error => {
        console.error("Erro ao buscar carrinho:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePlus = (id) => {
    const product = cartProducts.find(p => p.id === id);
    if (!product) return;
    const novaQuantidade = Number(product.quantidade) + 1;

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, quantidade: novaQuantidade.toString() }),
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setCartProducts(prev =>
          prev.map(p => (p.id === id ? updatedProduct : p))
        );
      })
      .catch(error => console.error("Erro ao aumentar quantidade:", error));
  };

  const handleMinus = (id) => {
    const product = cartProducts.find(p => p.id === id);
    if (!product || Number(product.quantidade) <= 1) return;
    const novaQuantidade = Number(product.quantidade) - 1;

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, quantidade: novaQuantidade.toString() }),
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setCartProducts(prev =>
          prev.map(p => (p.id === id ? updatedProduct : p))
        );
      })
      .catch(error => console.error("Erro ao diminuir quantidade:", error));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao deletar item');
        setCartProducts(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => console.error("Erro ao deletar item:", error));
  };

  const handleDeleteAll = () => {
    const deletePromises = cartProducts.map(produto =>
      fetch(`${API_URL}/${produto.id}`, { method: "DELETE" })
    );

    Promise.all(deletePromises)
      .then(responses => {
        const allOk = responses.every(res => res.ok);
        if (allOk) {
          setCartProducts([]);
        } else {
          console.error("Erro ao deletar alguns itens do carrinho.");
          fetchCartItems();
        }
      })
      .catch(error => {
        console.error("Erro ao deletar todos os itens:", error);
        fetchCartItems();
      });
  };

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
          {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Carregando carrinho...</p>}
          {!loading && cartProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Seu carrinho está vazio.</p>
          ) : (
            !loading && cartProducts.map(produto => (
              <div key={produto.id} className="cart__product">
                <img src={produto.imagem.startsWith('/') ? produto.imagem : `/${produto.imagem}`} alt={produto.nome} className="cart__productImage" />
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
                    <h3 className="cart__productPrice">{(produto.preco / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
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
          <h3 className="cart__footerPrice">{(subtotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
        </div>
        <div className="cart__footerRow cart__footerDelivery">
          <h3 className="cart__footerTitle">Entrega</h3>
          <h3 className="cart__footerPrice">R$ 0,00</h3>
        </div>
        <div className="cart__footerRow cart__footerTotal">
          <h3 className="cart__footerTitle">Total</h3>
          <h3 className="cart__footerPrice">{(subtotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
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