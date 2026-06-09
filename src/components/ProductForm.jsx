import { useState } from "react";

function ProductForm({ onCreateProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title: title,
      price: Number(price),
      image: "https://picsum.photos/200/300",
      category: "custom",
      description: "This is created from the USER using React",
    };

    onCreateProduct(newProduct);
  };
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Create Product</h2>

      <input
        type="text"
        placeholder="Product title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="number"
        placeholder="Product price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <button type="submit">Create Product</button>
    </form>
  );
}

export default ProductForm;
