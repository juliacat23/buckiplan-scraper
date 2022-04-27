import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'

export const Context = {
  prisma: PrismaClient
}
export async function createContext({ req, res }) {
  return {
    prisma,
  }
}