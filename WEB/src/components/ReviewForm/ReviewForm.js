import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validación para texto vacío
    if (revText.current.value.trim() === '') {
      alert('Por favor, ingresa tu revisión antes de publicar.');
      return;
    }

    // Si el campo de texto no está vacío, se ejecuta la función de envío del formulario
    handleSubmit(e);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="review.ControlTextarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
      </Form.Group>
      <Button variant="outline-danger" type="submit">Publicar</Button>
    </Form>
  );
};

export default ReviewForm;
