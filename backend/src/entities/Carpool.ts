import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

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

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.carpools, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => [User])
  driver_id: User;
}
