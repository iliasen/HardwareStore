import React, { useState, useEffect } from 'react';
import { Col, Image } from 'react-bootstrap';
import rate from '../res/star.png';
import '../styles/Item.css';
import { useNavigate } from 'react-router-dom';
import { ITEM_ROUTE } from '../utils/consts';
import AverageRating from './modals/AverageRating';
import { fetchItemImage } from '../http/itemAPI';

const Item = ({ item }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchItemImage(item.img)
            .then((data) => {
                setImg(URL.createObjectURL(data));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching item image:', error);
                setIsLoading(false);
            });
    }, []);

  return (
      <Col md={3} onClick={() => navigate(ITEM_ROUTE + '/' + item.id)}>
        <div className="items-container">
          {isLoading ? (
              <div className="loading-indicator">Loading...</div>
          ) : (
              <Image className="Item_img" src={img} />
          )}
          <div className="description">
            <header className="type">{item.type.name}</header>
            <div className="rate_container">
              <AverageRating itemId={item.id} />
              <Image className="star_img" src={rate} />
            </div>
          </div>
          <div className="d-flex align-items-center">{item.name}</div>
        </div>
      </Col>
  );
};

export default Item;