type Face = "legal" | "physical";

interface FromData {
  name: string;
  phone: string;
  face: Face;
}

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}
export type { FromData, Product };
