import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "../style/app.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
