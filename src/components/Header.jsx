import { NavLink } from "react-router-dom";

function Header({ title, subtitle, cartCount }) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <nav className="nav">
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-nav" : "")}
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active-nav" : "")}
        >
          Cart
        </NavLink>
      </nav>

      <div className="cart-count">🛒 Cart {cartCount}</div>
    </header>
  );
}

export default Header;
