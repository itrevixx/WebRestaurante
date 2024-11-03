import "./Menus.css";

const Menus = () => {
  return (
    <div className="menu-container">
      <div className="menu">
        <h2>Menu Entresemana</h2>
        <h3>Primeros</h3>
        <div className="menu-list-container">
          <ul className="menu-list">
            <li>Ensalada César</li>
            <li>Sopa de Calabaza</li>
            <li>Risotto de Setas</li>
            <li>Tortilla Española</li>
            <li>Pasta al Pesto</li>
          </ul>
          <ul className="menu-list">
            <li>Crema de Espárragos</li>
            <li>Gazpacho Andaluz</li>
            <li>Croquetas de Jamón</li>
            <li>Quiche de Verduras</li>
            <li>Albóndigas en Salsa</li>
          </ul>
        </div>
        <h3>Segundo</h3>
        <div className="menu-list-container">
          <ul className="menu-list">
            <li>Pescado a la Plancha</li>
            <li>Pollo al Ajillo</li>
            <li>Carne Asada</li>
            <li>Berenjenas Rellenas</li>
            <li>Tacos de Carnitas</li>
          </ul>
          <ul className="menu-list">
            <li>Estofado de Ternera</li>
            <li>Salmón al Horno</li>
            <li>Lasaña de Carne</li>
            <li>Pasta con Salsa de Tomate</li>
            <li>Pizza Margarita</li>
          </ul>
        </div>
        <ul>
          <h3>Postres</h3>
          <li>Tarta de Chocolate</li>
          <li>Flan de Caramelo</li>
          <li>Tiramisu</li>
          <li>Cheesecake de Fresas</li>
          <li>Panna Cotta de Vainilla</li>
        </ul>
        <br />
        <p>*Bebida y cafe incluídos</p>
      </div>
    </div>
  );
};

export default Menus;
