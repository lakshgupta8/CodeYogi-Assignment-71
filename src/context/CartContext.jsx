import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { getProduct } from "../api";

const CartContext = createContext(undefined);

export { CartContext };

export default function CartProvider({ children }) {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
  const [cartItems, setCartItems] = useState(savedCartItems);
  const [cartItemsData, setCartItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(function () {
    const saved = localStorage.getItem("cartSubtotal");
    return saved ? Number(saved) : 0;
  });

  const handleAddToCart = useCallback(
    function (productId, count) {
      const currentCount = cartItems[productId] || 0;
      const newCartItems = { ...cartItems, [productId]: currentCount + count };
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    [cartItems]
  );

  const count = useMemo(
    function () {
      return Object.keys(cartItems).reduce(function (prev, current) {
        return prev + cartItems[current];
      }, 0);
    },
    [cartItems]
  );

  const handleRemoveFromCart = useCallback(
    function (productId) {
      const newCartItems = { ...cartItems };
      delete newCartItems[productId];
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    [cartItems]
  );

  const handleQuantityChange = useCallback(
    function (productId, newQty) {
      if (newQty <= 0) {
        handleRemoveFromCart(productId);
        return;
      }
      const newCartItems = { ...cartItems, [productId]: newQty };
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    [cartItems, handleRemoveFromCart]
  );

  const ids = useMemo(
    function () {
      return Object.keys(cartItems || {});
    },
    [cartItems]
  );

  useEffect(
    function () {
      if (ids.length === 0) {
        setCartItemsData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      Promise.all(
        ids.map(function (id) {
          return getProduct(id).then(function (product) {
            return { ...product, quantity: cartItems[id] };
          });
        })
      )
        .then(function (products) {
          setCartItemsData(products);
        })
        .catch(function () {
          setCartItemsData([]);
        })
        .finally(function () {
          setLoading(false);
        });
    },
    [ids, cartItems]
  );

  const calculatedSubtotal = useMemo(
    function () {
      let sum = 0;
      cartItemsData.forEach(function (item) {
        const q = item.quantity ?? 1;
        sum += item.price * Number(q);
      });
      return sum;
    },
    [cartItemsData]
  );

  const handleUpdateCart = useCallback(
    function () {
      setSubtotal(calculatedSubtotal);
    },
    [calculatedSubtotal]
  );

  useEffect(
    function () {
      localStorage.setItem("cartSubtotal", String(subtotal));
    },
    [subtotal]
  );

  const getItemSubtotal = useCallback(
    function (price, quantity) {
      return price * Number(quantity);
    },
    []
  );

  const value = {
    cartItems,
    cartItemsData,
    loading,
    count,
    subtotal,
    calculatedSubtotal,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleQuantityChange,
    updateCart: handleUpdateCart,
    getItemSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
