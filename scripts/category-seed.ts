const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
async function CategorySeed() {
  try {
    await db.category.createMany({
      data: [
        { name: "AI" },
        { name: "Fashion" },
        { name: "Nature" },
        { name: "Tech" },
      ],
    });
    console.log("Category sedding success !");
  } catch (error) {
    console.log("CATEGORY_SEED", error);
  } finally {
    await db.$disconnect();
  }
}
CategorySeed();
