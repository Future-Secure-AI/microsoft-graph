import Email from "./models/Email.js";

console.log("Hello world!");


const email = Email.parse("someone_somewhere.com");

console.log(email.toString())