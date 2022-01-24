import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ceps'})
export class CepEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    constructor(cep?: Partial<CepEntity>) {
        this.id = cep?.id;
        this.cep = cep?.cep;
        this.publicSpace = cep?.publicSpace;
        this.state = cep?.state;
        this.city = cep?.city;
        this.createdAt = cep?.createdAt;
        this.updatedAt = cep?.updatedAt;
        this.deletedAt = cep?.deletedAt;
    }
}
