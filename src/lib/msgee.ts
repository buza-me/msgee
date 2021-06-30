import { Message, SubscriptionSet, Subscription, PushOptions, CallbackExecuter } from './types';

export class Msgee {
  constructor(protected storageKey: string = 'msgee-storage') {
    globalThis?.addEventListener('storage', this.storageEventListener);
  }

  protected subscriptions: Map<string, SubscriptionSet> = new Map();

  protected channelDataMap: Map<string, Message[]> = new Map();

  protected storageEventListener = (event: StorageEvent): void => {
    if (event.key === this.storageKey) {
      const message = JSON.parse(event.newValue);

      this.push(message.name, message.data);
    }
  };

  protected callbackExecuteSync: CallbackExecuter = (subscriptionSet, data) =>
    subscriptionSet?.forEach((callback) => callback(data));

  protected callbackExecuteAsync: CallbackExecuter = (subscriptionSet, data) => {
    const channel: MessageChannel = new MessageChannel();
    subscriptionSet?.forEach((callback) => channel.port2.addEventListener('message', (): void => callback(data)));
    channel.port2.start();
    channel.port1.postMessage(data);
  };

  public setStorageKey = (name: string): void => {
    this.storageKey = name;
  };

  public subscribe = (name: string, callback: Subscription): (() => boolean) => {
    if (!this.subscriptions.has(name)) {
      this.subscriptions.set(name, new Set());
    }

    if (!this.channelDataMap.has(name)) {
      this.setChannelData(name);
    }

    this.subscriptions.get(name)?.add(callback);

    return () => this.subscriptions.get(name)?.delete(callback);
  };

  public push = (name: string, data: Message, options?: PushOptions): void => {
    if (options?.isMultiTab && globalThis.localStorage) {
      const message: string = JSON.stringify({
        name,
        data,
        id: Date.now(),
      });

      globalThis.localStorage.setItem(this.storageKey, message);
    }

    const subscriptionSet: SubscriptionSet = this.subscriptions.get(name);

    if (!subscriptionSet?.size || options?.shouldSave) {
      const channelData = this.getChannelData(name) || this.setChannelData(name);

      channelData.push(data);
    }

    if (options?.isAsync) {
      this.callbackExecuteAsync(subscriptionSet, data);
    } else {
      this.callbackExecuteSync(subscriptionSet, data);
    }
  };

  public setChannelData = (name = '', baseData: Message[] = []): Message[] => {
    this.channelDataMap.set(name, baseData);

    return baseData;
  };

  public getChannelData = (name: string): Message[] | void => this.channelDataMap.get(name);

  public deleteChannelData = (name: string): boolean => this.channelDataMap.delete(name);
}
