import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// const env = require("dotenv").config({ path: "./.env" });

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // fetch("/config").then(async (r) => {
    //   const { publishableKey } = await r.json();
    // });
    // setStripePromise(loadStripe(publishableKey));
    // console.log(process.env.STRIPE_PUBLISHABLE_KEY);
    // console.log(process.env.STRIPE_PUBLISHABLE_KEY);
    setStripePromise(
      loadStripe(
        "pk_test_51PEIQsG2ZLAQPYCBdwxuIeaVa06FikiVqecYt1rCOS5ln00ROoL1BL4gyYfu2HngNxbq1kB8FZrGmzefQMfau1w700p6fMAMzr"
      )
    );
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className="stripe">
      <h1 className="h1">Stripe testing link</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
