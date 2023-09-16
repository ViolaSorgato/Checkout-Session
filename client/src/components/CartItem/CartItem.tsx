import { useShoppingCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
// import "../CartItem/CartItem.css";
import { Col, Row } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
      <Row>
        <Col>
          <img
            // src={item?.images}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </Col>

        <Col>
          <span className="cartitem-title">{item?.name} </span>
          <br />

          <span className="cartitem-price ">{item?.price.unit_amount}</span>
        </Col>
      </Row>

      <Row>
        <Col
          className="cartitem-qty-btn"
          onClick={() => item && increaseCartQuantity(item?.id)}
        >
          <PlusCircleOutlined />
        </Col>

        <Col className="cartitem-qty-btn">
          <div className="qty-div">x {quantity}</div>
        </Col>

        {quantity > 1 ? (
          <Col
            className="cartitem-qty-btn"
            onClick={() => item && decreaseCartQuantity(item?.id)}
          >
            <MinusCircleOutlined />
          </Col>
        ) : (
          <Col className="cartitem-qty-btn">
            <MinusCircleOutlined />
          </Col>
        )}

        <Col
          className="cartitem-qty-btn"
          onClick={() => item && removeFromCart(item?.id)}
        >
          <DeleteOutlined />
        </Col>
      </Row>
    </>
  );
}
