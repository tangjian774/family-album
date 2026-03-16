// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "家庭相册 · 小时光",
  description: "记录家庭的每一个珍贵瞬间",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50" suppressHydrationWarning>
        {/* 顶部导航栏 */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-slate-800">
                家庭相册
              </Link>
              
              {/* 导航按钮：根据登录状态显示 */}
              <div className="flex gap-4 items-center">
                {session?.user ? (
                  // 已登录：显示用户信息和退出按钮
                  <>
                    <span className="text-slate-600 text-sm">
                      欢迎，{session.user.name || session.user.email}
                    </span>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <Button type="submit" variant="ghost">
                        退出登录
                      </Button>
                    </form>
                  </>
                ) : (
                  // 未登录：显示登录按钮
                  <Button asChild>
                    <Link href="/login">登录</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* 页面内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}