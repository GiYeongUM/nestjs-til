import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../common/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'tbl_user',
})
export class Auth extends BaseEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  nickname: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ unique: true, nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  birth: Date;
}
