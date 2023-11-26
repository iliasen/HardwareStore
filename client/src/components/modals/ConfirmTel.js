import React, {useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Button, Form} from 'react-bootstrap'
import {Context} from "../../index";

const ConfirmTel = ({ show, onHide }) => {

    const {number} = useContext(Context)
    const tel =()=> {
        let telNum = document.getElementById("phone");
        number.setNumber(telNum.value)
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Подтверждение телефона
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder='введите код из SMS' type='number'/>
                </Form>
                <div className='mt-2' style={{paddingLeft: 5}}>Не получили SMS? <span style={{color: 'blue',cursor: 'pointer'}}>Отправить по новой.</span></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => tel()}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmTel
