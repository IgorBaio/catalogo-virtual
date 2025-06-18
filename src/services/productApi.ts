const API_URL = 'https://webhook.igor.evodreamlabs.com.br/webhook/produtos';

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
  whatsappMessage?: string;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}


export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
}
