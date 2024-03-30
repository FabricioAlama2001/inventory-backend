import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {TransactionEntity,ProductEntity } from '@core/entities';

//Cambios realizados creacion de la entidad
@Entity('transaction_details', {schema: 'core'})
export class TransactionDetailEntity {
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

    /** Foreign Keys **/
    @ManyToOne(() => TransactionEntity, transaction => transaction.transactionDetails)
    @JoinColumn({name: 'transaction_id'})
    transaction: TransactionEntity;
    @Column({type: 'uuid', name: 'transaction_id', comment: ''})
    transactionId: string;

    @ManyToOne(() => ProductEntity , product => product.transactionDetails)
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;
    @Column({type: 'uuid', name: 'product_id', comment: ''})
    productId: string;

    /** Columns **/  
    @Column({
        name: 'observation',
        type: 'text',
        nullable: true,
        comment: 'observaciones',
    })
    observation: string;

    @Column({
        name: 'quantity',
        type: 'float',
        comment: 'Cantidad ',
    })
    quantity: number;
}
