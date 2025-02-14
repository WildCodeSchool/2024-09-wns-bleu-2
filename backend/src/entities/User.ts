import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  //ManyToMany,
  //ManyToMany,
  OneToMany,
  //JoinColumn,
  //JoinTable,
  //ManyToMany,
  //OneToMany,
  //OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
//import { Carpool } from "./Carpool";
import { Booking } from "./booking";
import { Carpool } from "./Carpool";
//import { Carpool } from "./Carpool";
//import { CarInfos } from "./CarInfos";

export enum Gender {
  Homme = "Homme",
  Femme = "Femme",
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  birthdate: Date;

  @Field()
  @Column()
  gender: Gender;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  avatar: string;

  @OneToMany(() => Carpool, (ad) => ad.driver)
  @Field(() => [Carpool])
  Carpools: Carpool[];

 /*@ManyToMany(() => Carpool, (ad) => ad.passenger)
  Carpools: Carpool[];*/
  
  @Field(() => [Booking])
  @OneToMany(() => Booking, (booking) => booking.passenger)
  bookings: Booking[];
}