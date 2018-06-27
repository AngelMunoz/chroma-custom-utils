import axios, { AxiosInstance } from "axios";
import { IAppOptions } from "./IAppOptions";

export abstract class ChromaSdk {
  $http: AxiosInstance;
  $baseUrl: string;
  _ready = false;

  protected sessionid: number;
  protected timerid: number;

  constructor(protected isDev = true, protected _options: IAppOptions) { }

  public get options() {
    return this._options;
  }

  public get ready() {
    return this._ready;
  }

  async init(isDev = this.isDev) {
    const url = isDev ? "http://localhost:54235/razer/chromasdk" :
      "https://chromasdk.io:54236/razer/chromasdk";

    try {
      const { sessionid, uri } = await axios.post(url, this.options).then(({ data }) => data);
      this.sessionid = sessionid;
      this.$baseUrl = uri;
    } catch (error) {
      throw new Error(error);
    }

    this.$http = axios.create({
      baseURL: this.$baseUrl
    });

    this.timerid = setInterval(() => {
      try {
        return this.$http.put('/heartbeat');
      } catch (error) {
        throw new Error(error)
      }
    }, 5000);
    this._ready = true;
  }

  public unload() {
    clearTimeout(this.timerid);
    this.sessionid = null;
    this.timerid = null;
    this._ready = false;
    return this.$http.delete('');
  }

  public async applyEffect(id: string | string[]): Promise<{ result: number; } | { results: { result: number; }[] }> {
    if (typeof id === 'string') {
      return this.$http.put('/effect', { id }).then(({ data }) => data);
    }
    return this.$http.put('/effect', { ids: id }).then(({ data }) => data);
  }

  public async deleteEffect(id: string | string[]): Promise<{ result: number; } | { results: { result: number; }[] }> {
    if (typeof id === 'string') {
      return this.$http.delete('/effect', { data: { id } }).then(({ data }) => data);
    }
    return this.$http.delete('/effect', { data: { ids: id } }).then(({ data }) => data);
  }
}