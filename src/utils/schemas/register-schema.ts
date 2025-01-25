import { z } from "zod";

export const createUserSchema = z
    .object({
        username: z
            .string()
            .nonempty("O nome de usuário é obrigatório.")
            .min(3, "O nome de usuário deve ter no mínimo 3 caracteres."),
        email: z
            .string()
            .nonempty("O e-mail é obrigatório.")
            .email("Informe um e-mail válido."),
        password: z
            .string()
            .nonempty("A senha é obrigatória.")
            .min(6, "A senha deve ter no mínimo 6 caracteres."),
        confirmPassword: z
            .string()
            .nonempty("A confirmação da senha é obrigatória."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem.",
        path: ["confirmPassword"],
    });