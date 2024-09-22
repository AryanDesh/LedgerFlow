import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
                console.log('Credentials:', credentials);
            // DO zod validation
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });
            
                console.log('Existing User:', existingUser);
            
                if (existingUser) {
                    if (existingUser.password) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                        console.log('Password Validation:', passwordValidation);
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.number
                            };
                        }
                    }
                    return null; // Invalid password
                }
                // User does not exist, creating new user
                try {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
            
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    };
                } catch (e) {
                    console.error(e);
                }
            
                return null;
            }        
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  