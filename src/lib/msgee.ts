import { Message, SubscriptionSet, Subscription, PushOptions } from './types';

export class Msgee {
  protected subscriptions: Map<string, SubscriptionSet> = new Map();

  protected channelDataMap: Map<string, Message[]> = new Map();

  constructor(protected storageKey: string = 'msgee-storage') {
    globalThis?.addEventListener('storage', this.storageEventListener);
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

    subscriptionSet?.forEach((callback) => callback(data));
  };

  public setChannelData = (name = '', baseData: Message[] = []): Message[] => {
    this.channelDataMap.set(name, baseData);

    return baseData;
  };

  public getChannelData = (name: string): Message[] | void => this.channelDataMap.get(name);

  public deleteChannelData = (name: string): boolean => this.channelDataMap.delete(name);
}
