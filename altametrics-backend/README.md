## Installation

```bash
$ npm install
```

## Setup

1. Create a `.env` file.
2. Add the database connection string to your PostgreSQL database, following this format:

```bash
DATABASE_URL="postgresql://username:password@host:port/database_name?schema=schema_name"
```
3. Initiate your database by running the migrations:

```bash
$ npx prisma migrate dev
```
4. Seed your database by running this command:

```bash
$ npx ts-node prisma/seeds.ts
```

## Authentication Credentials

1. Username:
```bash
  user@example.com
```
1. Password:
```bash
  test123
```
## Running the app

```bash
# development
$ npm run start
```
