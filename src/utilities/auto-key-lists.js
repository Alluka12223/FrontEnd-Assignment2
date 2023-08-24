// Omits the need to write 'key={someUniqueKey}'
// for elements in list when mapping them to jsx in React
// - automatically tries to get the key from id or _id,
// if not possible, uses the array index instead

let ap = Array.prototype;
if (!ap._mapNoAutoKey) {
  let org = ap._mapNoAutoKey = ap.map;
  ap.map = function (...args) {
    // get ids/unique keys
    let ids = org.call(this, (x, i) => x ? (x.id || x._id || i) : i);
    // apply map
    let result = org.apply(this, args);
    // patches with key if React element
    return org.call(result, x =>
      x && x.$$typeof && x.key === null ? { ...x, key: ids.shift() } : x
    );
  }
}

export function generateBookingNumber() {
  let no = '';
  while (no.length < 3) {
    no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
  }
  while (no.length < 6) {
    no += Math.floor(Math.random() * 10);
  }
  return no;
}