// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // 邮箱密码登录（我们 MVP 阶段的核心）
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
         if (!credentials) return null;
         const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) {
          return null;
        }
       
        // 从数据库查找用户
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) {
          return null;
        }

        // 验证密码
        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );
          console.log("6. 密码比对结果:", passwordMatch ? "✅ 匹配" : "❌ 不匹配");
        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  trustHost: true, 
});