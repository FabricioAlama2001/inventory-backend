import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MenuTypeEnum } from '@auth/enums';
import { RoleEntity } from '@auth/entities';

@Entity('menus', { schema: 'siray' })
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  // Relationships
  @OneToMany(() => MenuEntity, (category) => category.parent)
  children: MenuEntity[];

  @ManyToOne(() => MenuEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: MenuEntity;

  @ManyToMany(() => RoleEntity)
  roles: RoleEntity[];

  // Fields
  @Column('varchar', {
    name: 'code',
    unique: true,
    comment: 'Codigo unico',
  })
  code: string;

  @Column('varchar', {
    name: 'icon',
    comment: 'Nombre del icono acorde a la libreria PrimeNg (Ej. pi pi-user)',
  })
  icon: string;

  @Column('boolean', {
    name: 'is_visible',
    comment: 'True=es visible, False=no es visible para el usuario final',
  })
  isVisible: boolean;

  @Column('varchar', {
    name: 'label',
    unique: true,
    comment: 'Nombre del menu',
  })
  label: string;

  @Column('varchar', {
    name: 'router_link',
    unique: true,
    nullable: true,
    comment: 'Nombre de la ruta',
  })
  routerLink: string;

  @Column('enum', {
    name: 'type',
    enum: MenuTypeEnum,
    comment: 'Tipo de menu',
  })
  type: MenuTypeEnum;

  @BeforeInsert()
  @BeforeUpdate()
  setEmail() {
    if (!this.code) {
      return;
    }
    this.code = this.code.toLowerCase().trim();
  }
}
