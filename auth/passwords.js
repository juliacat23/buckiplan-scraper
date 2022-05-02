import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
    /* store passwords as hash */
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    /* verify that passwords are the same */
    const isValid = await compare(password, hashedPassword);
    return isValid;
}
