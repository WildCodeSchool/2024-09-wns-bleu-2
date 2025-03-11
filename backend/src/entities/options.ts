import { Field, ObjectType, ID } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany } from "typeorm";
import { Carpool } from "./Carpool";

@ObjectType()
@Entity()
export class Options extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Carpool, (carpool) => carpool.options)
  carpools: Carpool[];
}