import { useEffect } from 'react';

const App = () => {
  const baseUrl = 'https://esitolo-backend.herokuapp.com';
  useEffect(() => {
    fetch(`${baseUrl}/api/test`)
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return <div>Zajebiscie działa</div>;
};

export default App;
