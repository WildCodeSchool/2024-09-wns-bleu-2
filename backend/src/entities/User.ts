import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carpool } from "./Carpool";
import { CarInfos } from "./CarInfos";

enum Gender {
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

  @Field(() => [Carpool], { nullable: true })
  @ManyToMany(() => Carpool, (carpool) => carpool.driver_id)
  @JoinTable()
  carpools: Carpool[];

  @OneToOne(() => CarInfos, (carInfos) => carInfos.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  carInfos: CarInfos;
}
