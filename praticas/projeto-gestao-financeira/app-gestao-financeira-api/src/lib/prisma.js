import { PrismaClient } from "../../prisma/generated/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/**
 * Instância única do PrismaClient compartilhada por toda a aplicação.
 * Criar várias instâncias abre conexões demais com o banco.
 */
const adapter = new PrismaMariaDb({
  host: "mysql",
  user: "app_user",
  password: "app_password",
  port: 3306,
  database: "gestao_financeira",
  connectionLimit: 5,
});
export const prisma = new PrismaClient({ adapter });
