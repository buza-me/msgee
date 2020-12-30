# msgee
An extended events manager. Provides messaging between app components and between browser tabs.

## Installation - NPM
```sh
npm i msgee
```

## Installation - Browser
```html
<script src="https://unpkg.com/msgee@2.0.3/dist/bundle.browser.iife.js"></script>
```

## Usage
***
**Imports - msgee instance:**
```js
import msgee from 'msgee';
```
browser version:
```js
window.msgee.instance;
```
**Imports - constructors:**
```js
import { Msgee, Channel } from 'msgee';
```
browser version:
```js
const { Msgee, Channel } = window.msgee;
```
***
**Actual usage:**
```js
import msgee from 'msgee';

const listener = message => { /* listener code */ };
const channelName = 'hey-hey';
const message = 'sigh';

// subscribe to a message channel:
msgee.subscribe(channelName, listener);

// send message to a channel:
msgee.push(channelName, message);

// Send a message across browser tabs:
msgee.push(channelName, message, true);
```

***
**In-depth usage:**
Msgee instance is created by calling an Msgee constructor with a required first argument,- channel constructor. Second argument is a storage key, it is important for multi-tab communication, is optional and defaults to ```msgee-storage```.
```js
import { Msgee, Channel } from 'msgee';

const withDefaultName = new Msgee(Channel);
//or:
const withCustomName = new Msgee(Channel, 'storage-key-name');
```

If for some reason you're unhappy with a default storage key name, you can change it without a need to create a new instance with a constructor, just call a method:
```js
import msgee from 'msgee';

msgee.setStorageKey('storage-key-name');
```

If you want to create a channel manually use ```msgee.setChannel```:
```js
import msgee from 'msgee';

const channelName = 'some-channel';
const serializableValues = [
  1,
  '1',
  true,
  [ 2 ],
  { qq: true }
]

// without base data:
const someChannel = msgee.setChannel(channelName);

// with base data, which should be an array of serializable elements:
const someChannelWithData = msgee.setChannel(channelName, serializableValues)
```

If you want to delete a channel use ```msgee.deleteChannel```:
```js
import msgee from 'msgee';

msgee.deleteChannel('hey-hey');
```

If you want to access / work with a channel directly use ```msgee.getChannel```:
```js
import msgee from 'msgee';

const channel = msgee.getChannel('hey-hey');
const message = 'sigh';

// accumulated channel messages:
const accumulatedMessages = channel.data;

// push a message from a channel level:
channel.push(message)
```

If you subscribe to a channel, but msgee has no instance of such, it creates one.
If there is no subscriptions to a channel then messages will be accumulated, otherwise not.
If you want messages to be accumulated with active subscriptions, push it to a channel directly.
```js
import msgee from 'msgee';

const channelName = 'hey-hey';

msgee.push(channelName, 'sigh');

const channel = msgee.getChannel(channelName);

// There is no subscriptions to this channel, logs ['sigh']
console.log(channel.data);
```
