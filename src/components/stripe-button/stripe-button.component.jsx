import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishedKey =
    "pk_test_51IQHtaIhuPxmQvYnZmMgskzbSXVYycj8njBkZY18LrMxiGmwKUfdm8NqWvbY4MUaPr8veRvBfE37VStBKgIWnjon00eJMvZrrl";

  const onToken = (token) => {
    console.log(token);
    alert("Horny alert");
  };
  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN CLOTHING LTD"
      billingAddress
      shippingAddress
      allowRememberMe
      image="https://i.kym-cdn.com/entries/icons/original/000/034/421/cover1.jpg"
      currency="USD"
      description={`Your total is ${price}`}
      amout={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishedKey}
    />
  );
};

export default StripeCheckoutButton;
