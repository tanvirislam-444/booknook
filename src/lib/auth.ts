import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true,
      sendResetPassword: async ({ user, url }) => {
    await resend.emails.send({
      from: "BookNook <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset your BookNook password",
      html: `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${url}">Reset Password</a>
      `,
    });
  }, 
  }, 
});