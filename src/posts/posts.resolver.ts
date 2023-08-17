import { CreatePostInput } from 'src/posts/dto/create-post.input';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';


@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findProductById(id);
  }

  @ResolveField( (returns) => Post)
  author(@Parent() post: Post) :Promise<Author> {
    return this.postsService.getAuthor(post.authorId);
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postsService.createPost(postInput);
  }
}
