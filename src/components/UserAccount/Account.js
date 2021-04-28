import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Menu from '../Menu/Menu';
import HeaderTitle from '../SingleComponents/HeaderTitle';

const Account = () => {
  const [cookies, , removeCookie] = useCookies(['user']);
  const { user } = cookies;
  const history = useHistory();

  const logout = () => {
    removeCookie('user');
    history.push('/');
  };

  return (
    <>
      {user && (
        <div className="settings">
          <HeaderTitle title="Account Settings" />

          <main className="settings__main">
            <section className="settings__section">
              <h4 className="settings__header-small">
                Good morning <span>{user.name}</span>
              </h4>
              <p className="settings__txt--dimmed">{user.email}</p>
            </section>
            <section className="settings__section">
              <h3 className="settings__header-medium">You have joined:</h3>
              <p className="settings__joined-date">{user.createdData}</p>
            </section>
            <section className="settings__section">
              <h4 className="settings__header-small">Account settings</h4>
              <div className="settings__options">
                <p className="settings__txt--dimmed">Shipping address</p>
              </div>

              <div className="settings__options">
                <p className="settings__txt--dimmed">Order history</p>
                <button className="settings__change-btn">View</button>
              </div>
            </section>
          </main>
          <div style={{ textAlign: 'center' }}>
            <button onClick={logout} className="button settings__button">
              Logout
            </button>
          </div>
        </div>
      )}

      <Menu />
    </>
  );
};

export default Account;
