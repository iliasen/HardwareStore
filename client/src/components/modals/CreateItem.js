import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createItem, fetchBrands, fetchTypes} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";

const CreateItem = observer(({show, onHide}) => {
  const {item} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  const [about, setAbout] = useState('')
  useEffect(() => {
    fetchTypes().then(data => item.setTypes(data))
    fetchBrands().then(data => item.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))//если нормер совподает с элементом итерации то мы создаём новый объект и по ключу заменяем поле(value) если ничего не происходит то возвращаем тот-же объект
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addItem = () => {
    const formData = new FormData()//другой способ создания(form-data т.к нам нужен файл)
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', item.selectedBrand.id)
    formData.append('typeId', item.selectedType.id)
    formData.append('info', JSON.stringify(info))//переганяем массив в json строку
    formData.append('about', about)
    createItem(formData).then(data => onHide())
  }

  return (
      <Modal
          show={show}
          onHide={onHide}
          centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить товар
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='d-flex justify-content-between' style={{width: 350}}>
              <div>
                <Form.Text>Тип</Form.Text>
                <Dropdown className="mt-2 mb-2">
                  <Dropdown.Toggle variant='outline-dark'>{item.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.types.map(type =>
                        <Dropdown.Item
                            onClick={() => item.setSelectedType(type)}
                            key={type.id}
                        >
                          {type.name}
                        </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div >
                <Form.Text>Бренд</Form.Text>
                <Dropdown className="mt-2 mb-2">
                  <Dropdown.Toggle variant='outline-dark'>{item.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.brands.map(brand =>
                        <Dropdown.Item
                            onClick={() => item.setSelectedBrand(brand)}
                            key={brand.id}
                        >
                          {brand.name}
                        </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <Form.Text className="mt-3"> Название товара</Form.Text>
            <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Введите название товара"
            />
            <Form.Text className="mt-3"> Цена товара</Form.Text>
            <Form.Control
                value={price}
                onChange={e => setPrice(Number(e.target.value))}

                placeholder="Введите стоимость устройства"
                type="number"
            />
            <Form.Text className="mt-3"> Фото товара</Form.Text>
            <Form.Control
                type="file"
                onChange={selectFile}
            />
            <Form.Control as='textarea'
                value={about}
                onChange={e => setAbout(e.target.value)}
                className="mt-3"
                placeholder="Введите описание товара"
            />

            <hr/>
            <Button
                variant={"outline-dark"}
                onClick={addInfo}
            >
              Добавить новое свойство
            </Button>
            {info.map(i =>
                <Row className="mt-4" key={i.number}>
                  <Col md={4}>
                    <Form.Control
                        value={i.title}
                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        placeholder="Введите название свойства"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                        value={i.description}
                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                        placeholder="Введите описание свойства"
                    />
                  </Col>
                  <Col md={4}>
                    <Button
                        onClick={() => removeInfo(i.number)}
                        variant={"outline-danger"}
                    >
                      Удалить
                    </Button>
                  </Col>
                </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success" onClick={addItem}>Добавить</Button>
        </Modal.Footer>
      </Modal>
  );
});

export default CreateItem;