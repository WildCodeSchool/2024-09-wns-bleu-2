import { Field, InputType } from "type-graphql";
import { Carpool } from "../entities/Carpool";
//import { Column } from "typeorm";

enum Options {
    AnimalFriendly = "Animal Friendly",
    Fumeur = "Fumeur",
    Musique = "Musique",
  }

@InputType()
class CarpoolInput implements Partial<Carpool> {
    @Field()
    departue_date: Date;
  
    @Field()
    departure_city: string;
  
    @Field()
    departure_time: Date;
  
    @Field()
    arrival_city: string;
  
    @Field()
    num_passenger: number;
  
    @Field()
    type_of_road: string;
  
    @Field()
    duration: number;
  
    @Field()
    price: number;
  
    @Field()
    options: Options;
  
    @Field({ nullable: true }) 
    userId?: number; // ID of the user who created the carpool

    

 /* @Field(() => [PictureInput], { nullable: true })
  pictures?: Picture[];

  @Field(() => [TagInput], { nullable: true })
  tags: Tag[];*/
}

export default CarpoolInput;