import { useState } from 'react'; 
import logoImage from '../assets/logo.svg';
import ToteImage from '../assets/Tote.svg';
import { Cart } from './Cart';

export function Header() {
  
  const [isCartVisible, setIsCartVisible] = useState(false);

  
  const handleToggleCart = () => {
    
    setIsCartVisible(prevState => !prevState);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/">
          <img className="header__logo" src={logoImage} alt="logo CoffeeSpresso" />
        </a>
        
       
        <button onClick={handleToggleCart} className="link__quantity">
          <img src={ToteImage} alt="Carrinho" />
          <span className="badge__quantity">1</span>
        </button>
      </div>
    
      {isCartVisible && <Cart onClose={handleToggleCart} />}
    </header>
  );
}