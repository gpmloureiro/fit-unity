const { PrismaClient } = require('@prisma/client');

// Singleton pattern to ensure only one PrismaClient instance is created
const prisma = global.prisma || new PrismaClient();

// Only store it in dev
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;