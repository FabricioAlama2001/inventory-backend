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
import { ProductEntity } from '@core/entities';
//Cambios realizados creacion de la entidad
@Entity('categories', {schema: 'core'})
export class CategoryEntity {
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
    @OneToMany(() => CategoryEntity, category => category.parent)
    children: CategoryEntity[];
    //
    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];

    /** Foreign Keys **/
    @ManyToOne(() => CategoryEntity, category => category.children, {nullable: true})
    @JoinColumn({name: 'parent_id'})
    parent: CategoryEntity;
    @Column({type: 'uuid', name: 'parent_id', nullable: true, comment: 'Padre, Madre'})
    parentId: string;

    


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
        name: 'name',
        type: 'varchar',
        comment: 'Nombre del catalogo',
    })
    name: string;
}
