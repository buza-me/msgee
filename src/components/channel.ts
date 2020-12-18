import { PushCallback, Message, IChannel } from './types';

export class Channel implements IChannel {
  constructor(public name: string, protected pushCallback: PushCallback, public data: Message[] = []) {}

  public push = (data: Message, shouldUseCallback = true): number => {
    if (shouldUseCallback) {
      this.pushCallback(this.name, data);
    }

    return this.data.push(data);
  };
}
