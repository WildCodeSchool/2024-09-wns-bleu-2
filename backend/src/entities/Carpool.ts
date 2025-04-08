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
//import { Options } from "./options";

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

  @Field()
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
  toll: Boolean;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  price: number;

  @Field(() => [String])
  @Column("simple-array", { nullable: true })
  options?: string[];

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.carpools, {
    cascade: true,
    onDelete: "CASCADE",
  })
  driver: User;

  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.carpool)
  bookings?: Booking[];
}
