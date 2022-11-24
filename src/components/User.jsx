import React, { useState } from 'react'
import { Breadcrumb, Button, Form } from 'react-bootstrap'


function User() {

    let [user, setUser] = useState({});

    function submit(e){
        e.preventDefault();
    }
    
  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>User</Breadcrumb.Item>
    </Breadcrumb>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control type="number" placeholder="Number" />
      </Form.Group>
      <Button variant="primary" onClick={(e)=>{ submit(e) }}>
        Submit
      </Button>
    </>
  )
}

export default User