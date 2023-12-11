import React, {useContext, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Button, Dropdown, Form} from 'react-bootstrap'
import {deleteOneItem, fetchAllItems} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DelItem =  observer(({show, onHide}) => {
    const {item} = useContext(Context)


    useEffect(() => {
        fetchAllItems().then((data) =>{item.setItems(data)})
    }, [])

    const DeleteItem = () =>{
        console.log(item.selectedItem.id)
        deleteOneItem(item.selectedItem.id).then(data =>  {onHide()})
    }
    console.log(item)
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Text>Выберите товар для удаления</Form.Text>
                <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle variant='outline-dark'>{item.selectedItem.name || "Выберите товар"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {item.items.map(itemForDel =>
                        <Dropdown.Item
                            onClick={() =>item.setSelectedItem(itemForDel)}
                            key={itemForDel.id}
                        >
                            {itemForDel.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-danger" onClick={DeleteItem}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DelItem
