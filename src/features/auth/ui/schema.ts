import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z.string().min(6, '*비밀번호는 6자 이상이어야 합니다.'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
