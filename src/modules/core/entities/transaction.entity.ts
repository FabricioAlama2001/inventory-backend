import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ProductEntity, TransactionDetailEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';
//Cambios realizados creacion de la entidad

@Entity('transactions', {schema: 'core'})
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestampP',
        comment: 'Fecha de creacion del registro',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestampP',
        comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha de eliminacion del registro',
    })
    deletedAt: Date;

    @Column({
        name: 'enabled',
        type: 'boolean',
        default: true,
        comment: 'true=visible, false=no visible',
    })
    //Depende de la logica - este disponible o no 
    enabled: boolean;
    
    /** Inverse Relationship **/
    @OneToMany(() => TransactionDetailEntity, transactionDetail => transactionDetail.transaction)
    transactionDetails: TransactionDetailEntity[];
    //
    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];

    /** Foreign Keys **/
  

    /** Columns **/  
    @Column({
       //aqui va el nombre de como va en la base de datos
        name: 'code',
        type: 'varchar',
        comment: 'Codigo del catalogo',
    })
    code: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        comment: 'Descripcion del catalogo',
    })
    description: string;

    @Column({
        name: 'date',
        type: 'timestamp',
        comment: 'fecha de la transaccion',
    })
    date: Date;

    @Column({
        name: 'type',
        type: 'boolean',
        comment: 'Ingreso = true, egreso = false',
    })
    type: boolean;


}
