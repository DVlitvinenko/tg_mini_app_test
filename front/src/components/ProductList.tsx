import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/appTypes";
import ProductItem from "./ProductItem";
import { useTelegram } from "../hooks/useTelegram";
import Button from "./Button";

const products: Product[] = [
  {
    id: 1,
    image: "kortinko1",
    title: "title1",
    description: "desc1",
    price: 100,
  },
  {
    id: 2,
    image: "kortinko2",
    title: "title2",
    description: "desc2",
    price: 200,
  },
  {
    id: 3,
    image: "kortinko3",
    title: "title3",
    description: "desc3",
    price: 300,
  },
  {
    id: 4,
    image: "kortinko4",
    title: "title4",
    description: "desc4",
    price: 400,
  },
  {
    id: 5,
    image: "kortinko5",
    title: "title5",
    description: "desc5",
    price: 500,
  },
  {
    id: 6,
    image: "kortinko6",
    title: "title6",
    description: "desc6",
    price: 600,
  },
  {
    id: 7,
    image: "kortinko7",
    title: "title7",
    description: "desc7",
    price: 700,
  },
  {
    id: 8,
    image: "kortinko8",
    title: "title8",
    description: "desc8",
    price: 800,
  },
  {
    id: 9,
    image: "kortinko9",
    title: "title9",
    description: "desc9",
    price: 900,
  },
  {
    id: 10,
    image: "kortinko10",
    title: "title10",
    description: "desc10",
    price: 1000,
  },
  {
    id: 11,
    image: "kortinko11",
    title: "title11",
    description: "desc11",
    price: 1100,
  },
  {
    id: 12,
    image: "kortinko12",
    title: "title12",
    description: "desc12",
    price: 1200,
  },
  {
    id: 13,
    image: "kortinko13",
    title: "title13",
    description: "desc13",
    price: 1300,
  },
  {
    id: 14,
    image: "kortinko14",
    title: "title14",
    description: "desc14",
    price: 1400,
  },
];

const getTotalPrice = (items: Product[] = []) => {
  return items.reduce((acc: number, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const { tg } = useTelegram();
  const [added, setAdded] = useState<Product[]>([]);

  const handleAdd = (product: Product) => {
    const alreadyAdded = added.find((item) => item.id === product.id);

    if (alreadyAdded) {
      setAdded([...added.filter((item) => item.id !== product.id)]);
    } else {
      setAdded([...added, product]);
    }
  };

  const onSendData = useCallback(() => {
    const data = { products: added, totalPrice: getTotalPrice(added) };
    fetch("http://localhost:8080", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }, []);

  useEffect(() => {
    if (!added.length) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${added.length} ед. товара за ${getTotalPrice(
          added
        )} руб`,
      });
      tg.MainButton.onClick(onSendData);
    }

    return () => tg.MainButton.offClick(onSendData);
  }, [added]);

  return (
    <div className="space-y-2">
      {products.map((product, i) => (
        <div key={`${product}_${i}`}>
          <ProductItem
            onAdd={(product) => handleAdd(product)}
            product={product}
          />
        </div>
      ))}
      <Button onClick={onSendData}>sdfsdfsd</Button>
    </div>
  );
};

export default ProductList;
