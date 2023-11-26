import React, {useContext, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button, Dropdown} from 'react-bootstrap'
import {deleteBrand, fetchBrands} from "../../http/itemAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DelBrand =  observer(({show, onHide}) => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchBrands().then(data => item.setBrands(data))
    }, [])
    const DeleteBrand = () =>{
        deleteBrand(item.selectedBrand.id).then(data =>  {onHide()})
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div>
                        <Form.Text>Выберите бренд для удаления</Form.Text>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle variant='outline-dark'>{item.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {item.brands.map(brand =>
                                    <Dropdown.Item
                                        onClick={() =>item.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
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
                <Button variant="outline-danger" onClick={DeleteBrand}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DelBrand
