import { Button } from "antd";
import { useShoppingCart } from "../../context/CartContext";
import { Product } from "../../context/ProductContext";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
  ShoppingTwoTone,
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
        type="primary"
        icon={<ShoppingTwoTone />}
        onClick={() => increaseCartQuantity(product.id)}
      >
        Add to cart
      </Button>
    </div>
  ) : (
    <div>
      <Button type="primary" onClick={() => increaseCartQuantity(product.id)}>
        <PlusCircleOutlined />
      </Button>

      <div>
        <span>{quantity}</span> in cart
      </div>

      {quantity > 1 ? (
        <Button type="primary" onClick={() => decreaseCartQuantity(product.id)}>
          <MinusCircleOutlined />
        </Button>
      ) : (
        <Button type="primary">
          <MinusCircleOutlined />
        </Button>
      )}

      <Button type="primary" onClick={() => removeFromCart(product.id)}>
        <DeleteOutlined />
      </Button>
    </div>
  );
}
