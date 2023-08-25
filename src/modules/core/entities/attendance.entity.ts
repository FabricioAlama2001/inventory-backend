import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EnrollmentDetailEntity, PartialEntity } from '@core/entities';

@Entity('attendances', { schema: 'core' })
export class AttendanceEntity {
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
  @ManyToOne(() => EnrollmentDetailEntity)
  @JoinColumn({ name: 'enrollment_detail_id' })
  enrollmentDetail: EnrollmentDetailEntity;

  @Column({ type: 'uuid', comment: 'Id Detalle de inscripción' })
  enrollment_detail_id: string;

  @ManyToOne(() => PartialEntity)
  @JoinColumn({ name: 'partial_id' })
  partial: PartialEntity;

  @Column({ type: 'uuid', comment: 'Id Parcial' })
  partial_id: string;

  /** Columns **/
  @Column({
    name: 'date',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de asistencia',
  })
  date: Date;

  @Column({
    name: 'value',
    type: 'int',
    default: 0,
    comment: 'Valor de la asistencia',
  })
  value: number;
}
