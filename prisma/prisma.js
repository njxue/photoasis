const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

global.prisma = global.prisma || prismaClientSingleton();

module.exports = global.prisma;

if (process.env.NODE_ENV !== 'production') {
  global.prisma = module.exports;
}
