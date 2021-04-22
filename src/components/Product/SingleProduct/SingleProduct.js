import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../../Menu/Menu';
import TopProducts from '../../SingleComponents/TopProducts';

const SingleProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [similiar, setSimiliar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [imagePosition, setImagePosition] = useState(0);

  useEffect(() => {
    fetch(`/products?id=${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false);
      });

    const category = product.category;

    const params = new URLSearchParams({
      category: category,
      id: id,
    });

    fetch(`/products/similar?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        setSimiliar(json);
        // setLoading(false);
      });

    setImagePosition(0);
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
                drag
                dragDirectionLock="x"
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
              <div className="single__counter">
                <button
                  onClick={() => {
                    if (amount !== 1) {
                      setAmount(amount - 1);
                    }
                    return;
                  }}
                  className="single__action single__action-minus"
                >
                  -
                </button>
                <p className="single__choose-amount">{amount}</p>
                <button
                  onClick={() => {
                    if (amount !== product.amount) {
                      setAmount(amount + 1);
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
              <button className="button single__button">Add to basket</button>
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

          <div className="single__similiar-container">
            <h4>Similiar products</h4>
            <div className="single__similiar">
              {similiar.map(({ _id, image, price, productName }) => (
                <TopProducts
                  key={_id}
                  id={_id}
                  image={image}
                  price={price}
                  productName={productName}
                />
              ))}
            </div>
          </div>
          {/* placeholder */}
          <div className="single__clients-opinions">
            <h4>Clients opinions</h4>
            <div className="single__opinion">
              <div className="single__header-opinion">
                <p>anszej@gmail.com</p>
                <p>21.01.2021</p>
              </div>
              <div className="single__content-opinion">
                <p>Yeyeh pretty ok for that price I'd say</p>
              </div>
            </div>
            <div className="single__opinion">
              <div className="single__header-opinion">
                <p>anszej@gmail.com</p>
                <p>21.01.2021</p>
              </div>
              <div className="single__content-opinion">
                <p>Yeyeh pretty ok for that price I'd say</p>
              </div>
            </div>
            <div className="single__opinion">
              <div className="single__header-opinion">
                <p>anszej@gmail.com</p>
                <p>21.01.2021</p>
              </div>
              <div className="single__content-opinion">
                <p>Yeyeh pretty ok for that price I'd say</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Menu />
    </>
  );
};

export default SingleProduct;
