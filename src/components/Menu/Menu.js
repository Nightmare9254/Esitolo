const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__item menu__item--active">
        <i className="fas fa-home fa-3x"></i>
        <p className="menu__describe">Home</p>
      </div>
      <div className="menu__item">
        <i className="fas fa-shopping-basket fa-3x"></i>
        <p className="menu__describe">Basket</p>
      </div>
      <div className="menu__item">
        <i className="fas fa-user fa-3x"></i>
        <p className="menu__describe">Account</p>
      </div>
    </div>
  );
};

export default Menu;
