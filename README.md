# Product-Order-Management-node-typescript

### All the installation to run the server locally:

- npm init -y
- npm install express --save
- npm install mongoose --save
- npm i cors
- npm i dotenv
- npm install zod

### Dev dependencies installation :

- npm install typescript --save--dev
- npm install -D @types/node
- npm install -D @types/express
- npm install -D nodemon
- npm i --save-dev @types/cors
- npm install -D ts-node-dev
- npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
- npm install --save-dev prettier
- npm install --save-dev eslint-config-prettier

**1. Clone the Repository:**

Run these commands in cmd:

```
git clone https://github.com/AfiaNahian/Product-Order-Management-node-typescript.git
cd Product-Order-Management-node-typescript
code .
```

**2. Create a file named '.env' in the root of the project and write these variables:**

```
PORT=5000
DB_URL=your own database url made in mongoDB atlas
```

**3. For checking any error or warning :**

```
npm run lint
```

**4. Then open terminal to run these commands:**

```
npm run build
npm run start:dev
```
