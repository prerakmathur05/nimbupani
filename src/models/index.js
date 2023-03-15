// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MentorModel, MenteeModel, MentorRelation, Mentee, Mentor, Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  MentorModel,
  MenteeModel,
  MentorRelation,
  Mentee,
  Mentor,
  Message,
  ChatRoom,
  User,
  ChatRoomUser
};