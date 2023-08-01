import { LoginRequestDto } from './auth.interface';

export const loginRequest = async (loginDto: LoginRequestDto) => {
  const res = await fetch('someurl', {
    method: 'POST',
    body: JSON.stringify(loginDto),
  });

  return res;
};
