var Storage = (function(ls) {
  return {
    get: function(key) {
      return ls.getItem(key);
    },
    set: function(key, value) {
      ls.setItem(key, value);
      return ls.getItem(key);
    },
    del: function(key) {
      var val = ls.getItem(key);
      ls.removeItem(key);
      return val;
    }
  };
}(window.localStorage));