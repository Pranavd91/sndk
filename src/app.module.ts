import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: 'mongodb+srv://root:root@cluster0.5fdik.gcp.mongodb.net/sndk?retryWrites=true&w=majority',
      database: "sndk",
      useNewUrlParser: true,
      synchronize: false,
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      useUnifiedTopology: true,
    }),
    TerminusModule,
    AuthModule,
    PostModule,
  
    ],
  controllers: [HealthController],
  providers: [PostService],
})
export class AppModule {}
