"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY)
  : Promise.reject(new Error("Stripe publishable key is missing"));

const plans = [
  {
    id: 1,
    planName: "Mobile",
    nunmerOfDevices: "1",
    resolution: "480p",
    features: ["Good Video Quality", "For phones and Tablet"],
    price: 149,
  },
  // { id: 2, planName: "Basic", resolution: "720p", features: [""], price: "199/mo" },
  {
    id: 3,
    planName: "Standard",
    resolution: "1080p",
    nunmerOfDevices: "2",
    features: [""],
    price: 499,
  },
  {
    id: 4,
    planName: "Premium",
    resolution: "4K + HDR",
    nunmerOfDevices: "4",
    features: [""],
    price: 649,
  },
];

const cardStyle = {
  width: "300px",
  height: "300px",
  background:
    "linear-gradient(149deg, #6C1E41 6.96%, #251743 40.17%, #120c1f 73.39%)",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  textAlign: "center",
  padding: "20px",
  border: "1px solid grey",
  transition:
    "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease-in-out",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "10px 15px",
  border: "none",
  background: "#e50914",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background 0.3s ease-in-out",
};

const SubscriptionCard = ({ plan }) => {
  const handleCheckout = async (name, price) => {
    const res = await fetch("/api/checkout-session", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        price: price,
        origin: window.location.origin,
      }),
    });

    const { id } = await res.json();

    const stripe = await stripePromise;

    stripe?.redirectToCheckout({
      sessionId: id,
    });
  };
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ margin: "15px 0", fontSize: "1.8rem", color: "white" }}>
        {plan.planName}
      </h3>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        &#x20B9; {`${plan.price} /month`}
      </p>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        Max Quality {plan.resolution}
      </p>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        No of Devices Supports {plan.nunmerOfDevices}
      </p>
      <button
        onClick={() => {
          handleCheckout(plan.planName, plan.price);
        }}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b20710")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#e50914")}
      >
        Subscribe
      </button>
    </div>
  );
};

const SubscriptionCards = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        background: "black",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Choose Your Plan
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "1000px",
        }}
      >
        {plans.map((plan, index) => (
          <SubscriptionCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCards;
