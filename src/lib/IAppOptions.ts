export type DeviceList = ("keyboard" | "mouse" | "headset" | "mousepad" | "keypad" | "chromalink")[]

export interface IAppOptions {
  title: string;
  author: { name: string; contact: string; };
  device_supported: DeviceList;
  description: string;
  category: string;
}