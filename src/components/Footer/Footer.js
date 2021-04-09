const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <section className="footer__section">
          <ul className="footer__list">
            <li className="footer__item">About</li>
            <li className="footer__item">Terms</li>
            <li className="footer__item">Help</li>
          </ul>
        </section>
        <section className="footer__section footer__section--right">
          <ul className="footer__list">
            <li className="footer__item">Facebook</li>
            <li className="footer__item">Github</li>
            <li className="footer__item">Twitter</li>
          </ul>
        </section>
      </div>
      <p className="footer__copy">&copy; 2021 Esitolo All rights reserved.</p>
    </footer>
  );
};

export default Footer;
