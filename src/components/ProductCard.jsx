function ProductCard({ title, price, image, onAddToCart, isInCart }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      <h3>{title}</h3>

      <p>Price: {price}€</p>

      <button onClick={onAddToCart} disabled={isInCart}>
        {isInCart ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
