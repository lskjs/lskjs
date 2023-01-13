/**
 * Обработчик события
 */
export type IEventEmitterCallback = (...args: any[]) => void;

/**
 * Event emitter
 */
export interface IEventEmitter {
  /**
   * подписаться на событие
   * @param event назавние события
   * @param callback обработчик события
   */
  on(event: string, callback: IEventEmitterCallback): void;
  /**
   * отослать событие
   * @param event назавние события
   * @param args аргументы которое отсылем в обработчик события
   */
  emit(event: string, ...args: any[]): void;
}
