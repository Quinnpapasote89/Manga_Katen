import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Registro.css';

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
      // Aquí puedes enviar los datos a tu backend o realizar alguna acción con los datos del usuario
      console.log('Datos del usuario:', userData);
      // Limpiar los campos después de enviar los datos
      setUserData({ username: '', password: '', confirmPassword: '' });
      setPasswordMatch(true);
    } else {
      // Si las contraseñas no coinciden, mostrar un mensaje de error
      setPasswordMatch(false);
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

      <Button variant="danger" type="submit" style={{marginTop:'2em'}}>
        Registrarse
      </Button>
    </Form>
  );
};

export default Registro;
