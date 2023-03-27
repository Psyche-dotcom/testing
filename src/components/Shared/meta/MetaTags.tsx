import Head from "next/head";
import React from "react";

export default function CustomHead({
  title = "VREEL™",
  description = "We make you look better! Our Web3 interface curates and displays your story amazingly.",
  image = "https://res.cloudinary.com/alasim/image/upload/v1661315427/vreel-logo_eejjqs.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
