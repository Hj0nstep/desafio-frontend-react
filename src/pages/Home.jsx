import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard"; 
import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import { produtos } from "../data/products";
import "../css/home.css";

export function Home() {
  

  // Função auxiliar para formatar o preço em reais com vírgula
  // Filtra os produtos por categoria para exibir separadamente
 
  const classicos = produtos.filter(p => p.categoria === "clássicos");
  const gelados = produtos.filter(p => p.categoria === "gelados");

  // Renderização da estrutura da página
  return (
    <>
      <Header />

      {/* Seção de slogan */}
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
                  image={produto.imagem}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de}
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
                  image={produto.imagem}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de}
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


