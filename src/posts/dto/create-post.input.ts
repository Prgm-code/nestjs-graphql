import { Field , InputType} from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


@InputType()
export class CreatePostInput {


    @MaxLength(100, {message: "Title is too long"})
    @MinLength(3)
    @IsNotEmpty()
    @Field()
    title: string;

    @MaxLength(400)
    @Field({nullable: true})
    content?: string;

    @IsInt()
    @Field()
    authorId: number;
    

}