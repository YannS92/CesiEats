import { CardElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, cartProducts } from "../stores/cart/cartSlice";
import { getAddress, clearAddress } from "../stores/userInfo/addressSlice";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from "./elements/Button";

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

export const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(cartProducts);
  const address = useSelector(getAddress);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !cart?.length || !address) {
      return;
    }

    setLoading(true);
    try {
      const { error: backendError, clientSecret } = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          orderItems: cart,
          userId: '',
          shippingAddress: address
        })
      }).then(r => r.json());

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      );
      if (backendError || stripeError) {
        console.log(backendError || stripeError);
      } else if (paymentIntent.status === 'succeeded') {
        dispatch(clearAddress());
        dispatch(clearCart());
        navigate('/payment-success');
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, product) => {
      const productTotal = parseFloat(product.price) * product.amount;
      return sum + productTotal;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <form className="md:-2/3 md:mx-auto px-2 pt-1" id="payment-form" onSubmit={handleSubmit}>
      <label htmlFor="card-element" className="pt-4 text-2xl md:text-center">Please enter your card details</label>
      <div className="my-4">
        <CardElement id="card-element" />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        {cart.map((product) => (
          <div key={product.id} className="flex justify-between mt-2">
            <span>{product.name} (x{product.amount})</span>
            <span>{(product.price * product.amount).toFixed(2)}$</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{calculateTotal()}$</span>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
