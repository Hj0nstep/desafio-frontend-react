import { useState, useEffect } from "react";  // ALTERADO: Imports de useState e useEffect adicionados
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";

// ALTERADO: Importação estática removida (arquivo products.js foi deletado)
// import { produtos } from "../data/products";

import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import "../css/home.css";

export function Home() {
  // NOVO: Estado para armazenar produtos da API
  const [listaProdutos, setListaProdutos] = useState([]);
    
  // NOVO: useEffect para buscar produtos da API na montagem
  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then(resposta => resposta.json())
      .then(dadosRecebidos => {
        setListaProdutos(dadosRecebidos);
      })
      .catch(erro => {
        console.error("Erro ao buscar produtos:", erro);
      });
  }, []);

  const classicos = listaProdutos.filter(p => p.categoria === "classicos");
  const gelados = listaProdutos.filter(p => p.categoria === "gelados");

  if (listaProdutos.length === 0) {
    return (
      <>
        <Header />
        <main><div className="container"><p>Carregando produtos...</p></div></main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
       <section className="slogan">
        <div className="container">
          <h1 className="slogan__title">Fragrância e sabor elevado ao cubo</h1>
          <p className="slogan__text">
            Oferecemos nossa variedade de blends exclusivos e especiais para te fazer feliz a cada gole.
          </p>
        </div>
      </section>
      
       {/* Conteúdo principal da página */}
      <main>
      {/* Seção de produtos clássicos usando ProductCard */}
        <section className="products">
          <div className="container">
            <h2 className="products__title">Clássicos</h2>
            <div className="products__list">
              {classicos.map(produto => (
                <ProductCard
                  key={produto.id}
                  image={`/${produto.imagem}`}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de !== produto.preco.por ? produto.preco.de : null}
                  tagIcon={produto.vegano ? PlantImage : CowImage}
                  tagText={produto.vegano ? "Vegano" : "Contém lactose"}
                  link={`/product/${produto.id}`}
                />
              ))}
            </div>
          </div>
        </section>
             
             {/* Seção de produtos gelados usando ProductCard */}
        <section className="products">
          <div className="container">
            <h2 className="products__title">Gelados</h2>
            <div className="products__list">
              {gelados.map(produto => (
                <ProductCard
                  key={produto.id}
                  image={`/${produto.imagem}`}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de !== produto.preco.por ? produto.preco.de : null}
                  tagIcon={produto.vegano ? PlantImage : CowImage}
                  tagText={produto.vegano ? "Vegano" : "Contém lactose"}
                  link={`/product/${produto.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}