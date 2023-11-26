import React, {useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button } from 'react-bootstrap'
import {del} from "../../http/userAPI";
import {SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";



const Delete = ({ show, onHide }) => {

    const { user } = useContext(Context)
    let nav = useNavigate()

    const delete_account = async () => {
        let data
        data = await del(user.user.id)
        console.log(data)
        if(data){
            user.setUser({})
            user.setAuth(false)
            localStorage.clear();
            nav(SHOP_ROUTE)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление аккаунта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы точно уверены ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Нет
                </Button>
                <Button variant="outline-danger" onClick={() => {onHide(); delete_account();}}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Delete
