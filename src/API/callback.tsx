import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleAuth } from './googleSheetsAPI';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async (code: string) => {
      const auth = await getGoogleAuth();
      const {
        tokens: { access_token, refresh_token },
      } = await auth.getToken(code);

      if (access_token) localStorage.setItem('accessToken', access_token);
      if (refresh_token) localStorage.setItem('refreshToken', refresh_token);

      navigate('/');
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchTokens(code);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default Callback;
