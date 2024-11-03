const Mapa = () => {
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33841.65713644436!2d2.1024027618211156!3d41.4347048130016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bd5b6e115a83%3A0xabf60b66408d4ed4!2sCan%20Cortada!5e0!3m2!1ses!2ses!4v1730636516443!5m2!1ses!2ses"
        width="100%"
        height="450"
        style={{ border: "0", display: "block", margin: "0" }} // Asegúrate de que el iframe sea un bloque
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Mapa;
