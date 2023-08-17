import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from 'src/posts/dto/create-post.input';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private autorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async createPost(post: CreatePostInput): Promise<Post> {
    const newPost = await this.postRepository.save(post);
    return this.postRepository.save(newPost);
  }

  async findProductById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  getAuthor(userId: number): Promise<Author> {
    return this.autorsService.findOne(userId);
  }
  
}
