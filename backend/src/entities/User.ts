import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carpool } from "./Carpool";
import { CarInfos } from "./CarInfos";
import { Booking } from "./Booking";

export enum Gender {
  Homme = "Homme",
  Femme = "Femme",
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email?: string;

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
  @Column({ nullable: true })
  avatar: string;

  @Field(() => [Carpool], { nullable: true })
  @OneToMany(() => Carpool, (carpool) => carpool.driver)
  @JoinTable()
  carpools: Carpool[];

  @Field(() => CarInfos, { nullable: true })
  @OneToOne(() => CarInfos, { nullable: true })
  @JoinColumn()
  car: CarInfos;

  @OneToMany(() => Booking, (booking) => booking.passenger)
  bookings: Booking[];
}
