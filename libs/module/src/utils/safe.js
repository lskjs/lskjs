/* eslint-disable no-console */
export async function create(Class, ...args) {
  if (Class.create) {
    return Class.create(args);
  }
  const obj = new Class(...args);
  return obj;
}

export async function start(Class, ...args) {
  if (Class.start) {
    return Class.start(...args);
  }
  const obj = new Class(...args);
  if (obj.start) {
    try {
      await obj.start();
    } catch (err) {
      console.error('obj.start()', err);
      throw err;
    }
  } else if (obj.init || obj.run) {
    if (obj.init) {
      try {
        await obj.init();
      } catch (err) {
        console.error('obj.init()', err);
        throw err;
      }
    }
    if (obj.run) {
      try {
        await obj.run();
      } catch (err) {
        console.error('obj.run()', err);
        throw err;
      }
    }
  }
  return obj;
}
