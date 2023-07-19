import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CareerEntity, CatalogueEntity } from '@core/entities';
import { format } from 'date-fns';

@Entity('school_periods', { schema: 'core' })
export class SchoolPeriodEntity {
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

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  /** Relationship **/
  @ManyToMany(() => CareerEntity)
  @JoinTable({ name: 'career_school_period' })
  careers: CareerEntity[];

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  /** Columns **/
  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Codigo del periodo',
  })
  code: string;

  @Column({
    comment: 'Codigo sniese, suelen manejar diferente',
    type: 'varchar',
    nullable: true,
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre Ej. Abril 2023 - Octubre 2023',
  })
  name: string;

  @Column({
    name: 'short_name',
    type: 'varchar',
    comment: 'Nombre corto Ej. 2023-1',
  })
  shortName: string;

  @Column({
    name: 'started_at',
    type: 'timestamp without time zone',
    comment: 'Fecha Inicio Periodo',
  })
  startedAt: Date;

  @Column({
    name: 'ended_at',
    type: 'date',
    comment: 'Fecha Fin Periodo',
  })
  endedAt: Date;

  @Column({
    name: 'ordinary_started_at',
    type: 'date',
    comment: 'Fecha Inicio Periodo Ordinario',
  })
  ordinaryStartedAt: Date;

  @Column({
    name: 'ordinary_ended_at',
    type: 'date',
    comment: 'Fecha Fin Periodo Ordinario',
  })
  ordinaryEndedAt: Date;

  @Column({
    name: 'extra_ordinary_started_at',
    type: 'date',
    comment: 'Fecha Inicio Periodo Extraordinario',
  })
  extraOrdinaryStartedAt: Date;

  @Column({
    name: 'extra_ordinary_ended_at',
    type: 'date',
    comment: 'Fecha Fin Periodo Extraordinario',
  })
  extraOrdinaryEndedAt: Date;

  @Column({
    name: 'especial_started_at',
    type: 'date',
    comment: 'Fecha Inicio Periodo Especial',
  })
  especialStartedAt: Date;

  @Column({
    name: 'especial_ended_at',
    type: 'date',
    comment: 'Fecha Fin Periodo Especial',
  })
  especialEndedAt: Date;
}
