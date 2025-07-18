import { Field, ObjectType, ID, Float } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Point } from 'geojson';

@ObjectType()
class GeoPoint {
  @Field()
  type: string;

  @Field(() => [Float])
  coordinates: number[]; // longitude, latitude
}

@ObjectType()
@Entity()
export class City extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  zipCode: string;

  @Field(() => GeoPoint)
  @Column({
      type: 'geography',
      spatialFeatureType: 'Point',
      srid: 4326,
  })
  location: Point;
}