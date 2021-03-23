import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return <div>JTERAZ MNIE NIE MA</div>;
};

export default App;
