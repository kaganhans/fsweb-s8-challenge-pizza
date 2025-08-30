import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import Success from "./pages/Success.jsx";

export default function App() {
  return (
    <>
      {/* Header sadece kırmızı bar */}
      <header
        style={{
          background: "var(--kirmizi)",
          height: "60px"
        }}
      />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/siparis" component={Order} />
        <Route exact path="/tesekkurler" component={Success} />
        <Redirect to="/" />
      </Switch>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
