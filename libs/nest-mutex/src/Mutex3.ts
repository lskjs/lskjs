import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import AsyncLock from 'async-lock';
import { Observable } from 'rxjs';

// const redisClient = new Redis();

@Injectable()
class MutexInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // console.log('[intercept]');
    const request = context.switchToHttp().getRequest();
    const key = request.mutexKey;

    const lock = new AsyncLock({ timeout: 5000 }); // wait 5 seconds to acquire lock

    // try to acquire lock with the key, run the method if successful
    return lock.acquire(key, async () => next.handle().toPromise());
  }
}

export function Mutex(key: string) {
  return applyDecorators(
    UseInterceptors(MutexInterceptor),
    // (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    //   const originalMethod = descriptor.value;
    //   descriptor.value = async function (...args: any[]) {
    //     console.log({ args });
    //     // store the mutex key in request
    //     args[0].mutexKey = key;
    //     return originalMethod.apply(this, args);
    //   };
    //   return descriptor;
    // },
  );
}
