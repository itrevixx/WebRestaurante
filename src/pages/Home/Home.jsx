// Home.jsx
import { useNavigate } from "react-router-dom";
import { Parallax } from "react-parallax";
import "./Home.css";
import imgcomedor2 from "../../assets/imgcomedor2.jpg";
import Mapa from "../../components/Mapa";
import chuletonImg from "../../assets/chuleton.jpg";
import kamadoImg from "../../assets/kamado.jpg";

const Home = () => {
  const navigate = useNavigate();

  const navigateReserves = () => {
    navigate("/reservas");
  };

  const navigateMenus = () => {
    navigate("/menus");
  };

  return (
    <div className="home-container">
      <div className="home-image-container">
        <p>RESTAURANTE MASIA MANDARINA</p>
      </div>
      <p className="home-img-footer">Restaurante Masía - Barcelona</p>
      <div className="row-img-left">
        <img src={imgcomedor2} alt="Comedor de Mandarina" />
        <div className="col-right">
          <h1>
            RESTAURANTE MASIA <br />
            MANDARINA
          </h1>
          <h2>Vive una experiencia única</h2>
          <p>
            Nuestro restaurante masía está ubicado en Barcelona. Contamos con un
            gran espacio donde degustar la excepcional cocina a la brasa en
            Kamado, nuestros famosos chuletones, calçotades y más especialidades
            de la casa.
          </p>
        </div>
      </div>

      {/* Sección con parallax para chuleton */}
      <Parallax bgImage={chuletonImg} strength={500}>
        <div style={{ height: 600 }}>
          <div className="banner-img-content">
            <h1>NUESTRA COMIDA TE SORPRENDERÁ</h1>
            <p>
              Ofrecemos a nuestros clientes siempre cocina de la máxima calidad.
              En la búsqueda de nuestra excelencia, siempre exigimos lo mejor de
              nosotros para deleite de nuestros comensales. Es por eso que
              siempre cocinamos con los mejores productos frescos, de temporada
              y de proximidad.
            </p>
            <button onClick={navigateReserves}>HAZ TU RESERVA</button>
          </div>
        </div>
      </Parallax>

      <div className="row-img-right">
        <div className="col-left">
          <h1>DESCUBRE NUESTROS MENÚS</h1>
          <h2>Siéntete como en casa</h2>
          <p>
            Nuestro restaurante está localizado en una típica casa catalana del
            siglo XIII situada en la localidad barcelonesa de Rubí. Tanto dentro
            como fuera de la masía hay varios espacios para cualquier tipo de
            evento con nuestros menús especiales para grupos.
          </p>
          <button onClick={navigateMenus}>VER MENÚS</button>
        </div>
        <img src={imgcomedor2} alt="Comedor de Mandarina" />
      </div>

      {/* Sección con parallax para el Kamado */}
      <Parallax
        bgImage={kamadoImg} // Utiliza la imagen del Kamado
        strength={500}
      >
        <div style={{ height: 600 }}>
          <div className="banner-img-content">
            <h1>DESCUBRE EL KAMADO</h1>
            <p>
              El Kamado actual es la evolución del Mushikamado japonés, que se
              utilizaba para cocinar el arroz y las sopas. Es un horno conocido
              por su cocción lenta y a baja temperatura que consigue en todos
              los platos ese sabor tan explosivo y característico.
            </p>
          </div>
        </div>
      </Parallax>

      <Mapa />
      <div className="footer">
        <p>Mandarina</p>
        <p>Av. Campo 5, Barcelona </p>
        <p>Horario: Lunes a Viernes de 13:00 a 18:00</p>
        <p>Whatsapp: (+34) 652-864-950</p>
        <p>Instagram: @mandarina</p>
        <p>© 2024 Mandarina. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Home;
