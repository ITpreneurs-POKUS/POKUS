# react-native-do-not-disturb

Enable and disable DND mode on Android devices.

## Installation

```sh
npm install react-native-do-not-disturb
```

## Usage

```js
import {
  isDoNotDisturbModeOn,
  openDoNotDisturbSettings,
} from 'react-native-do-not-disturb';
// ...

const isDNDModeOn = await isDoNotDisturbModeOn();
console.log('DND', 'Is DND mode on: ' + isDNDModeOn);
if (!isDNDModeOn) {
  openDoNotDisturbSettings();
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
