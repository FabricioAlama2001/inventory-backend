import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files', { schema: 'core' })
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  isVisible: boolean;

  @Column({
    name: 'model_id',
    type: 'varchar',
    comment: 'Foreign Key de cualquier otra entidad',
  })
  modelId: string;

  @Column({
    name: 'extension',
    type: 'varchar',
    comment: 'Extension ex. .pdf, .xlsx',
  })
  extension: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    comment: 'In storage',
  })
  fileName: string;

  @Column({
    name: 'original_name',
    type: 'varchar',
    comment: '',
  })
  originalName: string;

  @Column({
    name: 'path',
    type: 'varchar',
    comment: '',
  })
  path: string;

  @Column({
    name: 'size',
    type: 'float',
    comment: 'Size file in bytes',
  })
  size: number;

  @Column({
    name: 'type',
    type: 'varchar',
    comment: '',
  })
  type: string;
}