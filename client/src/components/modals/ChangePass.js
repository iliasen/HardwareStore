import React, {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button } from 'react-bootstrap'
import {change} from "../../http/userAPI";
import {SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";



const ChangePass = ({ show, onHide }) => {

    const { user } = useContext(Context)
    let nav = useNavigate()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const change_password = async (event) => {   event.preventDefault()
        try {
            let id = user.user.id
            let data = await change(id,oldPassword, newPassword)
            user.setUser(data)
            console.log('Change password')

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение пароля
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className='mb-2' type='password' placeholder={'Введите старный пароль'} value={oldPassword}
                                  onChange={(e) => setOldPassword(e.target.value)}/>

                    <Form.Control placeholder={'Введите новый пароль'} type='password' value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={(event) => {onHide(); change_password(event);}}>
                    Изменить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangePass
