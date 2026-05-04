import {Body, Injectable, Inject} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../user/repository/user.repository';
import { response } from 'express';
@Injectable()
export class AuthService {  
    
    constructor(
        @Inject(UserRepository)
        private userRepository: UserRepository) {}

    // 1- Implement user authentication logic here 
    // (e.g., validate user credentials, generate JWT tokens, etc.)
// get data from request and validate user credentials
// email and password sent on request




    // 2- get user by email
    async getUserByEmail(email: string) {
        // Implement logic to retrieve user by email from the database
        // For example, you can use a UserRepository to find the user
        return await this.userRepository.findByEmail(email);
    }


    // 3-if user exists and decrepted password is correct, return user data
    async validateUser(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if (user && this.decryptPassword(user.password, password)) {
            return user; // Return user data if validation is successful
        }
        return null; // Return null if validation fails
    }

    // 4- Implement password decryption logic here
    private decryptPassword(encryptedPassword: string, password: string): boolean {
        // Implement your decryption logic here
        // For example, you can use a library like bcrypt to compare hashed passwords
        return bcrypt.compareSync(password, encryptedPassword);
    }

    // 5- Implement JWT token generation logic here
    async generateJwtToken(user: any) {
        // Implement logic to generate JWT token for the authenticated user
        // For example, you can use the jsonwebtoken library to create a token
        return jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    }

    // 6- Implement additional authentication-related methods as needed (e.g., refresh tokens, password reset, etc.)    
    async generateRefreshToken(user: any) {
        // Implement logic to generate a refresh token for the authenticated user
        // For example, you can use the jsonwebtoken library to create a refresh token
        return jwt.sign({ userId: user.id, email: user.email }, 'your-refresh-secret-key', { expiresIn: '7d' });
    }   

    // login 
    async login( { email, password }: { email: string, password: string }) {
        const user = await this.validateUser(email, password);  
        if (!user) {
            // Handle invalid credentials (e.g., throw an error, return a response, etc.)   

            // return response.status(401).json({ message: 'Invalid credentials' });
            throw new Error('Invalid credentials');
        }   
        const token = await this.generateJwtToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return { token, refreshToken };
    }   
    

}