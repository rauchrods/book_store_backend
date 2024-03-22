import 'dotenv/config'

export const PORT = 3000;

export const MONGODBURL = `mongodb+srv://rauchrodrigues:${process.env.MONGODB_PASSWORD}@bookstoredatabase.z3whvqm.mongodb.net/?retryWrites=true&w=majority&appName=BookStoreDatabase`;
