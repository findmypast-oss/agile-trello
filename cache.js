export default {
  getObject: function(key) {
    const val = localStorage.getItem(key);
    // this doesn't convert the values of the object properly (e.g. dates are still string)
    return val ? JSON.parse(val) : null;
  },

  setObject: function(key, obj) {
    if (key && obj) {
      localStorage.setItem(key, JSON.stringify(obj));
    }
  }
};
