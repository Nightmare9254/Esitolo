import { useEffect,useState } from 'react';

const App = () => {
  const baseUrl = 'https://esitolo-backend.herokuapp.com';
  const [users,setUsers] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/api/test`)
      .then((res) => res.json())
      .then((json) => setUsers(JSON.stringify(json)));
  }, []);

  return <div>Zajebiscie działa

      <p>{users}</p>
  </div>;
};

export default App;
