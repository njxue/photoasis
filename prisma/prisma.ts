import { PrismaClient } from "@/generated/prisma/client";

// Use the CommonJS export to avoid a Next 14 Server Action bundling bug
// https://github.com/prisma/orm/issues/23600
const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg");

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
