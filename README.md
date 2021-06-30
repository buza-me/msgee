# msgee
An extended events manager. Provides messaging between app components and between browser tabs.

## Installation - NPM
```sh
npm i msgee
```

## Installation - Browser
```html
<script src="https://unpkg.com/msgee@3.0.1/dist/bundle.browser.iife.js"></script>
```

## Usage
***
**Imports - msgee instance:**
```js
import msgee from 'msgee';
```
browser version:
```js
window.msgee;
```
**Imports - constructor:**
```js
import { Msgee } from 'msgee';
```
***
**Actual usage:**
```js
import msgee from 'msgee';

const listener = message => { /* listener code */ };
const channelName = 'hey-hey';
const message = 'huh';

// subscribe to a message channel:
msgee.subscribe(channelName, listener);

// send message to a channel:
msgee.push(channelName, message);

// Send a message across browser tabs:
msgee.push(channelName, message, { isMultiTab: true });

// Post message with async listener execution:
msgee.push(channelName, message, { isAsync: true });
```

***
**In-depth usage:**

If for some reason you need a few Msgee instances:
You can create one using a constructor with a storage key as a first argument. It is important for multi-tab communication, is optional and defaults to ```msgee-storage```. You need to pass a storage name for it to properly function.
```js
import { Msgee } from 'msgee';

const withDefaultName = new Msgee();
//or:
const withCustomName = new Msgee('storage-key-name');
```

If for some reason you're unhappy with a default storage key name:
You can change it without a need to create a new instance with the constructor, just call the method:
```js
import msgee from 'msgee';

msgee.setStorageKey('storage-key-name');
```

If you want to create a channel data array manually use ```msgee.setChannelData```:
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

// Without base data, is an empty array:
const someEmptyChannelData = msgee.setChannelData(channelName);

// With base data, which should be an array of serializable elements:
const someChannelWithData = msgee.setChannelData(channelName, serializableValues)
```

If you want to get accumulated channel messages use ```msgee.getChannelData```:
```js
const channelName = 'hey-hey';
const channelData = msgee.getChannelData(channelName);
```

If you want to delete a channel data, use ```msgee.deleteChannelData```:
```js
import msgee from 'msgee';

const channelName = 'hey-hey';

msgee.deleteChannelData(channelName);

// Logs undefined
console.log(msgee.getChannelData(channelName));
```

If you subscribe to a channel, but msgee has no instance of such channel data, it creates one.
If there is no subscriptions to a channel then messages will be accumulated, otherwise not.
If you want messages to be accumulated with active subscriptions, use the ```{ shouldSave: true }``` option.
```js
import msgee from 'msgee';

const channelName = 'hey-hey';

msgee.push(channelName, 'huh');

const channelData = msgee.getChannelData(channelName);

// There is no subscriptions to this channel, logs ['huh']
console.log(channelData);

// Save a message using an option.
msgee.push(channelName, 'hey', { shouldSave: true });

// Logs ['huh', 'hey']
console.log(channelData);
```
