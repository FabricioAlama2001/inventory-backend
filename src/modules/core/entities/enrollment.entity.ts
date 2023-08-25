import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CatalogueEntity, CurriculumEntity, EnrollmentDetailEntity, SchoolPeriodEntity, StudentEntity } from '@core/entities';

@Entity('enrollments', { schema: 'core' })
export class EnrollmentEntity {
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

  /** Inverse Relationship **/
  @OneToMany(() => EnrollmentDetailEntity, enrollmentDetail => enrollmentDetail.enrollment)
  enrollmentDetails: EnrollmentDetailEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => CatalogueEntity,{eager:true})
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Periodo academico que pertenece' })
  academicPeriod_id: string;

  @ManyToOne(() => CurriculumEntity,{eager:true})
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;
  @Column({ type: 'uuid', comment: 'Curriculum que pertenece' })
  curriculum_id: string;

  @ManyToOne(() => CatalogueEntity, {eager:true})
  @JoinColumn({ name: 'parallel_id' })
  parallel: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Paralelo que pertenece' })
  parallel_id: string;

  @ManyToOne(() => SchoolPeriodEntity)
  @JoinColumn({ name: 'school_period_id' })
  schoolPeriod: SchoolPeriodEntity;
  @Column({ type: 'uuid', comment: 'Periodo lectivo que pertenece' })
  schoolPeriod_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Habilitado o Inhabilitado' })
  state_id: string;

  @ManyToOne(() => StudentEntity,{eager:true})
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;
  @Column({ type: 'uuid', comment: 'Estudiente matriculado' })
  student_id: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Intensivo' })
  type_id: string;

  @ManyToOne(() => CatalogueEntity,{eager:true})
  @JoinColumn({ name: 'workday_id' })
  workday: CatalogueEntity;
  @Column({ type: 'uuid', comment: 'Jornada laboral' })
  workday_id: string;

  /** Columns **/
  @Column({
    name: 'code',
    type: 'varchar',
    comment: 'Codigo de la matricula',
  })
  code: string;

  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de la matricula',
  })
  date: Date;

  @Column({
    name: 'applications_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de envio de solicitud',
  })
  applicationsAt: Date;

  @Column({
    name: 'folio',
    type: 'varchar',
    comment: 'Numero de folio',
  })
  folio: string;

  @Column({
    name: 'observation',
    type: 'text',
    comment: 'Observaciones de la matricula',
  })
  observation: string;
}
