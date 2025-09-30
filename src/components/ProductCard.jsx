// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import "../css/product.css";

export function ProductCard({ image, name, price, oldPrice, tagIcon, tagText, link }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);

  return (
    <Link to={link} className="productCard__link">
      <article className="productCard">
        <div className="productCard__imageContainer">
          <img
            src={image}
            alt={`Imagem do produto ${name}`}
            className="productCard__image"
            loading="lazy"
          />
        </div>

        <header className="productCard__info">
          <h3 className="productCard__name">{name}</h3>

          <div className="productCard__prices">
            <span className="productCard__price">{formatPrice(price)}</span>
            {oldPrice && (
              <span className="productCard__oldPrice">{formatPrice(oldPrice)}</span>
            )}
          </div>

          {tagIcon && tagText && (
            <div className="productCard__tag">
              <img
                src={tagIcon}
                alt={`Ícone de ${tagText}`}
                className="productCard__tagIcon"
              />
              <span className="productCard__tagText">{tagText}</span>
            </div>
          )}
        </header>
      </article>
    </Link>
  );
}
