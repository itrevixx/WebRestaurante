import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import Reserves from "../../pages/Reserves/Reserves.jsx";
import Layout from "../../components/Layout.jsx";

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/reservas" element={<Reserves />} />
        {/* Es muy recomendable añadir esta ruta para obtener un mensaje de error en el caso de que la ruta no exista. De lo contrario, si la ruta no existe llegaremos a una página en blanco */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
