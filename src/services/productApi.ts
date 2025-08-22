const API_URL =
  'https://webhook-workflows.baiosystems.com.br/webhook/produtos';

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


