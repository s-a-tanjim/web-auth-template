const bcrypt = require('bcrypt');

async function generateUsers(prisma) {
  const hashedPassword = await bcrypt.hash("password", 10);

  let users = [
    { user_name: "Abul", email: "user@user.com", password: hashedPassword, },
    { user_name: "Babul", email: "babul@user.com", password: hashedPassword, },
    { user_name: "Cabul", email: "cabul@user.com", password: hashedPassword, },
    { user_name: "Dabul", email: "dabul@user.com", password: hashedPassword, },
    { user_name: "admin", email: "admin@user.com", password: hashedPassword, }
  ]


  // SQLite doesn't support createMany. This will be used in mysql
  // return await prisma.user.createMany({
  //   data: users
  // })

  // For SQLite only:
  let i = 0;
  while (i<users.length) {
    await prisma.user.create({
      data: users[i++]
    });
  }
}

exports.generateUsers = generateUsers;