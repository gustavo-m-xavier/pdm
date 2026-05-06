import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

/**
 * Instância única do PrismaClient compartilhada por toda a aplicação.
 * Criar várias instâncias abre conexões demais com o banco.
 */
const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "iesb",
  port: 3306,
  database: 'gestao_financeira',
  connectionLimit: 5,
});
export const prisma = new PrismaClient({adapter});