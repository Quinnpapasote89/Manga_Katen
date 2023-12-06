import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="1">
          Buscar:
        </Form.Label>
        <Col sm="10" style={{width:'30%'}}>
          <Form.Control type="text" placeholder="Ingrese el título del manga" onChange={handleChange} />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
