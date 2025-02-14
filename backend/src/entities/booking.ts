import { Field, ObjectType, ID } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Carpool } from "./Carpool";
import { User } from "./User";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Carpool)
  @ManyToOne(() => Carpool, (carpool) => carpool.bookings)
  carpool: Carpool;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookings)
  passenger: User;

  @Field()
  @Column()
  booking_date: Date;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  num_passenger: number;
}
