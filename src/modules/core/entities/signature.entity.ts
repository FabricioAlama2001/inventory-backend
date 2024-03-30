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
import { ProductEntity, TransactionDetailEntity, TransactionEntity } from '@core/entities';
import { UserEntity } from '@auth/entities';
//Cambios realizados creacion de la entidad

@Entity('signatures', {schema: 'core'})
export class SignatureEntity {
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
    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'authorizer_id'})
    authorizer: UserEntity; 
    @Column({type: 'uuid', name: 'authorizer_id',nullable: true, comment: ''})
    authorizerId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'dispatcher_id'})
    dispatcher: UserEntity;
    @Column({type: 'uuid', name: 'dispatcher_id',nullable: true, comment: ''})
    dispatcherId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'receiver_id'})
    receiver: UserEntity;
    @Column({type: 'uuid', name: 'receiver_id',nullable: true, comment: ''})
    receiverId: string;
    
    @ManyToOne(() => TransactionEntity, transaction => transaction.transactionDetails)
    @JoinColumn({name: 'transaction_id'})
    transaction: TransactionEntity;
    @Column({type: 'uuid', name: 'transaction_id', comment: ''})
    transactionId: string;

    /** Columns **/  
}
