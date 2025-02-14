import { Field, ObjectType, ID } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@ObjectType()
@Entity()
export class CarInfos extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field()
  @Column({ nullable: true })
  brand: string;
}
