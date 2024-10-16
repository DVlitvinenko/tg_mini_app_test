import { Product } from "../types/appTypes";
import Button from "./Button";

const ProductItem = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) => {
  const handleAdd = () => {
    onAdd(product);
  };

  return (
    <div className="flex items-center justify-center gap-2 border-2 border-black rounded-sm flex-wrap p-1 m-1">
      <div className="">{product.image}</div>
      <div className="">{product.title}</div>
      <div className="">{product.description}</div>
      <div className="">{product.price}</div>
      <Button onClick={handleAdd}>Добавить в корзину</Button>
    </div>
  );
};

export default ProductItem;
