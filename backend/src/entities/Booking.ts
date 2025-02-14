import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Carpool } from "./Carpool";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  reservedAt: Date;

  @Field()
  @Column()
  numPassenger: number;

  @Field(() => Carpool)
  @ManyToOne(() => Carpool, (carpool) => carpool.bookings, { onDelete: "CASCADE" })
  carpool: Carpool;

   @Field(() => User)
   @ManyToOne(() => User, (user) => user.bookings, { onDelete: "CASCADE" })
   passenger: User;
}