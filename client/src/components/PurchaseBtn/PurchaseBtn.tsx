import "./PurchaseBtn.css";
import { Button } from "antd";
import { useShoppingCart } from "../../context/CartContext";
import { Product } from "../../context/ProductContext";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

type Props = {
  product: Product;
};

export default function PurchaseBtn({ product }: Props) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(product.id);

  return quantity === 0 ? (
    <div>
      <Button
        className="AddToCartBtn"
        type="primary"
        icon={<ShoppingOutlined />}
        onClick={() => increaseCartQuantity(product.id)}
      >
        Add to cart
      </Button>
    </div>
  ) : (
    <div className="BtnContainer">
      <Button onClick={() => increaseCartQuantity(product.id)}>
        <PlusOutlined />
      </Button>
      <span>{quantity}</span> in cart
      {quantity > 1 ? (
        <Button onClick={() => decreaseCartQuantity(product.id)}>
          <MinusOutlined />
        </Button>
      ) : (
        <Button>
          <MinusOutlined />
        </Button>
      )}
      <Button onClick={() => removeFromCart(product.id)}>
        <DeleteOutlined />
      </Button>
    </div>
  );
}
