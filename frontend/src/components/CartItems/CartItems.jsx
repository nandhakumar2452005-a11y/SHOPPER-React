import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CartItems = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  
  const handleCheckout = async () => {
    const totalAmount = getTotalCartAmount();
    const loginId = 1; 

    try {
      const response = await axios.post(
        `http://localhost:8080/payment/save/${loginId}`,
        {
          totalAmount: totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      alert(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className="cartitems-quantily">
                  {cartItems[e.id]}
                </button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>

          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>

          <hr />

          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>₹{getTotalCartAmount()}</h3>
          </div>

          
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
