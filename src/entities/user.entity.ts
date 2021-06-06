import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";


@Entity("User")
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'varchar', length: 10, unique: true })
    userId: string;

    @Column({ type: 'varchar', length: 150 })
    password: string;

    @Column({ type: 'varchar', length: 150 })
    salt: string;
   
    @CreateDateColumn()
    createdAt: Date;

}