import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
} from "typeorm";
import { TempUser } from "./TempUser";

@ObjectType()
@Entity()
export class CarInfos extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  brand?: string;

  @OneToOne(() => TempUser, (tempUser: { car: any }) => tempUser.car)
  tempUser?: TempUser;
}
