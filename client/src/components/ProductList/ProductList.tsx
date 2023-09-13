import { useProductContext } from "../../context/ProductContext";
import { Card, Space } from "antd";
import "./ProductList.css";

export default function ProductList() {
  const { products } = useProductContext();

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
          className="ProductCard"
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
          {/* <p className="description">{product.description}</p> */}
          <p>Price: ${product.price.unit_amount}</p>
        </Card>
      ))}
    </div>
  );
}
