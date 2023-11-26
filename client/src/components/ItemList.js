import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import Item from './Item'
import '../styles/ItemList.css'
import { Row } from 'react-bootstrap'
import Pages from "./Pages";

const ItemList = observer(() => {
  const { item } = useContext(Context)
  return (<div>
          {item.items.length !== 0 ? <div>
              <Row className="list">
              {item.items.map((item) => (
                  <Item key={item.id} item={item} />
              ))}
              </Row>
              <div className='d-flex justify-content-center'>
                  <Pages/>
              </div>
          </div> : <div className="find">
            <div className='falseFind'/>
            <span>Товары с такими параметрами не найдены</span>
          </div>}

    </div>
  )
})

export default ItemList
