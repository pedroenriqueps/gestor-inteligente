"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface UserLoginInterface {
    email: string
    password: string
}

export function UserLogin() {
    const { register, handleSubmit } = useForm<UserLoginInterface>()
    const [showPassword, setShowPassword] = useState(false)

    const handleUserForm = (dataUser: UserLoginInterface) => {
        console.log(dataUser)
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div className="container-desktop-form">
            <h1 className="text-3xl text-yellow-400 font-semibold">
                Fazer Login
            </h1>
            <form
                onSubmit={handleSubmit(handleUserForm)}
                className="desktop-form"
            >
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
                <fieldset>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    >
                        Entrar
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
