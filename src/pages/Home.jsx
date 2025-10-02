// Importações dos componentes reutilizaçao, imagens e estilos usados na página Home
// Importa o componente reutilizável de produto
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard"; 
import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import "../css/home.css";

export function Home() {
  // Estado que armazena a lista de produtos disponíveis. Cada produto tem informações como nome, imagem, descrição, preço, se é vegano e sua categoria.
  const [produtos] = useState([
    { id: "1", nome: "Espresso", imagem: "/product-01.png", descricao: "Café forte e encorpado.", preco: { de: 1000, por: 800 }, vegano: true, categoria: "clássicos" },
    { id: "2", nome: "Americano", imagem: "/product-02.png", descricao: "Café suave com água quente.", preco: { de: 900, por: 700 }, vegano: true, categoria: "clássicos" },
    { id: "3", nome: "Café com leite", imagem: "/product-03.png", descricao: "Café com leite cremoso.", preco: { de: 1400, por: 1200 }, vegano: false, categoria: "clássicos" },
    { id: "4", nome: "Cappuccino", imagem: "/product-04.png", descricao: "Cappuccino com espuma perfeita.", preco: { de: 1300, por: 1100 }, vegano: false, categoria: "clássicos" },
    { id: "5", nome: "Latte", imagem: "/product-05.png", descricao: "Latte suave e equilibrado.", preco: { de: 1200, por: 1000 }, vegano: false, categoria: "clássicos" },
    { id: "6", nome: "Macchiato", imagem: "/product-06.png", descricao: "Macchiato intenso com leite.", preco: { de: 1000, por: 800 }, vegano: false, categoria: "clássicos" },
    { id: "7", nome: "Mocha", imagem: "/product-07.png", descricao: "Café com chocolate e leite.", preco: { de: 1000, por: 800 }, vegano: false, categoria: "clássicos" },
    { id: "8", nome: "Irish Coffee", imagem: "/product-08.png", descricao: "Café com whisky e creme.", preco: { de: 1600, por: 1400 }, vegano: false, categoria: "clássicos" },
    { id: "9", nome: "Cold Brew", imagem: "/product-09.png", descricao: "Extraído a frio por horas.", preco: { de: 1500, por: 1300 }, vegano: true, categoria: "gelados" },
    { id: "10", nome: "Frappuccino", imagem: "/product-10.png", descricao: "Gelado e cremoso com chantilly.", preco: { de: 1800, por: 1500 }, vegano: false, categoria: "gelados" },
    { id: "11", nome: "Café gelado com laranja e tônica", imagem: "/product-11.png", descricao: "Refrescante e cítrico.", preco: { de: 1800, por: 1600 }, vegano: true, categoria: "gelados" },
    { id: "12", nome: "Milk shake de café", imagem: "/product-12.png", descricao: "Gelado e cremoso.", preco: { de: 1600, por: 1400 }, vegano: false, categoria: "gelados" }
  ]);

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


