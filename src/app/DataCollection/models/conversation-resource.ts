import { StudentMessage } from "./studentMessage";

export class ConversationResource {
  id: string;
  createdAt: Date;
  studentMessages: StudentMessage[];
}
