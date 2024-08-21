import crypto from 'crypto'
import { env } from '../types/env.js'  


export function Encryption(string_value: string | number): string {
    
    const password: string = env.PASSWORD;
    if (!password) {
        throw new Error('PASSWORD environment variable is not set.');
        }
    const salt: string = env.SALT;
    let iv: Buffer = crypto.randomBytes(16);

    const key = crypto.scryptSync(password, salt, 32);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    if (typeof string_value === 'string') {
        let encrypted = cipher.update(string_value, 'utf8', 'hex') + cipher.final('hex');
        return encrypted
    } else {
        let encrypted = cipher.update(string_value.toString(), 'utf8', 'hex') + cipher.final('hex');
        return encrypted
    }
}


