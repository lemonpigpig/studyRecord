! function () {
  var r = function (r, n) {
      var t, o, e, f;
      return e = 2147483648 & r, f = 2147483648 & n, t = 1073741824 & r, o = 1073741824 & n, r = (1073741823 & r) + (1073741823 & n), t & o ? 2147483648 ^ r ^ e ^ f : t | o ? 1073741824 & r ? 3221225472 ^ r ^ e ^ f : 1073741824 ^ r ^ e ^ f : r ^ e ^ f
    },
    n = function (n, t, o, e, f, u, a) {
      return n = r(n, r(r(t & o | ~t & e, f), a)), r(n << u | n >>> 32 - u, t)
    },
    t = function (n, t, o, e, f, u, a) {
      return n = r(n, r(r(t & e | o & ~e, f), a)), r(n << u | n >>> 32 - u, t)
    },
    o = function (n, t, o, e, f, u, a) {
      return n = r(n, r(r(t ^ o ^ e, f), a)), r(n << u | n >>> 32 - u, t)
    },
    e = function (n, t, o, e, f, u, a) {
      return n = r(n, r(r(o ^ (t | ~e), f), a)), r(n << u | n >>> 32 - u, t)
    },
    f = function (r) {
      var n, t, o = "";
      for (t = 0; 3 >= t; t++) n = r >>> 8 * t & 255, n = "0" + n.toString(16), o += n.substr(n.length - 2, 2);
      return o
    };
  return md5 = function (u) {
    var a, i, C, c, g, h, d, m, S;
    for (u = u.replace(/\x0d\x0a/g, "\n"), a = "", i = 0; i < u.length; i++) C = u.charCodeAt(i), 128 > C ? a += String.fromCharCode(C) : (C > 127 && 2048 > C ? a += String.fromCharCode(C >> 6 | 192) : (a += String.fromCharCode(C >> 12 | 224), a += String.fromCharCode(C >> 6 & 63 | 128)), a += String.fromCharCode(63 & C | 128));
    for (i = a.length, u = i + 8, c = 16 * ((u - u % 64) / 64 + 1), u = Array(c - 1), h = 0; i > h;) C = (h - h % 4) / 4, g = h % 4 * 8, u[C] |= a.charCodeAt(h) << g, h++;
    for (C = (h - h % 4) / 4, u[C] |= 128 << h % 4 * 8, u[c - 2] = i << 3, u[c - 1] = i >>> 29, h = 1732584193, d = 4023233417, m = 2562383102, S = 271733878, a = 0; a < u.length; a += 16) i = h, C = d, c = m, g = S, h = n(h, d, m, S, u[a + 0], 7, 3614090360), S = n(S, h, d, m, u[a + 1], 12, 3905402710), m = n(m, S, h, d, u[a + 2], 17, 606105819), d = n(d, m, S, h, u[a + 3], 22, 3250441966), h = n(h, d, m, S, u[a + 4], 7, 4118548399), S = n(S, h, d, m, u[a + 5], 12, 1200080426), m = n(m, S, h, d, u[a + 6], 17, 2821735955), d = n(d, m, S, h, u[a + 7], 22, 4249261313), h = n(h, d, m, S, u[a + 8], 7, 1770035416), S = n(S, h, d, m, u[a + 9], 12, 2336552879), m = n(m, S, h, d, u[a + 10], 17, 4294925233), d = n(d, m, S, h, u[a + 11], 22, 2304563134), h = n(h, d, m, S, u[a + 12], 7, 1804603682), S = n(S, h, d, m, u[a + 13], 12, 4254626195), m = n(m, S, h, d, u[a + 14], 17, 2792965006), d = n(d, m, S, h, u[a + 15], 22, 1236535329), h = t(h, d, m, S, u[a + 1], 5, 4129170786), S = t(S, h, d, m, u[a + 6], 9, 3225465664), m = t(m, S, h, d, u[a + 11], 14, 643717713), d = t(d, m, S, h, u[a + 0], 20, 3921069994), h = t(h, d, m, S, u[a + 5], 5, 3593408605), S = t(S, h, d, m, u[a + 10], 9, 38016083), m = t(m, S, h, d, u[a + 15], 14, 3634488961), d = t(d, m, S, h, u[a + 4], 20, 3889429448), h = t(h, d, m, S, u[a + 9], 5, 568446438), S = t(S, h, d, m, u[a + 14], 9, 3275163606), m = t(m, S, h, d, u[a + 3], 14, 4107603335), d = t(d, m, S, h, u[a + 8], 20, 1163531501), h = t(h, d, m, S, u[a + 13], 5, 2850285829), S = t(S, h, d, m, u[a + 2], 9, 4243563512), m = t(m, S, h, d, u[a + 7], 14, 1735328473), d = t(d, m, S, h, u[a + 12], 20, 2368359562), h = o(h, d, m, S, u[a + 5], 4, 4294588738), S = o(S, h, d, m, u[a + 8], 11, 2272392833), m = o(m, S, h, d, u[a + 11], 16, 1839030562), d = o(d, m, S, h, u[a + 14], 23, 4259657740), h = o(h, d, m, S, u[a + 1], 4, 2763975236), S = o(S, h, d, m, u[a + 4], 11, 1272893353), m = o(m, S, h, d, u[a + 7], 16, 4139469664), d = o(d, m, S, h, u[a + 10], 23, 3200236656), h = o(h, d, m, S, u[a + 13], 4, 681279174), S = o(S, h, d, m, u[a + 0], 11, 3936430074), m = o(m, S, h, d, u[a + 3], 16, 3572445317), d = o(d, m, S, h, u[a + 6], 23, 76029189), h = o(h, d, m, S, u[a + 9], 4, 3654602809), S = o(S, h, d, m, u[a + 12], 11, 3873151461), m = o(m, S, h, d, u[a + 15], 16, 530742520), d = o(d, m, S, h, u[a + 2], 23, 3299628645), h = e(h, d, m, S, u[a + 0], 6, 4096336452), S = e(S, h, d, m, u[a + 7], 10, 1126891415), m = e(m, S, h, d, u[a + 14], 15, 2878612391), d = e(d, m, S, h, u[a + 5], 21, 4237533241), h = e(h, d, m, S, u[a + 12], 6, 1700485571), S = e(S, h, d, m, u[a + 3], 10, 2399980690), m = e(m, S, h, d, u[a + 10], 15, 4293915773), d = e(d, m, S, h, u[a + 1], 21, 2240044497), h = e(h, d, m, S, u[a + 8], 6, 1873313359), S = e(S, h, d, m, u[a + 15], 10, 4264355552), m = e(m, S, h, d, u[a + 6], 15, 2734768916), d = e(d, m, S, h, u[a + 13], 21, 1309151649), h = e(h, d, m, S, u[a + 4], 6, 4149444226), S = e(S, h, d, m, u[a + 11], 10, 3174756917), m = e(m, S, h, d, u[a + 2], 15, 718787259), d = e(d, m, S, h, u[a + 9], 21, 3951481745), h = r(h, i), d = r(d, C), m = r(m, c), S = r(S, g);
    return (f(h) + f(d) + f(m) + f(S)).toLowerCase()
  }
}();