import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'; // Asegúrate de tener los estilos CSS adecuados

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de autenticación (aquí deberías verificar con tu backend)
    const validUsername = 'usuario'; // Nombre de usuario válido
    const validPassword = 'contraseña'; // Contraseña válida

    if (userData.username === validUsername && userData.password === validPassword) {
      // Aquí puedes realizar acciones de autenticación exitosa (por ejemplo, redireccionar a otra página)
      console.log('Inicio de sesión exitoso');
      setLoginError(false);
      setUserData({ username: '', password: '' }); // Limpiar los campos
    } else {
      // Si el inicio de sesión falla, muestra un mensaje de error
      setLoginError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='formulario-login-container'>
      <Form.Group controlId="formUsername">
        <Form.Label className='labels'>Usuario</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Ingresa tu usuario"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className='labels'>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña"
        />
        {loginError && <Form.Text className="text-danger">Credenciales inválidas.</Form.Text>}
      </Form.Group>

      <Button variant="danger" type="submit">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default Login;
