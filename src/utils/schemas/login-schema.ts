import { z } from "zod";

export const userLoginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .nonempty("O e-mail é obrigatório"),
    password: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .nonempty("A senha é obrigatória"),
});
