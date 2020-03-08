import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "views/Dashboard.js";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Dashboard} />
  </BrowserRouter>,
  document.getElementById("root")
);
