export const isEmailValid = (email: string): boolean => email.includes('@');

export const isPasswordValid = (password: string): boolean => password.length > 3 && password.length < 32;