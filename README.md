# Asset Management Backend

A backend application built with **Node.js**, **TypeScript**, **Express**, and **Prisma ORM** to create, manage, and maintain assets.  
This service provides REST APIs for asset creation, retrieval, update, and filtering.

---

## 🚀 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **MySQL**
- **JWT Authentication** (Planned/Optional)
- **Nodemon** (For development)

---

## 📁 Project Structure

```text
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── asset.controller.ts
│   ├── routes/
│   │   └── asset.routes.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## 🏃‍➡️ How to run the project

1.First is to install node modules

`npm install`

2.**Then change the database connection string and credentials in env file as per your DB**

3.Then run **script.ts**

4.Finally run this in terminal

`npm run dev`

5.The app will run on localhost

## 💌 Routes

check the **test.rest** file for all the routes available and test it out easily


