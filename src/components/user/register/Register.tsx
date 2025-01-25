"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createUserSchema } from "@/utils/schemas/register-schema";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface CreateUserInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function CreateUser() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserInterface>({
        resolver: zodResolver(createUserSchema),
    });

    const handleRegisterSubmit = (dataRegister: CreateUserInterface) => {
        console.log(dataRegister);
        toast.success("Usuário registrado com sucesso!");
    };

    // Mostrar os erros no Toastify
    const showErrorMessages = () => {
        if (errors.username) {
            toast.error(errors.username.message);
        }
        if (errors.email) {
            toast.error(errors.email.message);
        }
        if (errors.password) {
            toast.error(errors.password.message);
        }
        if (errors.confirmPassword) {
            toast.error(errors.confirmPassword.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="container-desktop-form">
            <h1 className="text-3xl text-yellow-400 font-semibold">Criar conta</h1>
            <form
                onSubmit={(e) => {
                    handleSubmit(handleRegisterSubmit)(e);
                    showErrorMessages(); // Mostrar os erros nos toasts
                }}
                className="desktop-form"
            >
                <fieldset className="mb-2">
                    <label
                        htmlFor="username"
                        className="block text-yellow-600 font-medium mb-2"
                    >
                        Nome de usuário
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register("username")}
                        className="desktop-input-form"
                        placeholder="Digite o nome de usuário"
                    />
                </fieldset>
                <fieldset className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-yellow-600 font-medium mb-2"
                    >
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="desktop-input-form"
                        placeholder="Digite seu e-mail"
                    />
                </fieldset>
                <fieldset className="mb-4 relative">
                    <label
                        htmlFor="password"
                        className="block text-yellow-600 font-medium mb-2"
                    >
                        Senha
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password")}
                        className="desktop-input-form"
                        placeholder="Digite sua senha"
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="text-yellow-400" />
                        ) : (
                            <FaEye className="text-yellow-400" />
                        )}
                    </span>
                </fieldset>
                <fieldset className="mb-4 relative">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-yellow-600 font-medium mb-2"
                    >
                        Confirmar Senha
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...register("confirmPassword")}
                        className="desktop-input-form"
                        placeholder="Repita a sua senha"
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="text-yellow-400" />
                        ) : (
                            <FaEye className="text-yellow-400" />
                        )}
                    </span>
                </fieldset>

                <fieldset>
                    <button type="submit" className="desktop-button-form">
                        Entrar
                    </button>
                </fieldset>
                <div className="flex items-center justify-center my-4">
                    <p>Já tem conta?</p>
                    <Link href="/user/login" className="text-blue-300 ml-2">Clique aqui</Link>
                </div>
            </form>
        </div>
    );
}
