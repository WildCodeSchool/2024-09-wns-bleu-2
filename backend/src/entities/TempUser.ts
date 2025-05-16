import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { CarInfos } from "./CarInfos";

@Entity()
export class TempUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  randomCode: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @OneToOne(() => CarInfos, (car) => car.tempUser, { cascade: true })
  @JoinColumn()
  car: CarInfos;
}
