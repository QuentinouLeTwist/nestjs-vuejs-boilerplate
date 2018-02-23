import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, unique: true })
    username: string;

    @Column({ length: 64 })
    password: string;

    @Column({ length: 60, unique: true })
    email: string;

    @Column({ name: 'is_active' })
    isActive: boolean;
}