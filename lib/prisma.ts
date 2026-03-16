// lib/prisma.ts
import { PrismaClient } from '.prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

// 开发环境挂载到全局，避免热重载重复实例化
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma