import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles?: string[];
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@google.com',
      fullName: 'First Admin',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      email: 'user@google.com',
      fullName: 'First User',
      password: bcrypt.hashSync('Abc123', 10),
    },
  ],
};
