const { PrismaClient } = require('@prisma/client')

const userGenerator = require('./models/user');

const prisma = new PrismaClient()

async function main() {
  try {
    await userGenerator.generateUsers(prisma);
    console.log("Seeding Completed!");
  } catch (err) {
    console.log(err)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
