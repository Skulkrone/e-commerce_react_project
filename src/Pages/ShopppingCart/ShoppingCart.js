import React from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";

export default function ShoppingCart() {
  const storeState = useSelector((state) => state);

  const clearCart = () => {
    for (let i = 0; i < storeState.cart.length; i++) {
      const objDeleted = {
        ...storeState.cart[i],
        quantity: 0,
      };

      dispatch({
        type: "DELETEITEM",
        payload: objDeleted,
      });
    }
  };

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const indexItem = storeState.cart.findIndex((obj) => obj.id === id);
    console.log(indexItem);

    const objDeleted = {
      ...storeState.cart[indexItem],
      quantity: 0,
    };

    dispatch({
      type: "DELETEITEM",
      payload: objDeleted,
    });
  };

  const handleChange = (event, id) => {
    const indexItem = storeState.cart.findIndex((obj) => obj.id === id);

    const objUpdated = {
      ...storeState.cart[indexItem],
      quantity: Number(event.target.value),
    };

    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated,
    });
  };

  let totalPrice = 0;
  // si tableau n'a pas d'objet à l'intérieur (state vide) alors on ne fait rien
  // sinon on vient dans notre tableau : const item of
  // et pour chaque objet unique itemPrice, on mutliplie le prix de l'item par la quantité du panier
  if (storeState.cart.length !== 0) {
    for (const item of storeState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }
  }

  return (
    <div className="global-container">
      <p className="heading-cart">Votre panier :</p>
      <ul className="cart-list">
        {storeState.cart.map((item) => (
          <li key={item.id}>
            <img
              src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
              alt="produit panier"
            />
            <div className="bloc-cart-infos">
              <h4>{item.title}</h4>
              <p>Prix : {item.price}</p>
            </div>
            <div className="bloc-input">
              <label htmlFor="quantityInput">Quantité</label>
              <input
                onChange={(e) => handleChange(e, item.id)}
                id="quantityInput"
                type="number"
                value={item.quantity}
                min="1"
              />
            </div>
            <div
              className="remove-object"
              onClick={(e) => handleDelete(item.id)}
              key={item.id}
            >
              X
            </div>
          </li>
        ))}
      </ul>
      <p className="total-price">Total : {`${totalPrice.toFixed(2)}€`}</p>
      <div className="container-btn">
        <button className="btn-cart">Procéder au paiement</button>
        <button className="btn-clear" onClick={clearCart}>
          Vider le panier
        </button>
      </div>
    </div>
  );
}
