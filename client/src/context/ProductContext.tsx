import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

export interface Product {
  //   price: any;
  id: string;
  name: string;
  description: string;
  images: [];
  default_price: Price;
  price: {
    unit_amount: string; // Assuming unit_amount is a string
  };
}

export interface Price {
  id: string;
  unit_amount: string;
  currency: string;
}

export interface ProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
}

const defaultValues = {
  products: [],
  setProducts: () => {},
  fetchProducts: () => {},
};

export const ProductContext = createContext<ProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("api/products");
      const data = await response.json();

      const productList = data.data.map((product: Product) => ({
        name: product.name,
        description: product.description,
        images: product.images,
        id: product.id,
        price: {
          currency: product.default_price.currency,
          unit_amount: (
            parseFloat(product.default_price.unit_amount) / 100
          ).toFixed(2),
          id: product.default_price.id,
        },
      }));

      setProducts(productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
