import { prisma } from "./src/lib/prisma";
import bcrypt from "bcrypt";
async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
        data: {
            email: "alice@prisma.io",
            firstName: "Alice",
            lastName: "Johnson",
            password: hashedPassword,
        },
    });
    console.log("Created user:", user);
    // Fetch all users with their posts
    const allUsers = await prisma.user.findMany();
    console.log("All users:", JSON.stringify(allUsers, null, 2));
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
