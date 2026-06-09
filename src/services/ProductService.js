const API_URL = "https://fakestoreapi.com/";

export async function getProducts() {
  const response = await fetch(`${API_URL}products`);

  const data = await response.json();
  return data;
}

export async function addProduct(newProduct) {
  const response = await fetch(`${API_URL}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  const data = await response.json();
  return data;
}
