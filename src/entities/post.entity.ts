import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";


@Entity("Post")
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'varchar', length: 10, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 150 })
    category: string;

    @Column({ type: 'varchar', length: 150 })
    status: string;


    @Column({ type: 'varchar', length: 150 })
    userId: string;
   
    @Column({ type: 'varchar', length: 150 })
    description: string;
   

    @CreateDateColumn()
    createdAt: Date;

}