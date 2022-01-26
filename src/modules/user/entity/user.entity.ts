import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
@Entity({ name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column(({unique: true}))
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

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.name = user?.name;
        this.cpf = user?.cpf;
        this.cep = user?.cep;
        this.publicSpace = user?.publicSpace;
        this.state = user?.state;
        this.city = user?.city;
        this.createdAt = user?.createdAt;
        this.updatedAt = user?.updatedAt;
        this.deletedAt = user?.deletedAt;
    }
}
