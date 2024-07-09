import React from "react";

import Header from "./../Header/Header";
import AppRoutes from "../../Routes/AppRoutes";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default Layout;
