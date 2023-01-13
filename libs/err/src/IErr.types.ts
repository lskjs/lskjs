export interface IErr extends Error {
  code?: string;
  __err: boolean;
  // constructor(...params: any[]);
  // static getMessage(err: any, def : string): string;
  // static getText(err: any, def : string): string;
  // static getCode(err: any, def : string): string;
  // static getJSON(err: any, onlySafeField: boolean): Record<string, unknown> ;
  // static isError(err: any): boolean ;
  // static isErr(err: any): boolean ;
  getText(): string;
  getJSON(onlySafeField: boolean): Record<string, unknown>;
  getMessage(): string;
  getCode(): string;
  toJSON(): Record<string, unknown>;
}
