import { Field, ObjectType, ID } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@ObjectType()
@Entity()
export class Options extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}