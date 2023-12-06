import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import './Registro.css';
import { toast } from 'react-toastify';

const Registro = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (userData.password === userData.confirmPassword) {
      // Enviamos los datos del usuario al servidor
      api.post('api/v1/usuarios', {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        console.log('Usuario creado:', response.data);
        // Limpiar los campos después de enviar los datos
        setUserData({ username: '', password: '', confirmPassword: '' });
        setPasswordMatch(true);
        // Mostrar una alerta de éxito
        toast.success('Usuario creado con éxito!');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Mostrar una alerta de error
        toast.error('Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo.');
      });
    } else {
      // Si las contraseñas no coinciden, mostrar un mensaje de error
      setPasswordMatch(false);
      // Mostrar una alerta de error
      toast.error('Las contraseñas no coinciden.');
    }
  };


  return (
    <Form onSubmit={handleSubmit} className='formulario-registro-container' style={{marginTop:'5em'}}>
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
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label className='labels'>Confirmar Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirma tu contraseña"
        />
        {!passwordMatch && <Form.Text className="text-danger">Las contraseñas no coinciden.</Form.Text>}
      </Form.Group>

      <Button variant="danger" type="submit" style={{marginTop:'1em'}}>
        Registrarse
      </Button>
    </Form>
  );
};

export default Registro;
