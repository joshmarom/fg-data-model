import { useGoogleLogin } from '@react-oauth/google';
import { Button, Center } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';
import React from 'react';

export const LoginScreen = ({
  handleSuccess,
  handleError,
}: {
  handleSuccess: (accessToken: string, expiresIn: number) => void;
  handleError?: (error: string) => void;
}) => {
  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => handleSuccess(access_token, expires_in),
    onError: ({ error_description: err }) => err && (handleError ?? console.log)(err),
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    hosted_domain: 'fundguard.com',
  });

  return (
    <Center h="100vh">
      <Button onClick={() => login()} leftIcon={<BrandGoogle />}>
        Sign in
      </Button>
    </Center>
  );
};
