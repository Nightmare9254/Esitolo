import { useState } from 'react';

const FormAdd = () => {
  const [product, setProduct] = useState({
    productName: '',
    productDetails: {
      condition: 'New',
      invoice: 'VAT',
      features: '',
    },
    description: '',
    price: 0,
    amount: 0,
    image: [],
    category: 'home',
  });

  const handlerInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.dataset.index !== 'details') {
      setProduct({ ...product, [name]: value });
      return;
    }
    setProduct({
      ...product,
      productDetails: { ...product.productDetails, [name]: value },
    });
  };

  const addProduct = () => {
    fetch(`https://esitolo-backend.herokuapp.com/products/new-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then((json) => {
      setProduct({
        productName: '',
        productDetails: {
          condition: 'New',
          invoice: 'VAT',
          features: '',
        },
        description: '',
        price: 0,
        amount: 0,
        image: [],
        category: 'home',
      });
    });
  };

  return (
    <div className="container-form">
      <div>
        <label>
          Name:
          <input
            value={product.productName}
            onChange={(e) => handlerInput(e)}
            type="text"
            name="productName"
          />
        </label>
        <label>
          Product Details:
          <p>Condition</p>
          <select
            value={product.productDetails.condition}
            name="condition"
            onChange={(e) => handlerInput(e)}
            data-index="details"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <p>Invoice</p>
          <select
            value={product.productDetails.invoice}
            name="invoice"
            onChange={(e) => handlerInput(e)}
            data-index="details"
          >
            <option value="VAT">VAT</option>
            <option value="Advance Payment">Advance Payment</option>
            <option value="RR">RR</option>
          </select>
          <p>Features</p>
          <input
            type="text"
            value={product.productDetails.features}
            name="features"
            onChange={(e) => handlerInput(e)}
            data-index="details"
          />
        </label>
        <label>
          Description:
          <input
            value={product.description}
            onChange={(e) => handlerInput(e)}
            type="text"
            name="description"
          />
        </label>
        <label>
          Price:
          <input
            value={product.price}
            onChange={(e) => handlerInput(e)}
            type="text"
            name="price"
          />
        </label>
        <label>
          Amount:
          <input
            value={product.amount}
            onChange={(e) => handlerInput(e)}
            type="text"
            name="amount"
          />
        </label>
        <label>
          Image:
          <input
            onKeyDown={(e) => {
              if (e.code === 'Enter' && e.target.value.length > 1) {
                product.image.push(e.target.value);

                e.target.value = '';
              }
            }}
            type="text"
            name="image"
          />
        </label>
        <label>
          Category:
          <select onChange={(e) => handlerInput(e)} name="category">
            <option value="home">Home</option>
            <option value="garden">Garden</option>
            <option value="music">Music</option>
            <option value="sport">Sport</option>
            <option value="pets">Pet supplies</option>
            <option value="jewelry">Jewelry</option>
            <option value="tech">Tech</option>
            <option value="toys">Toys</option>
            <option value="clothes">Clothes</option>
            <option value="books">Books</option>
            <option value="consoles">consoles</option>
            <option value="automotive">Automotive</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button onClick={() => addProduct()}>Add</button>
      </div>
    </div>
  );
};

export default FormAdd;
