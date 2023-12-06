import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";


const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const isAuthenticated = username !== null;
  const isRoot = username === "Root";

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCollapse = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    // Eliminamos el nombre de usuario del localStorage
    localStorage.removeItem('username');
    // Recargamos la página
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "red" }}>
          <FontAwesomeIcon icon={faBookJournalWhills} /> KATEN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={handleCollapse} />
        <Navbar.Collapse id="navbarScroll" className={expanded ? "show" : ""}>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="/mangaList">
              Lista Animes
            </NavLink>
            {isAuthenticated && isRoot && (
              <>
                <Navbar.Collapse className="justify-content-end">
                  <Nav>
                    <NavLink className="nav-link" to="/registrar-anime">
                      Añadir Anime
                    </NavLink>
                    <NavLink className="nav-link" to="/modificar-anime">
                      Modificar Anime
                    </NavLink>
                    <NavLink className="nav-link" to="/eliminar-anime">
                      Eliminar Anime
                    </NavLink>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <Navbar.Text>
              <span className="me-2">Bienvenido, {username}</span>
              <Button variant="outline-danger" className="me-2" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Navbar.Text>
          )}
          {!isAuthenticated && (
            <>
              <NavLink className="nav-link" to="/ingresar">
                <Button variant="outline-danger" className="me-2">
                  Ingresar
                </Button>
              </NavLink>
              <NavLink className="nav-link" to="/registrar">
                <Button variant="outline-info" className="me-2">
                  Registrar
                </Button>
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;