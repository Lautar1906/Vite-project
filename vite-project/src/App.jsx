import { useState } from 'react';

// URLs de placeholder para los logos
// Esto evita los errores "Could not resolve" ya que son rutas web válidas.
const reactLogoPlaceholder = 'https://placehold.co/60x60/61DAFB/FFFFFF?text=React';
const viteLogoPlaceholder = 'https://placehold.co/60x60/747BFF/FFFFFF?text=Vite';

// Estilos CSS básicos incluidos directamente en el componente App
// para hacer el código autocontenido y evitar errores de resolución de archivos.
const appCss = `
body {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

.main-content {
  padding-top: 80px; /* Espacio para la barra de navegación fija */
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbcc);
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

h1 {
  font-size: 60px;
  font-family: "Alfa Slab One", serif;
  text-align: center;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 100vw;
}

h1 small {
  color: #00b7ff;
}

footer {
  background-color: #f0f0f0;
  color: #333;
  padding: 20px;
  font-family: sans-serif;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
}

.footer-categories,
.footer-contact {
  flex: 1;
  min-width: 200px;
  margin: 10px;
}

.footer-categories h3,
.footer-contact h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.footer-categories ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

.footer-categories li {
  margin-bottom: 5px;
}

.footer-categories a {
  color: #333;
  text-decoration: none;
}

.footer-contact p {
  margin-bottom: 5px;
  text-align: center;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  font-size: 0.8em;
  width: 100%;
}

.footer-contact svg {
  margin: 0 5px;
}
`;

const navbarCss = `
nav {
  position: sticky; /* Cambiado a sticky para que la barra se quede arriba al hacer scroll */
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  height: auto;
  padding: 10px 20px;
  background: linear-gradient(180deg, rgba(24, 214, 217, 1) 0%, rgba(0, 251, 255, 1) 51%, rgba(245, 245, 245, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#18D6D9", endColorstr="#F5F5F5", GradientType=0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantallas pequeñas */
}

nav .logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 20px;
}

nav .list {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  list-style: none; /* Eliminar viñetas de la lista */
  flex-grow: 1; /* Permite que la lista ocupe el espacio disponible */
  justify-content: flex-start; /* Alinea los elementos de la lista al inicio */
}

nav .list li {
  margin-left: 15px;
}

nav .list li:first-child {
  margin-left: 0;
}

nav .list a {
  display: block;
  text-transform: uppercase;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav .list a:hover {
  border-bottom: 4px solid white;
}

.search-container {
  display: flex;
  align-items: center;
  margin-left: auto; /* Empuja el contenedor de búsqueda a la derecha */
}

.search-container input[type="text"] {
  padding: 8px;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  color: white;
  margin-right: 10px;
  width: 120px; /* Ancho fijo para el input de búsqueda */
}

.search-container input[type="text"]::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-container button {
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 8px 10px;
}

/* Estilos para el icono de barras (para menú responsive) */
.icon-bars {
  display: none; /* Oculto por defecto en desktop */
}

.icon-bars .line {
  width: 30px;
  height: 5px;
  background-color: white;
  margin: 5px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  nav .logo {
    margin-bottom: 10px;
    margin-right: 0;
  }

  nav .list {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 10px;
  }

  nav .list li {
    margin-left: 0;
    margin-bottom: 10px;
    width: 100%;
  }

  nav .list a {
    padding: 10px;
    border-bottom: 2px solid white;
  }

  nav .list a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .search-container {
    width: 100%;
    margin-top: 10px;
    justify-content: center; /* Centrar en móvil */
  }

  .search-container input[type="text"] {
    width: 70%; /* Ajustar ancho para el botón en móvil */
    margin-right: 5px;
  }

  .icon-bars {
    display: block; /* Mostrar el icono de barras en pantallas pequeñas */
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
`;

// Componente Card (implementación básica)
function Card() {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>Componente Card</h3>
      <p>Este es un componente de ejemplo para Card.</p>
    </div>
  );
}

// Componente Home (implementación básica)
function Home() {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h2>Componente Home</h2>
      <p>Bienvenido a la página principal.</p>
    </div>
  );
}

// Componente Navbar (implementación básica)
function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={viteLogoPlaceholder} alt="Dmore Bikes Logo" style={{ height: '40px' }} />
      </div>
      <ul className="list">
        <li><a href="https://lautar1906.github.io/3/cards" rel="noopener noreferrer">Bicicletas</a></li>
        <li><a href="https://lautar1906.github.io/2/galery" rel="noopener noreferrer">Repuestos</a></li>
        <li><a href="https://lautar1906.github.io/5/Form" rel="noopener noreferrer">Contactanos</a></li>
      </ul>
      <div className="search-container">
        <input type="text" placeholder="Buscar..." />
        <button className="search-button" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </div>
      <div className="icon-bars">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Inyecta los estilos CSS directamente en el DOM */}
      <style>{appCss}</style>
      <style>{navbarCss}</style>

      <Navbar />

      <div className="main-content">
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogoPlaceholder} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogoPlaceholder} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1> <small className="text-body-secondary">Dmore</small> Bikes</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <Card />
          <Home />
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      <footer>
        <div className="footer-categories">
          <h3>Categorías</h3>
          <ul>
            <li><a href="/cards" rel="noopener noreferrer">BICICLETAS</a></li>
            <li><a href="/galery" rel="noopener noreferrer">REPUESTOS</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contacto</h3>
          <p>Email: dmorebikes@gmail.com</p>
          <a href="https://www.facebook.com/?locale=es_LA" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/?flo=true" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Dmore Bikes. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}