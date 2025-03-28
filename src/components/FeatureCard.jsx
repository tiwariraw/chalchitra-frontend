"use client";

import React from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PeopleIcon from "@mui/icons-material/People";

const plans = [
  {
    title: "Watch in your TV",
    des: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    logo: <LiveTvIcon sx={{ height: "40px", width: "40px" }} />,
  },
  {
    title: "Download shows to watch offline",
    des: "Save your favourites easily and always have something to watch.",
    logo: <CloudDownloadIcon sx={{ height: "40px", width: "40px" }} />,
  },
  {
    title: "Create profiles for kids",
    des: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    logo: <PeopleIcon sx={{ height: "40px", width: "40px" }} />,
  },
];

const cardStyle = {
  width: "300px",
  height: "300px",
  background:
    "linear-gradient(149deg, #3b3b3b 6.96%,  #36454F 40.17%, #36454F 73.39%)",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  textAlign: "center",
  padding: "20px",
  border: "1px solid grey",
  transition:
    "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease-in-out",
};

const FeatureCard = ({ logo, title, des }) => {
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div>{logo}</div>
      <h3
        style={{
          margin: "25px 0",
          fontSize: "1.8rem",
          color: "white",
          lineHeight: "35px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#d1d1d1",
          fontSize: "1rem",
          margin: "5px 0",
          textAlign: "center",
        }}
      >
        {des}
      </p>
    </div>
  );
};

const Feature = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        More Reason to join
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
          <FeatureCard
            key={index}
            logo={plan.logo}
            title={plan.title}
            des={plan.des}
          />
        ))}
      </div>
    </div>
  );
};

export default Feature;
