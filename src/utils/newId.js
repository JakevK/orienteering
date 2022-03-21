let lastId = 0;

function newId(prefix = "id") {
  return `${prefix}${++lastId}`;
}

export default newId;
