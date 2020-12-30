import { PushCallback, Message, IChannel } from './types';

export class Channel implements IChannel {
  constructor(public name: string, protected pushCallback: PushCallback, public data: Message[] = []) {}

  public push = (message: Message, shouldUseCallback = true): number => {
    if (shouldUseCallback) {
      this.pushCallback(this.name, message);
    }

    return this.data.push(message);
  };
}
