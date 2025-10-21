import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
// Não precisamos importar { Cart } aqui, pois o Header já cuida disso.
import { Link } from "react-router-dom";

export function Carrinho() {
  // Esta página serve apenas como um destino para a rota /carrinho.
  // O carrinho real (modal) é controlado pelo Header.

  return (
    <>
      {/* O Header inclui o botão que abre/fecha o modal Cart */}
      <Header />
      <main>
        {/* Container padrão da página */}
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: 'calc(100vh - 200px)' /* Exemplo: Altura mínima */ }}>
          <Link to="/" className="product__link" style={{ marginBottom: '20px', display: 'inline-block' }}>
            &larr; Voltar para o início
          </Link>
          <h1>Meu Carrinho</h1>
         
          <p style={{ marginTop: '20px' }}>
            Seus itens estão no carrinho. Clique no ícone no canto superior direito para visualizá-los.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}