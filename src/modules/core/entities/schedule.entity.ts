import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ClassroomEntity, TeacherDistributionEntity } from '@core/entities';

@Entity('schedules', { schema: 'core' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  /** Foreign Keys **/
  @ManyToOne(() => ClassroomEntity, { nullable: true })
  @JoinColumn({ name: 'classroom_id' })
  classroom: ClassroomEntity;
  @Column({ type: 'uuid', comment: 'Clase que mantiene ese horario' })
  classroom_id: string;

  @ManyToOne(() => TeacherDistributionEntity)
  @JoinColumn({ name: 'distribution_teacher_id' })
  teacherDistribution: TeacherDistributionEntity;
  @Column({ type: 'uuid', comment: 'Distribución de profesores' })
  teacherDistribution_id: string;

  /** Columns **/
  @Column({
    name: 'date',
    type: 'date',
    comment: 'Fecha de la clase',
  })
  date: Date;

  @Column({
    name: 'started_at',
    type: 'time',
    comment: 'Hora de inicio de la hora de clase',
  })
  startedAt: Date;

  @Column({
    name: 'ended_at',
    type: 'time',
    comment: 'Hora de fin de la hora de clase',
  })
  endedAt: Date;

  @Column({
    name: 'time',
    type: 'int',
    comment: 'Hora de clase',
  })
  time: number;
}
