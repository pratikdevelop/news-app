

import { Client, Account, Databases, Storage, Functions } from 'appwrite';
const url = "https://fra.cloud.appwrite.io/v1"
const id = "67b377760012ab049879"
    
const client = new Client()
    .setEndpoint(url) // Replace with your Appwrite endpoint
    .setProject(id); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export default client;