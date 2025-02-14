import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
 ManyToOne,
 // JoinTable,
 // ManyToMany,
  OneToMany,
  //JoinTable,
  //ManyToMany,
  //ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
//import { User } from "./User";
import { Booking } from "./booking";
import { User } from "./User";
//import { User } from "./User";

enum Options {
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
  @Column()
  departue_date: Date;

  @Column()
  departure_city: string;

  @Field()
  @Column()
  departure_time: Date;

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
  @Column()
options: Options;

@Field(() => User)
@ManyToOne(() => User, (user) => user.Carpools, { eager: true })
driver: User;

@Field(() => [Booking])
@OneToMany(() => Booking, (booking) => booking.carpool)
bookings: Booking[];

/*@Field(() => [User])
@ManyToMany(() => User, (el) => el.Carpools, { eager: true })
@JoinTable({
    name: "booking", // Name of the join table
    joinColumn: {
      name: "carpool_id", // Name of the column for Carpool ID in the join table
      referencedColumnName: "id", // Refers to the Carpool's primary key
    },
    inverseJoinColumn: {
      name: "passenger_id", // Name of the column for User ID in the join table
      referencedColumnName: "id", // Refers to the User's primary key
    },
  })
passenger: User[];*/

 // One-to-Many relationship with Booking (each carpool can have many bookings)

}