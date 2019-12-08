function update(data, keys, value) {
  if (keys.length === 0) {
    return value;
  }

  let key = keys.shift();
  if (!key) {
    data = data || [];
    if (Array.isArray(data)) {
      key = data.length;
    }
  }

  let index = +key;
  if (!isNaN(index)) {
    data = data || [];
    key = index;
  }
  data = data || {};
  let val = update(data[key], keys, value);
  data[key] = val;

  return data;
}

function serializeForm(form) {
  return Array.from((new FormData(form)).entries())
    .reduce((data, [field, value]) => {
      let [_, prefix, keys] = field.match(/^([^\[]+)((?:\[[^\]]*\])*)/);

      if (keys) {
        keys = Array.from(keys.matchAll(/\[([^\]]*)\]/g), m => m[1]);
        value = update(data[prefix], keys, value);
      }
      data[prefix] = value;
      return data;
    }, {});
}

export default serializeForm;

