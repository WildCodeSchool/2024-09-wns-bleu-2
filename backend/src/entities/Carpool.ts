import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Booking } from "./Booking";

export enum Options {
  AnimalFriendly = "Animal Friendly",
  Fumeur = "Fumeur",
  Musique = "Musique",
}
@ObjectType()
@Entity()
export class Carpool extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "date", nullable: false })
  departure_date: string; //AAAA-MM-JJ

  @Column()
  departure_city: string;

  @Field()
  @Column({ type: "time", nullable: false })
  departure_time: String; //HH:MM:SS

  @Field()
  @Column()
  arrival_city: string;

  @Field()
  @Column()
  num_passenger: number;

  @Field()
  @Column()
  type_of_road: string;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column({ nullable: true })
  options: Options;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.carpools, {
    cascade: true,
    onDelete: "CASCADE",
  })
  driver: User;

  @OneToMany(() => Booking, (booking) => booking.carpool)
  bookings: Booking[];
}
