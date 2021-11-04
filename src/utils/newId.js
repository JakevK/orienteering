let lastId = 0;

export default function (prefix = "id") {
  return `${prefix}${++lastId}`;
}
