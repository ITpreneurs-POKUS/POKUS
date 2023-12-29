import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-do-not-disturb' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const DoNotDisturb = NativeModules.DoNotDisturb
  ? NativeModules.DoNotDisturb
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function isDoNotDisturbModeOn(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return DoNotDisturb.isDoNotDisturbModeOn();
  } else {
    throw Error('Platform not supported');
  }
}

export function openDoNotDisturbSettings(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return DoNotDisturb.openDoNotDisturbSettings();
  } else {
    throw Error('Platform not supported');
  }
}
