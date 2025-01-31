import { api, axios } from "../axios-instance";

interface AuthenticationDataInterface {
    email: string;
    password: string;
    username: string;
}

interface AuthenticationResponseInterface {
    success: boolean;
    token?: string;
    message?: string;
}

export async function authenticationUser(data: AuthenticationDataInterface): Promise<AuthenticationResponseInterface | null> {
    try {
        const response = await api.post<AuthenticationResponseInterface>("/api/user/register", data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Erro do Axios:", {
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                success: false,
                message: error.response?.data?.message || "Erro na criação do usuário.",
            };
        }
        console.error("Erro desconhecido:", error);
        return {
            success: false,
            message: "Erro desconhecido ao criar o usuário.",
        };
    }
}
