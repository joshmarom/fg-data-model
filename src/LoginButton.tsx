import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mantine/core';

export const LoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: ({ error_description }) => console.log(error_description),
  });

  return <Button onClick={() => login()}>Sign in with Google 🚀 </Button>;
};
