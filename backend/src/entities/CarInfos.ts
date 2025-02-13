import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class CarInfos extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  model: string;

  @Field()
  @Column()
  year: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  brand: string;

  @OneToOne(() => User, (user) => user.carInfos)
  user: User;
}
