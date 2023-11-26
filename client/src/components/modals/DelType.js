import React, {useContext, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button, Dropdown} from 'react-bootstrap'
import {deleteType, fetchTypes} from "../../http/itemAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DelType =  observer(({show, onHide}) => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    }, [])
    const DeleteType = () =>{
        deleteType(item.selectedType.id).then(data =>  {onHide()})
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div>
                        <Form.Text>Выберите тип для удаления</Form.Text>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle variant='outline-dark'>{item.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {item.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() =>item.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-danger" onClick={DeleteType}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DelType
