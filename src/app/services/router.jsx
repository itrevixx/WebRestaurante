// src/services/router.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout/Layout.jsx";
import Home from "../../pages/Home/Home.jsx";
import Reserves from "../../pages/Reserves/Reserves.jsx";
import Events from "../../pages/Events/Events.jsx";
import Menus from "../../pages/Menus/Menus.jsx";
import Contact from "../../pages/Contact/Contact.jsx";
import Cancelation from "../../pages/Cancelation/Cancelation.jsx";
import ScrollToTop from "../../components/ScrollToTop"; // Importamos ScrollToTop
import PageTransition from "../../components/PageTransition"; // Importa el componente PageTransition

const Router = () => (
  <BrowserRouter>
    <ScrollToTop /> {/* Aquí se agrega ScrollToTop para que al cambiar de página siempre empiece desde arriba */}
    <Layout>
      <PageTransition> {/* Hace una animación suave al cambiar de página */}	  
        <Routes>
          <Route index element={<Home />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservations/cancel/:id" element={<Cancelation />} />
          {/* Ruta de error 404 */}
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </PageTransition>
    </Layout>
  </BrowserRouter>
);

export default Router;
