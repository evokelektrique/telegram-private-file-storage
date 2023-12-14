import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column({ nullable: true })
    fromChatId: number;

    @Column({ nullable: true })
    messageId: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({
        type: "timestamp",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: true,
    })
    updated_at: Date;
}
