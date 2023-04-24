import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerMentorModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MentorModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly MenteeModels?: (MenteeModel | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMentorModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MentorModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly MenteeModels: AsyncCollection<MenteeModel>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MentorModel = LazyLoading extends LazyLoadingDisabled ? EagerMentorModel : LazyMentorModel

export declare const MentorModel: (new (init: ModelInit<MentorModel>) => MentorModel) & {
  copyOf(source: MentorModel, mutator: (draft: MutableModel<MentorModel>) => MutableModel<MentorModel> | void): MentorModel;
}

type EagerMenteeModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MenteeModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mentormodelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMenteeModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MenteeModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mentormodelID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MenteeModel = LazyLoading extends LazyLoadingDisabled ? EagerMenteeModel : LazyMenteeModel

export declare const MenteeModel: (new (init: ModelInit<MenteeModel>) => MenteeModel) & {
  copyOf(source: MenteeModel, mutator: (draft: MutableModel<MenteeModel>) => MutableModel<MenteeModel> | void): MenteeModel;
}

type EagerMentorRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MentorRelation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly menteeID?: string | null;
  readonly mentorID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMentorRelation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MentorRelation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly menteeID?: string | null;
  readonly mentorID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MentorRelation = LazyLoading extends LazyLoadingDisabled ? EagerMentorRelation : LazyMentorRelation

export declare const MentorRelation: (new (init: ModelInit<MentorRelation>) => MentorRelation) & {
  copyOf(source: MentorRelation, mutator: (draft: MutableModel<MentorRelation>) => MutableModel<MentorRelation> | void): MentorRelation;
}

type EagerMentee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mentee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User?: User | null;
  readonly mentorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly menteeUserId?: string | null;
}

type LazyMentee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mentee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User: AsyncItem<User | undefined>;
  readonly mentorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly menteeUserId?: string | null;
}

export declare type Mentee = LazyLoading extends LazyLoadingDisabled ? EagerMentee : LazyMentee

export declare const Mentee: (new (init: ModelInit<Mentee>) => Mentee) & {
  copyOf(source: Mentee, mutator: (draft: MutableModel<Mentee>) => MutableModel<Mentee> | void): Mentee;
}

type EagerMentor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mentor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User?: User | null;
  readonly Mentees?: (Mentee | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly mentorUserId?: string | null;
}

type LazyMentor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mentor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User: AsyncItem<User | undefined>;
  readonly Mentees: AsyncCollection<Mentee>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly mentorUserId?: string | null;
}

export declare type Mentor = LazyLoading extends LazyLoadingDisabled ? EagerMentor : LazyMentor

export declare const Mentor: (new (init: ModelInit<Mentor>) => Mentor) & {
  copyOf(source: Mentor, mutator: (draft: MutableModel<Mentor>) => MutableModel<Mentor> | void): Mentor;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly userID: string;
  readonly chatroomID: string;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly userID: string;
  readonly chatroomID: string;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly newMessages?: number | null;
  readonly LastMessage?: Message | null;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatRoomUsers?: (ChatRoomUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly newMessages?: number | null;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatRoomUsers: AsyncCollection<ChatRoomUser>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string | null;
  readonly status?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly ChatRooms?: (ChatRoomUser | null)[] | null;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string | null;
  readonly status?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly ChatRooms: AsyncCollection<ChatRoomUser>;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerChatRoomUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoomUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoomUser = LazyLoading extends LazyLoadingDisabled ? EagerChatRoomUser : LazyChatRoomUser

export declare const ChatRoomUser: (new (init: ModelInit<ChatRoomUser>) => ChatRoomUser) & {
  copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser>) => MutableModel<ChatRoomUser> | void): ChatRoomUser;
}