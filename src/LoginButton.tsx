import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mantine/core';

export const LoginButton = ({
  handleSuccess,
  handleError,
}: {
  handleSuccess: (accessToken: string) => void;
  handleError: (error: string) => void;
}) => {
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => handleSuccess(access_token),
    onError: ({ error_description }) => error_description && handleError(error_description),
  });

  return <Button onClick={() => login()}>Sign in with Google 🚀 </Button>;
};
