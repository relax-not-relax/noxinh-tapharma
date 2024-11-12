/* eslint-disable no-unused-vars */
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import RootLayout from "./layout/RootLayout";
import ContactLayout from "./layout/ContactLayout";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import NotFound from "./components/NotFound";
import { categoryLoader } from "./data/category-loader";
import SearchProducts from "./pages/SearchProducts";
import Order from "./pages/Order";
import PrivateRoute from "./pages/PrivateRoute";
import { fetchCart } from "./data/cart-loader";
import OrderHistory from "./pages/OrderHistory";
import PrivateRouteHistory from "./pages/PrivateRouteHistory";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={categoryLoader} />

        <Route path="combo/:id" element={<Products />} />
        <Route path="product/search" element={<SearchProducts />} />

        <Route
          path="order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />

        <Route
          path="historyOrder"
          element={
            <PrivateRouteHistory>
              <OrderHistory />
            </PrivateRouteHistory>
          }
        />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactLayout />}>
          <Route path="info" element={<ContactInfo />} />
          <Route path="form" element={<ContactForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
