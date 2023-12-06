import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css'; // Asegúrate de tener los estilos CSS adecuados
import { toast } from 'react-toastify';
import api from '../../api/axiosConfig';

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

    // Enviamos los datos del usuario al servidor
    api.post('api/v1/usuarios/login', {
        username: userData.username,
        password: userData.password,
    })
    .then((response) => {
        console.log('Inicio de sesión exitoso:', response.data);
        // Guardamos el nombre de usuario en el localStorage
        localStorage.setItem('username', userData.username);
        // Limpiar los campos después de enviar los datos
        setUserData({ username: '', password: '' });
        setLoginError(false);
        // Mostrar una alerta de éxito
        toast.success('Inicio de sesión exitoso!');
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
        // Mostrar una alerta de error
        toast.error('Ocurrió un error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='formulario-login-container' style={{marginTop: '5em'}}>
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

      <Button variant="danger" type="submit" style={{marginTop:'1em'}}>
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default Login;
