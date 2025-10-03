import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { produtos } from "../data/products";

import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import MinusImage from "../assets/Minus.svg";
import PlusImage from "../assets/Plus.svg";

import "../css/product.css";

function formatPrice(priceInCents) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInCents / 100);
}

function gerarIdUnico() {
  return Math.random().toString(36).substring(2, 6) + Date.now().toString(36);
}

export function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = produtos.find(p => p.id === id);

  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState("");

  if (!product) {
    return (
      <>
        <Header />
        <main>
          <div className="container product__container">
            <h1>Produto não encontrado!</h1>
            <a href="/" className="product__link">Voltar para o início</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleComprar = () => {
    const item = {
      id: gerarIdUnico(),
      idProduto: product.id,
      nome: product.nome,
      imagem: `/${product.imagem}`, // ✅ caminho direto da pasta public/
      preco: product.preco.por,
      vegano: product.vegano,
      quantidade: quantidade.toString(),
      observacao: observacoes,
    };

    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoAtual.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    alert(`✅ Adicionado ao carrinho: ${quantidade}x ${product.nome}`);
    navigate("/carrinho");
  };

  return (
    <>
      <Header />
      <main>
        <div className="container product__container">
          <a href="/" className="product__link">Voltar para o início</a>
          <section className="product">
            <div className="product__container--image">
              <img
                src={`/${product.imagem}`} // ✅ imagem da pasta public/
                className="product__image"
                alt={`Imagem do produto ${product.nome}`}
              />
            </div>

            <div className="product__data">
              <h1 className="product__title">{product.nome}</h1>
              <h2 className="product__price">{formatPrice(product.preco.por)}</h2>

              <div className="product__tag">
                <img src={product.vegano ? PlantImage : CowImage} alt="ícone" />
                <span>{product.vegano ? "Vegano" : "Contém lactose"}</span>
              </div>

              <p className="product__description">{product.descricao}</p>

              <form onSubmit={e => e.preventDefault()}>
                <section className="product__observation">
                  <label htmlFor="observation">Observações sobre o pedido</label>
                  <textarea
                    rows={3}
                    name="observation"
                    id="observation"
                    placeholder="Digite suas observações. Ex.: Enviar açúcar"
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                  />
                </section>

                <div className="product__buy">
                  <section className="product__quantity">
                    <button
                      type="button"
                      className="product__quantity--minus"
                      onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                    >
                      <img src={MinusImage} alt="menos um" />
                    </button>

                    <input
                      type="text"
                      readOnly
                      className="product__quantity--input"
                      value={quantidade}
                    />

                    <button
                      type="button"
                      className="product__quantity--plus"
                      onClick={() => setQuantidade(q => q + 1)}
                    >
                      <img src={PlusImage} alt="mais um" />
                    </button>
                  </section>

                  <button
                    type="button"
                    className="product__button"
                    onClick={handleComprar}
                  >
                    Comprar
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
