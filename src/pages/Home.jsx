
import { ProductCard } from "../components/ProductCard";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import "../css/home.css";

export function Home () {
  // Estado que armazena a lista de produtos disponíveis. Cada produto tem informações como nome, imagem, descrição, preço, se é vegano e sua categoria.
  const [produtos] = useState ([
    { id: '1', nome: 'Espresso', imagem: '/product-01.png', preco: { de: 800, por: 600 }, vegano: true, categoria: 'clássicos' },
    { id: '2', nome: 'Americano', imagem: '/product-02.png', preco: { de: 800, por: 600 }, vegano: true, categoria: 'clássicos' },
    { id: '3', nome: 'Café com leite', imagem: '/product-03.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'clássicos' },
    { id: '4', nome: 'Cappuccino', imagem: '/product-04.png', preco: { de: 1000, por: 1000 }, vegano: false, categoria: 'clássicos' },
    { id: '5', nome: 'Latte', imagem: '/product-05.png', preco: { de: 1000, por: 1000 }, vegano: false, categoria: 'clássicos' },
    { id: '6', nome: 'Macchiato', imagem: '/product-06.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'clássicos' },
    { id: '7', nome: 'Mocha', imagem: '/product-07.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'clássicos' },
    { id: '8', nome: 'Irish Coffee', imagem: '/product-08.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'clássicos' },
    { id: '9', nome: 'Cold Brew', imagem: '/product-09.png', preco: { de: 1000, por: 800 }, vegano: true, categoria: 'gelados' },
    { id: '10', nome: 'Frappuccino', imagem: '/product-10.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'gelados' },
    { id: '11', nome: 'Café gelado com laranja e tônica', imagem: '/product-11.png', preco: { de: 1000, por: 800 }, vegano: true, categoria: 'gelados' },
    { id: '12', nome: 'Milk shake de café', imagem: '/product-12.png', preco: { de: 1000, por: 800 }, vegano: false, categoria: 'gelados' },
  ]); //fazer aqui com os 12 produtos exemplo acima (qualquer coisa eu ajusto)

  const classicos = produtos.filter((produto )=> produto.categoria === 'classicos');
  const gelados = produtos.filter((produto) => produto.categoria === 'gelados');

  return (
    <>
      <main>
         
          {/* Slogan e descrição */}
        <section className="slogan">
          <div className="container">
            <h1 className="slogan__title">Fragrância e sabor elevado ao cubo</h1>
            <p className="slogan__text">
              Explore nossa variedade de blends exclusivos e saboreie a perfeição em cada gole.
            </p>
          </div>
        </section>
       
        {/* Blocos de produtos Clássicos */}
        <section className="products">
          <div className="container">
            <h2 className="products__title">Clássicos</h2>
            <div className="products__list">
              {classicos.map((produto) => (
                <ProductCard
                  key={produto.id}
                  link={`/product/${produto.id}`}
                  image={produto.imagem}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de !== produto.preco.por ? produto.preco.de : null}
                  tagIcon={produto.vegano ? PlantImage : CowImage}
                  tagText={produto.vegano ? 'Vegano' : 'Contém lactose'}
                />
              ))}
            </div>
          </div>
        </section>
        
            {/* Blocos de produtos Gelados */}
        <section className="products">
          <div className="container">
            <h2 className="products__title">Gelados</h2>
            <div className="products__list">
              {gelados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  link={`/product/${produto.id}`}
                  image={produto.imagem}
                  name={produto.nome}
                  price={produto.preco.por}
                  oldPrice={produto.preco.de !== produto.preco.por ? produto.preco.de : null}
                  tagIcon={produto.vegano ? PlantImage : CowImage}
                  tagText={produto.vegano ? 'Vegano' : 'Contém lactose'}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
