var $jscomp = {scope:{}, getGlobal:function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global ? global : b;
}};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.initSymbol = function() {
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
  $jscomp.initSymbol = function() {
  };
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(b) {
  return "jscomp_symbol_" + b + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.makeIterator = function(b) {
  $jscomp.initSymbolIterator();
  if (b[$jscomp.global.Symbol.iterator]) {
    return b[$jscomp.global.Symbol.iterator]();
  }
  var e = 0;
  return {next:function() {
    return e == b.length ? {done:!0} : {done:!1, value:b[e++]};
  }};
};
$jscomp.arrayFromIterator = function(b) {
  for (var e, k = [];!(e = b.next()).done;) {
    k.push(e.value);
  }
  return k;
};
$jscomp.arrayFromIterable = function(b) {
  return b instanceof Array ? b : $jscomp.arrayFromIterator($jscomp.makeIterator(b));
};
$jscomp.inherits = function(b, e) {
  function k() {
  }
  k.prototype = e.prototype;
  b.prototype = new k;
  b.prototype.constructor = b;
  for (var h in e) {
    if ($jscomp.global.Object.defineProperties) {
      var c = $jscomp.global.Object.getOwnPropertyDescriptor(e, h);
      c && $jscomp.global.Object.defineProperty(b, h, c);
    } else {
      b[h] = e[h];
    }
  }
};
$jscomp.array = $jscomp.array || {};
$jscomp.array.done_ = function() {
  return {done:!0, value:void 0};
};
$jscomp.array.arrayIterator_ = function(b, e) {
  b instanceof String && (b = String(b));
  var k = 0;
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var h = {}, c = (h.next = function() {
    if (k < b.length) {
      var g = k++;
      return {value:e(g, b[g]), done:!1};
    }
    c.next = $jscomp.array.done_;
    return $jscomp.array.done_();
  }, h[Symbol.iterator] = function() {
    return c;
  }, h);
  return c;
};
$jscomp.array.findInternal_ = function(b, e, k) {
  b instanceof String && (b = String(b));
  for (var h = b.length, c = 0;c < h;c++) {
    var g = b[c];
    if (e.call(k, g, c, b)) {
      return {i:c, v:g};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.array.from = function(b, e, k) {
  e = void 0 === e ? function(b) {
    return b;
  } : e;
  var h = [];
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  if (b[Symbol.iterator]) {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    b = b[Symbol.iterator]();
    for (var c;!(c = b.next()).done;) {
      h.push(e.call(k, c.value));
    }
  } else {
    c = b.length;
    for (var g = 0;g < c;g++) {
      h.push(e.call(k, b[g]));
    }
  }
  return h;
};
$jscomp.array.of = function(b) {
  for (var e = [], k = 0;k < arguments.length;++k) {
    e[k - 0] = arguments[k];
  }
  return $jscomp.array.from(e);
};
$jscomp.array.entries = function() {
  return $jscomp.array.arrayIterator_(this, function(b, e) {
    return [b, e];
  });
};
$jscomp.array.entries$install = function() {
  Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries);
};
$jscomp.array.keys = function() {
  return $jscomp.array.arrayIterator_(this, function(b) {
    return b;
  });
};
$jscomp.array.keys$install = function() {
  Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys);
};
$jscomp.array.values = function() {
  return $jscomp.array.arrayIterator_(this, function(b, e) {
    return e;
  });
};
$jscomp.array.values$install = function() {
  Array.prototype.values || (Array.prototype.values = $jscomp.array.values);
};
$jscomp.array.copyWithin = function(b, e, k) {
  var h = this.length;
  b = Number(b);
  e = Number(e);
  k = Number(null != k ? k : h);
  if (b < e) {
    for (k = Math.min(k, h);e < k;) {
      e in this ? this[b++] = this[e++] : (delete this[b++], e++);
    }
  } else {
    for (k = Math.min(k, h + e - b), b += k - e;k > e;) {
      --k in this ? this[--b] = this[k] : delete this[b];
    }
  }
  return this;
};
$jscomp.array.copyWithin$install = function() {
  Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin);
};
$jscomp.array.fill = function(b, e, k) {
  null != k && b.length || (k = this.length || 0);
  k = Number(k);
  for (e = Number((void 0 === e ? 0 : e) || 0);e < k;e++) {
    this[e] = b;
  }
  return this;
};
$jscomp.array.fill$install = function() {
  Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill);
};
$jscomp.array.find = function(b, e) {
  return $jscomp.array.findInternal_(this, b, e).v;
};
$jscomp.array.find$install = function() {
  Array.prototype.find || (Array.prototype.find = $jscomp.array.find);
};
$jscomp.array.findIndex = function(b, e) {
  return $jscomp.array.findInternal_(this, b, e).i;
};
$jscomp.array.findIndex$install = function() {
  Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex);
};
$jscomp.Map = function(b) {
  b = void 0 === b ? [] : b;
  this.data_ = {};
  this.head_ = $jscomp.Map.createHead_();
  this.size = 0;
  if (b) {
    b = $jscomp.makeIterator(b);
    for (var e = b.next();!e.done;e = b.next()) {
      e = e.value, this.set(e[0], e[1]);
    }
  }
};
$jscomp.Map.checkBrowserConformance_ = function() {
  var b = $jscomp.global.Map;
  if (!b || !b.prototype.entries || !Object.seal) {
    return !1;
  }
  try {
    var e = Object.seal({x:4}), k = new b($jscomp.makeIterator([[e, "s"]]));
    if ("s" != k.get(e) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
      return !1;
    }
    var h = k.entries(), c = h.next();
    if (c.done || c.value[0] != e || "s" != c.value[1]) {
      return !1;
    }
    c = h.next();
    return c.done || 4 != c.value[0].x || "t" != c.value[1] || !h.next().done ? !1 : !0;
  } catch (g) {
    return !1;
  }
};
$jscomp.Map.createHead_ = function() {
  var b = {};
  return b.previous = b.next = b.head = b;
};
$jscomp.Map.getId_ = function(b) {
  if (!(b instanceof Object)) {
    return String(b);
  }
  $jscomp.Map.key_ in b || b instanceof Object && Object.isExtensible && Object.isExtensible(b) && $jscomp.Map.defineProperty_(b, $jscomp.Map.key_, ++$jscomp.Map.index_);
  return $jscomp.Map.key_ in b ? b[$jscomp.Map.key_] : " " + b;
};
$jscomp.Map.prototype.set = function(b, e) {
  var k = this.maybeGetEntry_(b), h = k.id, c = k.list, k = k.entry;
  c || (c = this.data_[h] = []);
  k ? k.value = e : (k = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:e}, c.push(k), this.head_.previous.next = k, this.head_.previous = k, this.size++);
  return this;
};
$jscomp.Map.prototype["delete"] = function(b) {
  var e = this.maybeGetEntry_(b);
  b = e.id;
  var k = e.list, h = e.index;
  return (e = e.entry) && k ? (k.splice(h, 1), k.length || delete this.data_[b], e.previous.next = e.next, e.next.previous = e.previous, e.head = null, this.size--, !0) : !1;
};
$jscomp.Map.prototype.clear = function() {
  this.data_ = {};
  this.head_ = this.head_.previous = $jscomp.Map.createHead_();
  this.size = 0;
};
$jscomp.Map.prototype.has = function(b) {
  return !!this.maybeGetEntry_(b).entry;
};
$jscomp.Map.prototype.get = function(b) {
  return (b = this.maybeGetEntry_(b).entry) && b.value;
};
$jscomp.Map.prototype.maybeGetEntry_ = function(b) {
  var e = $jscomp.Map.getId_(b), k = this.data_[e];
  if (k) {
    for (var h = 0;h < k.length;h++) {
      var c = k[h];
      if (b !== b && c.key !== c.key || b === c.key) {
        return {id:e, list:k, index:h, entry:c};
      }
    }
  }
  return {id:e, list:k, index:-1, entry:void 0};
};
$jscomp.Map.prototype.entries = function() {
  return this.iter_(function(b) {
    return [b.key, b.value];
  });
};
$jscomp.Map.prototype.keys = function() {
  return this.iter_(function(b) {
    return b.key;
  });
};
$jscomp.Map.prototype.values = function() {
  return this.iter_(function(b) {
    return b.value;
  });
};
$jscomp.Map.prototype.forEach = function(b, e) {
  for (var k = $jscomp.makeIterator(this.entries()), h = k.next();!h.done;h = k.next()) {
    h = h.value, b.call(e, h[1], h[0], this);
  }
};
$jscomp.Map.prototype.iter_ = function(b) {
  var e = this, k = this.head_;
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var h = {};
  return h.next = function() {
    if (k) {
      for (;k.head != e.head_;) {
        k = k.previous;
      }
      for (;k.next != k.head;) {
        return k = k.next, {done:!1, value:b(k)};
      }
      k = null;
    }
    return {done:!0, value:void 0};
  }, h[Symbol.iterator] = function() {
    return this;
  }, h;
};
$jscomp.Map.index_ = 0;
$jscomp.Map.defineProperty_ = Object.defineProperty ? function(b, e, k) {
  Object.defineProperty(b, e, {value:String(k)});
} : function(b, e, k) {
  b[e] = String(k);
};
$jscomp.Map.Entry_ = function() {
};
$jscomp.Map.ASSUME_NO_NATIVE = !1;
$jscomp.Map$install = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key"));
  $jscomp.Map$install = function() {
  };
};
$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function(b) {
  b = Number(b) >>> 0;
  if (0 === b) {
    return 32;
  }
  var e = 0;
  0 === (b & 4294901760) && (b <<= 16, e += 16);
  0 === (b & 4278190080) && (b <<= 8, e += 8);
  0 === (b & 4026531840) && (b <<= 4, e += 4);
  0 === (b & 3221225472) && (b <<= 2, e += 2);
  0 === (b & 2147483648) && e++;
  return e;
};
$jscomp.math.imul = function(b, e) {
  b = Number(b);
  e = Number(e);
  var k = b & 65535, h = e & 65535;
  return k * h + ((b >>> 16 & 65535) * h + k * (e >>> 16 & 65535) << 16 >>> 0) | 0;
};
$jscomp.math.sign = function(b) {
  b = Number(b);
  return 0 === b || isNaN(b) ? b : 0 < b ? 1 : -1;
};
$jscomp.math.log10 = function(b) {
  return Math.log(b) / Math.LN10;
};
$jscomp.math.log2 = function(b) {
  return Math.log(b) / Math.LN2;
};
$jscomp.math.log1p = function(b) {
  b = Number(b);
  if (.25 > b && -.25 < b) {
    for (var e = b, k = 1, h = b, c = 0, g = 1;c != h;) {
      e *= b, g *= -1, h = (c = h) + g * e / ++k;
    }
    return h;
  }
  return Math.log(1 + b);
};
$jscomp.math.expm1 = function(b) {
  b = Number(b);
  if (.25 > b && -.25 < b) {
    for (var e = b, k = 1, h = b, c = 0;c != h;) {
      e *= b / ++k, h = (c = h) + e;
    }
    return h;
  }
  return Math.exp(b) - 1;
};
$jscomp.math.cosh = function(b) {
  b = Number(b);
  return (Math.exp(b) + Math.exp(-b)) / 2;
};
$jscomp.math.sinh = function(b) {
  b = Number(b);
  return 0 === b ? b : (Math.exp(b) - Math.exp(-b)) / 2;
};
$jscomp.math.tanh = function(b) {
  b = Number(b);
  if (0 === b) {
    return b;
  }
  var e = Math.exp(2 * -Math.abs(b)), e = (1 - e) / (1 + e);
  return 0 > b ? -e : e;
};
$jscomp.math.acosh = function(b) {
  b = Number(b);
  return Math.log(b + Math.sqrt(b * b - 1));
};
$jscomp.math.asinh = function(b) {
  b = Number(b);
  if (0 === b) {
    return b;
  }
  var e = Math.log(Math.abs(b) + Math.sqrt(b * b + 1));
  return 0 > b ? -e : e;
};
$jscomp.math.atanh = function(b) {
  b = Number(b);
  return ($jscomp.math.log1p(b) - $jscomp.math.log1p(-b)) / 2;
};
$jscomp.math.hypot = function(b, e, k) {
  for (var h = [], c = 2;c < arguments.length;++c) {
    h[c - 2] = arguments[c];
  }
  b = Number(b);
  e = Number(e);
  for (var g = Math.max(Math.abs(b), Math.abs(e)), p = $jscomp.makeIterator(h), c = p.next();!c.done;c = p.next()) {
    g = Math.max(g, Math.abs(c.value));
  }
  if (1E100 < g || 1E-100 > g) {
    b /= g;
    e /= g;
    p = b * b + e * e;
    h = $jscomp.makeIterator(h);
    for (c = h.next();!c.done;c = h.next()) {
      c = c.value, c = Number(c) / g, p += c * c;
    }
    return Math.sqrt(p) * g;
  }
  g = b * b + e * e;
  h = $jscomp.makeIterator(h);
  for (c = h.next();!c.done;c = h.next()) {
    c = c.value, c = Number(c), g += c * c;
  }
  return Math.sqrt(g);
};
$jscomp.math.trunc = function(b) {
  b = Number(b);
  if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b) {
    return b;
  }
  var e = Math.floor(Math.abs(b));
  return 0 > b ? -e : e;
};
$jscomp.math.cbrt = function(b) {
  if (0 === b) {
    return b;
  }
  b = Number(b);
  var e = Math.pow(Math.abs(b), 1 / 3);
  return 0 > b ? -e : e;
};
$jscomp.number = $jscomp.number || {};
$jscomp.number.isFinite = function(b) {
  return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b;
};
$jscomp.number.isInteger = function(b) {
  return $jscomp.number.isFinite(b) ? b === Math.floor(b) : !1;
};
$jscomp.number.isNaN = function(b) {
  return "number" === typeof b && isNaN(b);
};
$jscomp.number.isSafeInteger = function(b) {
  return $jscomp.number.isInteger(b) && Math.abs(b) <= $jscomp.number.MAX_SAFE_INTEGER;
};
$jscomp.number.EPSILON = Math.pow(2, -52);
$jscomp.number.MAX_SAFE_INTEGER = 9007199254740991;
$jscomp.number.MIN_SAFE_INTEGER = -9007199254740991;
$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function(b, e) {
  for (var k = [], h = 1;h < arguments.length;++h) {
    k[h - 1] = arguments[h];
  }
  k = $jscomp.makeIterator(k);
  for (h = k.next();!h.done;h = k.next()) {
    if (h = h.value) {
      for (var c in h) {
        Object.prototype.hasOwnProperty.call(h, c) && (b[c] = h[c]);
      }
    }
  }
  return b;
};
$jscomp.object.is = function(b, e) {
  return b === e ? 0 !== b || 1 / b === 1 / e : b !== b && e !== e;
};
$jscomp.Set = function(b) {
  b = void 0 === b ? [] : b;
  this.map_ = new $jscomp.Map;
  if (b) {
    b = $jscomp.makeIterator(b);
    for (var e = b.next();!e.done;e = b.next()) {
      this.add(e.value);
    }
  }
  this.size = this.map_.size;
};
$jscomp.Set.checkBrowserConformance_ = function() {
  var b = $jscomp.global.Set;
  if (!b || !b.prototype.entries || !Object.seal) {
    return !1;
  }
  var e = Object.seal({x:4}), b = new b($jscomp.makeIterator([e]));
  if (b.has(e) || 1 != b.size || b.add(e) != b || 1 != b.size || b.add({x:4}) != b || 2 != b.size) {
    return !1;
  }
  var b = b.entries(), k = b.next();
  if (k.done || k.value[0] != e || k.value[1] != e) {
    return !1;
  }
  k = b.next();
  return k.done || k.value[0] == e || 4 != k.value[0].x || k.value[1] != k.value[0] ? !1 : b.next().done;
};
$jscomp.Set.prototype.add = function(b) {
  this.map_.set(b, b);
  this.size = this.map_.size;
  return this;
};
$jscomp.Set.prototype["delete"] = function(b) {
  b = this.map_["delete"](b);
  this.size = this.map_.size;
  return b;
};
$jscomp.Set.prototype.clear = function() {
  this.map_.clear();
  this.size = 0;
};
$jscomp.Set.prototype.has = function(b) {
  return this.map_.has(b);
};
$jscomp.Set.prototype.entries = function() {
  return this.map_.entries();
};
$jscomp.Set.prototype.values = function() {
  return this.map_.values();
};
$jscomp.Set.prototype.forEach = function(b, e) {
  var k = this;
  this.map_.forEach(function(h) {
    return b.call(e, h, h, k);
  });
};
$jscomp.Set.ASSUME_NO_NATIVE = !1;
$jscomp.Set$install = function() {
  !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values);
  $jscomp.Set$install = function() {
  };
};
$jscomp.string = $jscomp.string || {};
$jscomp.string.noRegExp_ = function(b, e) {
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
  }
};
$jscomp.string.fromCodePoint = function(b) {
  for (var e = [], k = 0;k < arguments.length;++k) {
    e[k - 0] = arguments[k];
  }
  for (var k = "", e = $jscomp.makeIterator(e), h = e.next();!h.done;h = e.next()) {
    h = h.value;
    h = +h;
    if (0 > h || 1114111 < h || h !== Math.floor(h)) {
      throw new RangeError("invalid_code_point " + h);
    }
    65535 >= h ? k += String.fromCharCode(h) : (h -= 65536, k += String.fromCharCode(h >>> 10 & 1023 | 55296), k += String.fromCharCode(h & 1023 | 56320));
  }
  return k;
};
$jscomp.string.repeat = function(b) {
  var e = this.toString();
  if (0 > b || 1342177279 < b) {
    throw new RangeError("Invalid count value");
  }
  b |= 0;
  for (var k = "";b;) {
    if (b & 1 && (k += e), b >>>= 1) {
      e += e;
    }
  }
  return k;
};
$jscomp.string.repeat$install = function() {
  String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat);
};
$jscomp.string.codePointAt = function(b) {
  var e = this.toString(), k = e.length;
  b = Number(b) || 0;
  if (0 <= b && b < k) {
    b |= 0;
    var h = e.charCodeAt(b);
    if (55296 > h || 56319 < h || b + 1 === k) {
      return h;
    }
    b = e.charCodeAt(b + 1);
    return 56320 > b || 57343 < b ? h : 1024 * (h - 55296) + b + 9216;
  }
};
$jscomp.string.codePointAt$install = function() {
  String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt);
};
$jscomp.string.includes = function(b, e) {
  e = void 0 === e ? 0 : e;
  $jscomp.string.noRegExp_(b, "includes");
  return -1 !== this.toString().indexOf(b, e);
};
$jscomp.string.includes$install = function() {
  String.prototype.includes || (String.prototype.includes = $jscomp.string.includes);
};
$jscomp.string.startsWith = function(b, e) {
  e = void 0 === e ? 0 : e;
  $jscomp.string.noRegExp_(b, "startsWith");
  var k = this.toString();
  b += "";
  for (var h = k.length, c = b.length, g = Math.max(0, Math.min(e | 0, k.length)), p = 0;p < c && g < h;) {
    if (k[g++] != b[p++]) {
      return !1;
    }
  }
  return p >= c;
};
$jscomp.string.startsWith$install = function() {
  String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith);
};
$jscomp.string.endsWith = function(b, e) {
  $jscomp.string.noRegExp_(b, "endsWith");
  var k = this.toString();
  b += "";
  void 0 === e && (e = k.length);
  for (var h = Math.max(0, Math.min(e | 0, k.length)), c = b.length;0 < c && 0 < h;) {
    if (k[--h] != b[--c]) {
      return !1;
    }
  }
  return 0 >= c;
};
$jscomp.string.endsWith$install = function() {
  String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith);
};
(function(b, e) {
  "object" === typeof module && "object" === typeof module.exports ? module.exports = b.document ? e(b, !0) : function(b) {
    if (!b.document) {
      throw Error("jQuery requires a window with a document");
    }
    return e(b);
  } : e(b);
})("undefined" !== typeof window ? window : this, function(b, e) {
  function k(a) {
    var f = !!a && "length" in a && a.length, m = d.type(a);
    return "function" === m || d.isWindow(a) ? !1 : "array" === m || 0 === f || "number" === typeof f && 0 < f && f - 1 in a;
  }
  function h(a, f, m) {
    if (d.isFunction(f)) {
      return d.grep(a, function(a, d) {
        return !!f.call(a, d, a) !== m;
      });
    }
    if (f.nodeType) {
      return d.grep(a, function(a) {
        return a === f !== m;
      });
    }
    if ("string" === typeof f) {
      if (Xb.test(f)) {
        return d.filter(f, a, m);
      }
      f = d.filter(f, a);
    }
    return d.grep(a, function(a) {
      return -1 < d.inArray(a, f) !== m;
    });
  }
  function c(a, f) {
    do {
      a = a[f];
    } while (a && 1 !== a.nodeType);
    return a;
  }
  function g(a) {
    var f = {};
    d.each(a.match(K) || [], function(a, d) {
      f[d] = !0;
    });
    return f;
  }
  function p() {
    w.addEventListener ? (w.removeEventListener("DOMContentLoaded", n), b.removeEventListener("load", n)) : (w.detachEvent("onreadystatechange", n), b.detachEvent("onload", n));
  }
  function n() {
    if (w.addEventListener || "load" === b.event.type || "complete" === w.readyState) {
      p(), d.ready();
    }
  }
  function q(a, f, m) {
    if (void 0 === m && 1 === a.nodeType) {
      if (m = "data-" + f.replace(Yb, "-$1").toLowerCase(), m = a.getAttribute(m), "string" === typeof m) {
        try {
          m = "true" === m ? !0 : "false" === m ? !1 : "null" === m ? null : +m + "" === m ? +m : Zb.test(m) ? d.parseJSON(m) : m;
        } catch (b) {
        }
        d.data(a, f, m);
      } else {
        m = void 0;
      }
    }
    return m;
  }
  function v(a) {
    for (var f in a) {
      if (("data" !== f || !d.isEmptyObject(a[f])) && "toJSON" !== f) {
        return !1;
      }
    }
    return !0;
  }
  function z(a, f, m, b) {
    if (ra(a)) {
      var l = d.expando, x = a.nodeType, c = x ? d.cache : a, g = x ? a[l] : a[l] && l;
      if (g && c[g] && (b || c[g].data) || void 0 !== m || "string" !== typeof f) {
        g || (g = x ? a[l] = T.pop() || d.guid++ : l);
        c[g] || (c[g] = x ? {} : {toJSON:d.noop});
        if ("object" === typeof f || "function" === typeof f) {
          b ? c[g] = d.extend(c[g], f) : c[g].data = d.extend(c[g].data, f);
        }
        a = c[g];
        b || (a.data || (a.data = {}), a = a.data);
        void 0 !== m && (a[d.camelCase(f)] = m);
        "string" === typeof f ? (m = a[f], null == m && (m = a[d.camelCase(f)])) : m = a;
        return m;
      }
    }
  }
  function M(a, f, m) {
    if (ra(a)) {
      var b, l, x = a.nodeType, c = x ? d.cache : a, g = x ? a[d.expando] : d.expando;
      if (c[g]) {
        if (f && (b = m ? c[g] : c[g].data)) {
          d.isArray(f) ? f = f.concat(d.map(f, d.camelCase)) : f in b ? f = [f] : (f = d.camelCase(f), f = f in b ? [f] : f.split(" "));
          for (l = f.length;l--;) {
            delete b[f[l]];
          }
          if (m ? !v(b) : !d.isEmptyObject(b)) {
            return;
          }
        }
        if (!m && (delete c[g].data, !v(c[g]))) {
          return;
        }
        x ? d.cleanData([a], !0) : u.deleteExpando || c != c.window ? delete c[g] : c[g] = void 0;
      }
    }
  }
  function ia(a, f, m, b) {
    var l, x = 1, c = 20, g = b ? function() {
      return b.cur();
    } : function() {
      return d.css(a, f, "");
    }, h = g(), e = m && m[3] || (d.cssNumber[f] ? "" : "px"), k = (d.cssNumber[f] || "px" !== e && +h) && Ia.exec(d.css(a, f));
    if (k && k[3] !== e) {
      e = e || k[3];
      m = m || [];
      k = +h || 1;
      do {
        x = x || ".5", k /= x, d.style(a, f, k + e);
      } while (x !== (x = g() / h) && 1 !== x && --c);
    }
    m && (k = +k || +h || 0, l = m[1] ? k + (m[1] + 1) * m[2] : +m[2], b && (b.unit = e, b.start = k, b.end = l));
    return l;
  }
  function F(a) {
    var f = "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video".split(" ");
    a = a.createDocumentFragment();
    if (a.createElement) {
      for (;f.length;) {
        a.createElement(f.pop());
      }
    }
    return a;
  }
  function E(a, f) {
    var m, b, l = 0, x = "undefined" !== typeof a.getElementsByTagName ? a.getElementsByTagName(f || "*") : "undefined" !== typeof a.querySelectorAll ? a.querySelectorAll(f || "*") : void 0;
    if (!x) {
      for (x = [], m = a.childNodes || a;null != (b = m[l]);l++) {
        !f || d.nodeName(b, f) ? x.push(b) : d.merge(x, E(b, f));
      }
    }
    return void 0 === f || f && d.nodeName(a, f) ? d.merge([a], x) : x;
  }
  function Ja(a, f) {
    for (var m, b = 0;null != (m = a[b]);b++) {
      d._data(m, "globalEval", !f || d._data(f[b], "globalEval"));
    }
  }
  function ac(a) {
    Ka.test(a.type) && (a.defaultChecked = a.checked);
  }
  function eb(a, f, m, b, l) {
    for (var x, c, g, h, e, k, p = a.length, n = F(f), q = [], v = 0;v < p;v++) {
      if ((c = a[v]) || 0 === c) {
        if ("object" === d.type(c)) {
          d.merge(q, c.nodeType ? [c] : c);
        } else {
          if (bc.test(c)) {
            g = g || n.appendChild(f.createElement("div"));
            h = (fb.exec(c) || ["", ""])[1].toLowerCase();
            k = O[h] || O._default;
            g.innerHTML = k[1] + d.htmlPrefilter(c) + k[2];
            for (x = k[0];x--;) {
              g = g.lastChild;
            }
            !u.leadingWhitespace && La.test(c) && q.push(f.createTextNode(La.exec(c)[0]));
            if (!u.tbody) {
              for (x = (c = "table" !== h || gb.test(c) ? "<table>" !== k[1] || gb.test(c) ? 0 : g : g.firstChild) && c.childNodes.length;x--;) {
                d.nodeName(e = c.childNodes[x], "tbody") && !e.childNodes.length && c.removeChild(e);
              }
            }
            d.merge(q, g.childNodes);
            for (g.textContent = "";g.firstChild;) {
              g.removeChild(g.firstChild);
            }
            g = n.lastChild;
          } else {
            q.push(f.createTextNode(c));
          }
        }
      }
    }
    g && n.removeChild(g);
    u.appendChecked || d.grep(E(q, "input"), ac);
    for (v = 0;c = q[v++];) {
      if (b && -1 < d.inArray(c, b)) {
        l && l.push(c);
      } else {
        if (a = d.contains(c.ownerDocument, c), g = E(n.appendChild(c), "script"), a && Ja(g), m) {
          for (x = 0;c = g[x++];) {
            hb.test(c.type || "") && m.push(c);
          }
        }
      }
    }
    return n;
  }
  function wa() {
    return !0;
  }
  function U() {
    return !1;
  }
  function ib() {
    try {
      return w.activeElement;
    } catch (a) {
    }
  }
  function Ma(a, f, m, b, l, c) {
    var g, h;
    if ("object" === typeof f) {
      "string" !== typeof m && (b = b || m, m = void 0);
      for (h in f) {
        Ma(a, h, m, b, f[h], c);
      }
      return a;
    }
    null == b && null == l ? (l = m, b = m = void 0) : null == l && ("string" === typeof m ? (l = b, b = void 0) : (l = b, b = m, m = void 0));
    if (!1 === l) {
      l = U;
    } else {
      if (!l) {
        return a;
      }
    }
    1 === c && (g = l, l = function(a) {
      d().off(a);
      return g.apply(this, arguments);
    }, l.guid = g.guid || (g.guid = d.guid++));
    return a.each(function() {
      d.event.add(this, f, l, b, m);
    });
  }
  function jb(a, f) {
    return d.nodeName(a, "table") && d.nodeName(11 !== f.nodeType ? f : f.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }
  function kb(a) {
    a.type = (null !== d.find.attr(a, "type")) + "/" + a.type;
    return a;
  }
  function lb(a) {
    var f = cc.exec(a.type);
    f ? a.type = f[1] : a.removeAttribute("type");
    return a;
  }
  function mb(a, f) {
    if (1 === f.nodeType && d.hasData(a)) {
      var m, b, l;
      b = d._data(a);
      var c = d._data(f, b), g = b.events;
      if (g) {
        for (m in delete c.handle, c.events = {}, g) {
          for (b = 0, l = g[m].length;b < l;b++) {
            d.event.add(f, m, g[m][b]);
          }
        }
      }
      c.data && (c.data = d.extend({}, c.data));
    }
  }
  function ca(a, f, m, b) {
    f = nb.apply([], f);
    var l, c, g, h, e = 0, k = a.length, p = k - 1, n = f[0], q = d.isFunction(n);
    if (q || 1 < k && "string" === typeof n && !u.checkClone && dc.test(n)) {
      return a.each(function(d) {
        var l = a.eq(d);
        q && (f[0] = n.call(this, d, l.html()));
        ca(l, f, m, b);
      });
    }
    if (k && (h = eb(f, a[0].ownerDocument, !1, a, b), l = h.firstChild, 1 === h.childNodes.length && (h = l), l || b)) {
      g = d.map(E(h, "script"), kb);
      for (c = g.length;e < k;e++) {
        l = h, e !== p && (l = d.clone(l, !0, !0), c && d.merge(g, E(l, "script"))), m.call(a[e], l, e);
      }
      if (c) {
        for (h = g[g.length - 1].ownerDocument, d.map(g, lb), e = 0;e < c;e++) {
          l = g[e], hb.test(l.type || "") && !d._data(l, "globalEval") && d.contains(h, l) && (l.src ? d._evalUrl && d._evalUrl(l.src) : d.globalEval((l.text || l.textContent || l.innerHTML || "").replace(ec, "")));
        }
      }
      h = l = null;
    }
    return a;
  }
  function ob(a, f, m) {
    for (var b = f ? d.filter(f, a) : a, l = 0;null != (f = b[l]);l++) {
      m || 1 !== f.nodeType || d.cleanData(E(f)), f.parentNode && (m && d.contains(f.ownerDocument, f) && Ja(E(f, "script")), f.parentNode.removeChild(f));
    }
    return a;
  }
  function pb(a, f) {
    var m = d(f.createElement(a)).appendTo(f.body), b = d.css(m[0], "display");
    m.detach();
    return b;
  }
  function ja(a) {
    var f = w, m = qb[a];
    m || (m = pb(a, f), "none" !== m && m || (sa = (sa || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(f.documentElement), f = (sa[0].contentWindow || sa[0].contentDocument).document, f.write(), f.close(), m = pb(a, f), sa.detach()), qb[a] = m);
    return m;
  }
  function Na(a, f) {
    return {get:function() {
      if (a()) {
        delete this.get;
      } else {
        return (this.get = f).apply(this, arguments);
      }
    }};
  }
  function rb(a) {
    if (a in sb) {
      return a;
    }
    for (var f = a.charAt(0).toUpperCase() + a.slice(1), m = tb.length;m--;) {
      if (a = tb[m] + f, a in sb) {
        return a;
      }
    }
  }
  function ub(a, f) {
    for (var m, b, l, c = [], g = 0, h = a.length;g < h;g++) {
      b = a[g], b.style && (c[g] = d._data(b, "olddisplay"), m = b.style.display, f ? (c[g] || "none" !== m || (b.style.display = ""), "" === b.style.display && V(b) && (c[g] = d._data(b, "olddisplay", ja(b.nodeName)))) : (l = V(b), (m && "none" !== m || !l) && d._data(b, "olddisplay", l ? m : d.css(b, "display"))));
    }
    for (g = 0;g < h;g++) {
      b = a[g], !b.style || f && "none" !== b.style.display && "" !== b.style.display || (b.style.display = f ? c[g] || "" : "none");
    }
    return a;
  }
  function vb(a, f, b) {
    return (a = fc.exec(f)) ? Math.max(0, a[1] - (b || 0)) + (a[2] || "px") : f;
  }
  function wb(a, f, b, r, l) {
    f = b === (r ? "border" : "content") ? 4 : "width" === f ? 1 : 0;
    for (var c = 0;4 > f;f += 2) {
      "margin" === b && (c += d.css(a, b + da[f], !0, l)), r ? ("content" === b && (c -= d.css(a, "padding" + da[f], !0, l)), "margin" !== b && (c -= d.css(a, "border" + da[f] + "Width", !0, l))) : (c += d.css(a, "padding" + da[f], !0, l), "padding" !== b && (c += d.css(a, "border" + da[f] + "Width", !0, l)));
    }
    return c;
  }
  function xb(a, f, m) {
    var r = !0, l = "width" === f ? a.offsetWidth : a.offsetHeight, c = Z(a), g = u.boxSizing && "border-box" === d.css(a, "boxSizing", !1, c);
    w.msFullscreenElement && b.top !== b && a.getClientRects().length && (l = Math.round(100 * a.getBoundingClientRect()[f]));
    if (0 >= l || null == l) {
      l = Q(a, f, c);
      if (0 > l || null == l) {
        l = a.style[f];
      }
      if (xa.test(l)) {
        return l;
      }
      r = g && (u.boxSizingReliable() || l === a.style[f]);
      l = parseFloat(l) || 0;
    }
    return l + wb(a, f, m || (g ? "border" : "content"), r, c) + "px";
  }
  function I(a, f, b, d, l) {
    return new I.prototype.init(a, f, b, d, l);
  }
  function yb() {
    b.setTimeout(function() {
      ka = void 0;
    });
    return ka = d.now();
  }
  function ta(a, f) {
    var b, d = {height:a}, l = 0;
    for (f = f ? 1 : 0;4 > l;l += 2 - f) {
      b = da[l], d["margin" + b] = d["padding" + b] = a;
    }
    f && (d.opacity = d.width = a);
    return d;
  }
  function zb(a, f, b) {
    for (var d, l = (G.tweeners[f] || []).concat(G.tweeners["*"]), c = 0, g = l.length;c < g;c++) {
      if (d = l[c].call(b, f, a)) {
        return d;
      }
    }
  }
  function gc(a, f) {
    var b, r, l, c, g;
    for (b in a) {
      if (r = d.camelCase(b), l = f[r], c = a[b], d.isArray(c) && (l = c[1], c = a[b] = c[0]), b !== r && (a[r] = c, delete a[b]), (g = d.cssHooks[r]) && "expand" in g) {
        for (b in c = g.expand(c), delete a[r], c) {
          b in a || (a[b] = c[b], f[b] = l);
        }
      } else {
        f[r] = l;
      }
    }
  }
  function G(a, f, b) {
    var r, l = 0, c = G.prefilters.length, g = d.Deferred().always(function() {
      delete h.elem;
    }), h = function() {
      if (r) {
        return !1;
      }
      for (var f = ka || yb(), f = Math.max(0, e.startTime + e.duration - f), b = 1 - (f / e.duration || 0), d = 0, m = e.tweens.length;d < m;d++) {
        e.tweens[d].run(b);
      }
      g.notifyWith(a, [e, b, f]);
      if (1 > b && m) {
        return f;
      }
      g.resolveWith(a, [e]);
      return !1;
    }, e = g.promise({elem:a, props:d.extend({}, f), opts:d.extend(!0, {specialEasing:{}, easing:d.easing._default}, b), originalProperties:f, originalOptions:b, startTime:ka || yb(), duration:b.duration, tweens:[], createTween:function(f, b) {
      var m = d.Tween(a, e.opts, f, b, e.opts.specialEasing[f] || e.opts.easing);
      e.tweens.push(m);
      return m;
    }, stop:function(f) {
      var b = 0, d = f ? e.tweens.length : 0;
      if (r) {
        return this;
      }
      for (r = !0;b < d;b++) {
        e.tweens[b].run(1);
      }
      f ? (g.notifyWith(a, [e, 1, 0]), g.resolveWith(a, [e, f])) : g.rejectWith(a, [e, f]);
      return this;
    }});
    b = e.props;
    for (gc(b, e.opts.specialEasing);l < c;l++) {
      if (f = G.prefilters[l].call(e, a, b, e.opts)) {
        return d.isFunction(f.stop) && (d._queueHooks(e.elem, e.opts.queue).stop = d.proxy(f.stop, f)), f;
      }
    }
    d.map(b, zb, e);
    d.isFunction(e.opts.start) && e.opts.start.call(a, e);
    d.fx.timer(d.extend(h, {elem:a, anim:e, queue:e.opts.queue}));
    return e.progress(e.opts.progress).done(e.opts.done, e.opts.complete).fail(e.opts.fail).always(e.opts.always);
  }
  function P(a) {
    return d.attr(a, "class") || "";
  }
  function Ab(a) {
    return function(f, b) {
      "string" !== typeof f && (b = f, f = "*");
      var r, c = 0, g = f.toLowerCase().match(K) || [];
      if (d.isFunction(b)) {
        for (;r = g[c++];) {
          "+" === r.charAt(0) ? (r = r.slice(1) || "*", (a[r] = a[r] || []).unshift(b)) : (a[r] = a[r] || []).push(b);
        }
      }
    };
  }
  function Bb(a, f, b, r) {
    function c(h) {
      var k;
      g[h] = !0;
      d.each(a[h] || [], function(a, d) {
        var h = d(f, b, r);
        if ("string" === typeof h && !e && !g[h]) {
          return f.dataTypes.unshift(h), c(h), !1;
        }
        if (e) {
          return !(k = h);
        }
      });
      return k;
    }
    var g = {}, e = a === Oa;
    return c(f.dataTypes[0]) || !g["*"] && c("*");
  }
  function Pa(a, f) {
    var b, r, c = d.ajaxSettings.flatOptions || {};
    for (r in f) {
      void 0 !== f[r] && ((c[r] ? a : b || (b = {}))[r] = f[r]);
    }
    b && d.extend(!0, a, b);
    return a;
  }
  function Qa(a, f, b, r) {
    var c;
    if (d.isArray(f)) {
      d.each(f, function(f, d) {
        b || hc.test(a) ? r(a, d) : Qa(a + "[" + ("object" === typeof d && null != d ? f : "") + "]", d, b, r);
      });
    } else {
      if (b || "object" !== d.type(f)) {
        r(a, f);
      } else {
        for (c in f) {
          Qa(a + "[" + c + "]", f[c], b, r);
        }
      }
    }
  }
  function Ra() {
    try {
      return new b.XMLHttpRequest;
    } catch (a) {
    }
  }
  function Cb() {
    try {
      return new b.ActiveXObject("Microsoft.XMLHTTP");
    } catch (a) {
    }
  }
  function Db(a) {
    return d.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
  }
  var T = [], w = b.document, R = T.slice, nb = T.concat, Sa = T.push, Eb = T.indexOf, Ba = {}, ic = Ba.toString, la = Ba.hasOwnProperty, u = {}, d = function(a, f) {
    return new d.fn.init(a, f);
  }, jc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, kc = /^-ms-/, lc = /-([\da-z])/gi, mc = function(a, f) {
    return f.toUpperCase();
  };
  d.fn = d.prototype = {jquery:"1.12.2", constructor:d, selector:"", length:0, toArray:function() {
    return R.call(this);
  }, get:function(a) {
    return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this);
  }, pushStack:function(a) {
    a = d.merge(this.constructor(), a);
    a.prevObject = this;
    a.context = this.context;
    return a;
  }, each:function(a) {
    return d.each(this, a);
  }, map:function(a) {
    return this.pushStack(d.map(this, function(f, b) {
      return a.call(f, b, f);
    }));
  }, slice:function() {
    return this.pushStack(R.apply(this, arguments));
  }, first:function() {
    return this.eq(0);
  }, last:function() {
    return this.eq(-1);
  }, eq:function(a) {
    var f = this.length;
    a = +a + (0 > a ? f : 0);
    return this.pushStack(0 <= a && a < f ? [this[a]] : []);
  }, end:function() {
    return this.prevObject || this.constructor();
  }, push:Sa, sort:T.sort, splice:T.splice};
  d.extend = d.fn.extend = function() {
    var a, f, b, r, c, g = arguments[0] || {}, e = 1, h = arguments.length, k = !1;
    "boolean" === typeof g && (k = g, g = arguments[e] || {}, e++);
    "object" === typeof g || d.isFunction(g) || (g = {});
    e === h && (g = this, e--);
    for (;e < h;e++) {
      if (null != (c = arguments[e])) {
        for (r in c) {
          a = g[r], b = c[r], g !== b && (k && b && (d.isPlainObject(b) || (f = d.isArray(b))) ? (f ? (f = !1, a = a && d.isArray(a) ? a : []) : a = a && d.isPlainObject(a) ? a : {}, g[r] = d.extend(k, a, b)) : void 0 !== b && (g[r] = b));
        }
      }
    }
    return g;
  };
  d.extend({expando:"jQuery" + ("1.12.2" + Math.random()).replace(/\D/g, ""), isReady:!0, error:function(a) {
    throw Error(a);
  }, noop:function() {
  }, isFunction:function(a) {
    return "function" === d.type(a);
  }, isArray:Array.isArray || function(a) {
    return "array" === d.type(a);
  }, isWindow:function(a) {
    return null != a && a == a.window;
  }, isNumeric:function(a) {
    var f = a && a.toString();
    return !d.isArray(a) && 0 <= f - parseFloat(f) + 1;
  }, isEmptyObject:function(a) {
    for (var f in a) {
      return !1;
    }
    return !0;
  }, isPlainObject:function(a) {
    var f;
    if (!a || "object" !== d.type(a) || a.nodeType || d.isWindow(a)) {
      return !1;
    }
    try {
      if (a.constructor && !la.call(a, "constructor") && !la.call(a.constructor.prototype, "isPrototypeOf")) {
        return !1;
      }
    } catch (b) {
      return !1;
    }
    if (!u.ownFirst) {
      for (f in a) {
        return la.call(a, f);
      }
    }
    for (f in a) {
    }
    return void 0 === f || la.call(a, f);
  }, type:function(a) {
    return null == a ? a + "" : "object" === typeof a || "function" === typeof a ? Ba[ic.call(a)] || "object" : typeof a;
  }, globalEval:function(a) {
    a && d.trim(a) && (b.execScript || function(a) {
      b.eval.call(b, a);
    })(a);
  }, camelCase:function(a) {
    return a.replace(kc, "ms-").replace(lc, mc);
  }, nodeName:function(a, f) {
    return a.nodeName && a.nodeName.toLowerCase() === f.toLowerCase();
  }, each:function(a, f) {
    var b, d = 0;
    if (k(a)) {
      for (b = a.length;d < b && !1 !== f.call(a[d], d, a[d]);d++) {
      }
    } else {
      for (d in a) {
        if (!1 === f.call(a[d], d, a[d])) {
          break;
        }
      }
    }
    return a;
  }, trim:function(a) {
    return null == a ? "" : (a + "").replace(jc, "");
  }, makeArray:function(a, f) {
    var b = f || [];
    null != a && (k(Object(a)) ? d.merge(b, "string" === typeof a ? [a] : a) : Sa.call(b, a));
    return b;
  }, inArray:function(a, f, b) {
    var d;
    if (f) {
      if (Eb) {
        return Eb.call(f, a, b);
      }
      d = f.length;
      for (b = b ? 0 > b ? Math.max(0, d + b) : b : 0;b < d;b++) {
        if (b in f && f[b] === a) {
          return b;
        }
      }
    }
    return -1;
  }, merge:function(a, f) {
    for (var b = +f.length, d = 0, c = a.length;d < b;) {
      a[c++] = f[d++];
    }
    if (b !== b) {
      for (;void 0 !== f[d];) {
        a[c++] = f[d++];
      }
    }
    a.length = c;
    return a;
  }, grep:function(a, f, b) {
    for (var d = [], c = 0, g = a.length, e = !b;c < g;c++) {
      b = !f(a[c], c), b !== e && d.push(a[c]);
    }
    return d;
  }, map:function(a, f, b) {
    var d, c, g = 0, e = [];
    if (k(a)) {
      for (d = a.length;g < d;g++) {
        c = f(a[g], g, b), null != c && e.push(c);
      }
    } else {
      for (g in a) {
        c = f(a[g], g, b), null != c && e.push(c);
      }
    }
    return nb.apply([], e);
  }, guid:1, proxy:function(a, f) {
    var b, c;
    "string" === typeof f && (c = a[f], f = a, a = c);
    if (d.isFunction(a)) {
      return b = R.call(arguments, 2), c = function() {
        return a.apply(f || this, b.concat(R.call(arguments)));
      }, c.guid = a.guid = a.guid || d.guid++, c;
    }
  }, now:function() {
    return +new Date;
  }, support:u});
  $jscomp.initSymbol();
  "function" === typeof Symbol && ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), d.fn[Symbol.iterator] = T[Symbol.iterator]);
  d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, f) {
    Ba["[object " + f + "]"] = f.toLowerCase();
  });
  var pa = function(a) {
    function f(a, f, b, d) {
      var m, c, r, l, g, e = f && f.ownerDocument, x = f ? f.nodeType : 9;
      b = b || [];
      if ("string" !== typeof a || !a || 1 !== x && 9 !== x && 11 !== x) {
        return b;
      }
      if (!d && ((f ? f.ownerDocument || f : L) !== A && ma(f), f = f || A, J)) {
        if (11 !== x && (l = wa.exec(a))) {
          if (m = l[1]) {
            if (9 === x) {
              if (c = f.getElementById(m)) {
                if (c.id === m) {
                  return b.push(c), b;
                }
              } else {
                return b;
              }
            } else {
              if (e && (c = e.getElementById(m)) && K(f, c) && c.id === m) {
                return b.push(c), b;
              }
            }
          } else {
            if (l[2]) {
              return na.apply(b, f.getElementsByTagName(a)), b;
            }
            if ((m = l[3]) && D.getElementsByClassName && f.getElementsByClassName) {
              return na.apply(b, f.getElementsByClassName(m)), b;
            }
          }
        }
        if (!(!D.qsa || Q[a + " "] || B && B.test(a))) {
          if (1 !== x) {
            e = f, g = a;
          } else {
            if ("object" !== f.nodeName.toLowerCase()) {
              (r = f.getAttribute("id")) ? r = r.replace(xa, "\\$&") : f.setAttribute("id", r = C);
              l = za(a);
              m = l.length;
              for (c = ga.test(r) ? "#" + r : "[id='" + r + "']";m--;) {
                l[m] = c + " " + q(l[m]);
              }
              g = l.join(",");
              e = ja.test(a) && n(f.parentNode) || f;
            }
          }
          if (g) {
            try {
              return na.apply(b, e.querySelectorAll(g)), b;
            } catch (h) {
            } finally {
              r === C && f.removeAttribute("id");
            }
          }
        }
      }
      return O(a.replace(U, "$1"), f, b, d);
    }
    function b() {
      function a(b, d) {
        f.push(b + " ") > y.cacheLength && delete a[f.shift()];
        return a[b + " "] = d;
      }
      var f = [];
      return a;
    }
    function d(a) {
      a[C] = !0;
      return a;
    }
    function c(a) {
      var f = A.createElement("div");
      try {
        return !!a(f);
      } catch (b) {
        return !1;
      } finally {
        f.parentNode && f.parentNode.removeChild(f);
      }
    }
    function g(a, f) {
      for (var b = a.split("|"), d = b.length;d--;) {
        y.attrHandle[b[d]] = f;
      }
    }
    function e(a, f) {
      var b = f && a, d = b && 1 === a.nodeType && 1 === f.nodeType && (~f.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
      if (d) {
        return d;
      }
      if (b) {
        for (;b = b.nextSibling;) {
          if (b === f) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function h(a) {
      return function(f) {
        return "input" === f.nodeName.toLowerCase() && f.type === a;
      };
    }
    function k(a) {
      return function(f) {
        var b = f.nodeName.toLowerCase();
        return ("input" === b || "button" === b) && f.type === a;
      };
    }
    function p(a) {
      return d(function(f) {
        f = +f;
        return d(function(b, d) {
          for (var m, c = a([], b.length, f), r = c.length;r--;) {
            b[m = c[r]] && (b[m] = !(d[m] = b[m]));
          }
        });
      });
    }
    function n(a) {
      return a && "undefined" !== typeof a.getElementsByTagName && a;
    }
    function t() {
    }
    function q(a) {
      for (var f = 0, b = a.length, d = "";f < b;f++) {
        d += a[f].value;
      }
      return d;
    }
    function v(a, f, b) {
      var d = f.dir, m = b && "parentNode" === d, c = T++;
      return f.first ? function(f, b, c) {
        for (;f = f[d];) {
          if (1 === f.nodeType || m) {
            return a(f, b, c);
          }
        }
      } : function(f, b, r) {
        var l, g, e = [aa, c];
        if (r) {
          for (;f = f[d];) {
            if ((1 === f.nodeType || m) && a(f, b, r)) {
              return !0;
            }
          }
        } else {
          for (;f = f[d];) {
            if (1 === f.nodeType || m) {
              g = f[C] || (f[C] = {});
              g = g[f.uniqueID] || (g[f.uniqueID] = {});
              if ((l = g[d]) && l[0] === aa && l[1] === c) {
                return e[2] = l[2];
              }
              g[d] = e;
              if (e[2] = a(f, b, r)) {
                return !0;
              }
            }
          }
        }
      };
    }
    function u(a) {
      return 1 < a.length ? function(f, b, d) {
        for (var m = a.length;m--;) {
          if (!a[m](f, b, d)) {
            return !1;
          }
        }
        return !0;
      } : a[0];
    }
    function w(a, f, b, d, m) {
      for (var c, r = [], l = 0, g = a.length, e = null != f;l < g;l++) {
        if (c = a[l]) {
          if (!b || b(c, d, m)) {
            r.push(c), e && f.push(l);
          }
        }
      }
      return r;
    }
    function z(a, b, m, c, l, g) {
      c && !c[C] && (c = z(c));
      l && !l[C] && (l = z(l, g));
      return d(function(d, r, g, e) {
        var x, h, k = [], p = [], Y = r.length, n;
        if (!(n = d)) {
          n = b || "*";
          for (var H = g.nodeType ? [g] : g, t = [], q = 0, Aa = H.length;q < Aa;q++) {
            f(n, H[q], t);
          }
          n = t;
        }
        n = !a || !d && b ? n : w(n, k, a, g, e);
        H = m ? l || (d ? a : Y || c) ? [] : r : n;
        m && m(n, H, g, e);
        if (c) {
          for (x = w(H, p), c(x, [], g, e), g = x.length;g--;) {
            if (h = x[g]) {
              H[p[g]] = !(n[p[g]] = h);
            }
          }
        }
        if (d) {
          if (l || a) {
            if (l) {
              x = [];
              for (g = H.length;g--;) {
                (h = H[g]) && x.push(n[g] = h);
              }
              l(null, H = [], x, e);
            }
            for (g = H.length;g--;) {
              (h = H[g]) && -1 < (x = l ? P(d, h) : k[g]) && (d[x] = !(r[x] = h));
            }
          }
        } else {
          H = w(H === r ? H.splice(Y, H.length) : H), l ? l(null, r, H, e) : na.apply(r, H);
        }
      });
    }
    function E(a) {
      var f, b, d, m = a.length, c = y.relative[a[0].type];
      b = c || y.relative[" "];
      for (var r = c ? 1 : 0, l = v(function(a) {
        return a === f;
      }, b, !0), g = v(function(a) {
        return -1 < P(f, a);
      }, b, !0), e = [function(a, b, d) {
        a = !c && (d || b !== G) || ((f = b).nodeType ? l(a, b, d) : g(a, b, d));
        f = null;
        return a;
      }];r < m;r++) {
        if (b = y.relative[a[r].type]) {
          e = [v(u(e), b)];
        } else {
          b = y.filter[a[r].type].apply(null, a[r].matches);
          if (b[C]) {
            for (d = ++r;d < m && !y.relative[a[d].type];d++) {
            }
            return z(1 < r && u(e), 1 < r && q(a.slice(0, r - 1).concat({value:" " === a[r - 2].type ? "*" : ""})).replace(U, "$1"), b, r < d && E(a.slice(r, d)), d < m && E(a = a.slice(d)), d < m && q(a));
          }
          e.push(b);
        }
      }
      return u(e);
    }
    function M(a, b) {
      var m = 0 < b.length, c = 0 < a.length, l = function(d, r, l, g, e) {
        var x, h, k, n = 0, p = "0", Y = d && [], H = [], t = G, q = d || c && y.find.TAG("*", e), Aa = aa += null == t ? 1 : Math.random() || .1, $b = q.length;
        for (e && (G = r === A || r || e);p !== $b && null != (x = q[p]);p++) {
          if (c && x) {
            h = 0;
            r || x.ownerDocument === A || (ma(x), l = !J);
            for (;k = a[h++];) {
              if (k(x, r || A, l)) {
                g.push(x);
                break;
              }
            }
            e && (aa = Aa);
          }
          m && ((x = !k && x) && n--, d && Y.push(x));
        }
        n += p;
        if (m && p !== n) {
          for (h = 0;k = b[h++];) {
            k(Y, H, r, l);
          }
          if (d) {
            if (0 < n) {
              for (;p--;) {
                Y[p] || H[p] || (H[p] = ca.call(g));
              }
            }
            H = w(H);
          }
          na.apply(g, H);
          e && !d && 0 < H.length && 1 < n + b.length && f.uniqueSort(g);
        }
        e && (aa = Aa, G = t);
        return Y;
      };
      return m ? d(l) : l;
    }
    var N, D, y, ua, Fb, za, I, O, G, oa, ya, ma, A, W, J, B, va, Ca, K, C = "sizzle" + 1 * new Date, L = a.document, aa = 0, T = 0, S = b(), ia = b(), Q = b(), R = function(a, f) {
      a === f && (ya = !0);
      return 0;
    }, ba = {}.hasOwnProperty, F = [], ca = F.pop, da = F.push, na = F.push, Z = F.slice, P = function(a, f) {
      for (var b = 0, d = a.length;b < d;b++) {
        if (a[b] === f) {
          return b;
        }
      }
      return -1;
    }, ha = RegExp("[\\x20\\t\\r\\n\\f]+", "g"), U = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), ka = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, la = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, pa = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*?)[\\x20\\t\\r\\n\\f]*\\]", "g"), qa = /:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/, 
    ga = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/, X = {ID:/^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS:/^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG:/^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/, ATTR:/^\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\]/, PSEUDO:/^:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/, 
    CHILD:/^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i, bool:/^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i, needsContext:/^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i}, ra = /^(?:input|select|textarea|button)$/i, sa = 
    /^h\d$/i, V = /^[^{]+\{\s*\[native \w/, wa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ja = /[+~]/, xa = /'|\\/g, ea = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), fa = function(a, f, b) {
      a = "0x" + f - 65536;
      return a !== a || b ? f : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320);
    }, ta = function() {
      ma();
    };
    try {
      na.apply(F = Z.call(L.childNodes), L.childNodes), F[L.childNodes.length].nodeType;
    } catch (Sc) {
      na = {apply:F.length ? function(a, f) {
        da.apply(a, Z.call(f));
      } : function(a, f) {
        for (var b = a.length, d = 0;a[b++] = f[d++];) {
        }
        a.length = b - 1;
      }};
    }
    D = f.support = {};
    Fb = f.isXML = function(a) {
      return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1;
    };
    ma = f.setDocument = function(a) {
      var f;
      a = a ? a.ownerDocument || a : L;
      if (a === A || 9 !== a.nodeType || !a.documentElement) {
        return A;
      }
      A = a;
      W = A.documentElement;
      J = !Fb(A);
      (f = A.defaultView) && f.top !== f && (f.addEventListener ? f.addEventListener("unload", ta, !1) : f.attachEvent && f.attachEvent("onunload", ta));
      D.attributes = c(function(a) {
        a.className = "i";
        return !a.getAttribute("className");
      });
      D.getElementsByTagName = c(function(a) {
        a.appendChild(A.createComment(""));
        return !a.getElementsByTagName("*").length;
      });
      D.getElementsByClassName = V.test(A.getElementsByClassName);
      D.getById = c(function(a) {
        W.appendChild(a).id = C;
        return !A.getElementsByName || !A.getElementsByName(C).length;
      });
      D.getById ? (y.find.ID = function(a, f) {
        if ("undefined" !== typeof f.getElementById && J) {
          var b = f.getElementById(a);
          return b ? [b] : [];
        }
      }, y.filter.ID = function(a) {
        var f = a.replace(ea, fa);
        return function(a) {
          return a.getAttribute("id") === f;
        };
      }) : (delete y.find.ID, y.filter.ID = function(a) {
        var f = a.replace(ea, fa);
        return function(a) {
          return (a = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id")) && a.value === f;
        };
      });
      y.find.TAG = D.getElementsByTagName ? function(a, f) {
        if ("undefined" !== typeof f.getElementsByTagName) {
          return f.getElementsByTagName(a);
        }
        if (D.qsa) {
          return f.querySelectorAll(a);
        }
      } : function(a, f) {
        var b, d = [], m = 0, c = f.getElementsByTagName(a);
        if ("*" === a) {
          for (;b = c[m++];) {
            1 === b.nodeType && d.push(b);
          }
          return d;
        }
        return c;
      };
      y.find.CLASS = D.getElementsByClassName && function(a, f) {
        if ("undefined" !== typeof f.getElementsByClassName && J) {
          return f.getElementsByClassName(a);
        }
      };
      va = [];
      B = [];
      if (D.qsa = V.test(A.querySelectorAll)) {
        c(function(a) {
          W.appendChild(a).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>";
          a.querySelectorAll("[msallowcapture^='']").length && B.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
          a.querySelectorAll("[selected]").length || B.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
          a.querySelectorAll("[id~=" + C + "-]").length || B.push("~=");
          a.querySelectorAll(":checked").length || B.push(":checked");
          a.querySelectorAll("a#" + C + "+*").length || B.push(".#.+[+~]");
        }), c(function(a) {
          var f = A.createElement("input");
          f.setAttribute("type", "hidden");
          a.appendChild(f).setAttribute("name", "D");
          a.querySelectorAll("[name=d]").length && B.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
          a.querySelectorAll(":enabled").length || B.push(":enabled", ":disabled");
          a.querySelectorAll("*,:x");
          B.push(",.*:");
        });
      }
      (D.matchesSelector = V.test(Ca = W.matches || W.webkitMatchesSelector || W.mozMatchesSelector || W.oMatchesSelector || W.msMatchesSelector)) && c(function(a) {
        D.disconnectedMatch = Ca.call(a, "div");
        Ca.call(a, "[s!='']:x");
        va.push("!=", ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)");
      });
      B = B.length && new RegExp(B.join("|"));
      va = va.length && new RegExp(va.join("|"));
      K = (f = V.test(W.compareDocumentPosition)) || V.test(W.contains) ? function(a, f) {
        var b = 9 === a.nodeType ? a.documentElement : a, d = f && f.parentNode;
        return a === d || !!(d && 1 === d.nodeType && (b.contains ? b.contains(d) : a.compareDocumentPosition && a.compareDocumentPosition(d) & 16));
      } : function(a, f) {
        if (f) {
          for (;f = f.parentNode;) {
            if (f === a) {
              return !0;
            }
          }
        }
        return !1;
      };
      R = f ? function(a, f) {
        if (a === f) {
          return ya = !0, 0;
        }
        var b = !a.compareDocumentPosition - !f.compareDocumentPosition;
        if (b) {
          return b;
        }
        b = (a.ownerDocument || a) === (f.ownerDocument || f) ? a.compareDocumentPosition(f) : 1;
        return b & 1 || !D.sortDetached && f.compareDocumentPosition(a) === b ? a === A || a.ownerDocument === L && K(L, a) ? -1 : f === A || f.ownerDocument === L && K(L, f) ? 1 : oa ? P(oa, a) - P(oa, f) : 0 : b & 4 ? -1 : 1;
      } : function(a, f) {
        if (a === f) {
          return ya = !0, 0;
        }
        var b, d = 0;
        b = a.parentNode;
        var m = f.parentNode, c = [a], r = [f];
        if (!b || !m) {
          return a === A ? -1 : f === A ? 1 : b ? -1 : m ? 1 : oa ? P(oa, a) - P(oa, f) : 0;
        }
        if (b === m) {
          return e(a, f);
        }
        for (b = a;b = b.parentNode;) {
          c.unshift(b);
        }
        for (b = f;b = b.parentNode;) {
          r.unshift(b);
        }
        for (;c[d] === r[d];) {
          d++;
        }
        return d ? e(c[d], r[d]) : c[d] === L ? -1 : r[d] === L ? 1 : 0;
      };
      return A;
    };
    f.matches = function(a, b) {
      return f(a, null, null, b);
    };
    f.matchesSelector = function(a, b) {
      (a.ownerDocument || a) !== A && ma(a);
      b = b.replace(pa, "='$1']");
      if (!(!D.matchesSelector || !J || Q[b + " "] || va && va.test(b) || B && B.test(b))) {
        try {
          var d = Ca.call(a, b);
          if (d || D.disconnectedMatch || a.document && 11 !== a.document.nodeType) {
            return d;
          }
        } catch (m) {
        }
      }
      return 0 < f(b, A, null, [a]).length;
    };
    f.contains = function(a, f) {
      (a.ownerDocument || a) !== A && ma(a);
      return K(a, f);
    };
    f.attr = function(a, f) {
      (a.ownerDocument || a) !== A && ma(a);
      var b = y.attrHandle[f.toLowerCase()], b = b && ba.call(y.attrHandle, f.toLowerCase()) ? b(a, f, !J) : void 0;
      return void 0 !== b ? b : D.attributes || !J ? a.getAttribute(f) : (b = a.getAttributeNode(f)) && b.specified ? b.value : null;
    };
    f.error = function(a) {
      throw Error("Syntax error, unrecognized expression: " + a);
    };
    f.uniqueSort = function(a) {
      var f, b = [], d = 0, m = 0;
      ya = !D.detectDuplicates;
      oa = !D.sortStable && a.slice(0);
      a.sort(R);
      if (ya) {
        for (;f = a[m++];) {
          f === a[m] && (d = b.push(m));
        }
        for (;d--;) {
          a.splice(b[d], 1);
        }
      }
      oa = null;
      return a;
    };
    ua = f.getText = function(a) {
      var f, b = "", d = 0;
      f = a.nodeType;
      if (!f) {
        for (;f = a[d++];) {
          b += ua(f);
        }
      } else {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" === typeof a.textContent) {
            return a.textContent;
          }
          for (a = a.firstChild;a;a = a.nextSibling) {
            b += ua(a);
          }
        } else {
          if (3 === f || 4 === f) {
            return a.nodeValue;
          }
        }
      }
      return b;
    };
    y = f.selectors = {cacheLength:50, createPseudo:d, match:X, attrHandle:{}, find:{}, relative:{">":{dir:"parentNode", first:!0}, " ":{dir:"parentNode"}, "+":{dir:"previousSibling", first:!0}, "~":{dir:"previousSibling"}}, preFilter:{ATTR:function(a) {
      a[1] = a[1].replace(ea, fa);
      a[3] = (a[3] || a[4] || a[5] || "").replace(ea, fa);
      "~=" === a[2] && (a[3] = " " + a[3] + " ");
      return a.slice(0, 4);
    }, CHILD:function(a) {
      a[1] = a[1].toLowerCase();
      "nth" === a[1].slice(0, 3) ? (a[3] || f.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && f.error(a[0]);
      return a;
    }, PSEUDO:function(a) {
      var f, b = !a[6] && a[2];
      if (X.CHILD.test(a[0])) {
        return null;
      }
      a[3] ? a[2] = a[4] || a[5] || "" : b && qa.test(b) && (f = za(b, !0)) && (f = b.indexOf(")", b.length - f) - b.length) && (a[0] = a[0].slice(0, f), a[2] = b.slice(0, f));
      return a.slice(0, 3);
    }}, filter:{TAG:function(a) {
      var f = a.replace(ea, fa).toLowerCase();
      return "*" === a ? function() {
        return !0;
      } : function(a) {
        return a.nodeName && a.nodeName.toLowerCase() === f;
      };
    }, CLASS:function(a) {
      var f = S[a + " "];
      return f || (f = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)"), S(a, function(a) {
        return f.test("string" === typeof a.className && a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "");
      }));
    }, ATTR:function(a, b, d) {
      return function(m) {
        m = f.attr(m, a);
        if (null == m) {
          return "!=" === b;
        }
        if (!b) {
          return !0;
        }
        m += "";
        return "=" === b ? m === d : "!=" === b ? m !== d : "^=" === b ? d && 0 === m.indexOf(d) : "*=" === b ? d && -1 < m.indexOf(d) : "$=" === b ? d && m.slice(-d.length) === d : "~=" === b ? -1 < (" " + m.replace(ha, " ") + " ").indexOf(d) : "|=" === b ? m === d || m.slice(0, d.length + 1) === d + "-" : !1;
      };
    }, CHILD:function(a, f, b, d, m) {
      var c = "nth" !== a.slice(0, 3), r = "last" !== a.slice(-4), l = "of-type" === f;
      return 1 === d && 0 === m ? function(a) {
        return !!a.parentNode;
      } : function(f, b, g) {
        var e, x, h, k, n;
        b = c !== r ? "nextSibling" : "previousSibling";
        var p = f.parentNode, Y = l && f.nodeName.toLowerCase();
        g = !g && !l;
        e = !1;
        if (p) {
          if (c) {
            for (;b;) {
              for (h = f;h = h[b];) {
                if (l ? h.nodeName.toLowerCase() === Y : 1 === h.nodeType) {
                  return !1;
                }
              }
              n = b = "only" === a && !n && "nextSibling";
            }
            return !0;
          }
          n = [r ? p.firstChild : p.lastChild];
          if (r && g) {
            for (h = p, x = h[C] || (h[C] = {}), x = x[h.uniqueID] || (x[h.uniqueID] = {}), e = x[a] || [], e = (k = e[0] === aa && e[1]) && e[2], h = k && p.childNodes[k];h = ++k && h && h[b] || (e = k = 0) || n.pop();) {
              if (1 === h.nodeType && ++e && h === f) {
                x[a] = [aa, k, e];
                break;
              }
            }
          } else {
            if (g && (h = f, x = h[C] || (h[C] = {}), x = x[h.uniqueID] || (x[h.uniqueID] = {}), e = x[a] || [], e = k = e[0] === aa && e[1]), !1 === e) {
              for (;(h = ++k && h && h[b] || (e = k = 0) || n.pop()) && ((l ? h.nodeName.toLowerCase() !== Y : 1 !== h.nodeType) || !++e || (g && (x = h[C] || (h[C] = {}), x = x[h.uniqueID] || (x[h.uniqueID] = {}), x[a] = [aa, e]), h !== f));) {
              }
            }
          }
          e -= m;
          return e === d || 0 === e % d && 0 <= e / d;
        }
      };
    }, PSEUDO:function(a, b) {
      var m, c = y.pseudos[a] || y.setFilters[a.toLowerCase()] || f.error("unsupported pseudo: " + a);
      return c[C] ? c(b) : 1 < c.length ? (m = [a, a, "", b], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, f) {
        for (var d, m = c(a, b), r = m.length;r--;) {
          d = P(a, m[r]), a[d] = !(f[d] = m[r]);
        }
      }) : function(a) {
        return c(a, 0, m);
      }) : c;
    }}, pseudos:{not:d(function(a) {
      var f = [], b = [], m = I(a.replace(U, "$1"));
      return m[C] ? d(function(a, f, b, d) {
        d = m(a, null, d, []);
        for (var c = a.length;c--;) {
          if (b = d[c]) {
            a[c] = !(f[c] = b);
          }
        }
      }) : function(a, d, c) {
        f[0] = a;
        m(f, null, c, b);
        f[0] = null;
        return !b.pop();
      };
    }), has:d(function(a) {
      return function(b) {
        return 0 < f(a, b).length;
      };
    }), contains:d(function(a) {
      a = a.replace(ea, fa);
      return function(f) {
        return -1 < (f.textContent || f.innerText || ua(f)).indexOf(a);
      };
    }), lang:d(function(a) {
      ga.test(a || "") || f.error("unsupported lang: " + a);
      a = a.replace(ea, fa).toLowerCase();
      return function(f) {
        var b;
        do {
          if (b = J ? f.lang : f.getAttribute("xml:lang") || f.getAttribute("lang")) {
            return b = b.toLowerCase(), b === a || 0 === b.indexOf(a + "-");
          }
        } while ((f = f.parentNode) && 1 === f.nodeType);
        return !1;
      };
    }), target:function(f) {
      var b = a.location && a.location.hash;
      return b && b.slice(1) === f.id;
    }, root:function(a) {
      return a === W;
    }, focus:function(a) {
      return a === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
    }, enabled:function(a) {
      return !1 === a.disabled;
    }, disabled:function(a) {
      return !0 === a.disabled;
    }, checked:function(a) {
      var f = a.nodeName.toLowerCase();
      return "input" === f && !!a.checked || "option" === f && !!a.selected;
    }, selected:function(a) {
      a.parentNode && a.parentNode.selectedIndex;
      return !0 === a.selected;
    }, empty:function(a) {
      for (a = a.firstChild;a;a = a.nextSibling) {
        if (6 > a.nodeType) {
          return !1;
        }
      }
      return !0;
    }, parent:function(a) {
      return !y.pseudos.empty(a);
    }, header:function(a) {
      return sa.test(a.nodeName);
    }, input:function(a) {
      return ra.test(a.nodeName);
    }, button:function(a) {
      var f = a.nodeName.toLowerCase();
      return "input" === f && "button" === a.type || "button" === f;
    }, text:function(a) {
      var f;
      return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (f = a.getAttribute("type")) || "text" === f.toLowerCase());
    }, first:p(function() {
      return [0];
    }), last:p(function(a, f) {
      return [f - 1];
    }), eq:p(function(a, f, b) {
      return [0 > b ? b + f : b];
    }), even:p(function(a, f) {
      for (var b = 0;b < f;b += 2) {
        a.push(b);
      }
      return a;
    }), odd:p(function(a, f) {
      for (var b = 1;b < f;b += 2) {
        a.push(b);
      }
      return a;
    }), lt:p(function(a, f, b) {
      for (f = 0 > b ? b + f : b;0 <= --f;) {
        a.push(f);
      }
      return a;
    }), gt:p(function(a, f, b) {
      for (b = 0 > b ? b + f : b;++b < f;) {
        a.push(b);
      }
      return a;
    })}};
    y.pseudos.nth = y.pseudos.eq;
    for (N in{radio:!0, checkbox:!0, file:!0, password:!0, image:!0}) {
      y.pseudos[N] = h(N);
    }
    for (N in{submit:!0, reset:!0}) {
      y.pseudos[N] = k(N);
    }
    t.prototype = y.filters = y.pseudos;
    y.setFilters = new t;
    za = f.tokenize = function(a, b) {
      var d, m, c, r, l, g, e;
      if (l = ia[a + " "]) {
        return b ? 0 : l.slice(0);
      }
      l = a;
      g = [];
      for (e = y.preFilter;l;) {
        if (!d || (m = ka.exec(l))) {
          m && (l = l.slice(m[0].length) || l), g.push(c = []);
        }
        d = !1;
        if (m = la.exec(l)) {
          d = m.shift(), c.push({value:d, type:m[0].replace(U, " ")}), l = l.slice(d.length);
        }
        for (r in y.filter) {
          !(m = X[r].exec(l)) || e[r] && !(m = e[r](m)) || (d = m.shift(), c.push({value:d, type:r, matches:m}), l = l.slice(d.length));
        }
        if (!d) {
          break;
        }
      }
      return b ? l.length : l ? f.error(a) : ia(a, g).slice(0);
    };
    I = f.compile = function(a, f) {
      var b, d = [], m = [], c = Q[a + " "];
      if (!c) {
        f || (f = za(a));
        for (b = f.length;b--;) {
          c = E(f[b]), c[C] ? d.push(c) : m.push(c);
        }
        c = Q(a, M(m, d));
        c.selector = a;
      }
      return c;
    };
    O = f.select = function(a, f, b, d) {
      var m, c, r, l, g = "function" === typeof a && a, e = !d && za(a = g.selector || a);
      b = b || [];
      if (1 === e.length) {
        c = e[0] = e[0].slice(0);
        if (2 < c.length && "ID" === (r = c[0]).type && D.getById && 9 === f.nodeType && J && y.relative[c[1].type]) {
          f = (y.find.ID(r.matches[0].replace(ea, fa), f) || [])[0];
          if (!f) {
            return b;
          }
          g && (f = f.parentNode);
          a = a.slice(c.shift().value.length);
        }
        for (m = X.needsContext.test(a) ? 0 : c.length;m--;) {
          r = c[m];
          if (y.relative[l = r.type]) {
            break;
          }
          if (l = y.find[l]) {
            if (d = l(r.matches[0].replace(ea, fa), ja.test(c[0].type) && n(f.parentNode) || f)) {
              c.splice(m, 1);
              a = d.length && q(c);
              if (!a) {
                return na.apply(b, d), b;
              }
              break;
            }
          }
        }
      }
      (g || I(a, e))(d, f, !J, b, !f || ja.test(a) && n(f.parentNode) || f);
      return b;
    };
    D.sortStable = C.split("").sort(R).join("") === C;
    D.detectDuplicates = !!ya;
    ma();
    D.sortDetached = c(function(a) {
      return a.compareDocumentPosition(A.createElement("div")) & 1;
    });
    c(function(a) {
      a.innerHTML = "<a href='#'></a>";
      return "#" === a.firstChild.getAttribute("href");
    }) || g("type|href|height|width", function(a, f, b) {
      if (!b) {
        return a.getAttribute(f, "type" === f.toLowerCase() ? 1 : 2);
      }
    });
    D.attributes && c(function(a) {
      a.innerHTML = "<input/>";
      a.firstChild.setAttribute("value", "");
      return "" === a.firstChild.getAttribute("value");
    }) || g("value", function(a, f, b) {
      if (!b && "input" === a.nodeName.toLowerCase()) {
        return a.defaultValue;
      }
    });
    c(function(a) {
      return null == a.getAttribute("disabled");
    }) || g("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(a, f, b) {
      var d;
      if (!b) {
        return !0 === a[f] ? f.toLowerCase() : (d = a.getAttributeNode(f)) && d.specified ? d.value : null;
      }
    });
    return f;
  }(b);
  d.find = pa;
  d.expr = pa.selectors;
  d.expr[":"] = d.expr.pseudos;
  d.uniqueSort = d.unique = pa.uniqueSort;
  d.text = pa.getText;
  d.isXMLDoc = pa.isXML;
  d.contains = pa.contains;
  var qa = function(a, f, b) {
    for (var c = [], l = void 0 !== b;(a = a[f]) && 9 !== a.nodeType;) {
      if (1 === a.nodeType) {
        if (l && d(a).is(b)) {
          break;
        }
        c.push(a);
      }
    }
    return c;
  }, Gb = function(a, f) {
    for (var b = [];a;a = a.nextSibling) {
      1 === a.nodeType && a !== f && b.push(a);
    }
    return b;
  }, Hb = d.expr.match.needsContext, Ib = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Xb = /^.[^:#\[\.,]*$/;
  d.filter = function(a, f, b) {
    var c = f[0];
    b && (a = ":not(" + a + ")");
    return 1 === f.length && 1 === c.nodeType ? d.find.matchesSelector(c, a) ? [c] : [] : d.find.matches(a, d.grep(f, function(a) {
      return 1 === a.nodeType;
    }));
  };
  d.fn.extend({find:function(a) {
    var f, b = [], c = this, l = c.length;
    if ("string" !== typeof a) {
      return this.pushStack(d(a).filter(function() {
        for (f = 0;f < l;f++) {
          if (d.contains(c[f], this)) {
            return !0;
          }
        }
      }));
    }
    for (f = 0;f < l;f++) {
      d.find(a, c[f], b);
    }
    b = this.pushStack(1 < l ? d.unique(b) : b);
    b.selector = this.selector ? this.selector + " " + a : a;
    return b;
  }, filter:function(a) {
    return this.pushStack(h(this, a || [], !1));
  }, not:function(a) {
    return this.pushStack(h(this, a || [], !0));
  }, is:function(a) {
    return !!h(this, "string" === typeof a && Hb.test(a) ? d(a) : a || [], !1).length;
  }});
  var Ta, nc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  (d.fn.init = function(a, f, b) {
    var c;
    if (!a) {
      return this;
    }
    b = b || Ta;
    if ("string" === typeof a) {
      c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : nc.exec(a);
      if (!c || !c[1] && f) {
        return !f || f.jquery ? (f || b).find(a) : this.constructor(f).find(a);
      }
      if (c[1]) {
        if (f = f instanceof d ? f[0] : f, d.merge(this, d.parseHTML(c[1], f && f.nodeType ? f.ownerDocument || f : w, !0)), Ib.test(c[1]) && d.isPlainObject(f)) {
          for (c in f) {
            if (d.isFunction(this[c])) {
              this[c](f[c]);
            } else {
              this.attr(c, f[c]);
            }
          }
        }
      } else {
        if ((f = w.getElementById(c[2])) && f.parentNode) {
          if (f.id !== c[2]) {
            return Ta.find(a);
          }
          this.length = 1;
          this[0] = f;
        }
        this.context = w;
        this.selector = a;
      }
      return this;
    }
    if (a.nodeType) {
      return this.context = this[0] = a, this.length = 1, this;
    }
    if (d.isFunction(a)) {
      return "undefined" !== typeof b.ready ? b.ready(a) : a(d);
    }
    void 0 !== a.selector && (this.selector = a.selector, this.context = a.context);
    return d.makeArray(a, this);
  }).prototype = d.fn;
  Ta = d(w);
  var oc = /^(?:parents|prev(?:Until|All))/, pc = {children:!0, contents:!0, next:!0, prev:!0};
  d.fn.extend({has:function(a) {
    var f, b = d(a, this), c = b.length;
    return this.filter(function() {
      for (f = 0;f < c;f++) {
        if (d.contains(this, b[f])) {
          return !0;
        }
      }
    });
  }, closest:function(a, f) {
    for (var b, c = 0, l = this.length, g = [], e = Hb.test(a) || "string" !== typeof a ? d(a, f || this.context) : 0;c < l;c++) {
      for (b = this[c];b && b !== f;b = b.parentNode) {
        if (11 > b.nodeType && (e ? -1 < e.index(b) : 1 === b.nodeType && d.find.matchesSelector(b, a))) {
          g.push(b);
          break;
        }
      }
    }
    return this.pushStack(1 < g.length ? d.uniqueSort(g) : g);
  }, index:function(a) {
    return a ? "string" === typeof a ? d.inArray(this[0], d(a)) : d.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  }, add:function(a, f) {
    return this.pushStack(d.uniqueSort(d.merge(this.get(), d(a, f))));
  }, addBack:function(a) {
    return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
  }});
  d.each({parent:function(a) {
    return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
  }, parents:function(a) {
    return qa(a, "parentNode");
  }, parentsUntil:function(a, f, b) {
    return qa(a, "parentNode", b);
  }, next:function(a) {
    return c(a, "nextSibling");
  }, prev:function(a) {
    return c(a, "previousSibling");
  }, nextAll:function(a) {
    return qa(a, "nextSibling");
  }, prevAll:function(a) {
    return qa(a, "previousSibling");
  }, nextUntil:function(a, f, b) {
    return qa(a, "nextSibling", b);
  }, prevUntil:function(a, f, b) {
    return qa(a, "previousSibling", b);
  }, siblings:function(a) {
    return Gb((a.parentNode || {}).firstChild, a);
  }, children:function(a) {
    return Gb(a.firstChild);
  }, contents:function(a) {
    return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.merge([], a.childNodes);
  }}, function(a, f) {
    d.fn[a] = function(b, c) {
      var l = d.map(this, f, b);
      "Until" !== a.slice(-5) && (c = b);
      c && "string" === typeof c && (l = d.filter(c, l));
      1 < this.length && (pc[a] || (l = d.uniqueSort(l)), oc.test(a) && (l = l.reverse()));
      return this.pushStack(l);
    };
  });
  var K = /\S+/g;
  d.Callbacks = function(a) {
    a = "string" === typeof a ? g(a) : d.extend({}, a);
    var f, b, c, l, e = [], h = [], k = -1, n = function() {
      l = a.once;
      for (c = f = !0;h.length;k = -1) {
        for (b = h.shift();++k < e.length;) {
          !1 === e[k].apply(b[0], b[1]) && a.stopOnFalse && (k = e.length, b = !1);
        }
      }
      a.memory || (b = !1);
      f = !1;
      l && (e = b ? [] : "");
    }, p = {add:function() {
      e && (b && !f && (k = e.length - 1, h.push(b)), function t(f) {
        d.each(f, function(f, b) {
          d.isFunction(b) ? a.unique && p.has(b) || e.push(b) : b && b.length && "string" !== d.type(b) && t(b);
        });
      }(arguments), b && !f && n());
      return this;
    }, remove:function() {
      d.each(arguments, function(a, f) {
        for (var b;-1 < (b = d.inArray(f, e, b));) {
          e.splice(b, 1), b <= k && k--;
        }
      });
      return this;
    }, has:function(a) {
      return a ? -1 < d.inArray(a, e) : 0 < e.length;
    }, empty:function() {
      e && (e = []);
      return this;
    }, disable:function() {
      l = h = [];
      e = b = "";
      return this;
    }, disabled:function() {
      return !e;
    }, lock:function() {
      l = !0;
      b || p.disable();
      return this;
    }, locked:function() {
      return !!l;
    }, fireWith:function(a, b) {
      l || (b = b || [], b = [a, b.slice ? b.slice() : b], h.push(b), f || n());
      return this;
    }, fire:function() {
      p.fireWith(this, arguments);
      return this;
    }, fired:function() {
      return !!c;
    }};
    return p;
  };
  d.extend({Deferred:function(a) {
    var f = [["resolve", "done", d.Callbacks("once memory"), "resolved"], ["reject", "fail", d.Callbacks("once memory"), "rejected"], ["notify", "progress", d.Callbacks("memory")]], b = "pending", c = {state:function() {
      return b;
    }, always:function() {
      l.done(arguments).fail(arguments);
      return this;
    }, then:function() {
      var a = arguments;
      return d.Deferred(function(b) {
        d.each(f, function(f, m) {
          var g = d.isFunction(a[f]) && a[f];
          l[m[1]](function() {
            var a = g && g.apply(this, arguments);
            if (a && d.isFunction(a.promise)) {
              a.promise().progress(b.notify).done(b.resolve).fail(b.reject);
            } else {
              b[m[0] + "With"](this === c ? b.promise() : this, g ? [a] : arguments);
            }
          });
        });
        a = null;
      }).promise();
    }, promise:function(a) {
      return null != a ? d.extend(a, c) : c;
    }}, l = {};
    c.pipe = c.then;
    d.each(f, function(a, d) {
      var g = d[2], e = d[3];
      c[d[1]] = g.add;
      e && g.add(function() {
        b = e;
      }, f[a ^ 1][2].disable, f[2][2].lock);
      l[d[0]] = function() {
        l[d[0] + "With"](this === l ? c : this, arguments);
        return this;
      };
      l[d[0] + "With"] = g.fireWith;
    });
    c.promise(l);
    a && a.call(l, l);
    return l;
  }, when:function(a) {
    var f = 0, b = R.call(arguments), c = b.length, l = 1 !== c || a && d.isFunction(a.promise) ? c : 0, g = 1 === l ? a : d.Deferred(), e = function(a, f, b) {
      return function(d) {
        f[a] = this;
        b[a] = 1 < arguments.length ? R.call(arguments) : d;
        b === h ? g.notifyWith(f, b) : --l || g.resolveWith(f, b);
      };
    }, h, k, p;
    if (1 < c) {
      for (h = Array(c), k = Array(c), p = Array(c);f < c;f++) {
        b[f] && d.isFunction(b[f].promise) ? b[f].promise().progress(e(f, k, h)).done(e(f, p, b)).fail(g.reject) : --l;
      }
    }
    l || g.resolveWith(p, b);
    return g.promise();
  }});
  var Da;
  d.fn.ready = function(a) {
    d.ready.promise().done(a);
    return this;
  };
  d.extend({isReady:!1, readyWait:1, holdReady:function(a) {
    a ? d.readyWait++ : d.ready(!0);
  }, ready:function(a) {
    (!0 === a ? --d.readyWait : d.isReady) || (d.isReady = !0, !0 !== a && 0 < --d.readyWait || (Da.resolveWith(w, [d]), d.fn.triggerHandler && (d(w).triggerHandler("ready"), d(w).off("ready"))));
  }});
  d.ready.promise = function(a) {
    if (!Da) {
      if (Da = d.Deferred(), "complete" === w.readyState || "loading" !== w.readyState && !w.documentElement.doScroll) {
        b.setTimeout(d.ready);
      } else {
        if (w.addEventListener) {
          w.addEventListener("DOMContentLoaded", n), b.addEventListener("load", n);
        } else {
          w.attachEvent("onreadystatechange", n);
          b.attachEvent("onload", n);
          var f = !1;
          try {
            f = null == b.frameElement && w.documentElement;
          } catch (m) {
          }
          f && f.doScroll && function r() {
            if (!d.isReady) {
              try {
                f.doScroll("left");
              } catch (a) {
                return b.setTimeout(r, 50);
              }
              p();
              d.ready();
            }
          }();
        }
      }
    }
    return Da.promise(a);
  };
  d.ready.promise();
  for (var qc in d(u)) {
    break;
  }
  u.ownFirst = "0" === qc;
  u.inlineBlockNeedsLayout = !1;
  d(function() {
    var a, f, b;
    (f = w.getElementsByTagName("body")[0]) && f.style && (a = w.createElement("div"), b = w.createElement("div"), b.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", f.appendChild(b).appendChild(a), "undefined" !== typeof a.style.zoom && (a.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", u.inlineBlockNeedsLayout = a = 3 === a.offsetWidth) && (f.style.zoom = 1), f.removeChild(b));
  });
  (function() {
    var a = w.createElement("div");
    u.deleteExpando = !0;
    try {
      delete a.test;
    } catch (f) {
      u.deleteExpando = !1;
    }
  })();
  var ra = function(a) {
    var f = d.noData[(a.nodeName + " ").toLowerCase()], b = +a.nodeType || 1;
    return 1 !== b && 9 !== b ? !1 : !f || !0 !== f && a.getAttribute("classid") === f;
  }, Zb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Yb = /([A-Z])/g;
  d.extend({cache:{}, noData:{"applet ":!0, "embed ":!0, "object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData:function(a) {
    a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
    return !!a && !v(a);
  }, data:function(a, f, b) {
    return z(a, f, b);
  }, removeData:function(a, f) {
    return M(a, f);
  }, _data:function(a, f, b) {
    return z(a, f, b, !0);
  }, _removeData:function(a, f) {
    return M(a, f, !0);
  }});
  d.fn.extend({data:function(a, f) {
    var b, c, g, e = this[0], h = e && e.attributes;
    if (void 0 === a) {
      if (this.length && (g = d.data(e), 1 === e.nodeType && !d._data(e, "parsedAttrs"))) {
        for (b = h.length;b--;) {
          h[b] && (c = h[b].name, 0 === c.indexOf("data-") && (c = d.camelCase(c.slice(5)), q(e, c, g[c])));
        }
        d._data(e, "parsedAttrs", !0);
      }
      return g;
    }
    return "object" === typeof a ? this.each(function() {
      d.data(this, a);
    }) : 1 < arguments.length ? this.each(function() {
      d.data(this, a, f);
    }) : e ? q(e, a, d.data(e, a)) : void 0;
  }, removeData:function(a) {
    return this.each(function() {
      d.removeData(this, a);
    });
  }});
  d.extend({queue:function(a, f, b) {
    var c;
    if (a) {
      return f = (f || "fx") + "queue", c = d._data(a, f), b && (!c || d.isArray(b) ? c = d._data(a, f, d.makeArray(b)) : c.push(b)), c || [];
    }
  }, dequeue:function(a, f) {
    f = f || "fx";
    var b = d.queue(a, f), c = b.length, g = b.shift(), e = d._queueHooks(a, f), h = function() {
      d.dequeue(a, f);
    };
    "inprogress" === g && (g = b.shift(), c--);
    g && ("fx" === f && b.unshift("inprogress"), delete e.stop, g.call(a, h, e));
    !c && e && e.empty.fire();
  }, _queueHooks:function(a, f) {
    var b = f + "queueHooks";
    return d._data(a, b) || d._data(a, b, {empty:d.Callbacks("once memory").add(function() {
      d._removeData(a, f + "queue");
      d._removeData(a, b);
    })});
  }});
  d.fn.extend({queue:function(a, f) {
    var b = 2;
    "string" !== typeof a && (f = a, a = "fx", b--);
    return arguments.length < b ? d.queue(this[0], a) : void 0 === f ? this : this.each(function() {
      var b = d.queue(this, a, f);
      d._queueHooks(this, a);
      "fx" === a && "inprogress" !== b[0] && d.dequeue(this, a);
    });
  }, dequeue:function(a) {
    return this.each(function() {
      d.dequeue(this, a);
    });
  }, clearQueue:function(a) {
    return this.queue(a || "fx", []);
  }, promise:function(a, f) {
    var b, c = 1, g = d.Deferred(), e = this, h = this.length, k = function() {
      --c || g.resolveWith(e, [e]);
    };
    "string" !== typeof a && (f = a, a = void 0);
    for (a = a || "fx";h--;) {
      (b = d._data(e[h], a + "queueHooks")) && b.empty && (c++, b.empty.add(k));
    }
    k();
    return g.promise(f);
  }});
  (function() {
    var a;
    u.shrinkWrapBlocks = function() {
      if (null != a) {
        return a;
      }
      a = !1;
      var f, b, d;
      if ((b = w.getElementsByTagName("body")[0]) && b.style) {
        return f = w.createElement("div"), d = w.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", b.appendChild(d).appendChild(f), "undefined" !== typeof f.style.zoom && (f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", f.appendChild(w.createElement("div")).style.width = "5px", a = 3 !== f.offsetWidth), b.removeChild(d), a;
      }
    };
  })();
  var Ua = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ia = new RegExp("^(?:([+-])=|)(" + Ua + ")([a-z%]*)$", "i"), da = ["Top", "Right", "Bottom", "Left"], V = function(a, f) {
    a = f || a;
    return "none" === d.css(a, "display") || !d.contains(a.ownerDocument, a);
  }, ba = function(a, f, b, c, g, e, h) {
    var k = 0, p = a.length, n = null == b;
    if ("object" === d.type(b)) {
      for (k in g = !0, b) {
        ba(a, f, k, b[k], !0, e, h);
      }
    } else {
      if (void 0 !== c && (g = !0, d.isFunction(c) || (h = !0), n && (h ? (f.call(a, c), f = null) : (n = f, f = function(a, b, f) {
        return n.call(d(a), f);
      })), f)) {
        for (;k < p;k++) {
          f(a[k], b, h ? c : c.call(a[k], k, f(a[k], b)));
        }
      }
    }
    return g ? a : n ? f.call(a) : p ? f(a[0], b) : e;
  }, Ka = /^(?:checkbox|radio)$/i, fb = /<([\w:-]+)/, hb = /^$|\/(?:java|ecma)script/i, La = /^\s+/;
  (function() {
    var a = w.createElement("div"), b = w.createDocumentFragment(), c = w.createElement("input");
    a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    u.leadingWhitespace = 3 === a.firstChild.nodeType;
    u.tbody = !a.getElementsByTagName("tbody").length;
    u.htmlSerialize = !!a.getElementsByTagName("link").length;
    u.html5Clone = "<:nav></:nav>" !== w.createElement("nav").cloneNode(!0).outerHTML;
    c.type = "checkbox";
    c.checked = !0;
    b.appendChild(c);
    u.appendChecked = c.checked;
    a.innerHTML = "<textarea>x</textarea>";
    u.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue;
    b.appendChild(a);
    c = w.createElement("input");
    c.setAttribute("type", "radio");
    c.setAttribute("checked", "checked");
    c.setAttribute("name", "t");
    a.appendChild(c);
    u.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked;
    u.noCloneEvent = !!a.addEventListener;
    a[d.expando] = 1;
    u.attributes = !a.getAttribute(d.expando);
  })();
  var O = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], area:[1, "<map>", "</map>"], param:[1, "<object>", "</object>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], _default:u.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]};
  O.optgroup = O.option;
  O.tbody = O.tfoot = O.colgroup = O.caption = O.thead;
  O.th = O.td;
  var bc = /<|&#?\w+;/, gb = /<tbody/i;
  (function() {
    var a, f, d = w.createElement("div");
    for (a in{submit:!0, change:!0, focusin:!0}) {
      f = "on" + a, (u[a] = f in b) || (d.setAttribute(f, "t"), u[a] = !1 === d.attributes[f].expando);
    }
  })();
  var Va = /^(?:input|select|textarea)$/i, rc = /^key/, sc = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Jb = /^(?:focusinfocus|focusoutblur)$/, Kb = /^([^.]*)(?:\.(.+)|)/;
  d.event = {global:{}, add:function(a, b, c, g, l) {
    var e, h, k, p, n, q, t, v, u;
    if (k = d._data(a)) {
      c.handler && (p = c, c = p.handler, l = p.selector);
      c.guid || (c.guid = d.guid++);
      (h = k.events) || (h = k.events = {});
      (n = k.handle) || (n = k.handle = function(a) {
        return "undefined" === typeof d || a && d.event.triggered === a.type ? void 0 : d.event.dispatch.apply(n.elem, arguments);
      }, n.elem = a);
      b = (b || "").match(K) || [""];
      for (k = b.length;k--;) {
        e = Kb.exec(b[k]) || [], v = q = e[1], u = (e[2] || "").split(".").sort(), v && (e = d.event.special[v] || {}, v = (l ? e.delegateType : e.bindType) || v, e = d.event.special[v] || {}, q = d.extend({type:v, origType:q, data:g, handler:c, guid:c.guid, selector:l, needsContext:l && d.expr.match.needsContext.test(l), namespace:u.join(".")}, p), (t = h[v]) || (t = h[v] = [], t.delegateCount = 0, e.setup && !1 !== e.setup.call(a, g, u, n) || (a.addEventListener ? a.addEventListener(v, n, !1) : 
        a.attachEvent && a.attachEvent("on" + v, n))), e.add && (e.add.call(a, q), q.handler.guid || (q.handler.guid = c.guid)), l ? t.splice(t.delegateCount++, 0, q) : t.push(q), d.event.global[v] = !0);
      }
      a = null;
    }
  }, remove:function(a, b, c, g, l) {
    var e, h, k, p, n, q, t, v, u, w, z, E = d.hasData(a) && d._data(a);
    if (E && (q = E.events)) {
      b = (b || "").match(K) || [""];
      for (n = b.length;n--;) {
        if (k = Kb.exec(b[n]) || [], u = z = k[1], w = (k[2] || "").split(".").sort(), u) {
          t = d.event.special[u] || {};
          u = (g ? t.delegateType : t.bindType) || u;
          v = q[u] || [];
          k = k[2] && new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)");
          for (p = e = v.length;e--;) {
            h = v[e], !l && z !== h.origType || c && c.guid !== h.guid || k && !k.test(h.namespace) || g && g !== h.selector && ("**" !== g || !h.selector) || (v.splice(e, 1), h.selector && v.delegateCount--, t.remove && t.remove.call(a, h));
          }
          p && !v.length && (t.teardown && !1 !== t.teardown.call(a, w, E.handle) || d.removeEvent(a, u, E.handle), delete q[u]);
        } else {
          for (u in q) {
            d.event.remove(a, u + b[n], c, g, !0);
          }
        }
      }
      d.isEmptyObject(q) && (delete E.handle, d._removeData(a, "events"));
    }
  }, trigger:function(a, f, c, g) {
    var l, e, h, k, n, p, q = [c || w], t = la.call(a, "type") ? a.type : a;
    n = la.call(a, "namespace") ? a.namespace.split(".") : [];
    h = l = c = c || w;
    if (3 !== c.nodeType && 8 !== c.nodeType && !Jb.test(t + d.event.triggered) && (-1 < t.indexOf(".") && (n = t.split("."), t = n.shift(), n.sort()), e = 0 > t.indexOf(":") && "on" + t, a = a[d.expando] ? a : new d.Event(t, "object" === typeof a && a), a.isTrigger = g ? 2 : 3, a.namespace = n.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = c), f = null == f ? [a] : d.makeArray(f, [a]), n = d.event.special[t] || 
    {}, g || !n.trigger || !1 !== n.trigger.apply(c, f))) {
      if (!g && !n.noBubble && !d.isWindow(c)) {
        k = n.delegateType || t;
        Jb.test(k + t) || (h = h.parentNode);
        for (;h;h = h.parentNode) {
          q.push(h), l = h;
        }
        l === (c.ownerDocument || w) && q.push(l.defaultView || l.parentWindow || b);
      }
      for (p = 0;(h = q[p++]) && !a.isPropagationStopped();) {
        a.type = 1 < p ? k : n.bindType || t, (l = (d._data(h, "events") || {})[a.type] && d._data(h, "handle")) && l.apply(h, f), (l = e && h[e]) && l.apply && ra(h) && (a.result = l.apply(h, f), !1 === a.result && a.preventDefault());
      }
      a.type = t;
      if (!(g || a.isDefaultPrevented() || n._default && !1 !== n._default.apply(q.pop(), f)) && ra(c) && e && c[t] && !d.isWindow(c)) {
        (l = c[e]) && (c[e] = null);
        d.event.triggered = t;
        try {
          c[t]();
        } catch (v) {
        }
        d.event.triggered = void 0;
        l && (c[e] = l);
      }
      return a.result;
    }
  }, dispatch:function(a) {
    a = d.event.fix(a);
    var b, c, g, e, h = [], k = R.call(arguments);
    b = (d._data(this, "events") || {})[a.type] || [];
    var n = d.event.special[a.type] || {};
    k[0] = a;
    a.delegateTarget = this;
    if (!n.preDispatch || !1 !== n.preDispatch.call(this, a)) {
      h = d.event.handlers.call(this, a, b);
      for (b = 0;(e = h[b++]) && !a.isPropagationStopped();) {
        for (a.currentTarget = e.elem, c = 0;(g = e.handlers[c++]) && !a.isImmediatePropagationStopped();) {
          if (!a.rnamespace || a.rnamespace.test(g.namespace)) {
            a.handleObj = g, a.data = g.data, g = ((d.event.special[g.origType] || {}).handle || g.handler).apply(e.elem, k), void 0 !== g && !1 === (a.result = g) && (a.preventDefault(), a.stopPropagation());
          }
        }
      }
      n.postDispatch && n.postDispatch.call(this, a);
      return a.result;
    }
  }, handlers:function(a, b) {
    var c, g, e, h, k = [], n = b.delegateCount, p = a.target;
    if (n && p.nodeType && ("click" !== a.type || isNaN(a.button) || 1 > a.button)) {
      for (;p != this;p = p.parentNode || this) {
        if (1 === p.nodeType && (!0 !== p.disabled || "click" !== a.type)) {
          g = [];
          for (c = 0;c < n;c++) {
            h = b[c], e = h.selector + " ", void 0 === g[e] && (g[e] = h.needsContext ? -1 < d(e, this).index(p) : d.find(e, this, null, [p]).length), g[e] && g.push(h);
          }
          g.length && k.push({elem:p, handlers:g});
        }
      }
    }
    n < b.length && k.push({elem:this, handlers:b.slice(n)});
    return k;
  }, fix:function(a) {
    if (a[d.expando]) {
      return a;
    }
    var b, c, g;
    b = a.type;
    var e = a, h = this.fixHooks[b];
    h || (this.fixHooks[b] = h = sc.test(b) ? this.mouseHooks : rc.test(b) ? this.keyHooks : {});
    g = h.props ? this.props.concat(h.props) : this.props;
    a = new d.Event(e);
    for (b = g.length;b--;) {
      c = g[b], a[c] = e[c];
    }
    a.target || (a.target = e.srcElement || w);
    3 === a.target.nodeType && (a.target = a.target.parentNode);
    a.metaKey = !!a.metaKey;
    return h.filter ? h.filter(a, e) : a;
  }, props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:["char", "charCode", "key", "keyCode"], filter:function(a, b) {
    null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode);
    return a;
  }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function(a, b) {
    var d, c, g = b.button, e = b.fromElement;
    null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || w, c = d.documentElement, d = d.body, a.pageX = b.clientX + (c && c.scrollLeft || d && d.scrollLeft || 0) - (c && c.clientLeft || d && d.clientLeft || 0), a.pageY = b.clientY + (c && c.scrollTop || d && d.scrollTop || 0) - (c && c.clientTop || d && d.clientTop || 0));
    !a.relatedTarget && e && (a.relatedTarget = e === a.target ? b.toElement : e);
    a.which || void 0 === g || (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0);
    return a;
  }}, special:{load:{noBubble:!0}, focus:{trigger:function() {
    if (this !== ib() && this.focus) {
      try {
        return this.focus(), !1;
      } catch (a) {
      }
    }
  }, delegateType:"focusin"}, blur:{trigger:function() {
    if (this === ib() && this.blur) {
      return this.blur(), !1;
    }
  }, delegateType:"focusout"}, click:{trigger:function() {
    if (d.nodeName(this, "input") && "checkbox" === this.type && this.click) {
      return this.click(), !1;
    }
  }, _default:function(a) {
    return d.nodeName(a.target, "a");
  }}, beforeunload:{postDispatch:function(a) {
    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
  }}}, simulate:function(a, b, c) {
    a = d.extend(new d.Event, c, {type:a, isSimulated:!0});
    d.event.trigger(a, null, b);
    a.isDefaultPrevented() && c.preventDefault();
  }};
  d.removeEvent = w.removeEventListener ? function(a, b, d) {
    a.removeEventListener && a.removeEventListener(b, d);
  } : function(a, b, d) {
    b = "on" + b;
    a.detachEvent && ("undefined" === typeof a[b] && (a[b] = null), a.detachEvent(b, d));
  };
  d.Event = function(a, b) {
    if (!(this instanceof d.Event)) {
      return new d.Event(a, b);
    }
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? wa : U) : this.type = a;
    b && d.extend(this, b);
    this.timeStamp = a && a.timeStamp || d.now();
    this[d.expando] = !0;
  };
  d.Event.prototype = {constructor:d.Event, isDefaultPrevented:U, isPropagationStopped:U, isImmediatePropagationStopped:U, preventDefault:function() {
    var a = this.originalEvent;
    this.isDefaultPrevented = wa;
    a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
  }, stopPropagation:function() {
    var a = this.originalEvent;
    this.isPropagationStopped = wa;
    a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
  }, stopImmediatePropagation:function() {
    var a = this.originalEvent;
    this.isImmediatePropagationStopped = wa;
    a && a.stopImmediatePropagation && a.stopImmediatePropagation();
    this.stopPropagation();
  }};
  d.each({mouseenter:"mouseover", mouseleave:"mouseout", pointerenter:"pointerover", pointerleave:"pointerout"}, function(a, b) {
    d.event.special[a] = {delegateType:b, bindType:b, handle:function(a) {
      var c, g = a.relatedTarget, e = a.handleObj;
      if (!g || g !== this && !d.contains(this, g)) {
        a.type = e.origType, c = e.handler.apply(this, arguments), a.type = b;
      }
      return c;
    }};
  });
  u.submit || (d.event.special.submit = {setup:function() {
    if (d.nodeName(this, "form")) {
      return !1;
    }
    d.event.add(this, "click._submit keypress._submit", function(a) {
      a = a.target;
      (a = d.nodeName(a, "input") || d.nodeName(a, "button") ? d.prop(a, "form") : void 0) && !d._data(a, "submit") && (d.event.add(a, "submit._submit", function(a) {
        a._submitBubble = !0;
      }), d._data(a, "submit", !0));
    });
  }, postDispatch:function(a) {
    a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && d.event.simulate("submit", this.parentNode, a));
  }, teardown:function() {
    if (d.nodeName(this, "form")) {
      return !1;
    }
    d.event.remove(this, "._submit");
  }});
  u.change || (d.event.special.change = {setup:function() {
    if (Va.test(this.nodeName)) {
      if ("checkbox" === this.type || "radio" === this.type) {
        d.event.add(this, "propertychange._change", function(a) {
          "checked" === a.originalEvent.propertyName && (this._justChanged = !0);
        }), d.event.add(this, "click._change", function(a) {
          this._justChanged && !a.isTrigger && (this._justChanged = !1);
          d.event.simulate("change", this, a);
        });
      }
      return !1;
    }
    d.event.add(this, "beforeactivate._change", function(a) {
      a = a.target;
      Va.test(a.nodeName) && !d._data(a, "change") && (d.event.add(a, "change._change", function(a) {
        !this.parentNode || a.isSimulated || a.isTrigger || d.event.simulate("change", this.parentNode, a);
      }), d._data(a, "change", !0));
    });
  }, handle:function(a) {
    var b = a.target;
    if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) {
      return a.handleObj.handler.apply(this, arguments);
    }
  }, teardown:function() {
    d.event.remove(this, "._change");
    return !Va.test(this.nodeName);
  }});
  u.focusin || d.each({focus:"focusin", blur:"focusout"}, function(a, b) {
    var c = function(a) {
      d.event.simulate(b, a.target, d.event.fix(a));
    };
    d.event.special[b] = {setup:function() {
      var g = this.ownerDocument || this, e = d._data(g, b);
      e || g.addEventListener(a, c, !0);
      d._data(g, b, (e || 0) + 1);
    }, teardown:function() {
      var g = this.ownerDocument || this, e = d._data(g, b) - 1;
      e ? d._data(g, b, e) : (g.removeEventListener(a, c, !0), d._removeData(g, b));
    }};
  });
  d.fn.extend({on:function(a, b, d, c) {
    return Ma(this, a, b, d, c);
  }, one:function(a, b, d, c) {
    return Ma(this, a, b, d, c, 1);
  }, off:function(a, b, c) {
    var g;
    if (a && a.preventDefault && a.handleObj) {
      return g = a.handleObj, d(a.delegateTarget).off(g.namespace ? g.origType + "." + g.namespace : g.origType, g.selector, g.handler), this;
    }
    if ("object" === typeof a) {
      for (g in a) {
        this.off(g, b, a[g]);
      }
      return this;
    }
    if (!1 === b || "function" === typeof b) {
      c = b, b = void 0;
    }
    !1 === c && (c = U);
    return this.each(function() {
      d.event.remove(this, a, c, b);
    });
  }, trigger:function(a, b) {
    return this.each(function() {
      d.event.trigger(a, b, this);
    });
  }, triggerHandler:function(a, b) {
    var c = this[0];
    if (c) {
      return d.event.trigger(a, b, c, !0);
    }
  }});
  var tc = / jQuery\d+="(?:null|\d+)"/g, Lb = /<(?:abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video)[\s/>]/i, uc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, vc = /<script|<style|<link/i, dc = /checked\s*(?:[^=]|=\s*.checked.)/i, cc = /^true\/(.*)/, ec = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Wa = F(w).appendChild(w.createElement("div"));
  d.extend({htmlPrefilter:function(a) {
    return a.replace(uc, "<$1></$2>");
  }, clone:function(a, b, c) {
    var g, e, h, k, n, p = d.contains(a.ownerDocument, a);
    u.html5Clone || d.isXMLDoc(a) || !Lb.test("<" + a.nodeName + ">") ? h = a.cloneNode(!0) : (Wa.innerHTML = a.outerHTML, Wa.removeChild(h = Wa.firstChild));
    if (!(u.noCloneEvent && u.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || d.isXMLDoc(a))) {
      for (g = E(h), n = E(a), k = 0;null != (e = n[k]);++k) {
        if (g[k]) {
          var q = g[k], v = void 0, t = void 0, w = void 0;
          if (1 === q.nodeType) {
            v = q.nodeName.toLowerCase();
            if (!u.noCloneEvent && q[d.expando]) {
              w = d._data(q);
              for (t in w.events) {
                d.removeEvent(q, t, w.handle);
              }
              q.removeAttribute(d.expando);
            }
            if ("script" === v && q.text !== e.text) {
              kb(q).text = e.text, lb(q);
            } else {
              if ("object" === v) {
                q.parentNode && (q.outerHTML = e.outerHTML), u.html5Clone && e.innerHTML && !d.trim(q.innerHTML) && (q.innerHTML = e.innerHTML);
              } else {
                if ("input" === v && Ka.test(e.type)) {
                  q.defaultChecked = q.checked = e.checked, q.value !== e.value && (q.value = e.value);
                } else {
                  if ("option" === v) {
                    q.defaultSelected = q.selected = e.defaultSelected;
                  } else {
                    if ("input" === v || "textarea" === v) {
                      q.defaultValue = e.defaultValue;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (b) {
      if (c) {
        for (n = n || E(a), g = g || E(h), k = 0;null != (e = n[k]);k++) {
          mb(e, g[k]);
        }
      } else {
        mb(a, h);
      }
    }
    g = E(h, "script");
    0 < g.length && Ja(g, !p && E(a, "script"));
    return h;
  }, cleanData:function(a, b) {
    for (var c, g, e, h, k = 0, n = d.expando, p = d.cache, q = u.attributes, v = d.event.special;null != (c = a[k]);k++) {
      if (b || ra(c)) {
        if (h = (e = c[n]) && p[e]) {
          if (h.events) {
            for (g in h.events) {
              v[g] ? d.event.remove(c, g) : d.removeEvent(c, g, h.handle);
            }
          }
          p[e] && (delete p[e], q || "undefined" === typeof c.removeAttribute ? c[n] = void 0 : c.removeAttribute(n), T.push(e));
        }
      }
    }
  }});
  d.fn.extend({domManip:ca, detach:function(a) {
    return ob(this, a, !0);
  }, remove:function(a) {
    return ob(this, a);
  }, text:function(a) {
    return ba(this, function(a) {
      return void 0 === a ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || w).createTextNode(a));
    }, null, a, arguments.length);
  }, append:function() {
    return ca(this, arguments, function(a) {
      1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || jb(this, a).appendChild(a);
    });
  }, prepend:function() {
    return ca(this, arguments, function(a) {
      if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
        var b = jb(this, a);
        b.insertBefore(a, b.firstChild);
      }
    });
  }, before:function() {
    return ca(this, arguments, function(a) {
      this.parentNode && this.parentNode.insertBefore(a, this);
    });
  }, after:function() {
    return ca(this, arguments, function(a) {
      this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
    });
  }, empty:function() {
    for (var a, b = 0;null != (a = this[b]);b++) {
      for (1 === a.nodeType && d.cleanData(E(a, !1));a.firstChild;) {
        a.removeChild(a.firstChild);
      }
      a.options && d.nodeName(a, "select") && (a.options.length = 0);
    }
    return this;
  }, clone:function(a, b) {
    a = null == a ? !1 : a;
    b = null == b ? a : b;
    return this.map(function() {
      return d.clone(this, a, b);
    });
  }, html:function(a) {
    return ba(this, function(a) {
      var b = this[0] || {}, c = 0, g = this.length;
      if (void 0 === a) {
        return 1 === b.nodeType ? b.innerHTML.replace(tc, "") : void 0;
      }
      if (!("string" !== typeof a || vc.test(a) || !u.htmlSerialize && Lb.test(a) || !u.leadingWhitespace && La.test(a) || O[(fb.exec(a) || ["", ""])[1].toLowerCase()])) {
        a = d.htmlPrefilter(a);
        try {
          for (;c < g;c++) {
            b = this[c] || {}, 1 === b.nodeType && (d.cleanData(E(b, !1)), b.innerHTML = a);
          }
          b = 0;
        } catch (e) {
        }
      }
      b && this.empty().append(a);
    }, null, a, arguments.length);
  }, replaceWith:function() {
    var a = [];
    return ca(this, arguments, function(b) {
      var c = this.parentNode;
      0 > d.inArray(this, a) && (d.cleanData(E(this)), c && c.replaceChild(b, this));
    }, a);
  }});
  d.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(a, b) {
    d.fn[a] = function(a) {
      for (var c = 0, g = [], e = d(a), h = e.length - 1;c <= h;c++) {
        a = c === h ? this : this.clone(!0), d(e[c])[b](a), Sa.apply(g, a.get());
      }
      return this.pushStack(g);
    };
  });
  var sa, qb = {HTML:"block", BODY:"block"}, Mb = /^margin/, xa = new RegExp("^(" + Ua + ")(?!px)[a-z%]+$", "i"), Xa = function(a, b, d, c) {
    var g, e = {};
    for (g in b) {
      e[g] = a.style[g], a.style[g] = b[g];
    }
    d = d.apply(a, c || []);
    for (g in b) {
      a.style[g] = e[g];
    }
    return d;
  }, Nb = w.documentElement;
  (function() {
    function a() {
      var a, d = w.documentElement;
      d.appendChild(n);
      p.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
      f = g = k = !1;
      c = h = !0;
      b.getComputedStyle && (a = b.getComputedStyle(p), f = "1%" !== (a || {}).top, k = "2px" === (a || {}).marginLeft, g = "4px" === (a || {width:"4px"}).width, p.style.marginRight = "50%", c = "4px" === (a || {marginRight:"4px"}).marginRight, a = p.appendChild(w.createElement("div")), a.style.cssText = p.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", p.style.width = 
      "1px", h = !parseFloat((b.getComputedStyle(a) || {}).marginRight), p.removeChild(a));
      p.style.display = "none";
      if (e = 0 === p.getClientRects().length) {
        if (p.style.display = "", p.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = p.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", e = 0 === a[0].offsetHeight) {
          a[0].style.display = "", a[1].style.display = "none", e = 0 === a[0].offsetHeight;
        }
      }
      d.removeChild(n);
    }
    var f, c, g, e, h, k, n = w.createElement("div"), p = w.createElement("div");
    p.style && (p.style.cssText = "float:left;opacity:.5", u.opacity = "0.5" === p.style.opacity, u.cssFloat = !!p.style.cssFloat, p.style.backgroundClip = "content-box", p.cloneNode(!0).style.backgroundClip = "", u.clearCloneStyle = "content-box" === p.style.backgroundClip, n = w.createElement("div"), n.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", p.innerHTML = "", n.appendChild(p), u.boxSizing = "" === p.style.boxSizing || "" === p.style.MozBoxSizing || 
    "" === p.style.WebkitBoxSizing, d.extend(u, {reliableHiddenOffsets:function() {
      null == f && a();
      return e;
    }, boxSizingReliable:function() {
      null == f && a();
      return g;
    }, pixelMarginRight:function() {
      null == f && a();
      return c;
    }, pixelPosition:function() {
      null == f && a();
      return f;
    }, reliableMarginRight:function() {
      null == f && a();
      return h;
    }, reliableMarginLeft:function() {
      null == f && a();
      return k;
    }}));
  })();
  var Z, Q, wc = /^(top|right|bottom|left)$/;
  b.getComputedStyle ? (Z = function(a) {
    var f = a.ownerDocument.defaultView;
    f && f.opener || (f = b);
    return f.getComputedStyle(a);
  }, Q = function(a, b, c) {
    var g, e, h = a.style;
    e = (c = c || Z(a)) ? c.getPropertyValue(b) || c[b] : void 0;
    "" !== e && void 0 !== e || d.contains(a.ownerDocument, a) || (e = d.style(a, b));
    c && !u.pixelMarginRight() && xa.test(e) && Mb.test(b) && (a = h.width, b = h.minWidth, g = h.maxWidth, h.minWidth = h.maxWidth = h.width = e, e = c.width, h.width = a, h.minWidth = b, h.maxWidth = g);
    return void 0 === e ? e : e + "";
  }) : Nb.currentStyle && (Z = function(a) {
    return a.currentStyle;
  }, Q = function(a, b, d) {
    var c, g, e, h = a.style;
    e = (d = d || Z(a)) ? d[b] : void 0;
    null == e && h && h[b] && (e = h[b]);
    if (xa.test(e) && !wc.test(b)) {
      d = h.left;
      if (g = (c = a.runtimeStyle) && c.left) {
        c.left = a.currentStyle.left;
      }
      h.left = "fontSize" === b ? "1em" : e;
      e = h.pixelLeft + "px";
      h.left = d;
      g && (c.left = g);
    }
    return void 0 === e ? e : e + "" || "auto";
  });
  var Ya = /alpha\([^)]*\)/i, xc = /opacity\s*=\s*([^)]*)/i, yc = /^(none|table(?!-c[ea]).+)/, fc = new RegExp("^(" + Ua + ")(.*)$", "i"), zc = {position:"absolute", visibility:"hidden", display:"block"}, Ob = {letterSpacing:"0", fontWeight:"400"}, tb = ["Webkit", "O", "Moz", "ms"], sb = w.createElement("div").style;
  d.extend({cssHooks:{opacity:{get:function(a, b) {
    if (b) {
      var d = Q(a, "opacity");
      return "" === d ? "1" : d;
    }
  }}}, cssNumber:{animationIterationCount:!0, columnCount:!0, fillOpacity:!0, flexGrow:!0, flexShrink:!0, fontWeight:!0, lineHeight:!0, opacity:!0, order:!0, orphans:!0, widows:!0, zIndex:!0, zoom:!0}, cssProps:{"float":u.cssFloat ? "cssFloat" : "styleFloat"}, style:function(a, b, c, g) {
    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
      var e, h, k, p = d.camelCase(b), n = a.style;
      b = d.cssProps[p] || (d.cssProps[p] = rb(p) || p);
      k = d.cssHooks[b] || d.cssHooks[p];
      if (void 0 !== c) {
        if (h = typeof c, "string" === h && (e = Ia.exec(c)) && e[1] && (c = ia(a, b, e), h = "number"), null != c && c === c && ("number" === h && (c += e && e[3] || (d.cssNumber[p] ? "" : "px")), u.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (n[b] = "inherit"), !(k && "set" in k) || void 0 !== (c = k.set(a, c, g)))) {
          try {
            n[b] = c;
          } catch (q) {
          }
        }
      } else {
        return k && "get" in k && void 0 !== (e = k.get(a, !1, g)) ? e : n[b];
      }
    }
  }, css:function(a, b, c, g) {
    var e, h;
    h = d.camelCase(b);
    b = d.cssProps[h] || (d.cssProps[h] = rb(h) || h);
    (h = d.cssHooks[b] || d.cssHooks[h]) && "get" in h && (e = h.get(a, !0, c));
    void 0 === e && (e = Q(a, b, g));
    "normal" === e && b in Ob && (e = Ob[b]);
    return "" === c || c ? (a = parseFloat(e), !0 === c || isFinite(a) ? a || 0 : e) : e;
  }});
  d.each(["height", "width"], function(a, b) {
    d.cssHooks[b] = {get:function(a, c, g) {
      if (c) {
        return yc.test(d.css(a, "display")) && 0 === a.offsetWidth ? Xa(a, zc, function() {
          return xb(a, b, g);
        }) : xb(a, b, g);
      }
    }, set:function(a, c, g) {
      var e = g && Z(a);
      return vb(a, c, g ? wb(a, b, g, u.boxSizing && "border-box" === d.css(a, "boxSizing", !1, e), e) : 0);
    }};
  });
  u.opacity || (d.cssHooks.opacity = {get:function(a, b) {
    return xc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
  }, set:function(a, b) {
    var c = a.style, g = a.currentStyle, e = d.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", h = g && g.filter || c.filter || "";
    c.zoom = 1;
    if ((1 <= b || "" === b) && "" === d.trim(h.replace(Ya, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || g && !g.filter)) {
      return;
    }
    c.filter = Ya.test(h) ? h.replace(Ya, e) : h + " " + e;
  }});
  d.cssHooks.marginRight = Na(u.reliableMarginRight, function(a, b) {
    if (b) {
      return Xa(a, {display:"inline-block"}, Q, [a, "marginRight"]);
    }
  });
  d.cssHooks.marginLeft = Na(u.reliableMarginLeft, function(a, b) {
    if (b) {
      return (parseFloat(Q(a, "marginLeft")) || (d.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Xa(a, {marginLeft:0}, function() {
        return a.getBoundingClientRect().left;
      }) : 0)) + "px";
    }
  });
  d.each({margin:"", padding:"", border:"Width"}, function(a, b) {
    d.cssHooks[a + b] = {expand:function(d) {
      var c = 0, g = {};
      for (d = "string" === typeof d ? d.split(" ") : [d];4 > c;c++) {
        g[a + da[c] + b] = d[c] || d[c - 2] || d[0];
      }
      return g;
    }};
    Mb.test(a) || (d.cssHooks[a + b].set = vb);
  });
  d.fn.extend({css:function(a, b) {
    return ba(this, function(a, b, f) {
      var c, g = {}, e = 0;
      if (d.isArray(b)) {
        f = Z(a);
        for (c = b.length;e < c;e++) {
          g[b[e]] = d.css(a, b[e], !1, f);
        }
        return g;
      }
      return void 0 !== f ? d.style(a, b, f) : d.css(a, b);
    }, a, b, 1 < arguments.length);
  }, show:function() {
    return ub(this, !0);
  }, hide:function() {
    return ub(this);
  }, toggle:function(a) {
    return "boolean" === typeof a ? a ? this.show() : this.hide() : this.each(function() {
      V(this) ? d(this).show() : d(this).hide();
    });
  }});
  d.Tween = I;
  I.prototype = {constructor:I, init:function(a, b, c, g, e, h) {
    this.elem = a;
    this.prop = c;
    this.easing = e || d.easing._default;
    this.options = b;
    this.start = this.now = this.cur();
    this.end = g;
    this.unit = h || (d.cssNumber[c] ? "" : "px");
  }, cur:function() {
    var a = I.propHooks[this.prop];
    return a && a.get ? a.get(this) : I.propHooks._default.get(this);
  }, run:function(a) {
    var b, c = I.propHooks[this.prop];
    this.pos = this.options.duration ? b = d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : b = a;
    this.now = (this.end - this.start) * b + this.start;
    this.options.step && this.options.step.call(this.elem, this.now, this);
    c && c.set ? c.set(this) : I.propHooks._default.set(this);
    return this;
  }};
  I.prototype.init.prototype = I.prototype;
  I.propHooks = {_default:{get:function(a) {
    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (a = d.css(a.elem, a.prop, "")) && "auto" !== a ? a : 0;
  }, set:function(a) {
    if (d.fx.step[a.prop]) {
      d.fx.step[a.prop](a);
    } else {
      1 !== a.elem.nodeType || null == a.elem.style[d.cssProps[a.prop]] && !d.cssHooks[a.prop] ? a.elem[a.prop] = a.now : d.style(a.elem, a.prop, a.now + a.unit);
    }
  }}};
  I.propHooks.scrollTop = I.propHooks.scrollLeft = {set:function(a) {
    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
  }};
  d.easing = {linear:function(a) {
    return a;
  }, swing:function(a) {
    return .5 - Math.cos(a * Math.PI) / 2;
  }, _default:"swing"};
  d.fx = I.prototype.init;
  d.fx.step = {};
  var ka, Ea, Ac = /^(?:toggle|show|hide)$/, Bc = /queueHooks$/;
  d.Animation = d.extend(G, {tweeners:{"*":[function(a, b) {
    var d = this.createTween(a, b);
    ia(d.elem, a, Ia.exec(b), d);
    return d;
  }]}, tweener:function(a, b) {
    d.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(K);
    for (var c, g = 0, e = a.length;g < e;g++) {
      c = a[g], G.tweeners[c] = G.tweeners[c] || [], G.tweeners[c].unshift(b);
    }
  }, prefilters:[function(a, b, c) {
    var g, e, h, k, p, n, q = this, v = {}, t = a.style, w = a.nodeType && V(a), z = d._data(a, "fxshow");
    c.queue || (k = d._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, p = k.empty.fire, k.empty.fire = function() {
      k.unqueued || p();
    }), k.unqueued++, q.always(function() {
      q.always(function() {
        k.unqueued--;
        d.queue(a, "fx").length || k.empty.fire();
      });
    }));
    1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [t.overflow, t.overflowX, t.overflowY], n = d.css(a, "display"), e = "none" === n ? d._data(a, "olddisplay") || ja(a.nodeName) : n, "inline" === e && "none" === d.css(a, "float") && (u.inlineBlockNeedsLayout && "inline" !== ja(a.nodeName) ? t.zoom = 1 : t.display = "inline-block"));
    c.overflow && (t.overflow = "hidden", u.shrinkWrapBlocks() || q.always(function() {
      t.overflow = c.overflow[0];
      t.overflowX = c.overflow[1];
      t.overflowY = c.overflow[2];
    }));
    for (g in b) {
      if (e = b[g], Ac.exec(e)) {
        delete b[g];
        h = h || "toggle" === e;
        if (e === (w ? "hide" : "show")) {
          if ("show" === e && z && void 0 !== z[g]) {
            w = !0;
          } else {
            continue;
          }
        }
        v[g] = z && z[g] || d.style(a, g);
      } else {
        n = void 0;
      }
    }
    if (d.isEmptyObject(v)) {
      "inline" === ("none" === n ? ja(a.nodeName) : n) && (t.display = n);
    } else {
      for (g in z ? "hidden" in z && (w = z.hidden) : z = d._data(a, "fxshow", {}), h && (z.hidden = !w), w ? d(a).show() : q.done(function() {
        d(a).hide();
      }), q.done(function() {
        var b;
        d._removeData(a, "fxshow");
        for (b in v) {
          d.style(a, b, v[b]);
        }
      }), v) {
        b = zb(w ? z[g] : 0, g, q), g in z || (z[g] = b.start, w && (b.end = b.start, b.start = "width" === g || "height" === g ? 1 : 0));
      }
    }
  }], prefilter:function(a, b) {
    b ? G.prefilters.unshift(a) : G.prefilters.push(a);
  }});
  d.speed = function(a, b, c) {
    var g = a && "object" === typeof a ? d.extend({}, a) : {complete:c || !c && b || d.isFunction(a) && a, duration:a, easing:c && b || b && !d.isFunction(b) && b};
    g.duration = d.fx.off ? 0 : "number" === typeof g.duration ? g.duration : g.duration in d.fx.speeds ? d.fx.speeds[g.duration] : d.fx.speeds._default;
    if (null == g.queue || !0 === g.queue) {
      g.queue = "fx";
    }
    g.old = g.complete;
    g.complete = function() {
      d.isFunction(g.old) && g.old.call(this);
      g.queue && d.dequeue(this, g.queue);
    };
    return g;
  };
  d.fn.extend({fadeTo:function(a, b, d, c) {
    return this.filter(V).css("opacity", 0).show().end().animate({opacity:b}, a, d, c);
  }, animate:function(a, b, c, g) {
    var e = d.isEmptyObject(a), h = d.speed(b, c, g);
    b = function() {
      var b = G(this, d.extend({}, a), h);
      (e || d._data(this, "finish")) && b.stop(!0);
    };
    b.finish = b;
    return e || !1 === h.queue ? this.each(b) : this.queue(h.queue, b);
  }, stop:function(a, b, c) {
    var g = function(a) {
      var b = a.stop;
      delete a.stop;
      b(c);
    };
    "string" !== typeof a && (c = b, b = a, a = void 0);
    b && !1 !== a && this.queue(a || "fx", []);
    return this.each(function() {
      var b = !0, f = null != a && a + "queueHooks", e = d.timers, h = d._data(this);
      if (f) {
        h[f] && h[f].stop && g(h[f]);
      } else {
        for (f in h) {
          h[f] && h[f].stop && Bc.test(f) && g(h[f]);
        }
      }
      for (f = e.length;f--;) {
        e[f].elem !== this || null != a && e[f].queue !== a || (e[f].anim.stop(c), b = !1, e.splice(f, 1));
      }
      !b && c || d.dequeue(this, a);
    });
  }, finish:function(a) {
    !1 !== a && (a = a || "fx");
    return this.each(function() {
      var b, c = d._data(this), g = c[a + "queue"];
      b = c[a + "queueHooks"];
      var e = d.timers, h = g ? g.length : 0;
      c.finish = !0;
      d.queue(this, a, []);
      b && b.stop && b.stop.call(this, !0);
      for (b = e.length;b--;) {
        e[b].elem === this && e[b].queue === a && (e[b].anim.stop(!0), e.splice(b, 1));
      }
      for (b = 0;b < h;b++) {
        g[b] && g[b].finish && g[b].finish.call(this);
      }
      delete c.finish;
    });
  }});
  d.each(["toggle", "show", "hide"], function(a, b) {
    var c = d.fn[b];
    d.fn[b] = function(a, d, g) {
      return null == a || "boolean" === typeof a ? c.apply(this, arguments) : this.animate(ta(b, !0), a, d, g);
    };
  });
  d.each({slideDown:ta("show"), slideUp:ta("hide"), slideToggle:ta("toggle"), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function(a, b) {
    d.fn[a] = function(a, d, c) {
      return this.animate(b, a, d, c);
    };
  });
  d.timers = [];
  d.fx.tick = function() {
    var a, b = d.timers, c = 0;
    for (ka = d.now();c < b.length;c++) {
      a = b[c], a() || b[c] !== a || b.splice(c--, 1);
    }
    b.length || d.fx.stop();
    ka = void 0;
  };
  d.fx.timer = function(a) {
    d.timers.push(a);
    a() ? d.fx.start() : d.timers.pop();
  };
  d.fx.interval = 13;
  d.fx.start = function() {
    Ea || (Ea = b.setInterval(d.fx.tick, d.fx.interval));
  };
  d.fx.stop = function() {
    b.clearInterval(Ea);
    Ea = null;
  };
  d.fx.speeds = {slow:600, fast:200, _default:400};
  d.fn.delay = function(a, f) {
    a = d.fx ? d.fx.speeds[a] || a : a;
    return this.queue(f || "fx", function(f, d) {
      var c = b.setTimeout(f, a);
      d.stop = function() {
        b.clearTimeout(c);
      };
    });
  };
  (function() {
    var a, b = w.createElement("input"), d = w.createElement("div"), c = w.createElement("select"), g = c.appendChild(w.createElement("option")), d = w.createElement("div");
    d.setAttribute("className", "t");
    d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    d.getElementsByTagName("a");
    b.setAttribute("type", "checkbox");
    d.appendChild(b);
    a = d.getElementsByTagName("a")[0];
    a.style.cssText = "top:1px";
    u.getSetAttribute = "t" !== d.className;
    u.style = /top/.test(a.getAttribute("style"));
    u.hrefNormalized = "/a" === a.getAttribute("href");
    u.checkOn = !!b.value;
    u.optSelected = g.selected;
    u.enctype = !!w.createElement("form").enctype;
    c.disabled = !0;
    u.optDisabled = !g.disabled;
    b = w.createElement("input");
    b.setAttribute("value", "");
    u.input = "" === b.getAttribute("value");
    b.value = "t";
    b.setAttribute("type", "radio");
    u.radioValue = "t" === b.value;
  })();
  var Cc = /\r/g, Dc = /[\x20\t\r\n\f]+/g;
  d.fn.extend({val:function(a) {
    var b, c, g, e = this[0];
    if (arguments.length) {
      return g = d.isFunction(a), this.each(function(c) {
        1 === this.nodeType && (c = g ? a.call(this, c, d(this).val()) : a, null == c ? c = "" : "number" === typeof c ? c += "" : d.isArray(c) && (c = d.map(c, function(a) {
          return null == a ? "" : a + "";
        })), b = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, c, "value") || (this.value = c));
      });
    }
    if (e) {
      if ((b = d.valHooks[e.type] || d.valHooks[e.nodeName.toLowerCase()]) && "get" in b && void 0 !== (c = b.get(e, "value"))) {
        return c;
      }
      c = e.value;
      return "string" === typeof c ? c.replace(Cc, "") : null == c ? "" : c;
    }
  }});
  d.extend({valHooks:{option:{get:function(a) {
    var b = d.find.attr(a, "value");
    return null != b ? b : d.trim(d.text(a)).replace(Dc, " ");
  }}, select:{get:function(a) {
    for (var b, c = a.options, g = a.selectedIndex, e = (a = "select-one" === a.type || 0 > g) ? null : [], h = a ? g + 1 : c.length, k = 0 > g ? h : a ? g : 0;k < h;k++) {
      if (b = c[k], !(!b.selected && k !== g || (u.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && d.nodeName(b.parentNode, "optgroup"))) {
        b = d(b).val();
        if (a) {
          return b;
        }
        e.push(b);
      }
    }
    return e;
  }, set:function(a, b) {
    for (var c, g, e = a.options, h = d.makeArray(b), k = e.length;k--;) {
      if (g = e[k], -1 < d.inArray(d.valHooks.option.get(g), h)) {
        try {
          g.selected = c = !0;
        } catch (p) {
          g.scrollHeight;
        }
      } else {
        g.selected = !1;
      }
    }
    c || (a.selectedIndex = -1);
    return e;
  }}}});
  d.each(["radio", "checkbox"], function() {
    d.valHooks[this] = {set:function(a, b) {
      if (d.isArray(b)) {
        return a.checked = -1 < d.inArray(d(a).val(), b);
      }
    }};
    u.checkOn || (d.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });
  var ga, Pb, S = d.expr.attrHandle, Za = /^(?:checked|selected)$/i, ha = u.getSetAttribute, Fa = u.input;
  d.fn.extend({attr:function(a, b) {
    return ba(this, d.attr, a, b, 1 < arguments.length);
  }, removeAttr:function(a) {
    return this.each(function() {
      d.removeAttr(this, a);
    });
  }});
  d.extend({attr:function(a, b, c) {
    var g, e, h = a.nodeType;
    if (3 !== h && 8 !== h && 2 !== h) {
      if ("undefined" === typeof a.getAttribute) {
        return d.prop(a, b, c);
      }
      1 === h && d.isXMLDoc(a) || (b = b.toLowerCase(), e = d.attrHooks[b] || (d.expr.match.bool.test(b) ? Pb : ga));
      if (void 0 !== c) {
        if (null === c) {
          d.removeAttr(a, b);
          return;
        }
        if (e && "set" in e && void 0 !== (g = e.set(a, c, b))) {
          return g;
        }
        a.setAttribute(b, c + "");
        return c;
      }
      if (e && "get" in e && null !== (g = e.get(a, b))) {
        return g;
      }
      g = d.find.attr(a, b);
      return null == g ? void 0 : g;
    }
  }, attrHooks:{type:{set:function(a, b) {
    if (!u.radioValue && "radio" === b && d.nodeName(a, "input")) {
      var c = a.value;
      a.setAttribute("type", b);
      c && (a.value = c);
      return b;
    }
  }}}, removeAttr:function(a, b) {
    var c, g, e = 0, h = b && b.match(K);
    if (h && 1 === a.nodeType) {
      for (;c = h[e++];) {
        g = d.propFix[c] || c, d.expr.match.bool.test(c) ? Fa && ha || !Za.test(c) ? a[g] = !1 : a[d.camelCase("default-" + c)] = a[g] = !1 : d.attr(a, c, ""), a.removeAttribute(ha ? c : g);
      }
    }
  }});
  Pb = {set:function(a, b, c) {
    !1 === b ? d.removeAttr(a, c) : Fa && ha || !Za.test(c) ? a.setAttribute(!ha && d.propFix[c] || c, c) : a[d.camelCase("default-" + c)] = a[c] = !0;
    return c;
  }};
  d.each(d.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = S[b] || d.find.attr;
    Fa && ha || !Za.test(b) ? S[b] = function(a, b, d) {
      var f, g;
      d || (g = S[b], S[b] = f, f = null != c(a, b, d) ? b.toLowerCase() : null, S[b] = g);
      return f;
    } : S[b] = function(a, b, c) {
      if (!c) {
        return a[d.camelCase("default-" + b)] ? b.toLowerCase() : null;
      }
    };
  });
  Fa && ha || (d.attrHooks.value = {set:function(a, b, c) {
    if (d.nodeName(a, "input")) {
      a.defaultValue = b;
    } else {
      return ga && ga.set(a, b, c);
    }
  }});
  ha || (ga = {set:function(a, b, d) {
    var c = a.getAttributeNode(d);
    c || a.setAttributeNode(c = a.ownerDocument.createAttribute(d));
    c.value = b += "";
    if ("value" === d || b === a.getAttribute(d)) {
      return b;
    }
  }}, S.id = S.name = S.coords = function(a, b, d) {
    var c;
    if (!d) {
      return (c = a.getAttributeNode(b)) && "" !== c.value ? c.value : null;
    }
  }, d.valHooks.button = {get:function(a, b) {
    var d = a.getAttributeNode(b);
    if (d && d.specified) {
      return d.value;
    }
  }, set:ga.set}, d.attrHooks.contenteditable = {set:function(a, b, d) {
    ga.set(a, "" === b ? !1 : b, d);
  }}, d.each(["width", "height"], function(a, b) {
    d.attrHooks[b] = {set:function(a, d) {
      if ("" === d) {
        return a.setAttribute(b, "auto"), d;
      }
    }};
  }));
  u.style || (d.attrHooks.style = {get:function(a) {
    return a.style.cssText || void 0;
  }, set:function(a, b) {
    return a.style.cssText = b + "";
  }});
  var Ec = /^(?:input|select|textarea|button|object)$/i, Fc = /^(?:a|area)$/i;
  d.fn.extend({prop:function(a, b) {
    return ba(this, d.prop, a, b, 1 < arguments.length);
  }, removeProp:function(a) {
    a = d.propFix[a] || a;
    return this.each(function() {
      try {
        this[a] = void 0, delete this[a];
      } catch (b) {
      }
    });
  }});
  d.extend({prop:function(a, b, c) {
    var g, e, h = a.nodeType;
    if (3 !== h && 8 !== h && 2 !== h) {
      return 1 === h && d.isXMLDoc(a) || (b = d.propFix[b] || b, e = d.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (g = e.set(a, c, b)) ? g : a[b] = c : e && "get" in e && null !== (g = e.get(a, b)) ? g : a[b];
    }
  }, propHooks:{tabIndex:{get:function(a) {
    var b = d.find.attr(a, "tabindex");
    return b ? parseInt(b, 10) : Ec.test(a.nodeName) || Fc.test(a.nodeName) && a.href ? 0 : -1;
  }}}, propFix:{"for":"htmlFor", "class":"className"}});
  u.hrefNormalized || d.each(["href", "src"], function(a, b) {
    d.propHooks[b] = {get:function(a) {
      return a.getAttribute(b, 4);
    }};
  });
  u.optSelected || (d.propHooks.selected = {get:function(a) {
    if (a = a.parentNode) {
      a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
    }
    return null;
  }, set:function(a) {
    if (a = a.parentNode) {
      a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
    }
  }});
  d.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
    d.propFix[this.toLowerCase()] = this;
  });
  u.enctype || (d.propFix.enctype = "encoding");
  var $a = /[\t\r\n\f]/g;
  d.fn.extend({addClass:function(a) {
    var b, c, g, e, h, k, p = 0;
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).addClass(a.call(this, b, P(this)));
      });
    }
    if ("string" === typeof a && a) {
      for (b = a.match(K) || [];c = this[p++];) {
        if (e = P(c), g = 1 === c.nodeType && (" " + e + " ").replace($a, " ")) {
          for (k = 0;h = b[k++];) {
            0 > g.indexOf(" " + h + " ") && (g += h + " ");
          }
          g = d.trim(g);
          e !== g && d.attr(c, "class", g);
        }
      }
    }
    return this;
  }, removeClass:function(a) {
    var b, c, g, e, h, k, p = 0;
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).removeClass(a.call(this, b, P(this)));
      });
    }
    if (!arguments.length) {
      return this.attr("class", "");
    }
    if ("string" === typeof a && a) {
      for (b = a.match(K) || [];c = this[p++];) {
        if (e = P(c), g = 1 === c.nodeType && (" " + e + " ").replace($a, " ")) {
          for (k = 0;h = b[k++];) {
            for (;-1 < g.indexOf(" " + h + " ");) {
              g = g.replace(" " + h + " ", " ");
            }
          }
          g = d.trim(g);
          e !== g && d.attr(c, "class", g);
        }
      }
    }
    return this;
  }, toggleClass:function(a, b) {
    var c = typeof a;
    return "boolean" === typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : d.isFunction(a) ? this.each(function(c) {
      d(this).toggleClass(a.call(this, c, P(this), b), b);
    }) : this.each(function() {
      var b, f, g, e;
      if ("string" === c) {
        for (f = 0, g = d(this), e = a.match(K) || [];b = e[f++];) {
          g.hasClass(b) ? g.removeClass(b) : g.addClass(b);
        }
      } else {
        if (void 0 === a || "boolean" === c) {
          (b = P(this)) && d._data(this, "__className__", b), d.attr(this, "class", b || !1 === a ? "" : d._data(this, "__className__") || "");
        }
      }
    });
  }, hasClass:function(a) {
    var b, d = 0;
    for (a = " " + a + " ";b = this[d++];) {
      if (1 === b.nodeType && -1 < (" " + P(b) + " ").replace($a, " ").indexOf(a)) {
        return !0;
      }
    }
    return !1;
  }});
  d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    d.fn[b] = function(a, d) {
      return 0 < arguments.length ? this.on(b, null, a, d) : this.trigger(b);
    };
  });
  d.fn.extend({hover:function(a, b) {
    return this.mouseenter(a).mouseleave(b || a);
  }});
  var Gc = b.location, ab = d.now(), bb = /\?/, Hc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  d.parseJSON = function(a) {
    if (b.JSON && b.JSON.parse) {
      return b.JSON.parse(a + "");
    }
    var c, g = null, e = d.trim(a + "");
    return e && !d.trim(e.replace(Hc, function(a, b, d, e) {
      c && b && (g = 0);
      if (0 === g) {
        return a;
      }
      c = d || b;
      g += !e - !d;
      return "";
    })) ? Function("return " + e)() : d.error("Invalid JSON: " + a);
  };
  d.parseXML = function(a) {
    var c, g;
    if (!a || "string" !== typeof a) {
      return null;
    }
    try {
      b.DOMParser ? (g = new b.DOMParser, c = g.parseFromString(a, "text/xml")) : (c = new b.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a));
    } catch (e) {
      c = void 0;
    }
    c && c.documentElement && !c.getElementsByTagName("parsererror").length || d.error("Invalid XML: " + a);
    return c;
  };
  var Ic = /#.*$/, Qb = /([?&])_=[^&]*/, Jc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Kc = /^(?:GET|HEAD)$/, Lc = /^\/\//, Rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Sb = {}, Oa = {}, Tb = "*/".concat("*"), cb = Gc.href, X = Rb.exec(cb.toLowerCase()) || [];
  d.extend({active:0, lastModified:{}, etag:{}, ajaxSettings:{url:cb, type:"GET", isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(X[1]), global:!0, processData:!0, async:!0, contentType:"application/x-www-form-urlencoded; charset=UTF-8", accepts:{"*":Tb, text:"text/plain", html:"text/html", xml:"application/xml, text/xml", json:"application/json, text/javascript"}, contents:{xml:/\bxml\b/, html:/\bhtml/, json:/\bjson\b/}, responseFields:{xml:"responseXML", text:"responseText", 
  json:"responseJSON"}, converters:{"* text":String, "text html":!0, "text json":d.parseJSON, "text xml":d.parseXML}, flatOptions:{url:!0, context:!0}}, ajaxSetup:function(a, b) {
    return b ? Pa(Pa(a, d.ajaxSettings), b) : Pa(d.ajaxSettings, a);
  }, ajaxPrefilter:Ab(Sb), ajaxTransport:Ab(Oa), ajax:function(a, c) {
    function g(a, c, f, e) {
      var h, m, l, r;
      r = c;
      if (2 !== N) {
        N = 2;
        n && b.clearTimeout(n);
        v = void 0;
        p = e || "";
        y.readyState = 0 < a ? 4 : 0;
        e = 200 <= a && 300 > a || 304 === a;
        if (f) {
          l = t;
          for (var u = y, A, D, J, B, G = l.contents, F = l.dataTypes;"*" === F[0];) {
            F.shift(), void 0 === D && (D = l.mimeType || u.getResponseHeader("Content-Type"));
          }
          if (D) {
            for (B in G) {
              if (G[B] && G[B].test(D)) {
                F.unshift(B);
                break;
              }
            }
          }
          if (F[0] in f) {
            J = F[0];
          } else {
            for (B in f) {
              if (!F[0] || l.converters[B + " " + F[0]]) {
                J = B;
                break;
              }
              A || (A = B);
            }
            J = J || A;
          }
          J ? (J !== F[0] && F.unshift(J), l = f[J]) : l = void 0;
        }
        a: {
          f = t;
          A = l;
          D = y;
          J = e;
          var K, C, L, u = {}, G = f.dataTypes.slice();
          if (G[1]) {
            for (C in f.converters) {
              u[C.toLowerCase()] = f.converters[C];
            }
          }
          for (B = G.shift();B;) {
            if (f.responseFields[B] && (D[f.responseFields[B]] = A), !L && J && f.dataFilter && (A = f.dataFilter(A, f.dataType)), L = B, B = G.shift()) {
              if ("*" === B) {
                B = L;
              } else {
                if ("*" !== L && L !== B) {
                  C = u[L + " " + B] || u["* " + B];
                  if (!C) {
                    for (K in u) {
                      if (l = K.split(" "), l[1] === B && (C = u[L + " " + l[0]] || u["* " + l[0]])) {
                        !0 === C ? C = u[K] : !0 !== u[K] && (B = l[0], G.unshift(l[1]));
                        break;
                      }
                    }
                  }
                  if (!0 !== C) {
                    if (C && f["throws"]) {
                      A = C(A);
                    } else {
                      try {
                        A = C(A);
                      } catch (O) {
                        l = {state:"parsererror", error:C ? O : "No conversion from " + L + " to " + B};
                        break a;
                      }
                    }
                  }
                }
              }
            }
          }
          l = {state:"success", data:A};
        }
        if (e) {
          t.ifModified && ((r = y.getResponseHeader("Last-Modified")) && (d.lastModified[k] = r), (r = y.getResponseHeader("etag")) && (d.etag[k] = r)), 204 === a || "HEAD" === t.type ? r = "nocontent" : 304 === a ? r = "notmodified" : (r = l.state, h = l.data, m = l.error, e = !m);
        } else {
          if (m = r, a || !r) {
            r = "error", 0 > a && (a = 0);
          }
        }
        y.status = a;
        y.statusText = (c || r) + "";
        e ? E.resolveWith(w, [h, r, y]) : E.rejectWith(w, [y, r, m]);
        y.statusCode(I);
        I = void 0;
        q && z.trigger(e ? "ajaxSuccess" : "ajaxError", [y, t, e ? h : m]);
        M.fireWith(w, [y, r]);
        q && (z.trigger("ajaxComplete", [y, t]), --d.active || d.event.trigger("ajaxStop"));
      }
    }
    "object" === typeof a && (c = a, a = void 0);
    c = c || {};
    var e, h, k, p, n, q, v, u, t = d.ajaxSetup({}, c), w = t.context || t, z = t.context && (w.nodeType || w.jquery) ? d(w) : d.event, E = d.Deferred(), M = d.Callbacks("once memory"), I = t.statusCode || {}, G = {}, F = {}, N = 0, D = "canceled", y = {readyState:0, getResponseHeader:function(a) {
      var b;
      if (2 === N) {
        if (!u) {
          for (u = {};b = Jc.exec(p);) {
            u[b[1].toLowerCase()] = b[2];
          }
        }
        b = u[a.toLowerCase()];
      }
      return null == b ? null : b;
    }, getAllResponseHeaders:function() {
      return 2 === N ? p : null;
    }, setRequestHeader:function(a, b) {
      var d = a.toLowerCase();
      N || (a = F[d] = F[d] || a, G[a] = b);
      return this;
    }, overrideMimeType:function(a) {
      N || (t.mimeType = a);
      return this;
    }, statusCode:function(a) {
      var b;
      if (a) {
        if (2 > N) {
          for (b in a) {
            I[b] = [I[b], a[b]];
          }
        } else {
          y.always(a[y.status]);
        }
      }
      return this;
    }, abort:function(a) {
      a = a || D;
      v && v.abort(a);
      g(0, a);
      return this;
    }};
    E.promise(y).complete = M.add;
    y.success = y.done;
    y.error = y.fail;
    t.url = ((a || t.url || cb) + "").replace(Ic, "").replace(Lc, X[1] + "//");
    t.type = c.method || c.type || t.method || t.type;
    t.dataTypes = d.trim(t.dataType || "*").toLowerCase().match(K) || [""];
    null == t.crossDomain && (e = Rb.exec(t.url.toLowerCase()), t.crossDomain = !(!e || e[1] === X[1] && e[2] === X[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (X[3] || ("http:" === X[1] ? "80" : "443"))));
    t.data && t.processData && "string" !== typeof t.data && (t.data = d.param(t.data, t.traditional));
    Bb(Sb, t, c, y);
    if (2 === N) {
      return y;
    }
    (q = d.event && t.global) && 0 === d.active++ && d.event.trigger("ajaxStart");
    t.type = t.type.toUpperCase();
    t.hasContent = !Kc.test(t.type);
    k = t.url;
    t.hasContent || (t.data && (k = t.url += (bb.test(k) ? "&" : "?") + t.data, delete t.data), !1 === t.cache && (t.url = Qb.test(k) ? k.replace(Qb, "$1_=" + ab++) : k + (bb.test(k) ? "&" : "?") + "_=" + ab++));
    t.ifModified && (d.lastModified[k] && y.setRequestHeader("If-Modified-Since", d.lastModified[k]), d.etag[k] && y.setRequestHeader("If-None-Match", d.etag[k]));
    (t.data && t.hasContent && !1 !== t.contentType || c.contentType) && y.setRequestHeader("Content-Type", t.contentType);
    y.setRequestHeader("Accept", t.dataTypes[0] && t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + ("*" !== t.dataTypes[0] ? ", " + Tb + "; q=0.01" : "") : t.accepts["*"]);
    for (h in t.headers) {
      y.setRequestHeader(h, t.headers[h]);
    }
    if (t.beforeSend && (!1 === t.beforeSend.call(w, y, t) || 2 === N)) {
      return y.abort();
    }
    D = "abort";
    for (h in{success:1, error:1, complete:1}) {
      y[h](t[h]);
    }
    if (v = Bb(Oa, t, c, y)) {
      y.readyState = 1;
      q && z.trigger("ajaxSend", [y, t]);
      if (2 === N) {
        return y;
      }
      t.async && 0 < t.timeout && (n = b.setTimeout(function() {
        y.abort("timeout");
      }, t.timeout));
      try {
        N = 1, v.send(G, g);
      } catch (ua) {
        if (2 > N) {
          g(-1, ua);
        } else {
          throw ua;
        }
      }
    } else {
      g(-1, "No Transport");
    }
    return y;
  }, getJSON:function(a, b, c) {
    return d.get(a, b, c, "json");
  }, getScript:function(a, b) {
    return d.get(a, void 0, b, "script");
  }});
  d.each(["get", "post"], function(a, b) {
    d[b] = function(a, c, g, e) {
      d.isFunction(c) && (e = e || g, g = c, c = void 0);
      return d.ajax(d.extend({url:a, type:b, dataType:e, data:c, success:g}, d.isPlainObject(a) && a));
    };
  });
  d._evalUrl = function(a) {
    return d.ajax({url:a, type:"GET", dataType:"script", cache:!0, async:!1, global:!1, "throws":!0});
  };
  d.fn.extend({wrapAll:function(a) {
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).wrapAll(a.call(this, b));
      });
    }
    if (this[0]) {
      var b = d(a, this[0].ownerDocument).eq(0).clone(!0);
      this[0].parentNode && b.insertBefore(this[0]);
      b.map(function() {
        for (var a = this;a.firstChild && 1 === a.firstChild.nodeType;) {
          a = a.firstChild;
        }
        return a;
      }).append(this);
    }
    return this;
  }, wrapInner:function(a) {
    return d.isFunction(a) ? this.each(function(b) {
      d(this).wrapInner(a.call(this, b));
    }) : this.each(function() {
      var b = d(this), c = b.contents();
      c.length ? c.wrapAll(a) : b.append(a);
    });
  }, wrap:function(a) {
    var b = d.isFunction(a);
    return this.each(function(c) {
      d(this).wrapAll(b ? a.call(this, c) : a);
    });
  }, unwrap:function() {
    return this.parent().each(function() {
      d.nodeName(this, "body") || d(this).replaceWith(this.childNodes);
    }).end();
  }});
  d.expr.filters.hidden = function(a) {
    if (u.reliableHiddenOffsets()) {
      a = 0 >= a.offsetWidth && 0 >= a.offsetHeight && !a.getClientRects().length;
    } else {
      a: {
        for (;a && 1 === a.nodeType;) {
          if ("none" === (a.style && a.style.display || d.css(a, "display")) || "hidden" === a.type) {
            a = !0;
            break a;
          }
          a = a.parentNode;
        }
        a = !1;
      }
    }
    return a;
  };
  d.expr.filters.visible = function(a) {
    return !d.expr.filters.hidden(a);
  };
  var Mc = /%20/g, hc = /\[\]$/, Ub = /\r?\n/g, Nc = /^(?:submit|button|image|reset|file)$/i, Oc = /^(?:input|select|textarea|keygen)/i;
  d.param = function(a, b) {
    var c, g = [], e = function(a, b) {
      b = d.isFunction(b) ? b() : null == b ? "" : b;
      g[g.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
    };
    void 0 === b && (b = d.ajaxSettings && d.ajaxSettings.traditional);
    if (d.isArray(a) || a.jquery && !d.isPlainObject(a)) {
      d.each(a, function() {
        e(this.name, this.value);
      });
    } else {
      for (c in a) {
        Qa(c, a[c], b, e);
      }
    }
    return g.join("&").replace(Mc, "+");
  };
  d.fn.extend({serialize:function() {
    return d.param(this.serializeArray());
  }, serializeArray:function() {
    return this.map(function() {
      var a = d.prop(this, "elements");
      return a ? d.makeArray(a) : this;
    }).filter(function() {
      var a = this.type;
      return this.name && !d(this).is(":disabled") && Oc.test(this.nodeName) && !Nc.test(a) && (this.checked || !Ka.test(a));
    }).map(function(a, b) {
      var c = d(this).val();
      return null == c ? null : d.isArray(c) ? d.map(c, function(a) {
        return {name:b.name, value:a.replace(Ub, "\r\n")};
      }) : {name:b.name, value:c.replace(Ub, "\r\n")};
    }).get();
  }});
  d.ajaxSettings.xhr = void 0 !== b.ActiveXObject ? function() {
    return this.isLocal ? Cb() : 8 < w.documentMode ? Ra() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Ra() || Cb();
  } : Ra;
  var Pc = 0, Ga = {}, Ha = d.ajaxSettings.xhr();
  b.attachEvent && b.attachEvent("onunload", function() {
    for (var a in Ga) {
      Ga[a](void 0, !0);
    }
  });
  u.cors = !!Ha && "withCredentials" in Ha;
  (Ha = u.ajax = !!Ha) && d.ajaxTransport(function(a) {
    if (!a.crossDomain || u.cors) {
      var c;
      return {send:function(g, e) {
        var h, k = a.xhr(), p = ++Pc;
        k.open(a.type, a.url, a.async, a.username, a.password);
        if (a.xhrFields) {
          for (h in a.xhrFields) {
            k[h] = a.xhrFields[h];
          }
        }
        a.mimeType && k.overrideMimeType && k.overrideMimeType(a.mimeType);
        a.crossDomain || g["X-Requested-With"] || (g["X-Requested-With"] = "XMLHttpRequest");
        for (h in g) {
          void 0 !== g[h] && k.setRequestHeader(h, g[h] + "");
        }
        k.send(a.hasContent && a.data || null);
        c = function(b, g) {
          var h, n, l;
          if (c && (g || 4 === k.readyState)) {
            if (delete Ga[p], c = void 0, k.onreadystatechange = d.noop, g) {
              4 !== k.readyState && k.abort();
            } else {
              l = {};
              h = k.status;
              "string" === typeof k.responseText && (l.text = k.responseText);
              try {
                n = k.statusText;
              } catch (m) {
                n = "";
              }
              h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404;
            }
          }
          l && e(h, n, l, k.getAllResponseHeaders());
        };
        a.async ? 4 === k.readyState ? b.setTimeout(c) : k.onreadystatechange = Ga[p] = c : c();
      }, abort:function() {
        c && c(void 0, !0);
      }};
    }
  });
  d.ajaxPrefilter(function(a) {
    a.crossDomain && (a.contents.script = !1);
  });
  d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/\b(?:java|ecma)script\b/}, converters:{"text script":function(a) {
    d.globalEval(a);
    return a;
  }}});
  d.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1);
    a.crossDomain && (a.type = "GET", a.global = !1);
  });
  d.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c = w.head || d("head")[0] || w.documentElement;
      return {send:function(d, g) {
        b = w.createElement("script");
        b.async = !0;
        a.scriptCharset && (b.charset = a.scriptCharset);
        b.src = a.url;
        b.onload = b.onreadystatechange = function(a, c) {
          if (c || !b.readyState || /loaded|complete/.test(b.readyState)) {
            b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || g(200, "success");
          }
        };
        c.insertBefore(b, c.firstChild);
      }, abort:function() {
        if (b) {
          b.onload(void 0, !0);
        }
      }};
    }
  });
  var Vb = [], db = /(=)\?(?=&|$)|\?\?/;
  d.ajaxSetup({jsonp:"callback", jsonpCallback:function() {
    var a = Vb.pop() || d.expando + "_" + ab++;
    this[a] = !0;
    return a;
  }});
  d.ajaxPrefilter("json jsonp", function(a, c, g) {
    var e, h, k, p = !1 !== a.jsonp && (db.test(a.url) ? "url" : "string" === typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && db.test(a.data) && "data");
    if (p || "jsonp" === a.dataTypes[0]) {
      return e = a.jsonpCallback = d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, p ? a[p] = a[p].replace(db, "$1" + e) : !1 !== a.jsonp && (a.url += (bb.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function() {
        k || d.error(e + " was not called");
        return k[0];
      }, a.dataTypes[0] = "json", h = b[e], b[e] = function() {
        k = arguments;
      }, g.always(function() {
        void 0 === h ? d(b).removeProp(e) : b[e] = h;
        a[e] && (a.jsonpCallback = c.jsonpCallback, Vb.push(e));
        k && d.isFunction(h) && h(k[0]);
        k = h = void 0;
      }), "script";
    }
  });
  d.parseHTML = function(a, b, c) {
    if (!a || "string" !== typeof a) {
      return null;
    }
    "boolean" === typeof b && (c = b, b = !1);
    b = b || w;
    var g = Ib.exec(a);
    c = !c && [];
    if (g) {
      return [b.createElement(g[1])];
    }
    g = eb([a], b, c);
    c && c.length && d(c).remove();
    return d.merge([], g.childNodes);
  };
  var Wb = d.fn.load;
  d.fn.load = function(a, b, c) {
    if ("string" !== typeof a && Wb) {
      return Wb.apply(this, arguments);
    }
    var g, e, h, k = this, p = a.indexOf(" ");
    -1 < p && (g = d.trim(a.slice(p, a.length)), a = a.slice(0, p));
    d.isFunction(b) ? (c = b, b = void 0) : b && "object" === typeof b && (e = "POST");
    0 < k.length && d.ajax({url:a, type:e || "GET", dataType:"html", data:b}).done(function(a) {
      h = arguments;
      k.html(g ? d("<div>").append(d.parseHTML(a)).find(g) : a);
    }).always(c && function(a, b) {
      k.each(function() {
        c.apply(k, h || [a.responseText, b, a]);
      });
    });
    return this;
  };
  d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
    d.fn[b] = function(a) {
      return this.on(b, a);
    };
  });
  d.expr.filters.animated = function(a) {
    return d.grep(d.timers, function(b) {
      return a === b.elem;
    }).length;
  };
  d.offset = {setOffset:function(a, b, c) {
    var g, e, h, k = d.css(a, "position"), p = d(a), n = {};
    "static" === k && (a.style.position = "relative");
    h = p.offset();
    e = d.css(a, "top");
    g = d.css(a, "left");
    ("absolute" === k || "fixed" === k) && -1 < d.inArray("auto", [e, g]) ? (g = p.position(), e = g.top, g = g.left) : (e = parseFloat(e) || 0, g = parseFloat(g) || 0);
    d.isFunction(b) && (b = b.call(a, c, d.extend({}, h)));
    null != b.top && (n.top = b.top - h.top + e);
    null != b.left && (n.left = b.left - h.left + g);
    "using" in b ? b.using.call(a, n) : p.css(n);
  }};
  d.fn.extend({offset:function(a) {
    if (arguments.length) {
      return void 0 === a ? this : this.each(function(b) {
        d.offset.setOffset(this, a, b);
      });
    }
    var b, c, g = {top:0, left:0}, e = (c = this[0]) && c.ownerDocument;
    if (e) {
      b = e.documentElement;
      if (!d.contains(b, c)) {
        return g;
      }
      "undefined" !== typeof c.getBoundingClientRect && (g = c.getBoundingClientRect());
      c = Db(e);
      return {top:g.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left:g.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)};
    }
  }, position:function() {
    if (this[0]) {
      var a, b, c = {top:0, left:0}, g = this[0];
      "fixed" === d.css(g, "position") ? b = g.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), d.nodeName(a[0], "html") || (c = a.offset()), c.top += d.css(a[0], "borderTopWidth", !0), c.left += d.css(a[0], "borderLeftWidth", !0));
      return {top:b.top - c.top - d.css(g, "marginTop", !0), left:b.left - c.left - d.css(g, "marginLeft", !0)};
    }
  }, offsetParent:function() {
    return this.map(function() {
      for (var a = this.offsetParent;a && !d.nodeName(a, "html") && "static" === d.css(a, "position");) {
        a = a.offsetParent;
      }
      return a || Nb;
    });
  }});
  d.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function(a, b) {
    var c = /Y/.test(b);
    d.fn[a] = function(g) {
      return ba(this, function(a, g, e) {
        var h = Db(a);
        if (void 0 === e) {
          return h ? b in h ? h[b] : h.document.documentElement[g] : a[g];
        }
        h ? h.scrollTo(c ? d(h).scrollLeft() : e, c ? e : d(h).scrollTop()) : a[g] = e;
      }, a, g, arguments.length, null);
    };
  });
  d.each(["top", "left"], function(a, b) {
    d.cssHooks[b] = Na(u.pixelPosition, function(a, c) {
      if (c) {
        return c = Q(a, b), xa.test(c) ? d(a).position()[b] + "px" : c;
      }
    });
  });
  d.each({Height:"height", Width:"width"}, function(a, b) {
    d.each({padding:"inner" + a, content:b, "":"outer" + a}, function(c, g) {
      d.fn[g] = function(g, e) {
        var h = arguments.length && (c || "boolean" !== typeof g), k = c || (!0 === g || !0 === e ? "margin" : "border");
        return ba(this, function(b, c, g) {
          return d.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (c = b.documentElement, Math.max(b.body["scroll" + a], c["scroll" + a], b.body["offset" + a], c["offset" + a], c["client" + a])) : void 0 === g ? d.css(b, c, k) : d.style(b, c, g, k);
        }, b, h ? g : void 0, h, null);
      };
    });
  });
  d.fn.extend({bind:function(a, b, c) {
    return this.on(a, null, b, c);
  }, unbind:function(a, b) {
    return this.off(a, null, b);
  }, delegate:function(a, b, c, d) {
    return this.on(b, a, c, d);
  }, undelegate:function(a, b, c) {
    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
  }});
  d.fn.size = function() {
    return this.length;
  };
  d.fn.andSelf = d.fn.addBack;
  "function" === typeof define && define.amd && define("jquery", [], function() {
    return d;
  });
  var Qc = b.jQuery, Rc = b.$;
  d.noConflict = function(a) {
    b.$ === d && (b.$ = Rc);
    a && b.jQuery === d && (b.jQuery = Qc);
    return d;
  };
  e || (b.jQuery = b.$ = d);
  return d;
});
if ("undefined" == typeof jQuery) {
  throw Error("Bootstrap's JavaScript requires jQuery");
}
+function(b) {
  b = b.fn.jquery.split(" ")[0].split(".");
  if (2 > b[0] && 9 > b[1] || 1 == b[0] && 9 == b[1] && 1 > b[2] || 2 < b[0]) {
    throw Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
  }
}(jQuery);
+function(b) {
  function e() {
    var b = document.createElement("bootstrap"), e = {WebkitTransition:"webkitTransitionEnd", MozTransition:"transitionend", OTransition:"oTransitionEnd otransitionend", transition:"transitionend"}, c;
    for (c in e) {
      if (void 0 !== b.style[c]) {
        return {end:e[c]};
      }
    }
    return !1;
  }
  b.fn.emulateTransitionEnd = function(e) {
    var h = !1, c = this;
    b(this).one("bsTransitionEnd", function() {
      h = !0;
    });
    return setTimeout(function() {
      h || b(c).trigger(b.support.transition.end);
    }, e), this;
  };
  b(function() {
    b.support.transition = e();
    b.support.transition && (b.event.special.bsTransitionEnd = {bindType:b.support.transition.end, delegateType:b.support.transition.end, handle:function(e) {
      return b(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
    }});
  });
}(jQuery);
+function(b) {
  var e = function(e) {
    b(e).on("click", '[data-dismiss="alert"]', this.close);
  };
  e.VERSION = "3.3.6";
  e.TRANSITION_DURATION = 150;
  e.prototype.close = function(h) {
    function c() {
      n.detach().trigger("closed.bs.alert").remove();
    }
    var g = b(this), k = g.attr("data-target");
    k || (k = g.attr("href"), k = k && k.replace(/.*(?=#[^\s]*$)/, ""));
    var n = b(k);
    h && h.preventDefault();
    n.length || (n = g.closest(".alert"));
    n.trigger(h = b.Event("close.bs.alert"));
    h.isDefaultPrevented() || (n.removeClass("in"), b.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", c).emulateTransitionEnd(e.TRANSITION_DURATION) : c());
  };
  var k = b.fn.alert;
  b.fn.alert = function(h) {
    return this.each(function() {
      var c = b(this), g = c.data("bs.alert");
      g || c.data("bs.alert", g = new e(this));
      "string" == typeof h && g[h].call(c);
    });
  };
  b.fn.alert.Constructor = e;
  b.fn.alert.noConflict = function() {
    return b.fn.alert = k, this;
  };
  b(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', e.prototype.close);
}(jQuery);
+function(b) {
  function e(c) {
    return this.each(function() {
      var g = b(this), e = g.data("bs.button"), h = "object" == typeof c && c;
      e || g.data("bs.button", e = new k(this, h));
      "toggle" == c ? e.toggle() : c && e.setState(c);
    });
  }
  var k = function(c, g) {
    this.$element = b(c);
    this.options = b.extend({}, k.DEFAULTS, g);
    this.isLoading = !1;
  };
  k.VERSION = "3.3.6";
  k.DEFAULTS = {loadingText:"loading..."};
  k.prototype.setState = function(c) {
    var g = this.$element, e = g.is("input") ? "val" : "html", h = g.data();
    c += "Text";
    null == h.resetText && g.data("resetText", g[e]());
    setTimeout(b.proxy(function() {
      g[e](null == h[c] ? this.options[c] : h[c]);
      "loadingText" == c ? (this.isLoading = !0, g.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, g.removeClass("disabled").removeAttr("disabled"));
    }, this), 0);
  };
  k.prototype.toggle = function() {
    var b = !0, g = this.$element.closest('[data-toggle="buttons"]');
    if (g.length) {
      var e = this.$element.find("input");
      "radio" == e.prop("type") ? (e.prop("checked") && (b = !1), g.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == e.prop("type") && (e.prop("checked") !== this.$element.hasClass("active") && (b = !1), this.$element.toggleClass("active"));
      e.prop("checked", this.$element.hasClass("active"));
      b && e.trigger("change");
    } else {
      this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    }
  };
  var h = b.fn.button;
  b.fn.button = e;
  b.fn.button.Constructor = k;
  b.fn.button.noConflict = function() {
    return b.fn.button = h, this;
  };
  b(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
    var g = b(c.target);
    g.hasClass("btn") || (g = g.closest(".btn"));
    e.call(g, "toggle");
    b(c.target).is('input[type="radio"]') || b(c.target).is('input[type="checkbox"]') || c.preventDefault();
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(c) {
    b(c.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(c.type));
  });
}(jQuery);
+function(b) {
  function e(c) {
    return this.each(function() {
      var e = b(this), h = e.data("bs.carousel"), q = b.extend({}, k.DEFAULTS, e.data(), "object" == typeof c && c), v = "string" == typeof c ? c : q.slide;
      h || e.data("bs.carousel", h = new k(this, q));
      "number" == typeof c ? h.to(c) : v ? h[v]() : q.interval && h.pause().cycle();
    });
  }
  var k = function(c, e) {
    this.$element = b(c);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = e;
    this.$items = this.$active = this.interval = this.sliding = this.paused = null;
    this.options.keyboard && this.$element.on("keydown.bs.carousel", b.proxy(this.keydown, this));
    "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", b.proxy(this.pause, this)).on("mouseleave.bs.carousel", b.proxy(this.cycle, this));
  };
  k.VERSION = "3.3.6";
  k.TRANSITION_DURATION = 600;
  k.DEFAULTS = {interval:5E3, pause:"hover", wrap:!0, keyboard:!0};
  k.prototype.keydown = function(b) {
    if (!/input|textarea/i.test(b.target.tagName)) {
      switch(b.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return;
      }
      b.preventDefault();
    }
  };
  k.prototype.cycle = function(c) {
    return c || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(b.proxy(this.next, this), this.options.interval)), this;
  };
  k.prototype.getItemIndex = function(b) {
    return this.$items = b.parent().children(".item"), this.$items.index(b || this.$active);
  };
  k.prototype.getItemForDirection = function(b, c) {
    var e = this.getItemIndex(c);
    return ("prev" == b && 0 === e || "next" == b && e == this.$items.length - 1) && !this.options.wrap ? c : this.$items.eq((e + ("prev" == b ? -1 : 1)) % this.$items.length);
  };
  k.prototype.to = function(b) {
    var c = this, e = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
      c.to(b);
    }) : e == b ? this.pause().cycle() : this.slide(b > e ? "next" : "prev", this.$items.eq(b));
  };
  k.prototype.pause = function(c) {
    return c || (this.paused = !0), this.$element.find(".next, .prev").length && b.support.transition && (this.$element.trigger(b.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  };
  k.prototype.next = function() {
    return this.sliding ? void 0 : this.slide("next");
  };
  k.prototype.prev = function() {
    return this.sliding ? void 0 : this.slide("prev");
  };
  k.prototype.slide = function(c, e) {
    var h = this.$element.find(".item.active"), q = e || this.getItemForDirection(c, h), v = this.interval, z = "next" == c ? "left" : "right", M = this;
    if (q.hasClass("active")) {
      return this.sliding = !1;
    }
    var ia = q[0], F = b.Event("slide.bs.carousel", {relatedTarget:ia, direction:z});
    if (this.$element.trigger(F), !F.isDefaultPrevented()) {
      if (this.sliding = !0, v && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active"), (F = b(this.$indicators.children()[this.getItemIndex(q)])) && F.addClass("active");
      }
      var E = b.Event("slid.bs.carousel", {relatedTarget:ia, direction:z});
      return b.support.transition && this.$element.hasClass("slide") ? (q.addClass(c), q[0].offsetWidth, h.addClass(z), q.addClass(z), h.one("bsTransitionEnd", function() {
        q.removeClass([c, z].join(" ")).addClass("active");
        h.removeClass(["active", z].join(" "));
        M.sliding = !1;
        setTimeout(function() {
          M.$element.trigger(E);
        }, 0);
      }).emulateTransitionEnd(k.TRANSITION_DURATION)) : (h.removeClass("active"), q.addClass("active"), this.sliding = !1, this.$element.trigger(E)), v && this.cycle(), this;
    }
  };
  var h = b.fn.carousel;
  b.fn.carousel = e;
  b.fn.carousel.Constructor = k;
  b.fn.carousel.noConflict = function() {
    return b.fn.carousel = h, this;
  };
  var c = function(c) {
    var h, k = b(this), q = b(k.attr("data-target") || (h = k.attr("href")) && h.replace(/.*(?=#[^\s]+$)/, ""));
    q.hasClass("carousel") && (h = b.extend({}, q.data(), k.data()), (k = k.attr("data-slide-to")) && (h.interval = !1), e.call(q, h), k && q.data("bs.carousel").to(k), c.preventDefault());
  };
  b(document).on("click.bs.carousel.data-api", "[data-slide]", c).on("click.bs.carousel.data-api", "[data-slide-to]", c);
  b(window).on("load", function() {
    b('[data-ride="carousel"]').each(function() {
      var c = b(this);
      e.call(c, c.data());
    });
  });
}(jQuery);
+function(b) {
  function e(c) {
    var e;
    c = c.attr("data-target") || (e = c.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
    return b(c);
  }
  function k(c) {
    return this.each(function() {
      var e = b(this), k = e.data("bs.collapse"), q = b.extend({}, h.DEFAULTS, e.data(), "object" == typeof c && c);
      !k && q.toggle && /show|hide/.test(c) && (q.toggle = !1);
      k || e.data("bs.collapse", k = new h(this, q));
      "string" == typeof c && k[c]();
    });
  }
  var h = function(c, e) {
    this.$element = b(c);
    this.options = b.extend({}, h.DEFAULTS, e);
    this.$trigger = b('[data-toggle="collapse"][href="#' + c.id + '"],[data-toggle="collapse"][data-target="#' + c.id + '"]');
    this.transitioning = null;
    this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    this.options.toggle && this.toggle();
  };
  h.VERSION = "3.3.6";
  h.TRANSITION_DURATION = 350;
  h.DEFAULTS = {toggle:!0};
  h.prototype.dimension = function() {
    return this.$element.hasClass("width") ? "width" : "height";
  };
  h.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var c, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(e && e.length && (c = e.data("bs.collapse"), c && c.transitioning))) {
        var n = b.Event("show.bs.collapse");
        if (this.$element.trigger(n), !n.isDefaultPrevented()) {
          e && e.length && (k.call(e, "hide"), c || e.data("bs.collapse", null));
          var q = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[q](0).attr("aria-expanded", !0);
          this.$trigger.removeClass("collapsed").attr("aria-expanded", !0);
          this.transitioning = 1;
          c = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[q]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse");
          };
          if (!b.support.transition) {
            return c.call(this);
          }
          e = b.camelCase(["scroll", q].join("-"));
          this.$element.one("bsTransitionEnd", b.proxy(c, this)).emulateTransitionEnd(h.TRANSITION_DURATION)[q](this.$element[0][e]);
        }
      }
    }
  };
  h.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var c = b.Event("hide.bs.collapse");
      if (this.$element.trigger(c), !c.isDefaultPrevented()) {
        c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1);
        this.$trigger.addClass("collapsed").attr("aria-expanded", !1);
        this.transitioning = 1;
        var e = function() {
          this.transitioning = 0;
          this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };
        return b.support.transition ? void this.$element[c](0).one("bsTransitionEnd", b.proxy(e, this)).emulateTransitionEnd(h.TRANSITION_DURATION) : e.call(this);
      }
    }
  };
  h.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };
  h.prototype.getParent = function() {
    return b(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(b.proxy(function(c, h) {
      var k = b(h);
      this.addAriaAndCollapsedClass(e(k), k);
    }, this)).end();
  };
  h.prototype.addAriaAndCollapsedClass = function(b, c) {
    var e = b.hasClass("in");
    b.attr("aria-expanded", e);
    c.toggleClass("collapsed", !e).attr("aria-expanded", e);
  };
  var c = b.fn.collapse;
  b.fn.collapse = k;
  b.fn.collapse.Constructor = h;
  b.fn.collapse.noConflict = function() {
    return b.fn.collapse = c, this;
  };
  b(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
    var h = b(this);
    h.attr("data-target") || c.preventDefault();
    c = e(h);
    h = c.data("bs.collapse") ? "toggle" : h.data();
    k.call(c, h);
  });
}(jQuery);
+function(b) {
  function e(c) {
    var e = c.attr("data-target");
    e || (e = c.attr("href"), e = e && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
    return (e = e && b(e)) && e.length ? e : c.parent();
  }
  function k(g) {
    g && 3 === g.which || (b(h).remove(), b(c).each(function() {
      var c = b(this), h = e(c), k = {relatedTarget:this};
      h.hasClass("open") && (g && "click" == g.type && /input|textarea/i.test(g.target.tagName) && b.contains(h[0], g.target) || (h.trigger(g = b.Event("hide.bs.dropdown", k)), g.isDefaultPrevented() || (c.attr("aria-expanded", "false"), h.removeClass("open").trigger(b.Event("hidden.bs.dropdown", k)))));
    }));
  }
  var h = ".dropdown-backdrop", c = '[data-toggle="dropdown"]', g = function(c) {
    b(c).on("click.bs.dropdown", this.toggle);
  };
  g.VERSION = "3.3.6";
  g.prototype.toggle = function(c) {
    var g = b(this);
    if (!g.is(".disabled, :disabled")) {
      var h = e(g), p = h.hasClass("open");
      if (k(), !p) {
        "ontouchstart" in document.documentElement && !h.closest(".navbar-nav").length && b(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(b(this)).on("click", k);
        p = {relatedTarget:this};
        if (h.trigger(c = b.Event("show.bs.dropdown", p)), c.isDefaultPrevented()) {
          return;
        }
        g.trigger("focus").attr("aria-expanded", "true");
        h.toggleClass("open").trigger(b.Event("shown.bs.dropdown", p));
      }
      return !1;
    }
  };
  g.prototype.keydown = function(g) {
    if (/(38|40|27|32)/.test(g.which) && !/input|textarea/i.test(g.target.tagName)) {
      var h = b(this);
      if (g.preventDefault(), g.stopPropagation(), !h.is(".disabled, :disabled")) {
        var k = e(h), p = k.hasClass("open");
        if (!p && 27 != g.which || p && 27 == g.which) {
          return 27 == g.which && k.find(c).trigger("focus"), h.trigger("click");
        }
        h = k.find(".dropdown-menu li:not(.disabled):visible a");
        h.length && (k = h.index(g.target), 38 == g.which && 0 < k && k--, 40 == g.which && k < h.length - 1 && k++, ~k || (k = 0), h.eq(k).trigger("focus"));
      }
    }
  };
  var p = b.fn.dropdown;
  b.fn.dropdown = function(c) {
    return this.each(function() {
      var e = b(this), h = e.data("bs.dropdown");
      h || e.data("bs.dropdown", h = new g(this));
      "string" == typeof c && h[c].call(e);
    });
  };
  b.fn.dropdown.Constructor = g;
  b.fn.dropdown.noConflict = function() {
    return b.fn.dropdown = p, this;
  };
  b(document).on("click.bs.dropdown.data-api", k).on("click.bs.dropdown.data-api", ".dropdown form", function(b) {
    b.stopPropagation();
  }).on("click.bs.dropdown.data-api", c, g.prototype.toggle).on("keydown.bs.dropdown.data-api", c, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery);
+function(b) {
  function e(c, e) {
    return this.each(function() {
      var h = b(this), n = h.data("bs.modal"), q = b.extend({}, k.DEFAULTS, h.data(), "object" == typeof c && c);
      n || h.data("bs.modal", n = new k(this, q));
      "string" == typeof c ? n[c](e) : q.show && n.show(e);
    });
  }
  var k = function(c, e) {
    this.options = e;
    this.$body = b(document.body);
    this.$element = b(c);
    this.$dialog = this.$element.find(".modal-dialog");
    this.originalBodyPad = this.isShown = this.$backdrop = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = !1;
    this.options.remote && this.$element.find(".modal-content").load(this.options.remote, b.proxy(function() {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };
  k.VERSION = "3.3.6";
  k.TRANSITION_DURATION = 300;
  k.BACKDROP_TRANSITION_DURATION = 150;
  k.DEFAULTS = {backdrop:!0, keyboard:!0, show:!0};
  k.prototype.toggle = function(b) {
    return this.isShown ? this.hide() : this.show(b);
  };
  k.prototype.show = function(c) {
    var e = this, h = b.Event("show.bs.modal", {relatedTarget:c});
    this.$element.trigger(h);
    this.isShown || h.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', b.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
      e.$element.one("mouseup.dismiss.bs.modal", function(c) {
        b(c.target).is(e.$element) && (e.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function() {
      var h = b.support.transition && e.$element.hasClass("fade");
      e.$element.parent().length || e.$element.appendTo(e.$body);
      e.$element.show().scrollTop(0);
      e.adjustDialog();
      h && e.$element[0].offsetWidth;
      e.$element.addClass("in");
      e.enforceFocus();
      var p = b.Event("shown.bs.modal", {relatedTarget:c});
      h ? e.$dialog.one("bsTransitionEnd", function() {
        e.$element.trigger("focus").trigger(p);
      }).emulateTransitionEnd(k.TRANSITION_DURATION) : e.$element.trigger("focus").trigger(p);
    }));
  };
  k.prototype.hide = function(c) {
    c && c.preventDefault();
    c = b.Event("hide.bs.modal");
    this.$element.trigger(c);
    this.isShown && !c.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), b(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), b.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", b.proxy(this.hideModal, this)).emulateTransitionEnd(k.TRANSITION_DURATION) : this.hideModal());
  };
  k.prototype.enforceFocus = function() {
    b(document).off("focusin.bs.modal").on("focusin.bs.modal", b.proxy(function(b) {
      this.$element[0] === b.target || this.$element.has(b.target).length || this.$element.trigger("focus");
    }, this));
  };
  k.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", b.proxy(function(b) {
      27 == b.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  };
  k.prototype.resize = function() {
    this.isShown ? b(window).on("resize.bs.modal", b.proxy(this.handleUpdate, this)) : b(window).off("resize.bs.modal");
  };
  k.prototype.hideModal = function() {
    var b = this;
    this.$element.hide();
    this.backdrop(function() {
      b.$body.removeClass("modal-open");
      b.resetAdjustments();
      b.resetScrollbar();
      b.$element.trigger("hidden.bs.modal");
    });
  };
  k.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  k.prototype.backdrop = function(c) {
    var e = this, h = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var n = b.support.transition && h;
      if (this.$backdrop = b(document.createElement("div")).addClass("modal-backdrop " + h).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", b.proxy(function(b) {
        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(b.target === b.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), c) {
        n ? this.$backdrop.one("bsTransitionEnd", c).emulateTransitionEnd(k.BACKDROP_TRANSITION_DURATION) : c();
      }
    } else {
      !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), h = function() {
        e.removeBackdrop();
        c && c();
      }, b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", h).emulateTransitionEnd(k.BACKDROP_TRANSITION_DURATION) : h()) : c && c();
    }
  };
  k.prototype.handleUpdate = function() {
    this.adjustDialog();
  };
  k.prototype.adjustDialog = function() {
    var b = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({paddingLeft:!this.bodyIsOverflowing && b ? this.scrollbarWidth : "", paddingRight:this.bodyIsOverflowing && !b ? this.scrollbarWidth : ""});
  };
  k.prototype.resetAdjustments = function() {
    this.$element.css({paddingLeft:"", paddingRight:""});
  };
  k.prototype.checkScrollbar = function() {
    var b = window.innerWidth;
    b || (b = document.documentElement.getBoundingClientRect(), b = b.right - Math.abs(b.left));
    this.bodyIsOverflowing = document.body.clientWidth < b;
    this.scrollbarWidth = this.measureScrollbar();
  };
  k.prototype.setScrollbar = function() {
    var b = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "";
    this.bodyIsOverflowing && this.$body.css("padding-right", b + this.scrollbarWidth);
  };
  k.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", this.originalBodyPad);
  };
  k.prototype.measureScrollbar = function() {
    var b = document.createElement("div");
    b.className = "modal-scrollbar-measure";
    this.$body.append(b);
    var e = b.offsetWidth - b.clientWidth;
    return this.$body[0].removeChild(b), e;
  };
  var h = b.fn.modal;
  b.fn.modal = e;
  b.fn.modal.Constructor = k;
  b.fn.modal.noConflict = function() {
    return b.fn.modal = h, this;
  };
  b(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
    var g = b(this), h = g.attr("href"), k = b(g.attr("data-target") || h && h.replace(/.*(?=#[^\s]+$)/, "")), h = k.data("bs.modal") ? "toggle" : b.extend({remote:!/#/.test(h) && h}, k.data(), g.data());
    g.is("a") && c.preventDefault();
    k.one("show.bs.modal", function(b) {
      b.isDefaultPrevented() || k.one("hidden.bs.modal", function() {
        g.is(":visible") && g.trigger("focus");
      });
    });
    e.call(k, h, this);
  });
}(jQuery);
+function(b) {
  var e = function(b, c) {
    this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null;
    this.init("tooltip", b, c);
  };
  e.VERSION = "3.3.6";
  e.TRANSITION_DURATION = 150;
  e.DEFAULTS = {animation:!0, placement:"top", selector:!1, template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger:"hover focus", title:"", delay:0, html:!1, container:!1, viewport:{selector:"body", padding:0}};
  e.prototype.init = function(e, c, g) {
    if (this.enabled = !0, this.type = e, this.$element = b(c), this.options = this.getOptions(g), this.$viewport = this.options.viewport && b(b.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {click:!1, hover:!1, focus:!1}, this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    }
    e = this.options.trigger.split(" ");
    for (c = e.length;c--;) {
      if (g = e[c], "click" == g) {
        this.$element.on("click." + this.type, this.options.selector, b.proxy(this.toggle, this));
      } else {
        if ("manual" != g) {
          var k = "hover" == g ? "mouseleave" : "focusout";
          this.$element.on(("hover" == g ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, b.proxy(this.enter, this));
          this.$element.on(k + "." + this.type, this.options.selector, b.proxy(this.leave, this));
        }
      }
    }
    this.options.selector ? this._options = b.extend({}, this.options, {trigger:"manual", selector:""}) : this.fixTitle();
  };
  e.prototype.getDefaults = function() {
    return e.DEFAULTS;
  };
  e.prototype.getOptions = function(e) {
    return e = b.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {show:e.delay, hide:e.delay}), e;
  };
  e.prototype.getDelegateOptions = function() {
    var e = {}, c = this.getDefaults();
    return this._options && b.each(this._options, function(b, k) {
      c[b] != k && (e[b] = k);
    }), e;
  };
  e.prototype.enter = function(e) {
    var c = e instanceof this.constructor ? e : b(e.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(e.currentTarget, this.getDelegateOptions()), b(e.currentTarget).data("bs." + this.type, c)), e instanceof b.Event && (c.inState["focusin" == e.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  };
  e.prototype.isInStateTrue = function() {
    for (var b in this.inState) {
      if (this.inState[b]) {
        return !0;
      }
    }
    return !1;
  };
  e.prototype.leave = function(e) {
    var c = e instanceof this.constructor ? e : b(e.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(e.currentTarget, this.getDelegateOptions()), b(e.currentTarget).data("bs." + this.type, c)), e instanceof b.Event && (c.inState["focusout" == e.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide());
  };
  e.prototype.show = function() {
    var h = b.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(h);
      var c = b.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (!h.isDefaultPrevented() && c) {
        var g = this, h = this.tip(), c = this.getUID(this.type);
        this.setContent();
        h.attr("id", c);
        this.$element.attr("aria-describedby", c);
        this.options.animation && h.addClass("fade");
        var c = "function" == typeof this.options.placement ? this.options.placement.call(this, h[0], this.$element[0]) : this.options.placement, k = /\s?auto?\s?/i, n = k.test(c);
        n && (c = c.replace(k, "") || "top");
        h.detach().css({top:0, left:0, display:"block"}).addClass(c).data("bs." + this.type, this);
        this.options.container ? h.appendTo(this.options.container) : h.insertAfter(this.$element);
        this.$element.trigger("inserted.bs." + this.type);
        var k = this.getPosition(), q = h[0].offsetWidth, v = h[0].offsetHeight;
        if (n) {
          var n = c, z = this.getPosition(this.$viewport), c = "bottom" == c && k.bottom + v > z.bottom ? "top" : "top" == c && k.top - v < z.top ? "bottom" : "right" == c && k.right + q > z.width ? "left" : "left" == c && k.left - q < z.left ? "right" : c;
          h.removeClass(n).addClass(c);
        }
        k = this.getCalculatedOffset(c, k, q, v);
        this.applyPlacement(k, c);
        c = function() {
          var b = g.hoverState;
          g.$element.trigger("shown.bs." + g.type);
          g.hoverState = null;
          "out" == b && g.leave(g);
        };
        b.support.transition && this.$tip.hasClass("fade") ? h.one("bsTransitionEnd", c).emulateTransitionEnd(e.TRANSITION_DURATION) : c();
      }
    }
  };
  e.prototype.applyPlacement = function(e, c) {
    var g = this.tip(), k = g[0].offsetWidth, n = g[0].offsetHeight, q = parseInt(g.css("margin-top"), 10), v = parseInt(g.css("margin-left"), 10);
    isNaN(q) && (q = 0);
    isNaN(v) && (v = 0);
    e.top += q;
    e.left += v;
    b.offset.setOffset(g[0], b.extend({using:function(b) {
      g.css({top:Math.round(b.top), left:Math.round(b.left)});
    }}, e), 0);
    g.addClass("in");
    var v = g[0].offsetWidth, z = g[0].offsetHeight;
    "top" == c && z != n && (e.top = e.top + n - z);
    var M = this.getViewportAdjustedDelta(c, e, v, z);
    M.left ? e.left += M.left : e.top += M.top;
    k = (q = /top|bottom/.test(c)) ? 2 * M.left - k + v : 2 * M.top - n + z;
    n = q ? "offsetWidth" : "offsetHeight";
    g.offset(e);
    this.replaceArrow(k, g[0][n], q);
  };
  e.prototype.replaceArrow = function(b, c, e) {
    this.arrow().css(e ? "left" : "top", 50 * (1 - b / c) + "%").css(e ? "top" : "left", "");
  };
  e.prototype.setContent = function() {
    var b = this.tip(), c = this.getTitle();
    b.find(".tooltip-inner")[this.options.html ? "html" : "text"](c);
    b.removeClass("fade in top bottom left right");
  };
  e.prototype.hide = function(h) {
    function c() {
      "in" != g.hoverState && k.detach();
      g.$element.removeAttr("aria-describedby").trigger("hidden.bs." + g.type);
      h && h();
    }
    var g = this, k = b(this.$tip), n = b.Event("hide.bs." + this.type);
    return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (k.removeClass("in"), b.support.transition && k.hasClass("fade") ? k.one("bsTransitionEnd", c).emulateTransitionEnd(e.TRANSITION_DURATION) : c(), this.hoverState = null, this);
  };
  e.prototype.fixTitle = function() {
    var b = this.$element;
    (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "");
  };
  e.prototype.hasContent = function() {
    return this.getTitle();
  };
  e.prototype.getPosition = function(e) {
    e = e || this.$element;
    var c = e[0], g = "BODY" == c.tagName, c = c.getBoundingClientRect();
    null == c.width && (c = b.extend({}, c, {width:c.right - c.left, height:c.bottom - c.top}));
    var k = g ? {top:0, left:0} : e.offset();
    e = {scroll:g ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()};
    g = g ? {width:b(window).width(), height:b(window).height()} : null;
    return b.extend({}, c, e, g, k);
  };
  e.prototype.getCalculatedOffset = function(b, c, e, k) {
    return "bottom" == b ? {top:c.top + c.height, left:c.left + c.width / 2 - e / 2} : "top" == b ? {top:c.top - k, left:c.left + c.width / 2 - e / 2} : "left" == b ? {top:c.top + c.height / 2 - k / 2, left:c.left - e} : {top:c.top + c.height / 2 - k / 2, left:c.left + c.width};
  };
  e.prototype.getViewportAdjustedDelta = function(b, c, e, k) {
    var n = {top:0, left:0};
    if (!this.$viewport) {
      return n;
    }
    var q = this.options.viewport && this.options.viewport.padding || 0, v = this.getPosition(this.$viewport);
    /right|left/.test(b) ? (e = c.top - q - v.scroll, c = c.top + q - v.scroll + k, e < v.top ? n.top = v.top - e : c > v.top + v.height && (n.top = v.top + v.height - c)) : (k = c.left - q, c = c.left + q + e, k < v.left ? n.left = v.left - k : c > v.right && (n.left = v.left + v.width - c));
    return n;
  };
  e.prototype.getTitle = function() {
    var b = this.$element, c = this.options;
    return b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  };
  e.prototype.getUID = function(b) {
    do {
      b += ~~(1E6 * Math.random());
    } while (document.getElementById(b));
    return b;
  };
  e.prototype.tip = function() {
    if (!this.$tip && (this.$tip = b(this.options.template), 1 != this.$tip.length)) {
      throw Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    }
    return this.$tip;
  };
  e.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  };
  e.prototype.enable = function() {
    this.enabled = !0;
  };
  e.prototype.disable = function() {
    this.enabled = !1;
  };
  e.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled;
  };
  e.prototype.toggle = function(e) {
    var c = this;
    e && (c = b(e.currentTarget).data("bs." + this.type), c || (c = new this.constructor(e.currentTarget, this.getDelegateOptions()), b(e.currentTarget).data("bs." + this.type, c)));
    e ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  };
  e.prototype.destroy = function() {
    var b = this;
    clearTimeout(this.timeout);
    this.hide(function() {
      b.$element.off("." + b.type).removeData("bs." + b.type);
      b.$tip && b.$tip.detach();
      b.$tip = null;
      b.$arrow = null;
      b.$viewport = null;
    });
  };
  var k = b.fn.tooltip;
  b.fn.tooltip = function(h) {
    return this.each(function() {
      var c = b(this), g = c.data("bs.tooltip"), k = "object" == typeof h && h;
      !g && /destroy|hide/.test(h) || (g || c.data("bs.tooltip", g = new e(this, k)), "string" != typeof h || g[h]());
    });
  };
  b.fn.tooltip.Constructor = e;
  b.fn.tooltip.noConflict = function() {
    return b.fn.tooltip = k, this;
  };
}(jQuery);
+function(b) {
  var e = function(b, c) {
    this.init("popover", b, c);
  };
  if (!b.fn.tooltip) {
    throw Error("Popover requires tooltip.js");
  }
  e.VERSION = "3.3.6";
  e.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {placement:"right", trigger:"click", content:"", template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});
  e.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
  e.prototype.constructor = e;
  e.prototype.getDefaults = function() {
    return e.DEFAULTS;
  };
  e.prototype.setContent = function() {
    var b = this.tip(), c = this.getTitle(), e = this.getContent();
    b.find(".popover-title")[this.options.html ? "html" : "text"](c);
    b.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e);
    b.removeClass("fade top bottom left right in");
    b.find(".popover-title").html() || b.find(".popover-title").hide();
  };
  e.prototype.hasContent = function() {
    return this.getTitle() || this.getContent();
  };
  e.prototype.getContent = function() {
    var b = this.$element, c = this.options;
    return b.attr("data-content") || ("function" == typeof c.content ? c.content.call(b[0]) : c.content);
  };
  e.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  var k = b.fn.popover;
  b.fn.popover = function(h) {
    return this.each(function() {
      var c = b(this), g = c.data("bs.popover"), k = "object" == typeof h && h;
      !g && /destroy|hide/.test(h) || (g || c.data("bs.popover", g = new e(this, k)), "string" != typeof h || g[h]());
    });
  };
  b.fn.popover.Constructor = e;
  b.fn.popover.noConflict = function() {
    return b.fn.popover = k, this;
  };
}(jQuery);
+function(b) {
  function e(c, g) {
    this.$body = b(document.body);
    this.$scrollElement = b(b(c).is(document.body) ? window : c);
    this.options = b.extend({}, e.DEFAULTS, g);
    this.selector = (this.options.target || "") + " .nav li > a";
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", b.proxy(this.process, this));
    this.refresh();
    this.process();
  }
  function k(c) {
    return this.each(function() {
      var g = b(this), h = g.data("bs.scrollspy"), k = "object" == typeof c && c;
      h || g.data("bs.scrollspy", h = new e(this, k));
      "string" == typeof c && h[c]();
    });
  }
  e.VERSION = "3.3.6";
  e.DEFAULTS = {offset:10};
  e.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };
  e.prototype.refresh = function() {
    var c = this, e = "offset", h = 0;
    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    b.isWindow(this.$scrollElement[0]) || (e = "position", h = this.$scrollElement.scrollTop());
    this.$body.find(this.selector).map(function() {
      var c = b(this), c = c.data("target") || c.attr("href"), k = /^#./.test(c) && b(c);
      return k && k.length && k.is(":visible") && [[k[e]().top + h, c]] || null;
    }).sort(function(b, c) {
      return b[0] - c[0];
    }).each(function() {
      c.offsets.push(this[0]);
      c.targets.push(this[1]);
    });
  };
  e.prototype.process = function() {
    var b, e = this.$scrollElement.scrollTop() + this.options.offset, h = this.getScrollHeight(), k = this.options.offset + h - this.$scrollElement.height(), q = this.offsets, v = this.targets, z = this.activeTarget;
    if (this.scrollHeight != h && this.refresh(), e >= k) {
      return z != (b = v[v.length - 1]) && this.activate(b);
    }
    if (z && e < q[0]) {
      return this.activeTarget = null, this.clear();
    }
    for (b = q.length;b--;) {
      z != v[b] && e >= q[b] && (void 0 === q[b + 1] || e < q[b + 1]) && this.activate(v[b]);
    }
  };
  e.prototype.activate = function(c) {
    this.activeTarget = c;
    this.clear();
    c = b(this.selector + '[data-target="' + c + '"],' + this.selector + '[href="' + c + '"]').parents("li").addClass("active");
    c.parent(".dropdown-menu").length && (c = c.closest("li.dropdown").addClass("active"));
    c.trigger("activate.bs.scrollspy");
  };
  e.prototype.clear = function() {
    b(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  var h = b.fn.scrollspy;
  b.fn.scrollspy = k;
  b.fn.scrollspy.Constructor = e;
  b.fn.scrollspy.noConflict = function() {
    return b.fn.scrollspy = h, this;
  };
  b(window).on("load.bs.scrollspy.data-api", function() {
    b('[data-spy="scroll"]').each(function() {
      var c = b(this);
      k.call(c, c.data());
    });
  });
}(jQuery);
+function(b) {
  function e(c) {
    return this.each(function() {
      var e = b(this), h = e.data("bs.tab");
      h || e.data("bs.tab", h = new k(this));
      "string" == typeof c && h[c]();
    });
  }
  var k = function(c) {
    this.element = b(c);
  };
  k.VERSION = "3.3.6";
  k.TRANSITION_DURATION = 150;
  k.prototype.show = function() {
    var c = this.element, e = c.closest("ul:not(.dropdown-menu)"), h = c.data("target");
    if (h || (h = c.attr("href"), h = h && h.replace(/.*(?=#[^\s]*$)/, "")), !c.parent("li").hasClass("active")) {
      var k = e.find(".active:last a"), v = b.Event("hide.bs.tab", {relatedTarget:c[0]}), z = b.Event("show.bs.tab", {relatedTarget:k[0]});
      (k.trigger(v), c.trigger(z), z.isDefaultPrevented() || v.isDefaultPrevented()) || (h = b(h), this.activate(c.closest("li"), e), this.activate(h, h.parent(), function() {
        k.trigger({type:"hidden.bs.tab", relatedTarget:c[0]});
        c.trigger({type:"shown.bs.tab", relatedTarget:k[0]});
      }));
    }
  };
  k.prototype.activate = function(c, e, h) {
    function q() {
      v.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
      c.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
      z ? (c[0].offsetWidth, c.addClass("in")) : c.removeClass("fade");
      c.parent(".dropdown-menu").length && c.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
      h && h();
    }
    var v = e.find("> .active"), z = h && b.support.transition && (v.length && v.hasClass("fade") || !!e.find("> .fade").length);
    v.length && z ? v.one("bsTransitionEnd", q).emulateTransitionEnd(k.TRANSITION_DURATION) : q();
    v.removeClass("in");
  };
  var h = b.fn.tab;
  b.fn.tab = e;
  b.fn.tab.Constructor = k;
  b.fn.tab.noConflict = function() {
    return b.fn.tab = h, this;
  };
  var c = function(c) {
    c.preventDefault();
    e.call(b(this), "show");
  };
  b(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', c).on("click.bs.tab.data-api", '[data-toggle="pill"]', c);
}(jQuery);
+function(b) {
  function e(c) {
    return this.each(function() {
      var e = b(this), h = e.data("bs.affix"), n = "object" == typeof c && c;
      h || e.data("bs.affix", h = new k(this, n));
      "string" == typeof c && h[c]();
    });
  }
  var k = function(c, e) {
    this.options = b.extend({}, k.DEFAULTS, e);
    this.$target = b(this.options.target).on("scroll.bs.affix.data-api", b.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", b.proxy(this.checkPositionWithEventLoop, this));
    this.$element = b(c);
    this.pinnedOffset = this.unpin = this.affixed = null;
    this.checkPosition();
  };
  k.VERSION = "3.3.6";
  k.RESET = "affix affix-top affix-bottom";
  k.DEFAULTS = {offset:0, target:window};
  k.prototype.getState = function(b, e, h, k) {
    var q = this.$target.scrollTop(), v = this.$element.offset(), z = this.$target.height();
    if (null != h && "top" == this.affixed) {
      return h > q ? "top" : !1;
    }
    if ("bottom" == this.affixed) {
      return null != h ? q + this.unpin <= v.top ? !1 : "bottom" : b - k >= q + z ? !1 : "bottom";
    }
    var M = null == this.affixed, v = M ? q : v.top;
    return null != h && h >= q ? "top" : null != k && v + (M ? z : e) >= b - k ? "bottom" : !1;
  };
  k.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) {
      return this.pinnedOffset;
    }
    this.$element.removeClass(k.RESET).addClass("affix");
    var b = this.$target.scrollTop();
    return this.pinnedOffset = this.$element.offset().top - b;
  };
  k.prototype.checkPositionWithEventLoop = function() {
    setTimeout(b.proxy(this.checkPosition, this), 1);
  };
  k.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var c = this.$element.height(), e = this.options.offset, h = e.top, n = e.bottom, q = Math.max(b(document).height(), b(document.body).height());
      "object" != typeof e && (n = h = e);
      "function" == typeof h && (h = e.top(this.$element));
      "function" == typeof n && (n = e.bottom(this.$element));
      e = this.getState(q, c, h, n);
      if (this.affixed != e) {
        null != this.unpin && this.$element.css("top", "");
        var h = "affix" + (e ? "-" + e : ""), v = b.Event(h + ".bs.affix");
        if (this.$element.trigger(v), v.isDefaultPrevented()) {
          return;
        }
        this.affixed = e;
        this.unpin = "bottom" == e ? this.getPinnedOffset() : null;
        this.$element.removeClass(k.RESET).addClass(h).trigger(h.replace("affix", "affixed") + ".bs.affix");
      }
      "bottom" == e && this.$element.offset({top:q - c - n});
    }
  };
  var h = b.fn.affix;
  b.fn.affix = e;
  b.fn.affix.Constructor = k;
  b.fn.affix.noConflict = function() {
    return b.fn.affix = h, this;
  };
  b(window).on("load", function() {
    b('[data-spy="affix"]').each(function() {
      var c = b(this), g = c.data();
      g.offset = g.offset || {};
      null != g.offsetBottom && (g.offset.bottom = g.offsetBottom);
      null != g.offsetTop && (g.offset.top = g.offsetTop);
      e.call(c, g);
    });
  });
}(jQuery);
$(function() {
  var b = "";
  $(".bs-docs-section").each(function() {
    var e = $(this).find("h1[id]").first(), k = $(this).find("h2[id], h3[id]");
    e.length && (b += '<li><a href="#' + e[0].id + '">' + e.clone().children().remove().end().text() + "</a>", k.length && (b += '<ul class="nav">', k.each(function() {
      b += '<li><a href="#' + this.id + '">' + $(this).clone().children().remove().end().text() + "</a></li>";
    }), b += "</ul>"), b += "</li>");
  });
  "" == b ? ($("[role=complementary]").hide(), $("[role=main]").toggleClass("col-md-9 col-md-12")) : $(".bs-docs-sidenav").html(b);
  $(function() {
    var b = $(window), k = $(document.body);
    k.scrollspy({target:".bs-docs-sidebar"});
    b.on("load", function() {
      k.scrollspy("refresh");
    });
    $('.bs-docs-container [href="#"]').click(function(b) {
      b.preventDefault();
    });
    setTimeout(function() {
      var b = $(".bs-docs-sidebar");
      b.affix({offset:{top:function() {
        var c = b.offset().top, e = parseInt(b.children(0).css("margin-top"), 10), k = $(".bs-docs-nav").height();
        return this.top = c - k - e;
      }, bottom:function() {
        return this.bottom = $(".bs-docs-footer").outerHeight(!0);
      }}});
    }, 100);
    setTimeout(function() {
      $(".bs-top").affix();
    }, 100);
  });
});
function toggleForm() {
  var b = $("#contact_form"), e = b.is(":visible");
  b.fadeToggle(600);
  b.hasClass("hidden") && b.removeClass("hidden");
  e ? $("#formButton").text("Okay, I'm interested") : $("#formButton").text("Nevermind");
}
$(function() {
  window.matchMedia("only screen and (max-width: 760px)").matches && $(".rates").attr("href", "#rates");
});
$(function() {
  $.getJSON("http://api.fixer.io/latest?base=GBP&symbols=USD&callback=?").done(function(b) {
    $("#usd-rate").text((parseInt($("#gbp-rate").text()) * b.rates.USD).toFixed(2));
  });
});
jQuery(function(b) {
  b("#contact_form").submit(function() {
    if ("" != b("#check").val()) {
      return !1;
    }
    b.ajax({url:"https://formspree.io/arran@bricksandmortarstudio.com", method:"POST", data:{email:b("#email").val(), name:b("#name").val(), message:b("#msg").val()}, dataType:"json"});
    b("#contact_form").fadeToggle(300);
    b("#formButton").text("Thanks.").delay(2E3).fadeOut(400);
    return !1;
  });
});
