// src/users/users.data.ts
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  role: 'admin' | 'PLAYER';
}

export const users: User[] = [
  {
    id: 'admin_001',
    email: 'info@vlieservice.nl',
    name: 'Admin User',
    password: 'adminpass',
    createdAt: '2022-01-01T00:00:00Z',
    role: 'admin',
  },
  {
    id: 'user_001',
    email: 'lahm.martinez@example.com',
    name: 'Lahm Martinez',
    password: 'password123',
    createdAt: '2022-02-01T00:00:00Z',
    role: 'PLAYER',
  },
  {
    id: 'user_002',
    email: 'daniel.okoye@example.com',
    name: 'Daniel Okoye',
    password: 'securepassword',
    createdAt: '2022-03-01T00:00:00Z',
    role: 'PLAYER',
  },
  {
    id: 'user_003',
    email: 'marco.bianchi@example.com',
    name: 'Marco Bianchi',
    password: 'mypassword',
    createdAt: '2022-04-01T00:00:00Z',
    role: 'PLAYER',
  },
  {
    id: 'user_004',
    email: 'sophia.jensen@example.com',
    name: 'Sophia Jensen',
    password: 'mypassword',
    createdAt: '2022-05-01T00:00:00Z',
    role: 'PLAYER',
  },
  {
    id: 'user_005',
    email: 'thiago.silva@example.com',
    name: 'Thiago Silva',
    password: 'mypassword',
    createdAt: '2022-06-01T00:00:00Z',
    role: 'PLAYER',
  },
];
