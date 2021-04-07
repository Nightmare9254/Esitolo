import React,{useState} from 'react';

const FormAdd = () => {

    const [product,setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        amount: 0,
        image: '',
    })

    const handlerInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        setProduct({ ...product, [name]: value });
      };


    const url = "http://localhost:8000";   //url
    const addProduct = () => {
        fetch(`${url}/api/new-product`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        }).then((json) => {  
                    setProduct({
                        name: '',
                        description: '',
                        price: '',
                        amount: '',
                        image: '',
                    })   
        })
    }

    return (
        <div className="container-form">
            <div>
                <label>
                    Name: 
                    <input value={product.name} onChange={(e) => handlerInput(e)}  type="text" name="name"/>
                </label>
                <label>
                    Description: 
                    <input value={product.description} onChange={(e) => handlerInput(e)} type="text" name="description"/>
                </label>
                <label>
                    Price: 
                    <input value={product.price} onChange={(e) => handlerInput(e)} type="text" name="price"/>
                </label>
                <label>
                    Amount: 
                    <input value={product.amount} onChange={(e) => handlerInput(e)} type="text" name="amount"/>
                </label>
                <label>
                    Image: 
                    <input value={product.image} onChange={(e) => handlerInput(e)}  type="text" name="image"/>
                </label>
                <button onClick={() => addProduct()}>Add</button>
            </div>
        </div>
    )
}

export default FormAdd;