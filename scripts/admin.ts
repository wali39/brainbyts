const { PrismaClient: PrismaClientAdmin } = require("@prisma/client");

const { hash } = require("bcrypt");

let argv = require("minimist")(process.argv.slice(2));

let userName = argv["name"];
let email = argv["email"];
let password = argv["password"];

const dbAdmin = new PrismaClientAdmin();
// async function adminpass() {
//   console.log("pass general", password);
//   console.log("passhashed", await hash(password, 15));
// }
// adminpass();

async function CreateAdmin() {
  try {
    const hashedPass = await hash(password, 15);
    console.log("hasedpass", hashedPass);
    const IsUserExist = await dbAdmin.user.findFirst({
      where: {
        email,
      },
    });

    if (!IsUserExist) {
      await dbAdmin.user.create({
        data: {
          name: userName,
          email,
          role: "admin",
          password: hashedPass,
        },
      });

      console.log({ success: "Admin created successfully!" }, { status: 201 });
    } else {
      console.log({ error: "Admin already exist" }, { status: 200 });
    }
  } catch (error) {
    console.log("[ADMIN_CREATE]", error);
  } finally {
    await dbAdmin.$disconnect();
  }
}
CreateAdmin();
