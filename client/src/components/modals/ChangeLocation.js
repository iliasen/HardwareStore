import React, {useContext,  useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button} from 'react-bootstrap'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import '../../styles/ModalWindowChangeLocation.css'

const ChangeLocation =  observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const {location} = useContext(Context)

    const changeLocation = () => {
        location.setLocation(value)
        onHide()

    }


    return (
        <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton/>
                <Modal.Body className="locationContainer">
                    <div className="map" />
                    <Form.Text className="wereAreYou">
                        {location.location && <div> Вам показаны условия доставки и оплаты в{" "}<strong>{location.location}</strong></div>}
                    </Form.Text>
                    <Form>
                        <Form.Control className='newLocation'
                            placeholder={"Укажите ваш населённый пункт"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="outline-success" style={{ width: 300 }} onClick={changeLocation}>
                        Изменить
                    </Button>
                </Modal.Footer>
        </Modal>
    )
})

export default ChangeLocation
