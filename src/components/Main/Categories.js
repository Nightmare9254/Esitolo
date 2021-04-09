import React from 'react';
import { Category } from '../SingleComponents/Category';
import images from '../../assets/CategoryImg/index';

const Categories = () => {
  return (
    <div className="main__categories">
      <Category link="home" imgSrc={images.House} name="Home" />
      <Category link="garden" imgSrc={images.Garden} name="Garden" />
      <Category link="music" imgSrc={images.Music} name="Music" />
      <Category link="sport" imgSrc={images.Sport} name="Sport" />
      <Category link="pets" imgSrc={images.Pets} name="Pet Supplies" />
      <Category link="jewelry" imgSrc={images.Jewelry} name="Jewelry" />
      <Category link="tech" imgSrc={images.Rtv} name="RTV  AGD" />
      <Category link="toys" imgSrc={images.Toys} name="Toys" />
      <Category link="clothes" imgSrc={images.Clothes} name="Clothes" />
      <Category link="books" imgSrc={images.Books} name="Books" />
      <Category link="consoles" imgSrc={images.Consoles} name="Consoles" />
      <Category
        link="automotive"
        imgSrc={images.Automotive}
        name="Automotive"
      />
      <Category link="travel" imgSrc={images.Travel} name="Travel" />
      <Category link="other" imgSrc={images.Other} name="Other" />
    </div>
  );
};

export default React.memo(Categories);
