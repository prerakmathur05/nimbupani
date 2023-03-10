// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MentorRelation, Mentee, Mentor, Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  MentorRelation,
  Mentee,
  Mentor,
  Message,
  ChatRoom,
  User,
  ChatRoomUser
};