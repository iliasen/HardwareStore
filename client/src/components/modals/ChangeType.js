import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button, Dropdown} from 'react-bootstrap'
import {changeType, fetchTypes} from "../../http/itemAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ChangeType =  observer(({show, onHide}) => {
  const [value, setValue] = useState('')
  const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    }, [])
  const changeNameType = () =>{
    changeType(item.selectedType.id, value).then(data =>  {onHide()})
  }

  return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Изменить тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <div>
                <Form.Text>Тип</Form.Text>
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
            <Form.Control placeholder={'Введите новое название типа'} value={value} onChange={(e) => setValue(e.target.value)}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark"  onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={changeNameType}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
  )
})

export default ChangeType
