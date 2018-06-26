import { DefaultKeyboardEffects } from "./constants";

export interface INoneEffectOptions {
  effect: DefaultKeyboardEffects.CHROMA_NONE;
}

export interface IStaticEffectOptions {
  effect: DefaultKeyboardEffects.CHROMA_STATIC;
  param: number;
}

export interface ICustomEffectOptions {
  effect: DefaultKeyboardEffects.CHROMA_CUSTOM;
  param: number[][];
}

export interface ICustomKeyEffectOptions {
  effect: DefaultKeyboardEffects.CHROMA_CUSTOM_KEY;
  param: {
    color: number[][];
    key: number[][];
  };
}

export interface IEffectGroupOptions {
  effects: any[]
}