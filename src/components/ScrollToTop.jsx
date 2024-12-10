// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Cuando la ubicación cambie, desplazamos la página hacia la parte superior
    window.scrollTo(0, 0);
  }, [location]);

  return null; // Este componente no renderiza nada, solo maneja el efecto
};

export default ScrollToTop;
