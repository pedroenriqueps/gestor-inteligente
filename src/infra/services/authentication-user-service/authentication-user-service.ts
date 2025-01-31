import { axios, api } from '@/infra/services/axios-instance';

interface UserLoginInterface {
    email: string;
    password: string;
}

interface LoginResponseInterface {
    success: boolean;
    token?: string;
    message?: string;
}

export async function loginUser(data: UserLoginInterface): Promise<LoginResponseInterface | null> {
    try {
        const response = await api.post<LoginResponseInterface>('/api/user/login', data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Erro do Axios:', {
                status: error.response?.status,
                data: error.response?.data,
            });
            return {
                success: false,
                message: error.response?.data?.message || 'Erro na autenticação do usuário.',
            };
        }
        console.error('Erro desconhecido:', error);
        return {
            success: false,
            message: 'Erro desconhecido ao autenticar o usuário.',
        };
    }
}
