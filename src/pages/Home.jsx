// Importações dos componentes reutilizaçao, imagens e estilos usados na página Home
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import PlantImage from "../assets/Plant.png";
import CowImage from "../assets/Cow.png";
import "../css/home.css";

export function Home() {
  // Estado que armazena a lista de produtos disponíveis. Cada produto tem informações como nome, imagem, descrição, preço, se é vegano e sua categoria.
  const [produtos] = useState([
    { id: "1", nome: "Espresso", imagem: "/product-01.png", descricao: "Café forte e encorpado.", preco: { de: 1000, por: 800 }, vegano: true, categoria: "clássicos" },
    //fazer aqui com os 12 produtos exemplo acima (qualquer coisa eu ajusto)
  ]);

  // Função auxiliar para formatar o preço em reais com vírgula
  // Filtra os produtos por categoria para exibir separadamente
  
  const formatarPreco = // vc faz?

  // Renderização da estrutura da página
  return (
    <>
      <Header />

      {/* Slogan e descrição */}
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
        {/* Blocos de produtos Clássicos */}
        <section className="products">
          <div className="container">

           {/* estou fazendo */}

                  
        {/* Blocos de produtos Gelados */}
        <section className="products">
          <div className="container">

             {/* estou fazendo */}

              
      
{/* Rodapé da página */}
      <Footer />
    </>
  );
}
