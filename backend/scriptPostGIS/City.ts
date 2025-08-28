import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Point } from 'geojson';

// class GeoPoint {
//   type: string;

//   coordinates: number[]; // longitude, latitude
// }

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  name: string;

  @Column({type: "varchar"})
  zipCode: string;

  @Column({
      type: 'geography',
      spatialFeatureType: 'Point',
      srid: 4326,
  })
  location: Point;
}