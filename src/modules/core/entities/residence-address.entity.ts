import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {CatalogueEntity} from '@core/entities';
import {UserEntity} from "@auth/entities";

@Entity('residence_addresses', {schema: 'core'})
export class ResidenceAddressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
        comment: 'Fecha de creacion del registro',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_timestamp',
        comment: 'Fecha de actualizacion del registro',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha de eliminacion del registro',
    })
    deletedAt: Date;

    /** Foreign Keys **/
    @Column({
        name: 'model_id',
        type: 'varchar',
        comment: 'Foreign Key de cualquier otra entidad',
    })
    modelId: string;

    @OneToOne(() => UserEntity, user => user.residenceAddress)
    @JoinColumn({name: 'model_id'})
    user: UserEntity;

    @ManyToOne(() => CatalogueEntity, {
        nullable: true,
    })
    @JoinColumn({name: 'province_id'})
    province: CatalogueEntity;
    @Column({type: 'uuid', name: 'province_id',nullable: true, comment: 'Provincia que se encuentra la direccion'})
    provinceId: string;

    @ManyToOne(() => CatalogueEntity, {
        nullable: true,
    })
    @JoinColumn({name: 'canton_id'})
    canton: CatalogueEntity;
    @Column({type: 'uuid', name: 'canton_id', nullable: true,comment: 'Canton que se encuentra la direccion'})
    cantonId: string;

    @ManyToOne(() => CatalogueEntity, {
        nullable: true,
    })
    @JoinColumn({name: 'parrish_id'})
    parrish: CatalogueEntity;
    @Column({type: 'uuid', name: 'parrish_id',nullable: true, comment: 'Parroquia que se encuentra la direccion'})
    parrishId: string;

    /** Columns **/
    @Column({
        name: 'community',
        type: 'varchar',
        nullable: true,
        comment: 'comunidad de procedencia',
    })
    community: string;

    @Column({
        name: 'latitude',
        type: 'float',
        default: 0,
        comment: 'Latitud',
    })
    latitude: number;

    @Column({
        name: 'longitude',
        type: 'float',
        default: 0,
        comment: 'Longitud',
    })
    longitude: number;

    @Column({
        name: 'main_street',
        type: 'varchar',
        nullable: true,
        comment: 'Calle Principal',
    })
    mainStreet: string;

    @Column({
        name: 'nearby_city',
        type: 'varchar',
        nullable: true,
        comment: 'Si usted reside en una comunidad, ¿Qué ciudad es la más cercana a su domicilio?',
    })
    nearbyCity: string;

    @Column({
        name: 'number',
        type: 'varchar',
        nullable: true,
        comment: 'Numero de casa',
    })
    number: string;

    @Column({
        name: 'post_code',
        type: 'varchar',
        nullable: true,
        comment: 'Codigo Postal',
    })
    post_code: string;

    @Column({
        name: 'reference',
        type: 'text',
        nullable: true,
        comment: 'Referencia la ubicacion',
    })
    reference: string;

    @Column({
        name: 'secondary_street',
        type: 'varchar',
        nullable: true,
        comment: 'Calle Interseccion',
    })
    secondaryStreet: string;

    @Column({
        name: 'type',
        type: 'varchar',
        nullable: true,
        comment: 'Procedencia o Residencia (origin o residence)',
    })
    type: string;
}
