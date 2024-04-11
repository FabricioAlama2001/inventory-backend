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
import { CategoryEntity,TransactionInDetailEntity, TransactionOutDetailEntity } from '@core/entities';
//Cambios realizados creacion de la entidad
@Entity('products', {schema: 'core'})
export class ProductEntity {
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
    @OneToMany(() => TransactionInDetailEntity, transactionDetail => transactionDetail.product)
    transactionInDetails: TransactionInDetailEntity[];

    @OneToMany(() => TransactionOutDetailEntity, transactionDetail => transactionDetail.product)
    transactionOutDetails: TransactionOutDetailEntity[];

    /** Foreign Keys **/
    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({name: 'category_id'})
    category: CategoryEntity;
    @Column({type: 'uuid', name: 'category_id', comment: ''})
    categoryId: string;
    
    /** Columns **/  
    @Column({
       //aqui va el nombre de como va en la base de datos
        name: 'code',
        type: 'varchar',
        comment: 'Codigo del catalogo',
    })
    code: string;
    
    @Column({
        name: 'cost_price',
        type: 'float',
        comment: 'Costo del producto comprado',
    })
    costPrice: number;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        comment: 'Descripcion del catalogo',
    })
    description: string;

    @Column({
        name: 'name',
        type: 'varchar',
        comment: 'Nombre del catalogo',
    })
    name: string;

    @Column({
        name: 'minimum_amount',
        type: 'float',
        comment: 'Costo minimo del producto',
    })
    minimumAmount: number;

    @Column({
        name: 'selling_price',
        type: 'float',
        nullable: true,
        comment: 'Costo del producto al publico',
    })
    sellingPrice: number;

    @Column({
        name: 'stock',
        type: 'float',
        nullable: true,
        comment: 'Stock actual del producto',
    })
    stock: number;
}
