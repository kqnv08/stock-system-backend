import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class MyResolver {
  @Query(() => String)
  hello() {
    return 'world';
  }
}