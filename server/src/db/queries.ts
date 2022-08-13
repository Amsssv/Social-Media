export const insertUsersQuery = (
  id: string,
  email: string,
  password: string,
  name: string
) =>
  `INSERT INTO users(id, email, password, name) VALUES ('${id}', '${email}', '${password}', '${name}') RETURNING email`;

export const selectPasswordQuery = (email: string) =>
  `SELECT password FROM users WHERE email = '${email}'`;

export const selectFromUserQuery = (email: string) =>
  `SELECT id, name, FROM users WHERE email = '${email}'`;
