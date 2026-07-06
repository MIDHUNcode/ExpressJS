import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    console.log(`Generated salt: ${salt}`);
    return bcrypt.hash(password, salt);
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}