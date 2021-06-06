import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { getMongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {


    async create(payload: any): Promise<any> {
        let show = {};
        const manager = getMongoRepository(Post);
        try {
            if (payload === null || payload === undefined) {
                show = {
                    type: 'error',
                    message: 'Please enter Data'
                }
                return { show };
            }


            let post = await new Post();
            post.id = uuidv4();
            post.userId = payload.userId
            post.name = payload.name
            post.description = payload.description
            post.status = payload.status
            post.category = payload.category
            const PostCreated = await manager.save(post);
            return {
                "msg": "Post created",
                PostCreated
            }


        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }


    async updatePost(payload: any): Promise<object> {
        const manager = getMongoRepository(Post)
        let res;
        let filter = {
            id: payload.id
        }
        let updatedJob = {};
        for (let i in payload) {
            let j = i
            updatedJob[j] = payload[i];
        }
        try {
            res = await manager.updateOne(filter, { $set: updatedJob });
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
        return res
    }

    async findPost(payload: any): Promise<any> {
        const manager = getMongoRepository(Post)
        let res;
        let pageNumber = payload.PageNumber;
        let nPerPage = payload.nPerPage;
        pageNumber = pageNumber ? pageNumber : 1;
        nPerPage = nPerPage ? nPerPage : 100;
        let filter = {
            id: payload.id
        }
        try {
            res = await manager.aggregate(
                [
                    { $match: filter },
                    { $limit: nPerPage + (pageNumber - 1) * nPerPage },
                    { $skip: (pageNumber - 1) * nPerPage }
                ]
            ).toArray();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
        return res
    }



    async deletePost(payload: any) {
        let res;
        const manager = getMongoRepository(Post);
        try {
            res = await manager.deleteMany(payload);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
        return res;
    }

    async searchPost(payload: any) {
        let res;
        const manager = getMongoRepository(Post);
        try {
            res = await manager.aggregate(
                [
                    { $match: { $text: { $search: payload.search } } },
                  
                ]
            ).toArray();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
        return res;
    }

}
