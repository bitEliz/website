Array.prototype.isEmpty = function () {
  return this.length == 0;
};

String.prototype.isEmpty = function () {
  return this.length == 0;
};

export const isArray = (arg) => Array.isArray(arg);
