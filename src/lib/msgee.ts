import { Message, SubscriptionSet, Subscription, IChannel, IChannelConstructor } from './types';

export class Msgee {
  protected subscriptions: Map<string, SubscriptionSet> = new Map();

  protected channels: Map<string, IChannel> = new Map();

  constructor(protected ChannelConstructor: IChannelConstructor, protected storageKey: string = 'msgee-storage') {
    window.addEventListener('storage', this.storageEventListener);
  }

  public setStorageKey = (name: string): void => {
    this.storageKey = name;
  };

  protected storageEventListener = (event: StorageEvent): void => {
    if (event.key === this.storageKey) {
      const message = JSON.parse(event.newValue);

      this.push(message.name, message.data);
    }
  };

  public subscribe = (name: string, callback: Subscription): (() => boolean) => {
    if (!this.subscriptions.has(name)) {
      this.subscriptions.set(name, new Set());
    }

    if (!this.channels.has(name)) {
      this.setChannel(name);
    }

    this.subscriptions.get(name)?.add(callback);

    return () => this.subscriptions.get(name)?.delete(callback);
  };

  public push = (name: string, data: Message, isMultiTab = false): void => {
    if (isMultiTab) {
      const message: string = JSON.stringify({
        name,
        data,
        id: Date.now(),
      });

      localStorage.setItem(this.storageKey, message);
    }

    const subscriptionSet: SubscriptionSet = this.subscriptions.get(name);

    if (!subscriptionSet?.size) {
      const channel = this.getChannel(name) || this.setChannel(name);

      channel.push(data, false);

      return;
    }

    subscriptionSet.forEach((callback) => callback(data));
  };

  public setChannel = (name = '', baseData: Message[] = []): IChannel => {
    const newChannel: IChannel = new this.ChannelConstructor(name, this.push, baseData);

    this.channels.set(name, newChannel);

    return newChannel;
  };

  public getChannel = (name: string): IChannel => this.channels.get(name);

  public deleteChannel = (name: string): boolean => this.channels.delete(name);
}
