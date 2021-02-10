export function filterParams(params = {}) {
  const payload = {};

  Object.keys(params).forEach((key) => {
    payload[key] = typeof params[key] === 'string' && !params[key] ? null : params[key];
  });

  return payload;
}
