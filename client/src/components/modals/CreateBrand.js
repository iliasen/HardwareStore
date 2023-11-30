import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap'
import {createBrand} from "../../http/itemAPI";

const CreateBrand = ({ show, onHide }) => {
    const [name, setName] = useState('')
    const [country, setCountry] = useState("")
    const addBrand = () =>{
        createBrand({name,country}).then((data) =>  {
            setName('')
            onHide()
        })
    }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={'Введите название бренда'} value={name} onChange={(e) => setName(e.target.value)}/>
          <Form.Control className="mt-1" placeholder={'Введите страну бренда'} value={country} onChange={(e) => setCountry(e.target.value)}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
