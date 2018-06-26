import { ChromaSdk } from "./chroma-sdk";
import { DefaultKeyboardEffects } from "./constants";
import { ICustomEffectOptions, ICustomKeyEffectOptions, IEffectGroupOptions } from "./IEffectOptions";

export class KeyboardHelper extends ChromaSdk {
  constructor(isDev, options) {
    super(isDev, options);
  }

  /**
   * Stops the current animation if any on the keyboard
   * @param {boolean} autoapply pass true to trigger the effect 
   * @return {Promise<number>} returns the id of the effect created here
   */
  async stopAnimation(autoapply: boolean = false): Promise<string> {
    const { id } = await this.$http
      .post('/keyboard', { effect: DefaultKeyboardEffects.CHROMA_NONE })
      .then(({ data }) => data);
    if (autoapply) { await this.applyEffect(id); }
    return id;
  }

  /**
   * sets a static color to the keyboard
   * @param {number} color RGB notation color 
   * @param {boolean} autoapply pass true to trigger the effect
   * @return {Promise<number>} returns the id of the effect created here
   */
  async setStatic(color: number, autoapply: boolean = false): Promise<string> {
    const { id } = await this.$http
      .post('/keyboard', {
        effect: DefaultKeyboardEffects.CHROMA_STATIC,
        param: { color }
      })
      .then(({ data }) => data);
    if (autoapply) { await this.applyEffect(id); }
    return id;
  }

  async createCustom(param: ICustomEffectOptions, autoapply = false): Promise<string> {
    const { id } = await this.$http.post('/keyboard', param)
      .then(({ data }) => data);
    if (autoapply) { await this.applyEffect(id); }
    return id;
  }

  async createCustomkeys(param: ICustomKeyEffectOptions, autoapply = false): Promise<string> {
    const { id } = await this.$http.post('/keyboard', param)
      .then(({ data }) => data);
    if (autoapply) { await this.applyEffect(id); }
    return id;
  }

  async createEffectGroup(param: IEffectGroupOptions, autoapply = false): Promise<string[]> {
    const id = await this.$http.post('/keyboard', param).then(({ data }) => data.results.map(r => r.id));
    if (autoapply) { await this.applyEffect(id); }
    return id;
  }
}