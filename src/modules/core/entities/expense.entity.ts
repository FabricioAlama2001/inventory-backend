import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,

  Generated,

  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity, SignatureEntity, TransactionOutDetailEntity } from '@core/entities';

//Cambios realizados creacion de la entidad

@Entity('expenses', { schema: 'core' })
export class ExpenseEntity {
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
  @OneToMany(() => TransactionOutDetailEntity, transactionDetail => transactionDetail.expense)
  transactionOutDetails: TransactionOutDetailEntity[];

  @OneToOne(() => SignatureEntity, signature => signature.expense)
  signature: SignatureEntity;

  //
  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[];

  /** Foreign Keys **/


  /** Columns **/
  @Generated('increment')
  @Column({
    name: 'code',
    type: 'bigint',
    comment: 'Codigo del catalogo',
  })
  code: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'Descripcion del catalogo',
  })
  description: string;

  @Column({
    name: 'date',
    type: 'timestamp',
    comment: 'fecha de la transaccion',
  })
  date: Date;


}
