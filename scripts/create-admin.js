const { PrismaClient } = require('@prisma/client');
const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Prisma and Firebase
const prisma = new PrismaClient();
const serviceAccount = require('../apps/server/service-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question('Enter email for the new admin user: ', (email) => {
    rl.question('Enter password for the new admin user: ', async (password) => {
      try {
        // Create user in Firebase
        const userRecord = await admin.auth().createUser({
          email: email,
          password: password,
        });

        console.log('Successfully created new user in Firebase:', userRecord.uid);

        // Create user in your database
        const newUser = await prisma.user.create({
          data: {
            firebaseId: userRecord.uid,
            email: email,
            firstName: 'Admin', // Default value, can be changed later
            lastName: 'User',   // Default value, can be changed later
            role: 'ADMIN',
          },
        });

        console.log('Successfully created new admin user in the database:', newUser);
      } catch (error) {
        console.error('Error creating new admin user:', error);
      } finally {
        await prisma.$disconnect();
        rl.close();
      }
    });
  });
}

main();
