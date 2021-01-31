export const filterObjectByKeys = (
  object: { [key: string]: any },
  allowedKeys: string[]
) =>
  Object.keys(object)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj: { [key: string]: any }, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
