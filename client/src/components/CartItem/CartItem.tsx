import { useShoppingCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import "../CartItem/CartItem.css";
import { Button, Col, Row, Divider } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
// import { formatCurrency } from "../../utilities/formatCurrency";

type CartItemProps = {
  id: string;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const { products } = useProductContext();

  const item = products.find((i) => i.id === id);
  if (item === null) return null;

  return (
    <>
      <Row className="quantity-btn-container">
        <Col>
          {/* <img
            // src={item?.images}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          /> */}
        </Col>
        <h3 className="cartitem-title">{item?.name} </h3>
        <p className="cartitem-price ">{item?.price.unit_amount} kr</p>
      </Row>

      <Row className="quantity-btn-container">
        <Button
          type="primary"
          size="small"
          className="cartitem-qty-btn"
          onClick={() => item && increaseCartQuantity(item?.id)}
        >
          <PlusOutlined />
        </Button>

        <Col>
          <div className="qty-div">x {quantity}</div>
        </Col>

        {quantity > 1 ? (
          <Button
            type="primary"
            size="small"
            className="cartitem-qty-btn"
            onClick={() => item && decreaseCartQuantity(item?.id)}
          >
            <MinusOutlined />
          </Button>
        ) : (
          <Button type="primary" size="small" className="cartitem-qty-btn">
            <MinusOutlined />
          </Button>
        )}

        <Button
          type="primary"
          size="small"
          className="cartitem-qty-btn"
          onClick={() => item && removeFromCart(item?.id)}
        >
          <DeleteOutlined />
        </Button>
        <Divider />
      </Row>
    </>
  );
}
