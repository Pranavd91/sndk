import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
    constructor(
        private postService: PostService,
    ) { }

    @Post('/create')
    register(@Body() payload: any): Promise<any> {
        return this.postService.create(payload);
    }

    @Post('/update')
    update(@Body() payload: any): Promise<any> {
        return this.postService.updatePost(payload);
    }

    @Get('/read')
    getPost(@Body() payload: any): Promise<any> {
        return this.postService.findPost(payload);
    }

    @Post('/delete')
    deletePost(@Body() payload: any): Promise<any> {
        return this.postService.deletePost(payload);
    }

    @Get('/search')
    searchPost(@Body() payload: any): Promise<any> {
        return this.postService.searchPost(payload);
    }
}
