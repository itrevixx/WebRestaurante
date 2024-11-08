import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import Home from "../../pages/Home/Home.jsx";
import Reserves from "../../pages/Reserves/Reserves.jsx";
import Events from "../../pages/Events/Events.jsx";
import Menus from "../../pages/Menus/Menus.jsx";
import Contact from "../../pages/Contact/Contact.jsx";
import Cancelation from "../../pages/Cancelation/Cancelation.jsx";

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/reservas" element={<Reserves />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reserves" element={<Reserves />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservations/cancel/:id" element={<Cancelation />} />
        {/* Es muy recomendable añadir esta ruta para obtener un mensaje de error en el caso de que la ruta no exista. De lo contrario, si la ruta no existe llegaremos a una página en blanco */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
