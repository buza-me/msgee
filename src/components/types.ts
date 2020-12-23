export type BasicSerializable = string | number | boolean | Date | null;
export type Message = BasicSerializable | Array<BasicSerializable> | { [propName: string]: BasicSerializable };
export type PushCallback = (name: string, data: Message) => void;
export type Subscription = (message?: Message) => void;
export type SubscriptionSet = Set<Subscription>;

export interface IChannel {
  push: (data: Message, shouldUseCallback: boolean) => number;
  data: Message[];
}

export interface IChannelConstructor {
  new (name: string, pushCallback: PushCallback, data?: Message[]): IChannel;
}
