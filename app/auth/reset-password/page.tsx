import { Box, Heading } from '@chakra-ui/react';
import Wrapper from '@/components/ui/wrapper';
import ResetPasswordForm from './reset-password-form';

export default function ResetPasswordPage() {
  return (
    <Wrapper>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
        <Heading marginBottom={4}>Enter your email to reset password</Heading>
        <ResetPasswordForm />
      </Box>
    </Wrapper>
  );
}
