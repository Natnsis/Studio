import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "password must be atleast 5 chars")
});

export type AuthTypes = z.infer<typeof AuthSchema>
