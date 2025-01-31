import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/infra/services/authentication-user-service/generate-token/generate-token';
import { prisma } from '@/infra/lib/prisma/prisma';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password }: LoginRequest = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'E-mail e senha são obrigatórios.' },
                { status: 400 }
            );
        }

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
            return NextResponse.json(
                { success: false, message: 'Formato de e-mail inválido.' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Usuário não encontrado.' },
                { status: 404 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: 'Senha incorreta.' },
                { status: 401 }
            );
        }

        const token = generateToken(user.id, user.email);
        const serializedCookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        });

        const response = NextResponse.json({ success: true, message: 'Login bem-sucedido.' });
        response.headers.set('Set-Cookie', serializedCookie);

        return response;
    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json(
            { success: false, message: 'Erro interno do servidor.' },
            { status: 500 }
        );
    }
}
