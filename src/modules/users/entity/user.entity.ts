import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column()
    publicSpace: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @CreateDateColumn( { name: 'created_at'} )
    createdAt:string;

    @UpdateDateColumn( { name: 'updated_at'} )
    updatedAt: string;

    @DeleteDateColumn( { name: 'deleted_at'} )
    deletedAt: string;
}
