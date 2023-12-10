import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button, Dropdown} from 'react-bootstrap'
import {changeBrand, fetchBrands} from "../../http/itemAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChangeBrand =  observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState("")
    const {item} = useContext(Context)

    useEffect(() => {
        fetchBrands().then(data => item.setBrands(data))
    }, [])
    const changeNameBrand = () =>{
        console.log(item.selectedBrand.id, value)
        changeBrand(item.selectedBrand.id, value, country).then(data =>  {onHide()})
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div>
                        <Form.Text>Бренд</Form.Text>
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
                    <Form.Control placeholder={'Введите новое название бренда'} value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Form.Control className="mt-1" placeholder={'Введите новую страну-производитель бренда'} value={country} onChange={(e) => setCountry(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={changeNameBrand}>
                    Изменить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ChangeBrand
