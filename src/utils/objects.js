export const filterObjectByKeys = (object, allowedKeys) =>
  Object.keys(object)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
