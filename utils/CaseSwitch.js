function camelCaser(obj) {
  obj?.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
}

const snakeCaser = (obj) => obj?.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export {
  camelCaser,
  snakeCaser,
};
