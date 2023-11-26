import React from 'react'
import Modal from 'react-bootstrap/Modal'
import {Button, Form} from 'react-bootstrap'
import {SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const OrderCheck = ({ show, onHide }) => {
    const navigate = useNavigate()

    const good = () => {
        onHide();
        navigate(SHOP_ROUTE)
        window.location.reload()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <Form>
                    <h2>Ваш заказ принят !</h2>
                    <div>Наш менеджэр свяжется с вами в ближайшем времени. 😀</div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={good}>
                    Хорошо
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderCheck
