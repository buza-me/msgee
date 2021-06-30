export type BasicSerializable = string | number | boolean | Date | null;
export type Message = BasicSerializable | Array<BasicSerializable> | { [propName: string]: BasicSerializable };
export type Subscription = (message?: Message) => void;
export type SubscriptionSet = Set<Subscription>;
export type PushOptions = {
  isMultiTab?: boolean;
  shouldSave?: boolean;
  isAsync?: boolean;
};
export type CallbackExecuter = (subscriptionSet: SubscriptionSet, data: Message) => void;
