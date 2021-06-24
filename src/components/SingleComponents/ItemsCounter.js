const ItemsCounter = ({ quantity, id, removeItem, addQuantity }) => {
  return (
    <div className="single__counter">
      <button
        onClick={() => removeItem(id)}
        className="single__action single__action-minus"
      >
        -
      </button>
      <p className="single__choose-amount">{quantity}</p>
      <button
        onClick={() => addQuantity(id)}
        className="single__action single__action-plus"
      >
        +
      </button>
    </div>
  );
};

export default ItemsCounter;
