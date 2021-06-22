import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ScaleButtonClick } from '../../../framer/Transitions';
import { useLocal } from '../../../hooks/cart';
import Menu from '../../Menu/Menu';
import { ScrollToTop } from '../../SingleComponents/ScrollToTop';
import { useFetch } from '../../../hooks/useFetch';
import TopProducts from '../../SingleComponents/TopProducts';
import moment from 'moment';

const SingleProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imagePosition, setImagePosition] = useState(0);

  useEffect(() => {
    fetch(`https://esitolo-backend.herokuapp.com/products?id=${id}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
      });

    setImagePosition(0);
  }, [id]);

  const { data } = useFetch(`/products/review?id=${id}`);

  useEffect(() => {
    if (product.category !== undefined) {
      const params = new URLSearchParams({
        category: product.category,
        id: id,
      });

      fetch(
        `https://esitolo-backend.herokuapp.com/products/similar?${params.toString()}`
      )
        .then(res => res.json())
        .then(json => {
          setSimilar(json);
        });
    }
  }, [id, loading]);

  const nextImg = () => {
    if (imagePosition >= product.image.length - 1) {
      setImagePosition(0);
      return;
    }
    setImagePosition(imagePosition + 1);
  };
  const preImg = () => {
    if (imagePosition === 0) {
      setImagePosition(product.image.length - 1);
      return;
    }
    setImagePosition(imagePosition - 1);
  };
  ScrollToTop();

  console.log(id);
  const [addItem] = useLocal();
  return (
    <>
      {!loading && (
        <div className="single">
          <div className="single__header">
            <Link to="/">
              <i className="fas fa-arrow-left fa-2x" />
            </Link>

            <Link to="/products">
              <i className="fas fa-search fa-2x" />
            </Link>
          </div>
          <div className="single__product-container-img">
            {product.image.length > 1 && (
              <button
                onClick={() => preImg()}
                className="single__slide single__slide-pre"
              >
                <i className="fas fa-caret-left fa-2x"></i>
              </button>
            )}

            <AnimatePresence>
              <motion.img
                key={imagePosition}
                src={product.image[imagePosition]}
                alt="products"
                className="single__image"
                drag="x"
                dragElastic={1}
                dragConstraints={{ left: 1, right: 1 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -10000) {
                    nextImg();
                  } else if (swipe > 10000) {
                    preImg();
                  }
                }}
              />
            </AnimatePresence>
            {product.image.length > 1 && (
              <button
                onClick={() => nextImg()}
                className="single__slide single__slide-next"
              >
                <i className="fas fa-caret-right fa-2x"></i>
              </button>
            )}
            <p className="single__image-count">
              {imagePosition + 1}/{product.image.length}
            </p>
          </div>
          <div className="single__content">
            <p className="single__name">{product.productName}</p>
            <p className="single__specification">{product.description}</p>
            <Link to="/">
              <p className="single__reviews">Products reviews</p>
            </Link>
            <p className="single__price">{product.price}$</p>
            <div className="single__container-configuration">
              <div className="single__counter single__counter--product">
                <button
                  onClick={() => {
                    if (quantity !== 1) {
                      setQuantity(quantity - 1);
                    }
                    return;
                  }}
                  className="single__action single__action-minus"
                >
                  -
                </button>
                <p className="single__choose-amount">{quantity}</p>
                <button
                  onClick={() => {
                    if (quantity !== product.amount) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className="single__action single__action-plus"
                >
                  +
                </button>
              </div>
              <div className="single__amount">{product.amount} available</div>
            </div>
            <div className="single__container-btn">
              <ScaleButtonClick>
                <button
                  onClick={() =>
                    addItem({
                      id: id,
                      productName: product.productName,
                      price: product.price,
                      image: product.image,
                      quantity: quantity,
                    })
                  }
                  className="single__button"
                >
                  Add to basket
                </button>
              </ScaleButtonClick>
            </div>
          </div>
          <div className="single__description">
            <h4>Product information</h4>
            <p className="single__element">
              <span className="single__marked">Conditione</span>
              {product.productDetails.condition}
            </p>
            <p className="single__element">
              <span className="single__marked">Invoice</span>
              {product.productDetails.invoice}
            </p>
            <p className="single__element">
              <span className="single__marked">Features</span>
              {product.productDetails.features}
            </p>
          </div>

          <div className="single__similar-container">
            <h4 className="single__similar-header">Similar products</h4>
            <div className="custom__scrollBar">
              {similar.map(
                ({ _id, image, price, productName, description }) => (
                  <TopProducts
                    key={_id}
                    id={_id}
                    image={image}
                    price={price}
                    productName={productName}
                    description={description}
                    addItem={addItem}
                  />
                )
              )}
            </div>
          </div>
          <div className="single__clients-opinions">
            <h4>Clients opinions</h4>
            {data.length === 0 && <p>No reviews yet</p>}
            {data.reviews &&
              data.reviews.map(({ author, review, date }, key) => {
                console.log(review);
                return (
                  <div key={key} className="single__opinion">
                    <div className="single__header-opinion">
                      <p>{author}</p>
                      <p>{moment(date).fromNow()}</p>
                    </div>
                    <div className="single__content-opinion">
                      <p>{review}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <Menu />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
