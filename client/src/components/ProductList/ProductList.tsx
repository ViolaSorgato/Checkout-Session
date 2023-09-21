import { useProductContext } from "../../context/ProductContext";
import { Button, Card, Space } from "antd";

import "./ProductList.css";
import { useShoppingCart } from "../../context/CartContext";

export default function ProductList() {
  const { products } = useProductContext();
  const { addToCart } = useShoppingCart();

  return (
    <div className="ProductListContainer">
      <Space
        direction="horizontal"
        size="middle"
        style={{ display: "flex" }}
      ></Space>
      {products.map((product) => (
        <Card
          hoverable
          style={{ width: 250, display: "flex" }}
          key={product.id}
        >
          <h3>{product.name}</h3>
          <div>
            {product.images.map((image, index) => (
              <img
                className="img"
                key={index}
                src={image}
                alt={`${product.name} Image ${index + 1}`}
              />
            ))}
          </div>
          <p>Price: {product.price.unit_amount} kr</p>
          <Button
            type="primary"
            className="addToCartBtn"
            onClick={() =>
              addToCart(product.price.id, product.name, product.price)
            }
          >
            Add to cart
          </Button>
        </Card>
      ))}
    </div>
  );
}
