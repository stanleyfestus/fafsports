import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  createdAt: string;

  @Column()
  role: 'PLAYER' | 'admin';
}
