import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mantine/core';

export const LoginButton = ({
  handleSuccess,
  handleError,
}: {
  handleSuccess: (accessToken: string, expiresIn: number) => void;
  handleError: (error: string) => void;
}) => {
  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => handleSuccess(access_token, expires_in),
    onError: ({ error_description }) => error_description && handleError(error_description),
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    hosted_domain: 'fundguard.com',
  });

  return <Button onClick={() => login()}>Sign in with Google 🚀 </Button>;
};
