import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Point } from 'geojson';

class GeoPoint {
  type: string;

  coordinates: number[]; // longitude, latitude
}

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
      type: 'geography',
      spatialFeatureType: 'Point',
      srid: 4326,
  })
  location: Point;
}