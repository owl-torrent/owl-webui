export const handleAsync = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err]);
};
