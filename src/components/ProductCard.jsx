// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import "../css/home.css"; 

export function ProductCard({ image, name, price, oldPrice, tagIcon, tagText, link }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);

  return (
    <Link to={link} className="products__list--item">
      <img
        src={image}
        alt={`Imagem do produto ${name}`}
        loading="lazy"
        style={{ width: "100%", borderRadius: "4px" }}
      />

      <h3 className="products__list--name">{name}</h3>

      <div className="products__list--price">
        {formatPrice(price)}
        {oldPrice && <span>{formatPrice(oldPrice)}</span>}
      </div>

      <div className="product__tag">
        <img
          src={tagIcon}
          alt={`Ícone de ${tagText}`}
          style={{ width: "16px", height: "16px", marginRight: "4px" }}
        />
        <span>{tagText}</span>
      </div>
    </Link>
  );
}

