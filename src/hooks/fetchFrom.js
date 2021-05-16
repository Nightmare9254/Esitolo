import { useCookies } from 'react-cookie';

// const API = 'http://localhost:8000';
const API = 'https://esitolo-backend.herokuapp.com';

export const fetchFrom = async (endpointURL, options) => {
  const { method, body } = { method: 'POST', body: null, ...options };

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};
