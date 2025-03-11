import { Options } from "../entities/options";
import { Query, Resolver } from "type-graphql";

@Resolver(Options)
class OptionsResolver {
  @Query(() => [Options])
  async getAllTags() {
    const tags = await Options.find();
    return tags;
  }
}

export default OptionsResolver;