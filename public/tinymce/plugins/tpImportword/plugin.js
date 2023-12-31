/*! 
 *  @plugin @tinymce-plugin/tp-importword for tinymce@5.x
 *  @version 0.0.3-beta.6 (2022-7-29) 
 *  @description 导入word文档
 *  @copyright (2022) Li Hailong . All rights reserved. https://github.com/tinymce-plugin/tp-importword
 *  @fixed：blueth007，20230-06-18 more: https://www.npmjs.com/package/docx-preview?activeTab=code
 */
(function() {
	"use strict";
	var Ue = function(i, r) {
		return Ue = Object.setPrototypeOf || {
			__proto__: []
		}
		instanceof Array && function(e, n) {
			e.__proto__ = n
		} || function(e, n) {
			for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
		}, Ue(i, r)
	};

	function be(i, r) {
		if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
		Ue(i, r);

		function e() {
			this.constructor = i
		}
		i.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e)
	}
	var me = function() {
		return me = Object.assign || function(r) {
			for (var e, n = 1, a = arguments.length; n < a; n++) {
				e = arguments[n];
				for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t])
			}
			return r
		}, me.apply(this, arguments)
	};

	function Pr(i, r, e) {
		if (e || arguments.length === 2)
			for (var n = 0, a = r.length, t; n < a; n++)(t || !(n in r)) && (t || (t = Array.prototype.slice.call(r, 0, n)), t[n] = r[n]);
		return i.concat(t || Array.prototype.slice.call(r))
	}
	var de;
	(function(i) {
		i.OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", i.FontTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", i.Image = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", i.Numbering = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", i.Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", i.StylesWithEffects = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects", i.Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", i.Settings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", i.WebSettings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings", i.Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", i.Footnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", i.Endnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", i.Footer = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", i.Header = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", i.ExtendedProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", i.CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", i.CustomProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties"
	})(de || (de = {}));

	function Sr(i, r) {
		return r.elements(i)
			.map(function(e) {
				return {
					id: r.attr(e, "Id"),
					type: r.attr(e, "Type"),
					target: r.attr(e, "Target"),
					targetMode: r.attr(e, "TargetMode")
				}
			})
	}
	var Je = {
			wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
			drawingml: "http://schemas.openxmlformats.org/drawingml/2006/main",
			picture: "http://schemas.openxmlformats.org/drawingml/2006/picture",
			compatibility: "http://schemas.openxmlformats.org/markup-compatibility/2006"
		},
		he = {
			Dxa: {
				mul: .05,
				unit: "pt"
			},
			Emu: {
				mul: 1 / 12700,
				unit: "pt"
			},
			FontSize: {
				mul: .5,
				unit: "pt"
			},
			Border: {
				mul: .125,
				unit: "pt"
			},
			Point: {
				mul: 1,
				unit: "pt"
			},
			Percent: {
				mul: .02,
				unit: "%"
			},
			LineHeight: {
				mul: 1 / 240,
				unit: null
			}
		};

	function $e(i, r) {
		var e;
		return r === void 0 && (r = he.Dxa), i == null || /.+(p[xt]|[%])$/.test(i) ? i : "".concat((parseInt(i) * r.mul)
				.toFixed(2))
			.concat((e = r.unit) !== null && e !== void 0 ? e : "")
	}

	function Or(i, r) {
		switch (r === void 0 && (r = !1), i) {
			case "1":
				return !0;
			case "0":
				return !1;
			case "on":
				return !0;
			case "off":
				return !1;
			case "true":
				return !0;
			case "false":
				return !1;
			default:
				return r
		}
	}

	function Qe(i, r, e) {
		if (i.namespaceURI != Je.wordml) return !1;
		switch (i.localName) {
			case "color":
				r.color = e.attr(i, "val");
				break;
			case "sz":
				r.fontSize = e.lengthAttr(i, "val", he.FontSize);
				break;
			default:
				return !1
		}
		return !0
	}

	function Cr(i, r) {
		r === void 0 && (r = !1), r && (i = i.replace(/<[?].*[?]>/, ""));
		var e = new DOMParser()
			.parseFromString(i, "application/xml"),
			n = Ar(e);
		if (n) throw new Error(n);
		return e
	}

	function Ar(i) {
		var r;
		return (r = i.getElementsByTagName("parsererror")[0]) === null || r === void 0 ? void 0 : r.textContent
	}

	function Er(i) {
		return new XMLSerializer()
			.serializeToString(i)
	}
	var er = function() {
			function i() {}
			return Object.defineProperty(i.prototype, "elements", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e === void 0 && (e = null);
					for (var n = [], a = 0, t = r.childNodes.length; a < t; a++) {
						var o = r.childNodes.item(a);
						o.nodeType == 1 && (e == null || o.localName == e) && n.push(o)
					}
					return n
				}
			}), Object.defineProperty(i.prototype, "element", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					for (var n = 0, a = r.childNodes.length; n < a; n++) {
						var t = r.childNodes.item(n);
						if (t.nodeType == 1 && t.localName == e) return t
					}
					return null
				}
			}), Object.defineProperty(i.prototype, "elementAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					var a = this.element(r, e);
					return a ? this.attr(a, n) : void 0
				}
			}), Object.defineProperty(i.prototype, "attr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					for (var n = 0, a = r.attributes.length; n < a; n++) {
						var t = r.attributes.item(n);
						if (t.localName == e) return t.value
					}
					return null
				}
			}), Object.defineProperty(i.prototype, "intAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					n === void 0 && (n = null);
					var a = this.attr(r, e);
					return a ? parseInt(a) : n
				}
			}), Object.defineProperty(i.prototype, "hexAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					n === void 0 && (n = null);
					var a = this.attr(r, e);
					return a ? parseInt(a, 16) : n
				}
			}), Object.defineProperty(i.prototype, "floatAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					n === void 0 && (n = null);
					var a = this.attr(r, e);
					return a ? parseFloat(a) : n
				}
			}), Object.defineProperty(i.prototype, "boolAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					return n === void 0 && (n = null), Or(this.attr(r, e), n)
				}
			}), Object.defineProperty(i.prototype, "lengthAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					return n === void 0 && (n = he.Dxa), $e(this.attr(r, e), n)
				}
			}), i
		}(),
		B = new er,
		ye = function() {
			function i(r, e) {
				Object.defineProperty(this, "_package", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: r
				}), Object.defineProperty(this, "path", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: e
				}), Object.defineProperty(this, "_xmlDocument", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "rels", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return Object.defineProperty(i.prototype, "load", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					var r = this;
					return Promise.all([this._package.loadRelationships(this.path)
						.then(function(e) {
							r.rels = e
						}), this._package.load(this.path)
						.then(function(e) {
							var n = r._package.parseXmlDocument(e);
							r._package.options.keepOrigin && (r._xmlDocument = n), r.parseXml(n.firstElementChild)
						})
					])
				}
			}), Object.defineProperty(i.prototype, "save", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					this._package.update(this.path, Er(this._xmlDocument))
				}
			}), Object.defineProperty(i.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					console.log("ye parseXml:",r)
				}
			}), i
		}(),
		xr = {
			embedRegular: "regular",
			embedBold: "bold",
			embedItalic: "italic",
			embedBoldItalic: "boldItalic"
		};

	function jr(i, r) {
		return r.elements(i)
			.map(function(e) {
				return Nr(e, r)
			})
	}

	function Nr(i, r) {
		for (var e = {
			name: r.attr(i, "name"),
			embedFontRefs: []
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "family":
					e.family = r.attr(t, "val");
					break;
				case "altName":
					e.altName = r.attr(t, "val");
					break;
				case "embedRegular":
				case "embedBold":
				case "embedItalic":
				case "embedBoldItalic":
					e.embedFontRefs.push(Br(t, r));
					break
			}
		}
		return e
	}

	function Br(i, r) {
		return {
			id: r.attr(i, "id"),
			key: r.attr(i, "fontKey"),
			type: xr[i.localName]
		}
	}
	var zr = function(i) {
			be(r, i);

			function r() {
				var e = i !== null && i.apply(this, arguments) || this;
				return Object.defineProperty(e, "fonts", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), e
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.fonts = jr(e, this._package.xmlParser)
				}
			}), r
		}(ye),
		rr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

	function Be(i) {
		throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
	}
	var tr = {
		exports: {}
	};
	(function(i, r) {
		(function(e) {
			i.exports = e()
		})(function() {
			return function e(n, a, t) {
				function o(f, p) {
					if (!a[f]) {
						if (!n[f]) {
							var b = typeof Be == "function" && Be;
							if (!p && b) return b(f, !0);
							if (u) return u(f, !0);
							var w = new Error("Cannot find module '" + f + "'");
							throw w.code = "MODULE_NOT_FOUND", w
						}
						var h = a[f] = {
							exports: {}
						};
						n[f][0].call(h.exports, function(v) {
							var k = n[f][1][v];
							return o(k || v)
						}, h, h.exports, e, n, a, t)
					}
					return a[f].exports
				}
				for (var u = typeof Be == "function" && Be, l = 0; l < t.length; l++) o(t[l]);
				return o
			}({
				1: [function(e, n, a) {
					var t = e("./utils"),
						o = e("./support"),
						u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
					a.encode = function(l) {
						for (var f, p, b, w, h, v, k, d = [], m = 0, y = l.length, S = y, x = t.getTypeOf(l) !== "string"; m < l.length;) S = y - m, b = x ? (f = l[m++], p = m < y ? l[m++] : 0, m < y ? l[m++] : 0) : (f = l.charCodeAt(m++), p = m < y ? l.charCodeAt(m++) : 0, m < y ? l.charCodeAt(m++) : 0), w = f >> 2, h = (3 & f) << 4 | p >> 4, v = 1 < S ? (15 & p) << 2 | b >> 6 : 64, k = 2 < S ? 63 & b : 64, d.push(u.charAt(w) + u.charAt(h) + u.charAt(v) + u.charAt(k));
						return d.join("")
					}, a.decode = function(l) {
						var f, p, b, w, h, v, k = 0,
							d = 0,
							m = "data:";
						if (l.substr(0, m.length) === m) throw new Error("Invalid base64 input, it looks like a data url.");
						var y, S = 3 * (l = l.replace(/[^A-Za-z0-9\+\/\=]/g, ""))
							.length / 4;
						if (l.charAt(l.length - 1) === u.charAt(64) && S--, l.charAt(l.length - 2) === u.charAt(64) && S--, S % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
						for (y = o.uint8array ? new Uint8Array(0 | S) : new Array(0 | S); k < l.length;) f = u.indexOf(l.charAt(k++)) << 2 | (w = u.indexOf(l.charAt(k++))) >> 4, p = (15 & w) << 4 | (h = u.indexOf(l.charAt(k++))) >> 2, b = (3 & h) << 6 | (v = u.indexOf(l.charAt(k++))), y[d++] = f, h !== 64 && (y[d++] = p), v !== 64 && (y[d++] = b);
						return y
					}
				}, {
					"./support": 30,
					"./utils": 32
				}],
				2: [function(e, n, a) {
					var t = e("./external"),
						o = e("./stream/DataWorker"),
						u = e("./stream/Crc32Probe"),
						l = e("./stream/DataLengthProbe");

					function f(p, b, w, h, v) {
						this.compressedSize = p, this.uncompressedSize = b, this.crc32 = w, this.compression = h, this.compressedContent = v
					}
					f.prototype = {
						getContentWorker: function() {
							var p = new o(t.Promise.resolve(this.compressedContent))
								.pipe(this.compression.uncompressWorker())
								.pipe(new l("data_length")),
								b = this;
							return p.on("end", function() {
								if (this.streamInfo.data_length !== b.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
							}), p
						},
						getCompressedWorker: function() {
							return new o(t.Promise.resolve(this.compressedContent))
								.withStreamInfo("compressedSize", this.compressedSize)
								.withStreamInfo("uncompressedSize", this.uncompressedSize)
								.withStreamInfo("crc32", this.crc32)
								.withStreamInfo("compression", this.compression)
						}
					}, f.createWorkerFrom = function(p, b, w) {
						return p.pipe(new u)
							.pipe(new l("uncompressedSize"))
							.pipe(b.compressWorker(w))
							.pipe(new l("compressedSize"))
							.withStreamInfo("compression", b)
					}, n.exports = f
				}, {
					"./external": 6,
					"./stream/Crc32Probe": 25,
					"./stream/DataLengthProbe": 26,
					"./stream/DataWorker": 27
				}],
				3: [function(e, n, a) {
					var t = e("./stream/GenericWorker");
					a.STORE = {
						magic: "\0\0",
						compressWorker: function(o) {
							return new t("STORE compression")
						},
						uncompressWorker: function() {
							return new t("STORE decompression")
						}
					}, a.DEFLATE = e("./flate")
				}, {
					"./flate": 7,
					"./stream/GenericWorker": 28
				}],
				4: [function(e, n, a) {
					var t = e("./utils"),
						o = function() {
							for (var u, l = [], f = 0; f < 256; f++) {
								u = f;
								for (var p = 0; p < 8; p++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
								l[f] = u
							}
							return l
						}();
					n.exports = function(u, l) {
						return u !== void 0 && u.length ? t.getTypeOf(u) !== "string" ? function(f, p, b, w) {
							var h = o,
								v = w + b;
							f ^= -1;
							for (var k = w; k < v; k++) f = f >>> 8 ^ h[255 & (f ^ p[k])];
							return -1 ^ f
						}(0 | l, u, u.length, 0) : function(f, p, b, w) {
							var h = o,
								v = w + b;
							f ^= -1;
							for (var k = w; k < v; k++) f = f >>> 8 ^ h[255 & (f ^ p.charCodeAt(k))];
							return -1 ^ f
						}(0 | l, u, u.length, 0) : 0
					}
				}, {
					"./utils": 32
				}],
				5: [function(e, n, a) {
					a.base64 = !1, a.binary = !1, a.dir = !1, a.createFolders = !0, a.date = null, a.compression = null, a.compressionOptions = null, a.comment = null, a.unixPermissions = null, a.dosPermissions = null
				}, {}],
				6: [function(e, n, a) {
					var t = null;
					t = typeof Promise < "u" ? Promise : e("lie"), n.exports = {
						Promise: t
					}
				}, {
					lie: 37
				}],
				7: [function(e, n, a) {
					var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u",
						o = e("pako"),
						u = e("./utils"),
						l = e("./stream/GenericWorker"),
						f = t ? "uint8array" : "array";

					function p(b, w) {
						l.call(this, "FlateWorker/" + b), this._pako = null, this._pakoAction = b, this._pakoOptions = w, this.meta = {}
					}
					a.magic = "\b\0", u.inherits(p, l), p.prototype.processChunk = function(b) {
						this.meta = b.meta, this._pako === null && this._createPako(), this._pako.push(u.transformTo(f, b.data), !1)
					}, p.prototype.flush = function() {
						l.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0)
					}, p.prototype.cleanUp = function() {
						l.prototype.cleanUp.call(this), this._pako = null
					}, p.prototype._createPako = function() {
						this._pako = new o[this._pakoAction]({
							raw: !0,
							level: this._pakoOptions.level || -1
						});
						var b = this;
						this._pako.onData = function(w) {
							b.push({
								data: w,
								meta: b.meta
							})
						}
					}, a.compressWorker = function(b) {
						return new p("Deflate", b)
					}, a.uncompressWorker = function() {
						return new p("Inflate", {})
					}
				}, {
					"./stream/GenericWorker": 28,
					"./utils": 32,
					pako: 38
				}],
				8: [function(e, n, a) {
					function t(h, v) {
						var k, d = "";
						for (k = 0; k < v; k++) d += String.fromCharCode(255 & h), h >>>= 8;
						return d
					}

					function o(h, v, k, d, m, y) {
						var S, x, C = h.file,
							D = h.compression,
							F = y !== f.utf8encode,
							U = u.transformTo("string", y(C.name)),
							N = u.transformTo("string", f.utf8encode(C.name)),
							G = C.comment,
							Q = u.transformTo("string", y(G)),
							P = u.transformTo("string", f.utf8encode(G)),
							T = N.length !== C.name.length,
							c = P.length !== G.length,
							R = "",
							re = "",
							W = "",
							te = C.dir,
							H = C.date,
							ee = {
								crc32: 0,
								compressedSize: 0,
								uncompressedSize: 0
							};
						v && !k || (ee.crc32 = h.crc32, ee.compressedSize = h.compressedSize, ee.uncompressedSize = h.uncompressedSize);
						var j = 0;
						v && (j |= 8), F || !T && !c || (j |= 2048);
						var E = 0,
							$ = 0;
						te && (E |= 16), m === "UNIX" ? ($ = 798, E |= function(V, ue) {
							var ve = V;
							return V || (ve = ue ? 16893 : 33204), (65535 & ve) << 16
						}(C.unixPermissions, te)) : ($ = 20, E |= function(V) {
							return 63 & (V || 0)
						}(C.dosPermissions)), S = H.getUTCHours(), S <<= 6, S |= H.getUTCMinutes(), S <<= 5, S |= H.getUTCSeconds() / 2, x = H.getUTCFullYear() - 1980, x <<= 4, x |= H.getUTCMonth() + 1, x <<= 5, x |= H.getUTCDate(), T && (re = t(1, 1) + t(p(U), 4) + N, R += "up" + t(re.length, 2) + re), c && (W = t(1, 1) + t(p(Q), 4) + P, R += "uc" + t(W.length, 2) + W);
						var K = "";
						return K += `\0`, K += t(j, 2), K += D.magic, K += t(S, 2), K += t(x, 2), K += t(ee.crc32, 4), K += t(ee.compressedSize, 4), K += t(ee.uncompressedSize, 4), K += t(U.length, 2), K += t(R.length, 2), {
							fileRecord: b.LOCAL_FILE_HEADER + K + U + R,
							dirRecord: b.CENTRAL_FILE_HEADER + t($, 2) + K + t(Q.length, 2) + "\0\0\0\0" + t(E, 4) + t(d, 4) + U + R + Q
						}
					}
					var u = e("../utils"),
						l = e("../stream/GenericWorker"),
						f = e("../utf8"),
						p = e("../crc32"),
						b = e("../signature");

					function w(h, v, k, d) {
						l.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = v, this.zipPlatform = k, this.encodeFileName = d, this.streamFiles = h, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
					}
					u.inherits(w, l), w.prototype.push = function(h) {
						var v = h.meta.percent || 0,
							k = this.entriesCount,
							d = this._sources.length;
						this.accumulate ? this.contentBuffer.push(h) : (this.bytesWritten += h.data.length, l.prototype.push.call(this, {
							data: h.data,
							meta: {
								currentFile: this.currentFile,
								percent: k ? (v + 100 * (k - d - 1)) / k : 100
							}
						}))
					}, w.prototype.openedSource = function(h) {
						this.currentSourceOffset = this.bytesWritten, this.currentFile = h.file.name;
						var v = this.streamFiles && !h.file.dir;
						if (v) {
							var k = o(h, v, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
							this.push({
								data: k.fileRecord,
								meta: {
									percent: 0
								}
							})
						} else this.accumulate = !0
					}, w.prototype.closedSource = function(h) {
						this.accumulate = !1;
						var v = this.streamFiles && !h.file.dir,
							k = o(h, v, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
						if (this.dirRecords.push(k.dirRecord), v) this.push({
							data: function(d) {
								return b.DATA_DESCRIPTOR + t(d.crc32, 4) + t(d.compressedSize, 4) + t(d.uncompressedSize, 4)
							}(h),
							meta: {
								percent: 100
							}
						});
						else
							for (this.push({
								data: k.fileRecord,
								meta: {
									percent: 0
								}
							}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
						this.currentFile = null
					}, w.prototype.flush = function() {
						for (var h = this.bytesWritten, v = 0; v < this.dirRecords.length; v++) this.push({
							data: this.dirRecords[v],
							meta: {
								percent: 100
							}
						});
						var k = this.bytesWritten - h,
							d = function(m, y, S, x, C) {
								var D = u.transformTo("string", C(x));
								return b.CENTRAL_DIRECTORY_END + "\0\0\0\0" + t(m, 2) + t(m, 2) + t(y, 4) + t(S, 4) + t(D.length, 2) + D
							}(this.dirRecords.length, k, h, this.zipComment, this.encodeFileName);
						this.push({
							data: d,
							meta: {
								percent: 100
							}
						})
					}, w.prototype.prepareNextSource = function() {
						this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
					}, w.prototype.registerPrevious = function(h) {
						this._sources.push(h);
						var v = this;
						return h.on("data", function(k) {
							v.processChunk(k)
						}), h.on("end", function() {
							v.closedSource(v.previous.streamInfo), v._sources.length ? v.prepareNextSource() : v.end()
						}), h.on("error", function(k) {
							v.error(k)
						}), this
					}, w.prototype.resume = function() {
						return !!l.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
					}, w.prototype.error = function(h) {
						var v = this._sources;
						if (!l.prototype.error.call(this, h)) return !1;
						for (var k = 0; k < v.length; k++) try {
							v[k].error(h)
						} catch {}
						return !0
					}, w.prototype.lock = function() {
						l.prototype.lock.call(this);
						for (var h = this._sources, v = 0; v < h.length; v++) h[v].lock()
					}, n.exports = w
				}, {
					"../crc32": 4,
					"../signature": 23,
					"../stream/GenericWorker": 28,
					"../utf8": 31,
					"../utils": 32
				}],
				9: [function(e, n, a) {
					var t = e("../compressions"),
						o = e("./ZipFileWorker");
					a.generateWorker = function(u, l, f) {
						var p = new o(l.streamFiles, f, l.platform, l.encodeFileName),
							b = 0;
						try {
							u.forEach(function(w, h) {
								b++;
								var v = function(y, S) {
										var x = y || S,
											C = t[x];
										if (!C) throw new Error(x + " is not a valid compression method !");
										return C
									}(h.options.compression, l.compression),
									k = h.options.compressionOptions || l.compressionOptions || {},
									d = h.dir,
									m = h.date;
								h._compressWorker(v, k)
									.withStreamInfo("file", {
										name: w,
										dir: d,
										date: m,
										comment: h.comment || "",
										unixPermissions: h.unixPermissions,
										dosPermissions: h.dosPermissions
									})
									.pipe(p)
							}), p.entriesCount = b
						} catch (w) {
							p.error(w)
						}
						return p
					}
				}, {
					"../compressions": 3,
					"./ZipFileWorker": 8
				}],
				10: [function(e, n, a) {
					function t() {
						if (!(this instanceof t)) return new t;
						if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
						this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
							var o = new t;
							for (var u in this) typeof this[u] != "function" && (o[u] = this[u]);
							return o
						}
					}(t.prototype = e("./object"))
					.loadAsync = e("./load"), t.support = e("./support"), t.defaults = e("./defaults"), t.version = "3.9.1", t.loadAsync = function(o, u) {
						return new t()
							.loadAsync(o, u)
					}, t.external = e("./external"), n.exports = t
				}, {
					"./defaults": 5,
					"./external": 6,
					"./load": 11,
					"./object": 15,
					"./support": 30
				}],
				11: [function(e, n, a) {
					var t = e("./utils"),
						o = e("./external"),
						u = e("./utf8"),
						l = e("./zipEntries"),
						f = e("./stream/Crc32Probe"),
						p = e("./nodejsUtils");

					function b(w) {
						return new o.Promise(function(h, v) {
							var k = w.decompressed.getContentWorker()
								.pipe(new f);
							k.on("error", function(d) {
									v(d)
								})
								.on("end", function() {
									k.streamInfo.crc32 !== w.decompressed.crc32 ? v(new Error("Corrupted zip : CRC32 mismatch")) : h()
								})
								.resume()
						})
					}
					n.exports = function(w, h) {
						var v = this;
						return h = t.extend(h || {}, {
								base64: !1,
								checkCRC32: !1,
								optimizedBinaryString: !1,
								createFolders: !1,
								decodeFileName: u.utf8decode
							}), p.isNode && p.isStream(w) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : t.prepareContent("the loaded zip file", w, !0, h.optimizedBinaryString, h.base64)
							.then(function(k) {
								var d = new l(h);
								return d.load(k), d
							})
							.then(function(k) {
								var d = [o.Promise.resolve(k)],
									m = k.files;
								if (h.checkCRC32)
									for (var y = 0; y < m.length; y++) d.push(b(m[y]));
								return o.Promise.all(d)
							})
							.then(function(k) {
								for (var d = k.shift(), m = d.files, y = 0; y < m.length; y++) {
									var S = m[y],
										x = S.fileNameStr,
										C = t.resolve(S.fileNameStr);
									v.file(C, S.decompressed, {
										binary: !0,
										optimizedBinaryString: !0,
										date: S.date,
										dir: S.dir,
										comment: S.fileCommentStr.length ? S.fileCommentStr : null,
										unixPermissions: S.unixPermissions,
										dosPermissions: S.dosPermissions,
										createFolders: h.createFolders
									}), S.dir || (v.file(C)
										.unsafeOriginalName = x)
								}
								return d.zipComment.length && (v.comment = d.zipComment), v
							})
					}
				}, {
					"./external": 6,
					"./nodejsUtils": 14,
					"./stream/Crc32Probe": 25,
					"./utf8": 31,
					"./utils": 32,
					"./zipEntries": 33
				}],
				12: [function(e, n, a) {
					var t = e("../utils"),
						o = e("../stream/GenericWorker");

					function u(l, f) {
						o.call(this, "Nodejs stream input adapter for " + l), this._upstreamEnded = !1, this._bindStream(f)
					}
					t.inherits(u, o), u.prototype._bindStream = function(l) {
						var f = this;
						(this._stream = l)
						.pause(), l.on("data", function(p) {
								f.push({
									data: p,
									meta: {
										percent: 0
									}
								})
							})
							.on("error", function(p) {
								f.isPaused ? this.generatedError = p : f.error(p)
							})
							.on("end", function() {
								f.isPaused ? f._upstreamEnded = !0 : f.end()
							})
					}, u.prototype.pause = function() {
						return !!o.prototype.pause.call(this) && (this._stream.pause(), !0)
					}, u.prototype.resume = function() {
						return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
					}, n.exports = u
				}, {
					"../stream/GenericWorker": 28,
					"../utils": 32
				}],
				13: [function(e, n, a) {
					var t = e("readable-stream")
						.Readable;

					function o(u, l, f) {
						t.call(this, l), this._helper = u;
						var p = this;
						u.on("data", function(b, w) {
								p.push(b) || p._helper.pause(), f && f(w)
							})
							.on("error", function(b) {
								p.emit("error", b)
							})
							.on("end", function() {
								p.push(null)
							})
					}
					e("../utils")
						.inherits(o, t), o.prototype._read = function() {
							this._helper.resume()
						}, n.exports = o
				}, {
					"../utils": 32,
					"readable-stream": 16
				}],
				14: [function(e, n, a) {
					n.exports = {
						isNode: typeof Buffer < "u",
						newBufferFrom: function(t, o) {
							if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(t, o);
							if (typeof t == "number") throw new Error('The "data" argument must not be a number');
							return new Buffer(t, o)
						},
						allocBuffer: function(t) {
							if (Buffer.alloc) return Buffer.alloc(t);
							var o = new Buffer(t);
							return o.fill(0), o
						},
						isBuffer: function(t) {
							return Buffer.isBuffer(t)
						},
						isStream: function(t) {
							return t && typeof t.on == "function" && typeof t.pause == "function" && typeof t.resume == "function"
						}
					}
				}, {}],
				15: [function(e, n, a) {
					function t(C, D, F) {
						var U, N = u.getTypeOf(D),
							G = u.extend(F || {}, p);
						G.date = G.date || new Date, G.compression !== null && (G.compression = G.compression.toUpperCase()), typeof G.unixPermissions == "string" && (G.unixPermissions = parseInt(G.unixPermissions, 8)), G.unixPermissions && 16384 & G.unixPermissions && (G.dir = !0), G.dosPermissions && 16 & G.dosPermissions && (G.dir = !0), G.dir && (C = m(C)), G.createFolders && (U = d(C)) && y.call(this, U, !0);
						var Q = N === "string" && G.binary === !1 && G.base64 === !1;
						F && F.binary !== void 0 || (G.binary = !Q), (D instanceof b && D.uncompressedSize === 0 || G.dir || !D || D.length === 0) && (G.base64 = !1, G.binary = !0, D = "", G.compression = "STORE", N = "string");
						var P = null;
						P = D instanceof b || D instanceof l ? D : v.isNode && v.isStream(D) ? new k(C, D) : u.prepareContent(C, D, G.binary, G.optimizedBinaryString, G.base64);
						var T = new w(C, P, G);
						this.files[C] = T
					}
					var o = e("./utf8"),
						u = e("./utils"),
						l = e("./stream/GenericWorker"),
						f = e("./stream/StreamHelper"),
						p = e("./defaults"),
						b = e("./compressedObject"),
						w = e("./zipObject"),
						h = e("./generate"),
						v = e("./nodejsUtils"),
						k = e("./nodejs/NodejsStreamInputAdapter"),
						d = function(C) {
							C.slice(-1) === "/" && (C = C.substring(0, C.length - 1));
							var D = C.lastIndexOf("/");
							return 0 < D ? C.substring(0, D) : ""
						},
						m = function(C) {
							return C.slice(-1) !== "/" && (C += "/"), C
						},
						y = function(C, D) {
							return D = D !== void 0 ? D : p.createFolders, C = m(C), this.files[C] || t.call(this, C, null, {
								dir: !0,
								createFolders: D
							}), this.files[C]
						};

					function S(C) {
						return Object.prototype.toString.call(C) === "[object RegExp]"
					}
					var x = {
						load: function() {
							throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
						},
						forEach: function(C) {
							var D, F, U;
							for (D in this.files) U = this.files[D], (F = D.slice(this.root.length, D.length)) && D.slice(0, this.root.length) === this.root && C(F, U)
						},
						filter: function(C) {
							var D = [];
							return this.forEach(function(F, U) {
								C(F, U) && D.push(U)
							}), D
						},
						file: function(C, D, F) {
							if (arguments.length !== 1) return C = this.root + C, t.call(this, C, D, F), this;
							if (S(C)) {
								var U = C;
								return this.filter(function(G, Q) {
									return !Q.dir && U.test(G)
								})
							}
							var N = this.files[this.root + C];
							return N && !N.dir ? N : null
						},
						folder: function(C) {
							if (!C) return this;
							if (S(C)) return this.filter(function(N, G) {
								return G.dir && C.test(N)
							});
							var D = this.root + C,
								F = y.call(this, D),
								U = this.clone();
							return U.root = F.name, U
						},
						remove: function(C) {
							C = this.root + C;
							var D = this.files[C];
							if (D || (C.slice(-1) !== "/" && (C += "/"), D = this.files[C]), D && !D.dir) delete this.files[C];
							else
								for (var F = this.filter(function(N, G) {
									return G.name.slice(0, C.length) === C
								}), U = 0; U < F.length; U++) delete this.files[F[U].name];
							return this
						},
						generate: function(C) {
							throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
						},
						generateInternalStream: function(C) {
							var D, F = {};
							try {
								if ((F = u.extend(C || {}, {
										streamFiles: !1,
										compression: "STORE",
										compressionOptions: null,
										type: "",
										platform: "DOS",
										comment: null,
										mimeType: "application/zip",
										encodeFileName: o.utf8encode
									}))
									.type = F.type.toLowerCase(), F.compression = F.compression.toUpperCase(), F.type === "binarystring" && (F.type = "string"), !F.type) throw new Error("No output type specified.");
								u.checkSupport(F.type), F.platform !== "darwin" && F.platform !== "freebsd" && F.platform !== "linux" && F.platform !== "sunos" || (F.platform = "UNIX"), F.platform === "win32" && (F.platform = "DOS");
								var U = F.comment || this.comment || "";
								D = h.generateWorker(this, F, U)
							} catch (N) {
								(D = new l("error"))
								.error(N)
							}
							return new f(D, F.type || "string", F.mimeType)
						},
						generateAsync: function(C, D) {
							return this.generateInternalStream(C)
								.accumulate(D)
						},
						generateNodeStream: function(C, D) {
							return (C = C || {})
								.type || (C.type = "nodebuffer"), this.generateInternalStream(C)
								.toNodejsStream(D)
						}
					};
					n.exports = x
				}, {
					"./compressedObject": 2,
					"./defaults": 5,
					"./generate": 9,
					"./nodejs/NodejsStreamInputAdapter": 12,
					"./nodejsUtils": 14,
					"./stream/GenericWorker": 28,
					"./stream/StreamHelper": 29,
					"./utf8": 31,
					"./utils": 32,
					"./zipObject": 35
				}],
				16: [function(e, n, a) {
					n.exports = e("stream")
				}, {
					stream: void 0
				}],
				17: [function(e, n, a) {
					var t = e("./DataReader");

					function o(u) {
						t.call(this, u);
						for (var l = 0; l < this.data.length; l++) u[l] = 255 & u[l]
					}
					e("../utils")
						.inherits(o, t), o.prototype.byteAt = function(u) {
							return this.data[this.zero + u]
						}, o.prototype.lastIndexOfSignature = function(u) {
							for (var l = u.charCodeAt(0), f = u.charCodeAt(1), p = u.charCodeAt(2), b = u.charCodeAt(3), w = this.length - 4; 0 <= w; --w)
								if (this.data[w] === l && this.data[w + 1] === f && this.data[w + 2] === p && this.data[w + 3] === b) return w - this.zero;
							return -1
						}, o.prototype.readAndCheckSignature = function(u) {
							var l = u.charCodeAt(0),
								f = u.charCodeAt(1),
								p = u.charCodeAt(2),
								b = u.charCodeAt(3),
								w = this.readData(4);
							return l === w[0] && f === w[1] && p === w[2] && b === w[3]
						}, o.prototype.readData = function(u) {
							if (this.checkOffset(u), u === 0) return [];
							var l = this.data.slice(this.zero + this.index, this.zero + this.index + u);
							return this.index += u, l
						}, n.exports = o
				}, {
					"../utils": 32,
					"./DataReader": 18
				}],
				18: [function(e, n, a) {
					var t = e("../utils");

					function o(u) {
						this.data = u, this.length = u.length, this.index = 0, this.zero = 0
					}
					o.prototype = {
						checkOffset: function(u) {
							this.checkIndex(this.index + u)
						},
						checkIndex: function(u) {
							if (this.length < this.zero + u || u < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + u + "). Corrupted zip ?")
						},
						setIndex: function(u) {
							this.checkIndex(u), this.index = u
						},
						skip: function(u) {
							this.setIndex(this.index + u)
						},
						byteAt: function(u) {},
						readInt: function(u) {
							var l, f = 0;
							for (this.checkOffset(u), l = this.index + u - 1; l >= this.index; l--) f = (f << 8) + this.byteAt(l);
							return this.index += u, f
						},
						readString: function(u) {
							return t.transformTo("string", this.readData(u))
						},
						readData: function(u) {},
						lastIndexOfSignature: function(u) {},
						readAndCheckSignature: function(u) {},
						readDate: function() {
							var u = this.readInt(4);
							return new Date(Date.UTC(1980 + (u >> 25 & 127), (u >> 21 & 15) - 1, u >> 16 & 31, u >> 11 & 31, u >> 5 & 63, (31 & u) << 1))
						}
					}, n.exports = o
				}, {
					"../utils": 32
				}],
				19: [function(e, n, a) {
					var t = e("./Uint8ArrayReader");

					function o(u) {
						t.call(this, u)
					}
					e("../utils")
						.inherits(o, t), o.prototype.readData = function(u) {
							this.checkOffset(u);
							var l = this.data.slice(this.zero + this.index, this.zero + this.index + u);
							return this.index += u, l
						}, n.exports = o
				}, {
					"../utils": 32,
					"./Uint8ArrayReader": 21
				}],
				20: [function(e, n, a) {
					var t = e("./DataReader");

					function o(u) {
						t.call(this, u)
					}
					e("../utils")
						.inherits(o, t), o.prototype.byteAt = function(u) {
							return this.data.charCodeAt(this.zero + u)
						}, o.prototype.lastIndexOfSignature = function(u) {
							return this.data.lastIndexOf(u) - this.zero
						}, o.prototype.readAndCheckSignature = function(u) {
							return u === this.readData(4)
						}, o.prototype.readData = function(u) {
							this.checkOffset(u);
							var l = this.data.slice(this.zero + this.index, this.zero + this.index + u);
							return this.index += u, l
						}, n.exports = o
				}, {
					"../utils": 32,
					"./DataReader": 18
				}],
				21: [function(e, n, a) {
					var t = e("./ArrayReader");

					function o(u) {
						t.call(this, u)
					}
					e("../utils")
						.inherits(o, t), o.prototype.readData = function(u) {
							if (this.checkOffset(u), u === 0) return new Uint8Array(0);
							var l = this.data.subarray(this.zero + this.index, this.zero + this.index + u);
							return this.index += u, l
						}, n.exports = o
				}, {
					"../utils": 32,
					"./ArrayReader": 17
				}],
				22: [function(e, n, a) {
					var t = e("../utils"),
						o = e("../support"),
						u = e("./ArrayReader"),
						l = e("./StringReader"),
						f = e("./NodeBufferReader"),
						p = e("./Uint8ArrayReader");
					n.exports = function(b) {
						var w = t.getTypeOf(b);
						return t.checkSupport(w), w !== "string" || o.uint8array ? w === "nodebuffer" ? new f(b) : o.uint8array ? new p(t.transformTo("uint8array", b)) : new u(t.transformTo("array", b)) : new l(b)
					}
				}, {
					"../support": 30,
					"../utils": 32,
					"./ArrayReader": 17,
					"./NodeBufferReader": 19,
					"./StringReader": 20,
					"./Uint8ArrayReader": 21
				}],
				23: [function(e, n, a) {
					a.LOCAL_FILE_HEADER = "PK", a.CENTRAL_FILE_HEADER = "PK", a.CENTRAL_DIRECTORY_END = "PK", a.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", a.ZIP64_CENTRAL_DIRECTORY_END = "PK", a.DATA_DESCRIPTOR = "PK\x07\b"
				}, {}],
				24: [function(e, n, a) {
					var t = e("./GenericWorker"),
						o = e("../utils");

					function u(l) {
						t.call(this, "ConvertWorker to " + l), this.destType = l
					}
					o.inherits(u, t), u.prototype.processChunk = function(l) {
						this.push({
							data: o.transformTo(this.destType, l.data),
							meta: l.meta
						})
					}, n.exports = u
				}, {
					"../utils": 32,
					"./GenericWorker": 28
				}],
				25: [function(e, n, a) {
					var t = e("./GenericWorker"),
						o = e("../crc32");

					function u() {
						t.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0)
					}
					e("../utils")
						.inherits(u, t), u.prototype.processChunk = function(l) {
							this.streamInfo.crc32 = o(l.data, this.streamInfo.crc32 || 0), this.push(l)
						}, n.exports = u
				}, {
					"../crc32": 4,
					"../utils": 32,
					"./GenericWorker": 28
				}],
				26: [function(e, n, a) {
					var t = e("../utils"),
						o = e("./GenericWorker");

					function u(l) {
						o.call(this, "DataLengthProbe for " + l), this.propName = l, this.withStreamInfo(l, 0)
					}
					t.inherits(u, o), u.prototype.processChunk = function(l) {
						if (l) {
							var f = this.streamInfo[this.propName] || 0;
							this.streamInfo[this.propName] = f + l.data.length
						}
						o.prototype.processChunk.call(this, l)
					}, n.exports = u
				}, {
					"../utils": 32,
					"./GenericWorker": 28
				}],
				27: [function(e, n, a) {
					var t = e("../utils"),
						o = e("./GenericWorker");

					function u(l) {
						o.call(this, "DataWorker");
						var f = this;
						this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, l.then(function(p) {
							f.dataIsReady = !0, f.data = p, f.max = p && p.length || 0, f.type = t.getTypeOf(p), f.isPaused || f._tickAndRepeat()
						}, function(p) {
							f.error(p)
						})
					}
					t.inherits(u, o), u.prototype.cleanUp = function() {
						o.prototype.cleanUp.call(this), this.data = null
					}, u.prototype.resume = function() {
						return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, t.delay(this._tickAndRepeat, [], this)), !0)
					}, u.prototype._tickAndRepeat = function() {
						this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (t.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
					}, u.prototype._tick = function() {
						if (this.isPaused || this.isFinished) return !1;
						var l = null,
							f = Math.min(this.max, this.index + 16384);
						if (this.index >= this.max) return this.end();
						switch (this.type) {
							case "string":
								l = this.data.substring(this.index, f);
								break;
							case "uint8array":
								l = this.data.subarray(this.index, f);
								break;
							case "array":
							case "nodebuffer":
								l = this.data.slice(this.index, f)
						}
						return this.index = f, this.push({
							data: l,
							meta: {
								percent: this.max ? this.index / this.max * 100 : 0
							}
						})
					}, n.exports = u
				}, {
					"../utils": 32,
					"./GenericWorker": 28
				}],
				28: [function(e, n, a) {
					function t(o) {
						this.name = o || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
							data: [],
							end: [],
							error: []
						}, this.previous = null
					}
					t.prototype = {
						push: function(o) {
							this.emit("data", o)
						},
						end: function() {
							if (this.isFinished) return !1;
							this.flush();
							try {
								this.emit("end"), this.cleanUp(), this.isFinished = !0
							} catch (o) {
								this.emit("error", o)
							}
							return !0
						},
						error: function(o) {
							return !this.isFinished && (this.isPaused ? this.generatedError = o : (this.isFinished = !0, this.emit("error", o), this.previous && this.previous.error(o), this.cleanUp()), !0)
						},
						on: function(o, u) {
							return this._listeners[o].push(u), this
						},
						cleanUp: function() {
							this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
						},
						emit: function(o, u) {
							if (this._listeners[o])
								for (var l = 0; l < this._listeners[o].length; l++) this._listeners[o][l].call(this, u)
						},
						pipe: function(o) {
							return o.registerPrevious(this)
						},
						registerPrevious: function(o) {
							if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
							this.streamInfo = o.streamInfo, this.mergeStreamInfo(), this.previous = o;
							var u = this;
							return o.on("data", function(l) {
								u.processChunk(l)
							}), o.on("end", function() {
								u.end()
							}), o.on("error", function(l) {
								u.error(l)
							}), this
						},
						pause: function() {
							return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
						},
						resume: function() {
							if (!this.isPaused || this.isFinished) return !1;
							var o = this.isPaused = !1;
							return this.generatedError && (this.error(this.generatedError), o = !0), this.previous && this.previous.resume(), !o
						},
						flush: function() {},
						processChunk: function(o) {
							this.push(o)
						},
						withStreamInfo: function(o, u) {
							return this.extraStreamInfo[o] = u, this.mergeStreamInfo(), this
						},
						mergeStreamInfo: function() {
							for (var o in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(o) && (this.streamInfo[o] = this.extraStreamInfo[o])
						},
						lock: function() {
							if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
							this.isLocked = !0, this.previous && this.previous.lock()
						},
						toString: function() {
							var o = "Worker " + this.name;
							return this.previous ? this.previous + " -> " + o : o
						}
					}, n.exports = t
				}, {}],
				29: [function(e, n, a) {
					var t = e("../utils"),
						o = e("./ConvertWorker"),
						u = e("./GenericWorker"),
						l = e("../base64"),
						f = e("../support"),
						p = e("../external"),
						b = null;
					if (f.nodestream) try {
						b = e("../nodejs/NodejsStreamOutputAdapter")
					} catch {}

					function w(v, k) {
						return new p.Promise(function(d, m) {
							var y = [],
								S = v._internalType,
								x = v._outputType,
								C = v._mimeType;
							v.on("data", function(D, F) {
									y.push(D), k && k(F)
								})
								.on("error", function(D) {
									y = [], m(D)
								})
								.on("end", function() {
									try {
										var D = function(F, U, N) {
											switch (F) {
												case "blob":
													return t.newBlob(t.transformTo("arraybuffer", U), N);
												case "base64":
													return l.encode(U);
												default:
													return t.transformTo(F, U)
											}
										}(x, function(F, U) {
											var N, G = 0,
												Q = null,
												P = 0;
											for (N = 0; N < U.length; N++) P += U[N].length;
											switch (F) {
												case "string":
													return U.join("");
												case "array":
													return Array.prototype.concat.apply([], U);
												case "uint8array":
													for (Q = new Uint8Array(P), N = 0; N < U.length; N++) Q.set(U[N], G), G += U[N].length;
													return Q;
												case "nodebuffer":
													return Buffer.concat(U);
												default:
													throw new Error("concat : unsupported type '" + F + "'")
											}
										}(S, y), C);
										d(D)
									} catch (F) {
										m(F)
									}
									y = []
								})
								.resume()
						})
					}

					function h(v, k, d) {
						var m = k;
						switch (k) {
							case "blob":
							case "arraybuffer":
								m = "uint8array";
								break;
							case "base64":
								m = "string"
						}
						try {
							this._internalType = m, this._outputType = k, this._mimeType = d, t.checkSupport(m), this._worker = v.pipe(new o(m)), v.lock()
						} catch (y) {
							this._worker = new u("error"), this._worker.error(y)
						}
					}
					h.prototype = {
						accumulate: function(v) {
							return w(this, v)
						},
						on: function(v, k) {
							var d = this;
							return v === "data" ? this._worker.on(v, function(m) {
								k.call(d, m.data, m.meta)
							}) : this._worker.on(v, function() {
								t.delay(k, arguments, d)
							}), this
						},
						resume: function() {
							return t.delay(this._worker.resume, [], this._worker), this
						},
						pause: function() {
							return this._worker.pause(), this
						},
						toNodejsStream: function(v) {
							if (t.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
							return new b(this, {
								objectMode: this._outputType !== "nodebuffer"
							}, v)
						}
					}, n.exports = h
				}, {
					"../base64": 1,
					"../external": 6,
					"../nodejs/NodejsStreamOutputAdapter": 13,
					"../support": 30,
					"../utils": 32,
					"./ConvertWorker": 24,
					"./GenericWorker": 28
				}],
				30: [function(e, n, a) {
					if (a.base64 = !0, a.array = !0, a.string = !0, a.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", a.nodebuffer = typeof Buffer < "u", a.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") a.blob = !1;
					else {
						var t = new ArrayBuffer(0);
						try {
							a.blob = new Blob([t], {
									type: "application/zip"
								})
								.size === 0
						} catch {
							try {
								var o = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
								o.append(t), a.blob = o.getBlob("application/zip")
									.size === 0
							} catch {
								a.blob = !1
							}
						}
					}
					try {
						a.nodestream = !!e("readable-stream")
							.Readable
					} catch {
						a.nodestream = !1
					}
				}, {
					"readable-stream": 16
				}],
				31: [function(e, n, a) {
					for (var t = e("./utils"), o = e("./support"), u = e("./nodejsUtils"), l = e("./stream/GenericWorker"), f = new Array(256), p = 0; p < 256; p++) f[p] = 252 <= p ? 6 : 248 <= p ? 5 : 240 <= p ? 4 : 224 <= p ? 3 : 192 <= p ? 2 : 1;
					f[254] = f[254] = 1;

					function b() {
						l.call(this, "utf-8 decode"), this.leftOver = null
					}

					function w() {
						l.call(this, "utf-8 encode")
					}
					a.utf8encode = function(h) {
						return o.nodebuffer ? u.newBufferFrom(h, "utf-8") : function(v) {
							var k, d, m, y, S, x = v.length,
								C = 0;
							for (y = 0; y < x; y++)(64512 & (d = v.charCodeAt(y))) == 55296 && y + 1 < x && (64512 & (m = v.charCodeAt(y + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (m - 56320), y++), C += d < 128 ? 1 : d < 2048 ? 2 : d < 65536 ? 3 : 4;
							for (k = o.uint8array ? new Uint8Array(C) : new Array(C), y = S = 0; S < C; y++)(64512 & (d = v.charCodeAt(y))) == 55296 && y + 1 < x && (64512 & (m = v.charCodeAt(y + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (m - 56320), y++), d < 128 ? k[S++] = d : (d < 2048 ? k[S++] = 192 | d >>> 6 : (d < 65536 ? k[S++] = 224 | d >>> 12 : (k[S++] = 240 | d >>> 18, k[S++] = 128 | d >>> 12 & 63), k[S++] = 128 | d >>> 6 & 63), k[S++] = 128 | 63 & d);
							return k
						}(h)
					}, a.utf8decode = function(h) {
						return o.nodebuffer ? t.transformTo("nodebuffer", h)
							.toString("utf-8") : function(v) {
								var k, d, m, y, S = v.length,
									x = new Array(2 * S);
								for (k = d = 0; k < S;)
									if ((m = v[k++]) < 128) x[d++] = m;
									else if (4 < (y = f[m])) x[d++] = 65533, k += y - 1;
								else {
									for (m &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && k < S;) m = m << 6 | 63 & v[k++], y--;
									1 < y ? x[d++] = 65533 : m < 65536 ? x[d++] = m : (m -= 65536, x[d++] = 55296 | m >> 10 & 1023, x[d++] = 56320 | 1023 & m)
								}
								return x.length !== d && (x.subarray ? x = x.subarray(0, d) : x.length = d), t.applyFromCharCode(x)
							}(h = t.transformTo(o.uint8array ? "uint8array" : "array", h))
					}, t.inherits(b, l), b.prototype.processChunk = function(h) {
						var v = t.transformTo(o.uint8array ? "uint8array" : "array", h.data);
						if (this.leftOver && this.leftOver.length) {
							if (o.uint8array) {
								var k = v;
								(v = new Uint8Array(k.length + this.leftOver.length))
								.set(this.leftOver, 0), v.set(k, this.leftOver.length)
							} else v = this.leftOver.concat(v);
							this.leftOver = null
						}
						var d = function(y, S) {
								var x;
								for ((S = S || y.length) > y.length && (S = y.length), x = S - 1; 0 <= x && (192 & y[x]) == 128;) x--;
								return x < 0 || x === 0 ? S : x + f[y[x]] > S ? x : S
							}(v),
							m = v;
						d !== v.length && (o.uint8array ? (m = v.subarray(0, d), this.leftOver = v.subarray(d, v.length)) : (m = v.slice(0, d), this.leftOver = v.slice(d, v.length))), this.push({
							data: a.utf8decode(m),
							meta: h.meta
						})
					}, b.prototype.flush = function() {
						this.leftOver && this.leftOver.length && (this.push({
							data: a.utf8decode(this.leftOver),
							meta: {}
						}), this.leftOver = null)
					}, a.Utf8DecodeWorker = b, t.inherits(w, l), w.prototype.processChunk = function(h) {
						this.push({
							data: a.utf8encode(h.data),
							meta: h.meta
						})
					}, a.Utf8EncodeWorker = w
				}, {
					"./nodejsUtils": 14,
					"./stream/GenericWorker": 28,
					"./support": 30,
					"./utils": 32
				}],
				32: [function(e, n, a) {
					var t = e("./support"),
						o = e("./base64"),
						u = e("./nodejsUtils"),
						l = e("set-immediate-shim"),
						f = e("./external");

					function p(d) {
						return d
					}

					function b(d, m) {
						for (var y = 0; y < d.length; ++y) m[y] = 255 & d.charCodeAt(y);
						return m
					}
					a.newBlob = function(d, m) {
						a.checkSupport("blob");
						try {
							return new Blob([d], {
								type: m
							})
						} catch {
							try {
								var y = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
								return y.append(d), y.getBlob(m)
							} catch {
								throw new Error("Bug : can't construct the Blob.")
							}
						}
					};
					var w = {
						stringifyByChunk: function(d, m, y) {
							var S = [],
								x = 0,
								C = d.length;
							if (C <= y) return String.fromCharCode.apply(null, d);
							for (; x < C;) m === "array" || m === "nodebuffer" ? S.push(String.fromCharCode.apply(null, d.slice(x, Math.min(x + y, C)))) : S.push(String.fromCharCode.apply(null, d.subarray(x, Math.min(x + y, C)))), x += y;
							return S.join("")
						},
						stringifyByChar: function(d) {
							for (var m = "", y = 0; y < d.length; y++) m += String.fromCharCode(d[y]);
							return m
						},
						applyCanBeUsed: {
							uint8array: function() {
								try {
									return t.uint8array && String.fromCharCode.apply(null, new Uint8Array(1))
										.length === 1
								} catch {
									return !1
								}
							}(),
							nodebuffer: function() {
								try {
									return t.nodebuffer && String.fromCharCode.apply(null, u.allocBuffer(1))
										.length === 1
								} catch {
									return !1
								}
							}()
						}
					};

					function h(d) {
						var m = 65536,
							y = a.getTypeOf(d),
							S = !0;
						if (y === "uint8array" ? S = w.applyCanBeUsed.uint8array : y === "nodebuffer" && (S = w.applyCanBeUsed.nodebuffer), S)
							for (; 1 < m;) try {
								return w.stringifyByChunk(d, y, m)
							} catch {
								m = Math.floor(m / 2)
							}
						return w.stringifyByChar(d)
					}

					function v(d, m) {
						for (var y = 0; y < d.length; y++) m[y] = d[y];
						return m
					}
					a.applyFromCharCode = h;
					var k = {};
					k.string = {
						string: p,
						array: function(d) {
							return b(d, new Array(d.length))
						},
						arraybuffer: function(d) {
							return k.string.uint8array(d)
								.buffer
						},
						uint8array: function(d) {
							return b(d, new Uint8Array(d.length))
						},
						nodebuffer: function(d) {
							return b(d, u.allocBuffer(d.length))
						}
					}, k.array = {
						string: h,
						array: p,
						arraybuffer: function(d) {
							return new Uint8Array(d)
								.buffer
						},
						uint8array: function(d) {
							return new Uint8Array(d)
						},
						nodebuffer: function(d) {
							return u.newBufferFrom(d)
						}
					}, k.arraybuffer = {
						string: function(d) {
							return h(new Uint8Array(d))
						},
						array: function(d) {
							return v(new Uint8Array(d), new Array(d.byteLength))
						},
						arraybuffer: p,
						uint8array: function(d) {
							return new Uint8Array(d)
						},
						nodebuffer: function(d) {
							return u.newBufferFrom(new Uint8Array(d))
						}
					}, k.uint8array = {
						string: h,
						array: function(d) {
							return v(d, new Array(d.length))
						},
						arraybuffer: function(d) {
							return d.buffer
						},
						uint8array: p,
						nodebuffer: function(d) {
							return u.newBufferFrom(d)
						}
					}, k.nodebuffer = {
						string: h,
						array: function(d) {
							return v(d, new Array(d.length))
						},
						arraybuffer: function(d) {
							return k.nodebuffer.uint8array(d)
								.buffer
						},
						uint8array: function(d) {
							return v(d, new Uint8Array(d.length))
						},
						nodebuffer: p
					}, a.transformTo = function(d, m) {
						if (m = m || "", !d) return m;
						a.checkSupport(d);
						var y = a.getTypeOf(m);
						return k[y][d](m)
					}, a.resolve = function(d) {
						for (var m = d.split("/"), y = [], S = 0; S < m.length; S++) {
							var x = m[S];
							x === "." || x === "" && S !== 0 && S !== m.length - 1 || (x === ".." ? y.pop() : y.push(x))
						}
						return y.join("/")
					}, a.getTypeOf = function(d) {
						return typeof d == "string" ? "string" : Object.prototype.toString.call(d) === "[object Array]" ? "array" : t.nodebuffer && u.isBuffer(d) ? "nodebuffer" : t.uint8array && d instanceof Uint8Array ? "uint8array" : t.arraybuffer && d instanceof ArrayBuffer ? "arraybuffer" : void 0
					}, a.checkSupport = function(d) {
						if (!t[d.toLowerCase()]) throw new Error(d + " is not supported by this platform")
					}, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(d) {
						var m, y, S = "";
						for (y = 0; y < (d || "")
							.length; y++) S += "\\x" + ((m = d.charCodeAt(y)) < 16 ? "0" : "") + m.toString(16)
							.toUpperCase();
						return S
					}, a.delay = function(d, m, y) {
						l(function() {
							d.apply(y || null, m || [])
						})
					}, a.inherits = function(d, m) {
						function y() {}
						y.prototype = m.prototype, d.prototype = new y
					}, a.extend = function() {
						var d, m, y = {};
						for (d = 0; d < arguments.length; d++)
							for (m in arguments[d]) arguments[d].hasOwnProperty(m) && y[m] === void 0 && (y[m] = arguments[d][m]);
						return y
					}, a.prepareContent = function(d, m, y, S, x) {
						return f.Promise.resolve(m)
							.then(function(C) {
								return t.blob && (C instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(C)) !== -1) && typeof FileReader < "u" ? new f.Promise(function(D, F) {
									var U = new FileReader;
									U.onload = function(N) {
										D(N.target.result)
									}, U.onerror = function(N) {
										F(N.target.error)
									}, U.readAsArrayBuffer(C)
								}) : C
							})
							.then(function(C) {
								var D = a.getTypeOf(C);
								return D ? (D === "arraybuffer" ? C = a.transformTo("uint8array", C) : D === "string" && (x ? C = o.decode(C) : y && S !== !0 && (C = function(F) {
									return b(F, t.uint8array ? new Uint8Array(F.length) : new Array(F.length))
								}(C))), C) : f.Promise.reject(new Error("Can't read the data of '" + d + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
							})
					}
				}, {
					"./base64": 1,
					"./external": 6,
					"./nodejsUtils": 14,
					"./support": 30,
					"set-immediate-shim": 54
				}],
				33: [function(e, n, a) {
					var t = e("./reader/readerFor"),
						o = e("./utils"),
						u = e("./signature"),
						l = e("./zipEntry"),
						f = (e("./utf8"), e("./support"));

					function p(b) {
						this.files = [], this.loadOptions = b
					}
					p.prototype = {
						checkSignature: function(b) {
							if (!this.reader.readAndCheckSignature(b)) {
								this.reader.index -= 4;
								var w = this.reader.readString(4);
								throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(w) + ", expected " + o.pretty(b) + ")")
							}
						},
						isSignature: function(b, w) {
							var h = this.reader.index;
							this.reader.setIndex(b);
							var v = this.reader.readString(4) === w;
							return this.reader.setIndex(h), v
						},
						readBlockEndOfCentral: function() {
							this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
							var b = this.reader.readData(this.zipCommentLength),
								w = f.uint8array ? "uint8array" : "array",
								h = o.transformTo(w, b);
							this.zipComment = this.loadOptions.decodeFileName(h)
						},
						readBlockZip64EndOfCentral: function() {
							this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
							for (var b, w, h, v = this.zip64EndOfCentralSize - 44; 0 < v;) b = this.reader.readInt(2), w = this.reader.readInt(4), h = this.reader.readData(w), this.zip64ExtensibleData[b] = {
								id: b,
								length: w,
								value: h
							}
						},
						readBlockZip64EndOfCentralLocator: function() {
							if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported")
						},
						readLocalFiles: function() {
							var b, w;
							for (b = 0; b < this.files.length; b++) w = this.files[b], this.reader.setIndex(w.localHeaderOffset), this.checkSignature(u.LOCAL_FILE_HEADER), w.readLocalPart(this.reader), w.handleUTF8(), w.processAttributes()
						},
						readCentralDir: function() {
							var b;
							for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(u.CENTRAL_FILE_HEADER);)(b = new l({
									zip64: this.zip64
								}, this.loadOptions))
								.readCentralPart(this.reader), this.files.push(b);
							if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
						},
						readEndOfCentral: function() {
							var b = this.reader.lastIndexOfSignature(u.CENTRAL_DIRECTORY_END);
							if (b < 0) throw this.isSignature(0, u.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
							this.reader.setIndex(b);
							var w = b;
							if (this.checkSignature(u.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
								if (this.zip64 = !0, (b = this.reader.lastIndexOfSignature(u.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
								if (this.reader.setIndex(b), this.checkSignature(u.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, u.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(u.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
								this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(u.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
							}
							var h = this.centralDirOffset + this.centralDirSize;
							this.zip64 && (h += 20, h += 12 + this.zip64EndOfCentralSize);
							var v = w - h;
							if (0 < v) this.isSignature(w, u.CENTRAL_FILE_HEADER) || (this.reader.zero = v);
							else if (v < 0) throw new Error("Corrupted zip: missing " + Math.abs(v) + " bytes.")
						},
						prepareReader: function(b) {
							this.reader = t(b)
						},
						load: function(b) {
							this.prepareReader(b), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
						}
					}, n.exports = p
				}, {
					"./reader/readerFor": 22,
					"./signature": 23,
					"./support": 30,
					"./utf8": 31,
					"./utils": 32,
					"./zipEntry": 34
				}],
				34: [function(e, n, a) {
					var t = e("./reader/readerFor"),
						o = e("./utils"),
						u = e("./compressedObject"),
						l = e("./crc32"),
						f = e("./utf8"),
						p = e("./compressions"),
						b = e("./support");

					function w(h, v) {
						this.options = h, this.loadOptions = v
					}
					w.prototype = {
						isEncrypted: function() {
							return (1 & this.bitFlag) == 1
						},
						useUTF8: function() {
							return (2048 & this.bitFlag) == 2048
						},
						readLocalPart: function(h) {
							var v, k;
							if (h.skip(22), this.fileNameLength = h.readInt(2), k = h.readInt(2), this.fileName = h.readData(this.fileNameLength), h.skip(k), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
							if ((v = function(d) {
								for (var m in p)
									if (p.hasOwnProperty(m) && p[m].magic === d) return p[m];
								return null
							}(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
							this.decompressed = new u(this.compressedSize, this.uncompressedSize, this.crc32, v, h.readData(this.compressedSize))
						},
						readCentralPart: function(h) {
							this.versionMadeBy = h.readInt(2), h.skip(2), this.bitFlag = h.readInt(2), this.compressionMethod = h.readString(2), this.date = h.readDate(), this.crc32 = h.readInt(4), this.compressedSize = h.readInt(4), this.uncompressedSize = h.readInt(4);
							var v = h.readInt(2);
							if (this.extraFieldsLength = h.readInt(2), this.fileCommentLength = h.readInt(2), this.diskNumberStart = h.readInt(2), this.internalFileAttributes = h.readInt(2), this.externalFileAttributes = h.readInt(4), this.localHeaderOffset = h.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
							h.skip(v), this.readExtraFields(h), this.parseZIP64ExtraField(h), this.fileComment = h.readData(this.fileCommentLength)
						},
						processAttributes: function() {
							this.unixPermissions = null, this.dosPermissions = null;
							var h = this.versionMadeBy >> 8;
							this.dir = !!(16 & this.externalFileAttributes), h == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), h == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0)
						},
						parseZIP64ExtraField: function(h) {
							if (this.extraFields[1]) {
								var v = t(this.extraFields[1].value);
								this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = v.readInt(8)), this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = v.readInt(8)), this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = v.readInt(8)), this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = v.readInt(4))
							}
						},
						readExtraFields: function(h) {
							var v, k, d, m = h.index + this.extraFieldsLength;
							for (this.extraFields || (this.extraFields = {}); h.index + 4 < m;) v = h.readInt(2), k = h.readInt(2), d = h.readData(k), this.extraFields[v] = {
								id: v,
								length: k,
								value: d
							};
							h.setIndex(m)
						},
						handleUTF8: function() {
							var h = b.uint8array ? "uint8array" : "array";
							if (this.useUTF8()) this.fileNameStr = f.utf8decode(this.fileName), this.fileCommentStr = f.utf8decode(this.fileComment);
							else {
								var v = this.findExtraFieldUnicodePath();
								if (v !== null) this.fileNameStr = v;
								else {
									var k = o.transformTo(h, this.fileName);
									this.fileNameStr = this.loadOptions.decodeFileName(k)
								}
								var d = this.findExtraFieldUnicodeComment();
								if (d !== null) this.fileCommentStr = d;
								else {
									var m = o.transformTo(h, this.fileComment);
									this.fileCommentStr = this.loadOptions.decodeFileName(m)
								}
							}
						},
						findExtraFieldUnicodePath: function() {
							var h = this.extraFields[28789];
							if (h) {
								var v = t(h.value);
								return v.readInt(1) !== 1 || l(this.fileName) !== v.readInt(4) ? null : f.utf8decode(v.readData(h.length - 5))
							}
							return null
						},
						findExtraFieldUnicodeComment: function() {
							var h = this.extraFields[25461];
							if (h) {
								var v = t(h.value);
								return v.readInt(1) !== 1 || l(this.fileComment) !== v.readInt(4) ? null : f.utf8decode(v.readData(h.length - 5))
							}
							return null
						}
					}, n.exports = w
				}, {
					"./compressedObject": 2,
					"./compressions": 3,
					"./crc32": 4,
					"./reader/readerFor": 22,
					"./support": 30,
					"./utf8": 31,
					"./utils": 32
				}],
				35: [function(e, n, a) {
					function t(v, k, d) {
						this.name = v, this.dir = d.dir, this.date = d.date, this.comment = d.comment, this.unixPermissions = d.unixPermissions, this.dosPermissions = d.dosPermissions, this._data = k, this._dataBinary = d.binary, this.options = {
							compression: d.compression,
							compressionOptions: d.compressionOptions
						}
					}
					var o = e("./stream/StreamHelper"),
						u = e("./stream/DataWorker"),
						l = e("./utf8"),
						f = e("./compressedObject"),
						p = e("./stream/GenericWorker");
					t.prototype = {
						internalStream: function(v) {
							var k = null,
								d = "string";
							try {
								if (!v) throw new Error("No output type specified.");
								var m = (d = v.toLowerCase()) === "string" || d === "text";
								d !== "binarystring" && d !== "text" || (d = "string"), k = this._decompressWorker();
								var y = !this._dataBinary;
								y && !m && (k = k.pipe(new l.Utf8EncodeWorker)), !y && m && (k = k.pipe(new l.Utf8DecodeWorker))
							} catch (S) {
								(k = new p("error"))
								.error(S)
							}
							return new o(k, d, "")
						},
						async: function(v, k) {
							return this.internalStream(v)
								.accumulate(k)
						},
						nodeStream: function(v, k) {
							return this.internalStream(v || "nodebuffer")
								.toNodejsStream(k)
						},
						_compressWorker: function(v, k) {
							if (this._data instanceof f && this._data.compression.magic === v.magic) return this._data.getCompressedWorker();
							var d = this._decompressWorker();
							return this._dataBinary || (d = d.pipe(new l.Utf8EncodeWorker)), f.createWorkerFrom(d, v, k)
						},
						_decompressWorker: function() {
							return this._data instanceof f ? this._data.getContentWorker() : this._data instanceof p ? this._data : new u(this._data)
						}
					};
					for (var b = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], w = function() {
						throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
					}, h = 0; h < b.length; h++) t.prototype[b[h]] = w;
					n.exports = t
				}, {
					"./compressedObject": 2,
					"./stream/DataWorker": 27,
					"./stream/GenericWorker": 28,
					"./stream/StreamHelper": 29,
					"./utf8": 31
				}],
				36: [function(e, n, a) {
					(function(t) {
						var o, u, l = t.MutationObserver || t.WebKitMutationObserver;
						if (l) {
							var f = 0,
								p = new l(v),
								b = t.document.createTextNode("");
							p.observe(b, {
								characterData: !0
							}), o = function() {
								b.data = f = ++f % 2
							}
						} else if (t.setImmediate || t.MessageChannel === void 0) o = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function() {
							var k = t.document.createElement("script");
							k.onreadystatechange = function() {
								v(), k.onreadystatechange = null, k.parentNode.removeChild(k), k = null
							}, t.document.documentElement.appendChild(k)
						} : function() {
							setTimeout(v, 0)
						};
						else {
							var w = new t.MessageChannel;
							w.port1.onmessage = v, o = function() {
								w.port2.postMessage(0)
							}
						}
						var h = [];

						function v() {
							var k, d;
							u = !0;
							for (var m = h.length; m;) {
								for (d = h, h = [], k = -1; ++k < m;) d[k]();
								m = h.length
							}
							u = !1
						}
						n.exports = function(k) {
							h.push(k) !== 1 || u || o()
						}
					})
					.call(this, typeof rr < "u" ? rr : typeof self < "u" ? self : typeof window < "u" ? window : {})
				}, {}],
				37: [function(e, n, a) {
					var t = e("immediate");

					function o() {}
					var u = {},
						l = ["REJECTED"],
						f = ["FULFILLED"],
						p = ["PENDING"];

					function b(m) {
						if (typeof m != "function") throw new TypeError("resolver must be a function");
						this.state = p, this.queue = [], this.outcome = void 0, m !== o && k(this, m)
					}

					function w(m, y, S) {
						this.promise = m, typeof y == "function" && (this.onFulfilled = y, this.callFulfilled = this.otherCallFulfilled), typeof S == "function" && (this.onRejected = S, this.callRejected = this.otherCallRejected)
					}

					function h(m, y, S) {
						t(function() {
							var x;
							try {
								x = y(S)
							} catch (C) {
								return u.reject(m, C)
							}
							x === m ? u.reject(m, new TypeError("Cannot resolve promise with itself")) : u.resolve(m, x)
						})
					}

					function v(m) {
						var y = m && m.then;
						if (m && (typeof m == "object" || typeof m == "function") && typeof y == "function") return function() {
							y.apply(m, arguments)
						}
					}

					function k(m, y) {
						var S = !1;

						function x(F) {
							S || (S = !0, u.reject(m, F))
						}

						function C(F) {
							S || (S = !0, u.resolve(m, F))
						}
						var D = d(function() {
							y(C, x)
						});
						D.status === "error" && x(D.value)
					}

					function d(m, y) {
						var S = {};
						try {
							S.value = m(y), S.status = "success"
						} catch (x) {
							S.status = "error", S.value = x
						}
						return S
					}(n.exports = b)
					.prototype.finally = function(m) {
						if (typeof m != "function") return this;
						var y = this.constructor;
						return this.then(function(S) {
							return y.resolve(m())
								.then(function() {
									return S
								})
						}, function(S) {
							return y.resolve(m())
								.then(function() {
									throw S
								})
						})
					}, b.prototype.catch = function(m) {
						return this.then(null, m)
					}, b.prototype.then = function(m, y) {
						if (typeof m != "function" && this.state === f || typeof y != "function" && this.state === l) return this;
						var S = new this.constructor(o);
						return this.state !== p ? h(S, this.state === f ? m : y, this.outcome) : this.queue.push(new w(S, m, y)), S
					}, w.prototype.callFulfilled = function(m) {
						u.resolve(this.promise, m)
					}, w.prototype.otherCallFulfilled = function(m) {
						h(this.promise, this.onFulfilled, m)
					}, w.prototype.callRejected = function(m) {
						u.reject(this.promise, m)
					}, w.prototype.otherCallRejected = function(m) {
						h(this.promise, this.onRejected, m)
					}, u.resolve = function(m, y) {
						var S = d(v, y);
						if (S.status === "error") return u.reject(m, S.value);
						var x = S.value;
						if (x) k(m, x);
						else {
							m.state = f, m.outcome = y;
							for (var C = -1, D = m.queue.length; ++C < D;) m.queue[C].callFulfilled(y)
						}
						return m
					}, u.reject = function(m, y) {
						m.state = l, m.outcome = y;
						for (var S = -1, x = m.queue.length; ++S < x;) m.queue[S].callRejected(y);
						return m
					}, b.resolve = function(m) {
						return m instanceof this ? m : u.resolve(new this(o), m)
					}, b.reject = function(m) {
						var y = new this(o);
						return u.reject(y, m)
					}, b.all = function(m) {
						var y = this;
						if (Object.prototype.toString.call(m) !== "[object Array]") return this.reject(new TypeError("must be an array"));
						var S = m.length,
							x = !1;
						if (!S) return this.resolve([]);
						for (var C = new Array(S), D = 0, F = -1, U = new this(o); ++F < S;) N(m[F], F);
						return U;

						function N(G, Q) {
							y.resolve(G)
								.then(function(P) {
									C[Q] = P, ++D !== S || x || (x = !0, u.resolve(U, C))
								}, function(P) {
									x || (x = !0, u.reject(U, P))
								})
						}
					}, b.race = function(m) {
						var y = this;
						if (Object.prototype.toString.call(m) !== "[object Array]") return this.reject(new TypeError("must be an array"));
						var S = m.length,
							x = !1;
						if (!S) return this.resolve([]);
						for (var C = -1, D = new this(o); ++C < S;) F = m[C], y.resolve(F)
							.then(function(U) {
								x || (x = !0, u.resolve(D, U))
							}, function(U) {
								x || (x = !0, u.reject(D, U))
							});
						var F;
						return D
					}
				}, {
					immediate: 36
				}],
				38: [function(e, n, a) {
					var t = {};
					(0, e("./lib/utils/common")
						.assign)(t, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), n.exports = t
				}, {
					"./lib/deflate": 39,
					"./lib/inflate": 40,
					"./lib/utils/common": 41,
					"./lib/zlib/constants": 44
				}],
				39: [function(e, n, a) {
					var t = e("./zlib/deflate"),
						o = e("./utils/common"),
						u = e("./utils/strings"),
						l = e("./zlib/messages"),
						f = e("./zlib/zstream"),
						p = Object.prototype.toString,
						b = 0,
						w = -1,
						h = 0,
						v = 8;

					function k(m) {
						if (!(this instanceof k)) return new k(m);
						this.options = o.assign({
							level: w,
							method: v,
							chunkSize: 16384,
							windowBits: 15,
							memLevel: 8,
							strategy: h,
							to: ""
						}, m || {});
						var y = this.options;
						y.raw && 0 < y.windowBits ? y.windowBits = -y.windowBits : y.gzip && 0 < y.windowBits && y.windowBits < 16 && (y.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new f, this.strm.avail_out = 0;
						var S = t.deflateInit2(this.strm, y.level, y.method, y.windowBits, y.memLevel, y.strategy);
						if (S !== b) throw new Error(l[S]);
						if (y.header && t.deflateSetHeader(this.strm, y.header), y.dictionary) {
							var x;
							if (x = typeof y.dictionary == "string" ? u.string2buf(y.dictionary) : p.call(y.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(y.dictionary) : y.dictionary, (S = t.deflateSetDictionary(this.strm, x)) !== b) throw new Error(l[S]);
							this._dict_set = !0
						}
					}

					function d(m, y) {
						var S = new k(y);
						if (S.push(m, !0), S.err) throw S.msg || l[S.err];
						return S.result
					}
					k.prototype.push = function(m, y) {
						var S, x, C = this.strm,
							D = this.options.chunkSize;
						if (this.ended) return !1;
						x = y === ~~y ? y : y === !0 ? 4 : 0, typeof m == "string" ? C.input = u.string2buf(m) : p.call(m) === "[object ArrayBuffer]" ? C.input = new Uint8Array(m) : C.input = m, C.next_in = 0, C.avail_in = C.input.length;
						do {
							if (C.avail_out === 0 && (C.output = new o.Buf8(D), C.next_out = 0, C.avail_out = D), (S = t.deflate(C, x)) !== 1 && S !== b) return this.onEnd(S), !(this.ended = !0);
							C.avail_out !== 0 && (C.avail_in !== 0 || x !== 4 && x !== 2) || (this.options.to === "string" ? this.onData(u.buf2binstring(o.shrinkBuf(C.output, C.next_out))) : this.onData(o.shrinkBuf(C.output, C.next_out)))
						} while ((0 < C.avail_in || C.avail_out === 0) && S !== 1);
						return x === 4 ? (S = t.deflateEnd(this.strm), this.onEnd(S), this.ended = !0, S === b) : x !== 2 || (this.onEnd(b), !(C.avail_out = 0))
					}, k.prototype.onData = function(m) {
						this.chunks.push(m)
					}, k.prototype.onEnd = function(m) {
						m === b && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg
					}, a.Deflate = k, a.deflate = d, a.deflateRaw = function(m, y) {
						return (y = y || {})
							.raw = !0, d(m, y)
					}, a.gzip = function(m, y) {
						return (y = y || {})
							.gzip = !0, d(m, y)
					}
				}, {
					"./utils/common": 41,
					"./utils/strings": 42,
					"./zlib/deflate": 46,
					"./zlib/messages": 51,
					"./zlib/zstream": 53
				}],
				40: [function(e, n, a) {
					var t = e("./zlib/inflate"),
						o = e("./utils/common"),
						u = e("./utils/strings"),
						l = e("./zlib/constants"),
						f = e("./zlib/messages"),
						p = e("./zlib/zstream"),
						b = e("./zlib/gzheader"),
						w = Object.prototype.toString;

					function h(k) {
						if (!(this instanceof h)) return new h(k);
						this.options = o.assign({
							chunkSize: 16384,
							windowBits: 0,
							to: ""
						}, k || {});
						var d = this.options;
						d.raw && 0 <= d.windowBits && d.windowBits < 16 && (d.windowBits = -d.windowBits, d.windowBits === 0 && (d.windowBits = -15)), !(0 <= d.windowBits && d.windowBits < 16) || k && k.windowBits || (d.windowBits += 32), 15 < d.windowBits && d.windowBits < 48 && (15 & d.windowBits) == 0 && (d.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new p, this.strm.avail_out = 0;
						var m = t.inflateInit2(this.strm, d.windowBits);
						if (m !== l.Z_OK) throw new Error(f[m]);
						this.header = new b, t.inflateGetHeader(this.strm, this.header)
					}

					function v(k, d) {
						var m = new h(d);
						if (m.push(k, !0), m.err) throw m.msg || f[m.err];
						return m.result
					}
					h.prototype.push = function(k, d) {
						var m, y, S, x, C, D, F = this.strm,
							U = this.options.chunkSize,
							N = this.options.dictionary,
							G = !1;
						if (this.ended) return !1;
						y = d === ~~d ? d : d === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, typeof k == "string" ? F.input = u.binstring2buf(k) : w.call(k) === "[object ArrayBuffer]" ? F.input = new Uint8Array(k) : F.input = k, F.next_in = 0, F.avail_in = F.input.length;
						do {
							if (F.avail_out === 0 && (F.output = new o.Buf8(U), F.next_out = 0, F.avail_out = U), (m = t.inflate(F, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && N && (D = typeof N == "string" ? u.string2buf(N) : w.call(N) === "[object ArrayBuffer]" ? new Uint8Array(N) : N, m = t.inflateSetDictionary(this.strm, D)), m === l.Z_BUF_ERROR && G === !0 && (m = l.Z_OK, G = !1), m !== l.Z_STREAM_END && m !== l.Z_OK) return this.onEnd(m), !(this.ended = !0);
							F.next_out && (F.avail_out !== 0 && m !== l.Z_STREAM_END && (F.avail_in !== 0 || y !== l.Z_FINISH && y !== l.Z_SYNC_FLUSH) || (this.options.to === "string" ? (S = u.utf8border(F.output, F.next_out), x = F.next_out - S, C = u.buf2string(F.output, S), F.next_out = x, F.avail_out = U - x, x && o.arraySet(F.output, F.output, S, x, 0), this.onData(C)) : this.onData(o.shrinkBuf(F.output, F.next_out)))), F.avail_in === 0 && F.avail_out === 0 && (G = !0)
						} while ((0 < F.avail_in || F.avail_out === 0) && m !== l.Z_STREAM_END);
						return m === l.Z_STREAM_END && (y = l.Z_FINISH), y === l.Z_FINISH ? (m = t.inflateEnd(this.strm), this.onEnd(m), this.ended = !0, m === l.Z_OK) : y !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), !(F.avail_out = 0))
					}, h.prototype.onData = function(k) {
						this.chunks.push(k)
					}, h.prototype.onEnd = function(k) {
						k === l.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = k, this.msg = this.strm.msg
					}, a.Inflate = h, a.inflate = v, a.inflateRaw = function(k, d) {
						return (d = d || {})
							.raw = !0, v(k, d)
					}, a.ungzip = v
				}, {
					"./utils/common": 41,
					"./utils/strings": 42,
					"./zlib/constants": 44,
					"./zlib/gzheader": 47,
					"./zlib/inflate": 49,
					"./zlib/messages": 51,
					"./zlib/zstream": 53
				}],
				41: [function(e, n, a) {
					var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
					a.assign = function(l) {
						for (var f = Array.prototype.slice.call(arguments, 1); f.length;) {
							var p = f.shift();
							if (p) {
								if (typeof p != "object") throw new TypeError(p + "must be non-object");
								for (var b in p) p.hasOwnProperty(b) && (l[b] = p[b])
							}
						}
						return l
					}, a.shrinkBuf = function(l, f) {
						return l.length === f ? l : l.subarray ? l.subarray(0, f) : (l.length = f, l)
					};
					var o = {
							arraySet: function(l, f, p, b, w) {
								if (f.subarray && l.subarray) l.set(f.subarray(p, p + b), w);
								else
									for (var h = 0; h < b; h++) l[w + h] = f[p + h]
							},
							flattenChunks: function(l) {
								var f, p, b, w, h, v;
								for (f = b = 0, p = l.length; f < p; f++) b += l[f].length;
								for (v = new Uint8Array(b), f = w = 0, p = l.length; f < p; f++) h = l[f], v.set(h, w), w += h.length;
								return v
							}
						},
						u = {
							arraySet: function(l, f, p, b, w) {
								for (var h = 0; h < b; h++) l[w + h] = f[p + h]
							},
							flattenChunks: function(l) {
								return [].concat.apply([], l)
							}
						};
					a.setTyped = function(l) {
						l ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, o)) : (a.Buf8 = Array, a.Buf16 = Array, a.Buf32 = Array, a.assign(a, u))
					}, a.setTyped(t)
				}, {}],
				42: [function(e, n, a) {
					var t = e("./common"),
						o = !0,
						u = !0;
					try {
						String.fromCharCode.apply(null, [0])
					} catch {
						o = !1
					}
					try {
						String.fromCharCode.apply(null, new Uint8Array(1))
					} catch {
						u = !1
					}
					for (var l = new t.Buf8(256), f = 0; f < 256; f++) l[f] = 252 <= f ? 6 : 248 <= f ? 5 : 240 <= f ? 4 : 224 <= f ? 3 : 192 <= f ? 2 : 1;

					function p(b, w) {
						if (w < 65537 && (b.subarray && u || !b.subarray && o)) return String.fromCharCode.apply(null, t.shrinkBuf(b, w));
						for (var h = "", v = 0; v < w; v++) h += String.fromCharCode(b[v]);
						return h
					}
					l[254] = l[254] = 1, a.string2buf = function(b) {
						var w, h, v, k, d, m = b.length,
							y = 0;
						for (k = 0; k < m; k++)(64512 & (h = b.charCodeAt(k))) == 55296 && k + 1 < m && (64512 & (v = b.charCodeAt(k + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (v - 56320), k++), y += h < 128 ? 1 : h < 2048 ? 2 : h < 65536 ? 3 : 4;
						for (w = new t.Buf8(y), k = d = 0; d < y; k++)(64512 & (h = b.charCodeAt(k))) == 55296 && k + 1 < m && (64512 & (v = b.charCodeAt(k + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (v - 56320), k++), h < 128 ? w[d++] = h : (h < 2048 ? w[d++] = 192 | h >>> 6 : (h < 65536 ? w[d++] = 224 | h >>> 12 : (w[d++] = 240 | h >>> 18, w[d++] = 128 | h >>> 12 & 63), w[d++] = 128 | h >>> 6 & 63), w[d++] = 128 | 63 & h);
						return w
					}, a.buf2binstring = function(b) {
						return p(b, b.length)
					}, a.binstring2buf = function(b) {
						for (var w = new t.Buf8(b.length), h = 0, v = w.length; h < v; h++) w[h] = b.charCodeAt(h);
						return w
					}, a.buf2string = function(b, w) {
						var h, v, k, d, m = w || b.length,
							y = new Array(2 * m);
						for (h = v = 0; h < m;)
							if ((k = b[h++]) < 128) y[v++] = k;
							else if (4 < (d = l[k])) y[v++] = 65533, h += d - 1;
						else {
							for (k &= d === 2 ? 31 : d === 3 ? 15 : 7; 1 < d && h < m;) k = k << 6 | 63 & b[h++], d--;
							1 < d ? y[v++] = 65533 : k < 65536 ? y[v++] = k : (k -= 65536, y[v++] = 55296 | k >> 10 & 1023, y[v++] = 56320 | 1023 & k)
						}
						return p(y, v)
					}, a.utf8border = function(b, w) {
						var h;
						for ((w = w || b.length) > b.length && (w = b.length), h = w - 1; 0 <= h && (192 & b[h]) == 128;) h--;
						return h < 0 || h === 0 ? w : h + l[b[h]] > w ? h : w
					}
				}, {
					"./common": 41
				}],
				43: [function(e, n, a) {
					n.exports = function(t, o, u, l) {
						for (var f = 65535 & t | 0, p = t >>> 16 & 65535 | 0, b = 0; u !== 0;) {
							for (u -= b = 2e3 < u ? 2e3 : u; p = p + (f = f + o[l++] | 0) | 0, --b;);
							f %= 65521, p %= 65521
						}
						return f | p << 16 | 0
					}
				}, {}],
				44: [function(e, n, a) {
					n.exports = {
						Z_NO_FLUSH: 0,
						Z_PARTIAL_FLUSH: 1,
						Z_SYNC_FLUSH: 2,
						Z_FULL_FLUSH: 3,
						Z_FINISH: 4,
						Z_BLOCK: 5,
						Z_TREES: 6,
						Z_OK: 0,
						Z_STREAM_END: 1,
						Z_NEED_DICT: 2,
						Z_ERRNO: -1,
						Z_STREAM_ERROR: -2,
						Z_DATA_ERROR: -3,
						Z_BUF_ERROR: -5,
						Z_NO_COMPRESSION: 0,
						Z_BEST_SPEED: 1,
						Z_BEST_COMPRESSION: 9,
						Z_DEFAULT_COMPRESSION: -1,
						Z_FILTERED: 1,
						Z_HUFFMAN_ONLY: 2,
						Z_RLE: 3,
						Z_FIXED: 4,
						Z_DEFAULT_STRATEGY: 0,
						Z_BINARY: 0,
						Z_TEXT: 1,
						Z_UNKNOWN: 2,
						Z_DEFLATED: 8
					}
				}, {}],
				45: [function(e, n, a) {
					var t = function() {
						for (var o, u = [], l = 0; l < 256; l++) {
							o = l;
							for (var f = 0; f < 8; f++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
							u[l] = o
						}
						return u
					}();
					n.exports = function(o, u, l, f) {
						var p = t,
							b = f + l;
						o ^= -1;
						for (var w = f; w < b; w++) o = o >>> 8 ^ p[255 & (o ^ u[w])];
						return -1 ^ o
					}
				}, {}],
				46: [function(e, n, a) {
					var t, o = e("../utils/common"),
						u = e("./trees"),
						l = e("./adler32"),
						f = e("./crc32"),
						p = e("./messages"),
						b = 0,
						w = 4,
						h = 0,
						v = -2,
						k = -1,
						d = 4,
						m = 2,
						y = 8,
						S = 9,
						x = 286,
						C = 30,
						D = 19,
						F = 2 * x + 1,
						U = 15,
						N = 3,
						G = 258,
						Q = G + N + 1,
						P = 42,
						T = 113,
						c = 1,
						R = 2,
						re = 3,
						W = 4;

					function te(s, I) {
						return s.msg = p[I], I
					}

					function H(s) {
						return (s << 1) - (4 < s ? 9 : 0)
					}

					function ee(s) {
						for (var I = s.length; 0 <= --I;) s[I] = 0
					}

					function j(s) {
						var I = s.state,
							z = I.pending;
						z > s.avail_out && (z = s.avail_out), z !== 0 && (o.arraySet(s.output, I.pending_buf, I.pending_out, z, s.next_out), s.next_out += z, I.pending_out += z, s.total_out += z, s.avail_out -= z, I.pending -= z, I.pending === 0 && (I.pending_out = 0))
					}

					function E(s, I) {
						u._tr_flush_block(s, 0 <= s.block_start ? s.block_start : -1, s.strstart - s.block_start, I), s.block_start = s.strstart, j(s.strm)
					}

					function $(s, I) {
						s.pending_buf[s.pending++] = I
					}

					function K(s, I) {
						s.pending_buf[s.pending++] = I >>> 8 & 255, s.pending_buf[s.pending++] = 255 & I
					}

					function V(s, I) {
						var z, _, g = s.max_chain_length,
							O = s.strstart,
							L = s.prev_length,
							M = s.nice_match,
							A = s.strstart > s.w_size - Q ? s.strstart - (s.w_size - Q) : 0,
							Z = s.window,
							Y = s.w_mask,
							X = s.prev,
							J = s.strstart + G,
							oe = Z[O + L - 1],
							ae = Z[O + L];
						s.prev_length >= s.good_match && (g >>= 2), M > s.lookahead && (M = s.lookahead);
						do
							if (Z[(z = I) + L] === ae && Z[z + L - 1] === oe && Z[z] === Z[O] && Z[++z] === Z[O + 1]) {
								O += 2, z++;
								do; while (Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && Z[++O] === Z[++z] && O < J);
								if (_ = G - (J - O), O = J - G, L < _) {
									if (s.match_start = I, M <= (L = _)) break;
									oe = Z[O + L - 1], ae = Z[O + L]
								}
							} while ((I = X[I & Y]) > A && --g != 0);
						return L <= s.lookahead ? L : s.lookahead
					}

					function ue(s) {
						var I, z, _, g, O, L, M, A, Z, Y, X = s.w_size;
						do {
							if (g = s.window_size - s.lookahead - s.strstart, s.strstart >= X + (X - Q)) {
								for (o.arraySet(s.window, s.window, X, X, 0), s.match_start -= X, s.strstart -= X, s.block_start -= X, I = z = s.hash_size; _ = s.head[--I], s.head[I] = X <= _ ? _ - X : 0, --z;);
								for (I = z = X; _ = s.prev[--I], s.prev[I] = X <= _ ? _ - X : 0, --z;);
								g += X
							}
							if (s.strm.avail_in === 0) break;
							if (L = s.strm, M = s.window, A = s.strstart + s.lookahead, Z = g, Y = void 0, Y = L.avail_in, Z < Y && (Y = Z), z = Y === 0 ? 0 : (L.avail_in -= Y, o.arraySet(M, L.input, L.next_in, Y, A), L.state.wrap === 1 ? L.adler = l(L.adler, M, Y, A) : L.state.wrap === 2 && (L.adler = f(L.adler, M, Y, A)), L.next_in += Y, L.total_in += Y, Y), s.lookahead += z, s.lookahead + s.insert >= N)
								for (O = s.strstart - s.insert, s.ins_h = s.window[O], s.ins_h = (s.ins_h << s.hash_shift ^ s.window[O + 1]) & s.hash_mask; s.insert && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[O + N - 1]) & s.hash_mask, s.prev[O & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = O, O++, s.insert--, !(s.lookahead + s.insert < N)););
						} while (s.lookahead < Q && s.strm.avail_in !== 0)
					}

					function ve(s, I) {
						for (var z, _;;) {
							if (s.lookahead < Q) {
								if (ue(s), s.lookahead < Q && I === b) return c;
								if (s.lookahead === 0) break
							}
							if (z = 0, s.lookahead >= N && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + N - 1]) & s.hash_mask, z = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), z !== 0 && s.strstart - z <= s.w_size - Q && (s.match_length = V(s, z)), s.match_length >= N)
								if (_ = u._tr_tally(s, s.strstart - s.match_start, s.match_length - N), s.lookahead -= s.match_length, s.match_length <= s.max_lazy_match && s.lookahead >= N) {
									for (s.match_length--; s.strstart++, s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + N - 1]) & s.hash_mask, z = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart, --s.match_length != 0;);
									s.strstart++
								} else s.strstart += s.match_length, s.match_length = 0, s.ins_h = s.window[s.strstart], s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
							else _ = u._tr_tally(s, 0, s.window[s.strstart]), s.lookahead--, s.strstart++;
							if (_ && (E(s, !1), s.strm.avail_out === 0)) return c
						}
						return s.insert = s.strstart < N - 1 ? s.strstart : N - 1, I === w ? (E(s, !0), s.strm.avail_out === 0 ? re : W) : s.last_lit && (E(s, !1), s.strm.avail_out === 0) ? c : R
					}

					function ne(s, I) {
						for (var z, _, g;;) {
							if (s.lookahead < Q) {
								if (ue(s), s.lookahead < Q && I === b) return c;
								if (s.lookahead === 0) break
							}
							if (z = 0, s.lookahead >= N && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + N - 1]) & s.hash_mask, z = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), s.prev_length = s.match_length, s.prev_match = s.match_start, s.match_length = N - 1, z !== 0 && s.prev_length < s.max_lazy_match && s.strstart - z <= s.w_size - Q && (s.match_length = V(s, z), s.match_length <= 5 && (s.strategy === 1 || s.match_length === N && 4096 < s.strstart - s.match_start) && (s.match_length = N - 1)), s.prev_length >= N && s.match_length <= s.prev_length) {
								for (g = s.strstart + s.lookahead - N, _ = u._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - N), s.lookahead -= s.prev_length - 1, s.prev_length -= 2; ++s.strstart <= g && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + N - 1]) & s.hash_mask, z = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), --s.prev_length != 0;);
								if (s.match_available = 0, s.match_length = N - 1, s.strstart++, _ && (E(s, !1), s.strm.avail_out === 0)) return c
							} else if (s.match_available) {
								if ((_ = u._tr_tally(s, 0, s.window[s.strstart - 1])) && E(s, !1), s.strstart++, s.lookahead--, s.strm.avail_out === 0) return c
							} else s.match_available = 1, s.strstart++, s.lookahead--
						}
						return s.match_available && (_ = u._tr_tally(s, 0, s.window[s.strstart - 1]), s.match_available = 0), s.insert = s.strstart < N - 1 ? s.strstart : N - 1, I === w ? (E(s, !0), s.strm.avail_out === 0 ? re : W) : s.last_lit && (E(s, !1), s.strm.avail_out === 0) ? c : R
					}

					function ie(s, I, z, _, g) {
						this.good_length = s, this.max_lazy = I, this.nice_length = z, this.max_chain = _, this.func = g
					}

					function pe() {
						this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new o.Buf16(2 * F), this.dyn_dtree = new o.Buf16(2 * (2 * C + 1)), this.bl_tree = new o.Buf16(2 * (2 * D + 1)), ee(this.dyn_ltree), ee(this.dyn_dtree), ee(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new o.Buf16(U + 1), this.heap = new o.Buf16(2 * x + 1), ee(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new o.Buf16(2 * x + 1), ee(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
					}

					function ce(s) {
						var I;
						return s && s.state ? (s.total_in = s.total_out = 0, s.data_type = m, (I = s.state)
							.pending = 0, I.pending_out = 0, I.wrap < 0 && (I.wrap = -I.wrap), I.status = I.wrap ? P : T, s.adler = I.wrap === 2 ? 0 : 1, I.last_flush = b, u._tr_init(I), h) : te(s, v)
					}

					function _e(s) {
						var I = ce(s);
						return I === h && function(z) {
							z.window_size = 2 * z.w_size, ee(z.head), z.max_lazy_match = t[z.level].max_lazy, z.good_match = t[z.level].good_length, z.nice_match = t[z.level].nice_length, z.max_chain_length = t[z.level].max_chain, z.strstart = 0, z.block_start = 0, z.lookahead = 0, z.insert = 0, z.match_length = z.prev_length = N - 1, z.match_available = 0, z.ins_h = 0
						}(s.state), I
					}

					function we(s, I, z, _, g, O) {
						if (!s) return v;
						var L = 1;
						if (I === k && (I = 6), _ < 0 ? (L = 0, _ = -_) : 15 < _ && (L = 2, _ -= 16), g < 1 || S < g || z !== y || _ < 8 || 15 < _ || I < 0 || 9 < I || O < 0 || d < O) return te(s, v);
						_ === 8 && (_ = 9);
						var M = new pe;
						return (s.state = M)
							.strm = s, M.wrap = L, M.gzhead = null, M.w_bits = _, M.w_size = 1 << M.w_bits, M.w_mask = M.w_size - 1, M.hash_bits = g + 7, M.hash_size = 1 << M.hash_bits, M.hash_mask = M.hash_size - 1, M.hash_shift = ~~((M.hash_bits + N - 1) / N), M.window = new o.Buf8(2 * M.w_size), M.head = new o.Buf16(M.hash_size), M.prev = new o.Buf16(M.w_size), M.lit_bufsize = 1 << g + 6, M.pending_buf_size = 4 * M.lit_bufsize, M.pending_buf = new o.Buf8(M.pending_buf_size), M.d_buf = 1 * M.lit_bufsize, M.l_buf = 3 * M.lit_bufsize, M.level = I, M.strategy = O, M.method = z, _e(s)
					}
					t = [new ie(0, 0, 0, 0, function(s, I) {
						var z = 65535;
						for (z > s.pending_buf_size - 5 && (z = s.pending_buf_size - 5);;) {
							if (s.lookahead <= 1) {
								if (ue(s), s.lookahead === 0 && I === b) return c;
								if (s.lookahead === 0) break
							}
							s.strstart += s.lookahead, s.lookahead = 0;
							var _ = s.block_start + z;
							if ((s.strstart === 0 || s.strstart >= _) && (s.lookahead = s.strstart - _, s.strstart = _, E(s, !1), s.strm.avail_out === 0) || s.strstart - s.block_start >= s.w_size - Q && (E(s, !1), s.strm.avail_out === 0)) return c
						}
						return s.insert = 0, I === w ? (E(s, !0), s.strm.avail_out === 0 ? re : W) : (s.strstart > s.block_start && (E(s, !1), s.strm.avail_out), c)
					}), new ie(4, 4, 8, 4, ve), new ie(4, 5, 16, 8, ve), new ie(4, 6, 32, 32, ve), new ie(4, 4, 16, 16, ne), new ie(8, 16, 32, 32, ne), new ie(8, 16, 128, 128, ne), new ie(8, 32, 128, 256, ne), new ie(32, 128, 258, 1024, ne), new ie(32, 258, 258, 4096, ne)], a.deflateInit = function(s, I) {
						return we(s, I, y, 15, 8, 0)
					}, a.deflateInit2 = we, a.deflateReset = _e, a.deflateResetKeep = ce, a.deflateSetHeader = function(s, I) {
						return s && s.state ? s.state.wrap !== 2 ? v : (s.state.gzhead = I, h) : v
					}, a.deflate = function(s, I) {
						var z, _, g, O;
						if (!s || !s.state || 5 < I || I < 0) return s ? te(s, v) : v;
						if (_ = s.state, !s.output || !s.input && s.avail_in !== 0 || _.status === 666 && I !== w) return te(s, s.avail_out === 0 ? -5 : v);
						if (_.strm = s, z = _.last_flush, _.last_flush = I, _.status === P)
							if (_.wrap === 2) s.adler = 0, $(_, 31), $(_, 139), $(_, 8), _.gzhead ? ($(_, (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)), $(_, 255 & _.gzhead.time), $(_, _.gzhead.time >> 8 & 255), $(_, _.gzhead.time >> 16 & 255), $(_, _.gzhead.time >> 24 & 255), $(_, _.level === 9 ? 2 : 2 <= _.strategy || _.level < 2 ? 4 : 0), $(_, 255 & _.gzhead.os), _.gzhead.extra && _.gzhead.extra.length && ($(_, 255 & _.gzhead.extra.length), $(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (s.adler = f(s.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = 69) : ($(_, 0), $(_, 0), $(_, 0), $(_, 0), $(_, 0), $(_, _.level === 9 ? 2 : 2 <= _.strategy || _.level < 2 ? 4 : 0), $(_, 3), _.status = T);
							else {
								var L = y + (_.w_bits - 8 << 4) << 8;
								L |= (2 <= _.strategy || _.level < 2 ? 0 : _.level < 6 ? 1 : _.level === 6 ? 2 : 3) << 6, _.strstart !== 0 && (L |= 32), L += 31 - L % 31, _.status = T, K(_, L), _.strstart !== 0 && (K(_, s.adler >>> 16), K(_, 65535 & s.adler)), s.adler = 1
							} if (_.status === 69)
							if (_.gzhead.extra) {
								for (g = _.pending; _.gzindex < (65535 & _.gzhead.extra.length) && (_.pending !== _.pending_buf_size || (_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), j(s), g = _.pending, _.pending !== _.pending_buf_size));) $(_, 255 & _.gzhead.extra[_.gzindex]), _.gzindex++;
								_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = 73)
							} else _.status = 73;
						if (_.status === 73)
							if (_.gzhead.name) {
								g = _.pending;
								do {
									if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), j(s), g = _.pending, _.pending === _.pending_buf_size)) {
										O = 1;
										break
									}
									O = _.gzindex < _.gzhead.name.length ? 255 & _.gzhead.name.charCodeAt(_.gzindex++) : 0, $(_, O)
								} while (O !== 0);
								_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), O === 0 && (_.gzindex = 0, _.status = 91)
							} else _.status = 91;
						if (_.status === 91)
							if (_.gzhead.comment) {
								g = _.pending;
								do {
									if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), j(s), g = _.pending, _.pending === _.pending_buf_size)) {
										O = 1;
										break
									}
									O = _.gzindex < _.gzhead.comment.length ? 255 & _.gzhead.comment.charCodeAt(_.gzindex++) : 0, $(_, O)
								} while (O !== 0);
								_.gzhead.hcrc && _.pending > g && (s.adler = f(s.adler, _.pending_buf, _.pending - g, g)), O === 0 && (_.status = 103)
							} else _.status = 103;
						if (_.status === 103 && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && j(s), _.pending + 2 <= _.pending_buf_size && ($(_, 255 & s.adler), $(_, s.adler >> 8 & 255), s.adler = 0, _.status = T)) : _.status = T), _.pending !== 0) {
							if (j(s), s.avail_out === 0) return _.last_flush = -1, h
						} else if (s.avail_in === 0 && H(I) <= H(z) && I !== w) return te(s, -5);
						if (_.status === 666 && s.avail_in !== 0) return te(s, -5);
						if (s.avail_in !== 0 || _.lookahead !== 0 || I !== b && _.status !== 666) {
							var M = _.strategy === 2 ? function(A, Z) {
								for (var Y;;) {
									if (A.lookahead === 0 && (ue(A), A.lookahead === 0)) {
										if (Z === b) return c;
										break
									}
									if (A.match_length = 0, Y = u._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++, Y && (E(A, !1), A.strm.avail_out === 0)) return c
								}
								return A.insert = 0, Z === w ? (E(A, !0), A.strm.avail_out === 0 ? re : W) : A.last_lit && (E(A, !1), A.strm.avail_out === 0) ? c : R
							}(_, I) : _.strategy === 3 ? function(A, Z) {
								for (var Y, X, J, oe, ae = A.window;;) {
									if (A.lookahead <= G) {
										if (ue(A), A.lookahead <= G && Z === b) return c;
										if (A.lookahead === 0) break
									}
									if (A.match_length = 0, A.lookahead >= N && 0 < A.strstart && (X = ae[J = A.strstart - 1]) === ae[++J] && X === ae[++J] && X === ae[++J]) {
										oe = A.strstart + G;
										do; while (X === ae[++J] && X === ae[++J] && X === ae[++J] && X === ae[++J] && X === ae[++J] && X === ae[++J] && X === ae[++J] && X === ae[++J] && J < oe);
										A.match_length = G - (oe - J), A.match_length > A.lookahead && (A.match_length = A.lookahead)
									}
									if (A.match_length >= N ? (Y = u._tr_tally(A, 1, A.match_length - N), A.lookahead -= A.match_length, A.strstart += A.match_length, A.match_length = 0) : (Y = u._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++), Y && (E(A, !1), A.strm.avail_out === 0)) return c
								}
								return A.insert = 0, Z === w ? (E(A, !0), A.strm.avail_out === 0 ? re : W) : A.last_lit && (E(A, !1), A.strm.avail_out === 0) ? c : R
							}(_, I) : t[_.level].func(_, I);
							if (M !== re && M !== W || (_.status = 666), M === c || M === re) return s.avail_out === 0 && (_.last_flush = -1), h;
							if (M === R && (I === 1 ? u._tr_align(_) : I !== 5 && (u._tr_stored_block(_, 0, 0, !1), I === 3 && (ee(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), j(s), s.avail_out === 0)) return _.last_flush = -1, h
						}
						return I !== w ? h : _.wrap <= 0 ? 1 : (_.wrap === 2 ? ($(_, 255 & s.adler), $(_, s.adler >> 8 & 255), $(_, s.adler >> 16 & 255), $(_, s.adler >> 24 & 255), $(_, 255 & s.total_in), $(_, s.total_in >> 8 & 255), $(_, s.total_in >> 16 & 255), $(_, s.total_in >> 24 & 255)) : (K(_, s.adler >>> 16), K(_, 65535 & s.adler)), j(s), 0 < _.wrap && (_.wrap = -_.wrap), _.pending !== 0 ? h : 1)
					}, a.deflateEnd = function(s) {
						var I;
						return s && s.state ? (I = s.state.status) !== P && I !== 69 && I !== 73 && I !== 91 && I !== 103 && I !== T && I !== 666 ? te(s, v) : (s.state = null, I === T ? te(s, -3) : h) : v
					}, a.deflateSetDictionary = function(s, I) {
						var z, _, g, O, L, M, A, Z, Y = I.length;
						if (!s || !s.state || (O = (z = s.state)
							.wrap) === 2 || O === 1 && z.status !== P || z.lookahead) return v;
						for (O === 1 && (s.adler = l(s.adler, I, Y, 0)), z.wrap = 0, Y >= z.w_size && (O === 0 && (ee(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0), Z = new o.Buf8(z.w_size), o.arraySet(Z, I, Y - z.w_size, z.w_size, 0), I = Z, Y = z.w_size), L = s.avail_in, M = s.next_in, A = s.input, s.avail_in = Y, s.next_in = 0, s.input = I, ue(z); z.lookahead >= N;) {
							for (_ = z.strstart, g = z.lookahead - (N - 1); z.ins_h = (z.ins_h << z.hash_shift ^ z.window[_ + N - 1]) & z.hash_mask, z.prev[_ & z.w_mask] = z.head[z.ins_h], z.head[z.ins_h] = _, _++, --g;);
							z.strstart = _, z.lookahead = N - 1, ue(z)
						}
						return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = N - 1, z.match_available = 0, s.next_in = M, s.input = A, s.avail_in = L, z.wrap = O, h
					}, a.deflateInfo = "pako deflate (from Nodeca project)"
				}, {
					"../utils/common": 41,
					"./adler32": 43,
					"./crc32": 45,
					"./messages": 51,
					"./trees": 52
				}],
				47: [function(e, n, a) {
					n.exports = function() {
						this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
					}
				}, {}],
				48: [function(e, n, a) {
					n.exports = function(t, o) {
						var u, l, f, p, b, w, h, v, k, d, m, y, S, x, C, D, F, U, N, G, Q, P, T, c, R;
						u = t.state, l = t.next_in, c = t.input, f = l + (t.avail_in - 5), p = t.next_out, R = t.output, b = p - (o - t.avail_out), w = p + (t.avail_out - 257), h = u.dmax, v = u.wsize, k = u.whave, d = u.wnext, m = u.window, y = u.hold, S = u.bits, x = u.lencode, C = u.distcode, D = (1 << u.lenbits) - 1, F = (1 << u.distbits) - 1;
						e: do {
							S < 15 && (y += c[l++] << S, S += 8, y += c[l++] << S, S += 8), U = x[y & D];
							r: for (;;) {
								if (y >>>= N = U >>> 24, S -= N, (N = U >>> 16 & 255) === 0) R[p++] = 65535 & U;
								else {
									if (!(16 & N)) {
										if ((64 & N) == 0) {
											U = x[(65535 & U) + (y & (1 << N) - 1)];
											continue r
										}
										if (32 & N) {
											u.mode = 12;
											break e
										}
										t.msg = "invalid literal/length code", u.mode = 30;
										break e
									}
									G = 65535 & U, (N &= 15) && (S < N && (y += c[l++] << S, S += 8), G += y & (1 << N) - 1, y >>>= N, S -= N), S < 15 && (y += c[l++] << S, S += 8, y += c[l++] << S, S += 8), U = C[y & F];
									t: for (;;) {
										if (y >>>= N = U >>> 24, S -= N, !(16 & (N = U >>> 16 & 255))) {
											if ((64 & N) == 0) {
												U = C[(65535 & U) + (y & (1 << N) - 1)];
												continue t
											}
											t.msg = "invalid distance code", u.mode = 30;
											break e
										}
										if (Q = 65535 & U, S < (N &= 15) && (y += c[l++] << S, (S += 8) < N && (y += c[l++] << S, S += 8)), h < (Q += y & (1 << N) - 1)) {
											t.msg = "invalid distance too far back", u.mode = 30;
											break e
										}
										if (y >>>= N, S -= N, (N = p - b) < Q) {
											if (k < (N = Q - N) && u.sane) {
												t.msg = "invalid distance too far back", u.mode = 30;
												break e
											}
											if (T = m, (P = 0) === d) {
												if (P += v - N, N < G) {
													for (G -= N; R[p++] = m[P++], --N;);
													P = p - Q, T = R
												}
											} else if (d < N) {
												if (P += v + d - N, (N -= d) < G) {
													for (G -= N; R[p++] = m[P++], --N;);
													if (P = 0, d < G) {
														for (G -= N = d; R[p++] = m[P++], --N;);
														P = p - Q, T = R
													}
												}
											} else if (P += d - N, N < G) {
												for (G -= N; R[p++] = m[P++], --N;);
												P = p - Q, T = R
											}
											for (; 2 < G;) R[p++] = T[P++], R[p++] = T[P++], R[p++] = T[P++], G -= 3;
											G && (R[p++] = T[P++], 1 < G && (R[p++] = T[P++]))
										} else {
											for (P = p - Q; R[p++] = R[P++], R[p++] = R[P++], R[p++] = R[P++], 2 < (G -= 3););
											G && (R[p++] = R[P++], 1 < G && (R[p++] = R[P++]))
										}
										break
									}
								}
								break
							}
						} while (l < f && p < w);
						l -= G = S >> 3, y &= (1 << (S -= G << 3)) - 1, t.next_in = l, t.next_out = p, t.avail_in = l < f ? f - l + 5 : 5 - (l - f), t.avail_out = p < w ? w - p + 257 : 257 - (p - w), u.hold = y, u.bits = S
					}
				}, {}],
				49: [function(e, n, a) {
					var t = e("../utils/common"),
						o = e("./adler32"),
						u = e("./crc32"),
						l = e("./inffast"),
						f = e("./inftrees"),
						p = 1,
						b = 2,
						w = 0,
						h = -2,
						v = 1,
						k = 852,
						d = 592;

					function m(P) {
						return (P >>> 24 & 255) + (P >>> 8 & 65280) + ((65280 & P) << 8) + ((255 & P) << 24)
					}

					function y() {
						this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
					}

					function S(P) {
						var T;
						return P && P.state ? (T = P.state, P.total_in = P.total_out = T.total = 0, P.msg = "", T.wrap && (P.adler = 1 & T.wrap), T.mode = v, T.last = 0, T.havedict = 0, T.dmax = 32768, T.head = null, T.hold = 0, T.bits = 0, T.lencode = T.lendyn = new t.Buf32(k), T.distcode = T.distdyn = new t.Buf32(d), T.sane = 1, T.back = -1, w) : h
					}

					function x(P) {
						var T;
						return P && P.state ? ((T = P.state)
							.wsize = 0, T.whave = 0, T.wnext = 0, S(P)) : h
					}

					function C(P, T) {
						var c, R;
						return P && P.state ? (R = P.state, T < 0 ? (c = 0, T = -T) : (c = 1 + (T >> 4), T < 48 && (T &= 15)), T && (T < 8 || 15 < T) ? h : (R.window !== null && R.wbits !== T && (R.window = null), R.wrap = c, R.wbits = T, x(P))) : h
					}

					function D(P, T) {
						var c, R;
						return P ? (R = new y, (P.state = R)
							.window = null, (c = C(P, T)) !== w && (P.state = null), c) : h
					}
					var F, U, N = !0;

					function G(P) {
						if (N) {
							var T;
							for (F = new t.Buf32(512), U = new t.Buf32(32), T = 0; T < 144;) P.lens[T++] = 8;
							for (; T < 256;) P.lens[T++] = 9;
							for (; T < 280;) P.lens[T++] = 7;
							for (; T < 288;) P.lens[T++] = 8;
							for (f(p, P.lens, 0, 288, F, 0, P.work, {
								bits: 9
							}), T = 0; T < 32;) P.lens[T++] = 5;
							f(b, P.lens, 0, 32, U, 0, P.work, {
								bits: 5
							}), N = !1
						}
						P.lencode = F, P.lenbits = 9, P.distcode = U, P.distbits = 5
					}

					function Q(P, T, c, R) {
						var re, W = P.state;
						return W.window === null && (W.wsize = 1 << W.wbits, W.wnext = 0, W.whave = 0, W.window = new t.Buf8(W.wsize)), R >= W.wsize ? (t.arraySet(W.window, T, c - W.wsize, W.wsize, 0), W.wnext = 0, W.whave = W.wsize) : (R < (re = W.wsize - W.wnext) && (re = R), t.arraySet(W.window, T, c - R, re, W.wnext), (R -= re) ? (t.arraySet(W.window, T, c - R, R, 0), W.wnext = R, W.whave = W.wsize) : (W.wnext += re, W.wnext === W.wsize && (W.wnext = 0), W.whave < W.wsize && (W.whave += re))), 0
					}
					a.inflateReset = x, a.inflateReset2 = C, a.inflateResetKeep = S, a.inflateInit = function(P) {
						return D(P, 15)
					}, a.inflateInit2 = D, a.inflate = function(P, T) {
						var c, R, re, W, te, H, ee, j, E, $, K, V, ue, ve, ne, ie, pe, ce, _e, we, s, I, z, _, g = 0,
							O = new t.Buf8(4),
							L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
						if (!P || !P.state || !P.output || !P.input && P.avail_in !== 0) return h;
						(c = P.state)
						.mode === 12 && (c.mode = 13), te = P.next_out, re = P.output, ee = P.avail_out, W = P.next_in, R = P.input, H = P.avail_in, j = c.hold, E = c.bits, $ = H, K = ee, I = w;
						e: for (;;) switch (c.mode) {
							case v:
								if (c.wrap === 0) {
									c.mode = 13;
									break
								}
								for (; E < 16;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if (2 & c.wrap && j === 35615) {
									O[c.check = 0] = 255 & j, O[1] = j >>> 8 & 255, c.check = u(c.check, O, 2, 0), E = j = 0, c.mode = 2;
									break
								}
								if (c.flags = 0, c.head && (c.head.done = !1), !(1 & c.wrap) || (((255 & j) << 8) + (j >> 8)) % 31) {
									P.msg = "incorrect header check", c.mode = 30;
									break
								}
								if ((15 & j) != 8) {
									P.msg = "unknown compression method", c.mode = 30;
									break
								}
								if (E -= 4, s = 8 + (15 & (j >>>= 4)), c.wbits === 0) c.wbits = s;
								else if (s > c.wbits) {
									P.msg = "invalid window size", c.mode = 30;
									break
								}
								c.dmax = 1 << s, P.adler = c.check = 1, c.mode = 512 & j ? 10 : 12, E = j = 0;
								break;
							case 2:
								for (; E < 16;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if (c.flags = j, (255 & c.flags) != 8) {
									P.msg = "unknown compression method", c.mode = 30;
									break
								}
								if (57344 & c.flags) {
									P.msg = "unknown header flags set", c.mode = 30;
									break
								}
								c.head && (c.head.text = j >> 8 & 1), 512 & c.flags && (O[0] = 255 & j, O[1] = j >>> 8 & 255, c.check = u(c.check, O, 2, 0)), E = j = 0, c.mode = 3;
							case 3:
								for (; E < 32;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								c.head && (c.head.time = j), 512 & c.flags && (O[0] = 255 & j, O[1] = j >>> 8 & 255, O[2] = j >>> 16 & 255, O[3] = j >>> 24 & 255, c.check = u(c.check, O, 4, 0)), E = j = 0, c.mode = 4;
							case 4:
								for (; E < 16;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								c.head && (c.head.xflags = 255 & j, c.head.os = j >> 8), 512 & c.flags && (O[0] = 255 & j, O[1] = j >>> 8 & 255, c.check = u(c.check, O, 2, 0)), E = j = 0, c.mode = 5;
							case 5:
								if (1024 & c.flags) {
									for (; E < 16;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									c.length = j, c.head && (c.head.extra_len = j), 512 & c.flags && (O[0] = 255 & j, O[1] = j >>> 8 & 255, c.check = u(c.check, O, 2, 0)), E = j = 0
								} else c.head && (c.head.extra = null);
								c.mode = 6;
							case 6:
								if (1024 & c.flags && (H < (V = c.length) && (V = H), V && (c.head && (s = c.head.extra_len - c.length, c.head.extra || (c.head.extra = new Array(c.head.extra_len)), t.arraySet(c.head.extra, R, W, V, s)), 512 & c.flags && (c.check = u(c.check, R, V, W)), H -= V, W += V, c.length -= V), c.length)) break e;
								c.length = 0, c.mode = 7;
							case 7:
								if (2048 & c.flags) {
									if (H === 0) break e;
									for (V = 0; s = R[W + V++], c.head && s && c.length < 65536 && (c.head.name += String.fromCharCode(s)), s && V < H;);
									if (512 & c.flags && (c.check = u(c.check, R, V, W)), H -= V, W += V, s) break e
								} else c.head && (c.head.name = null);
								c.length = 0, c.mode = 8;
							case 8:
								if (4096 & c.flags) {
									if (H === 0) break e;
									for (V = 0; s = R[W + V++], c.head && s && c.length < 65536 && (c.head.comment += String.fromCharCode(s)), s && V < H;);
									if (512 & c.flags && (c.check = u(c.check, R, V, W)), H -= V, W += V, s) break e
								} else c.head && (c.head.comment = null);
								c.mode = 9;
							case 9:
								if (512 & c.flags) {
									for (; E < 16;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									if (j !== (65535 & c.check)) {
										P.msg = "header crc mismatch", c.mode = 30;
										break
									}
									E = j = 0
								}
								c.head && (c.head.hcrc = c.flags >> 9 & 1, c.head.done = !0), P.adler = c.check = 0, c.mode = 12;
								break;
							case 10:
								for (; E < 32;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								P.adler = c.check = m(j), E = j = 0, c.mode = 11;
							case 11:
								if (c.havedict === 0) return P.next_out = te, P.avail_out = ee, P.next_in = W, P.avail_in = H, c.hold = j, c.bits = E, 2;
								P.adler = c.check = 1, c.mode = 12;
							case 12:
								if (T === 5 || T === 6) break e;
							case 13:
								if (c.last) {
									j >>>= 7 & E, E -= 7 & E, c.mode = 27;
									break
								}
								for (; E < 3;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								switch (c.last = 1 & j, E -= 1, 3 & (j >>>= 1)) {
									case 0:
										c.mode = 14;
										break;
									case 1:
										if (G(c), c.mode = 20, T !== 6) break;
										j >>>= 2, E -= 2;
										break e;
									case 2:
										c.mode = 17;
										break;
									case 3:
										P.msg = "invalid block type", c.mode = 30
								}
								j >>>= 2, E -= 2;
								break;
							case 14:
								for (j >>>= 7 & E, E -= 7 & E; E < 32;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if ((65535 & j) != (j >>> 16 ^ 65535)) {
									P.msg = "invalid stored block lengths", c.mode = 30;
									break
								}
								if (c.length = 65535 & j, E = j = 0, c.mode = 15, T === 6) break e;
							case 15:
								c.mode = 16;
							case 16:
								if (V = c.length) {
									if (H < V && (V = H), ee < V && (V = ee), V === 0) break e;
									t.arraySet(re, R, W, V, te), H -= V, W += V, ee -= V, te += V, c.length -= V;
									break
								}
								c.mode = 12;
								break;
							case 17:
								for (; E < 14;) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if (c.nlen = 257 + (31 & j), j >>>= 5, E -= 5, c.ndist = 1 + (31 & j), j >>>= 5, E -= 5, c.ncode = 4 + (15 & j), j >>>= 4, E -= 4, 286 < c.nlen || 30 < c.ndist) {
									P.msg = "too many length or distance symbols", c.mode = 30;
									break
								}
								c.have = 0, c.mode = 18;
							case 18:
								for (; c.have < c.ncode;) {
									for (; E < 3;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									c.lens[L[c.have++]] = 7 & j, j >>>= 3, E -= 3
								}
								for (; c.have < 19;) c.lens[L[c.have++]] = 0;
								if (c.lencode = c.lendyn, c.lenbits = 7, z = {
									bits: c.lenbits
								}, I = f(0, c.lens, 0, 19, c.lencode, 0, c.work, z), c.lenbits = z.bits, I) {
									P.msg = "invalid code lengths set", c.mode = 30;
									break
								}
								c.have = 0, c.mode = 19;
							case 19:
								for (; c.have < c.nlen + c.ndist;) {
									for (; ie = (g = c.lencode[j & (1 << c.lenbits) - 1]) >>> 16 & 255, pe = 65535 & g, !((ne = g >>> 24) <= E);) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									if (pe < 16) j >>>= ne, E -= ne, c.lens[c.have++] = pe;
									else {
										if (pe === 16) {
											for (_ = ne + 2; E < _;) {
												if (H === 0) break e;
												H--, j += R[W++] << E, E += 8
											}
											if (j >>>= ne, E -= ne, c.have === 0) {
												P.msg = "invalid bit length repeat", c.mode = 30;
												break
											}
											s = c.lens[c.have - 1], V = 3 + (3 & j), j >>>= 2, E -= 2
										} else if (pe === 17) {
											for (_ = ne + 3; E < _;) {
												if (H === 0) break e;
												H--, j += R[W++] << E, E += 8
											}
											E -= ne, s = 0, V = 3 + (7 & (j >>>= ne)), j >>>= 3, E -= 3
										} else {
											for (_ = ne + 7; E < _;) {
												if (H === 0) break e;
												H--, j += R[W++] << E, E += 8
											}
											E -= ne, s = 0, V = 11 + (127 & (j >>>= ne)), j >>>= 7, E -= 7
										}
										if (c.have + V > c.nlen + c.ndist) {
											P.msg = "invalid bit length repeat", c.mode = 30;
											break
										}
										for (; V--;) c.lens[c.have++] = s
									}
								}
								if (c.mode === 30) break;
								if (c.lens[256] === 0) {
									P.msg = "invalid code -- missing end-of-block", c.mode = 30;
									break
								}
								if (c.lenbits = 9, z = {
									bits: c.lenbits
								}, I = f(p, c.lens, 0, c.nlen, c.lencode, 0, c.work, z), c.lenbits = z.bits, I) {
									P.msg = "invalid literal/lengths set", c.mode = 30;
									break
								}
								if (c.distbits = 6, c.distcode = c.distdyn, z = {
									bits: c.distbits
								}, I = f(b, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, z), c.distbits = z.bits, I) {
									P.msg = "invalid distances set", c.mode = 30;
									break
								}
								if (c.mode = 20, T === 6) break e;
							case 20:
								c.mode = 21;
							case 21:
								if (6 <= H && 258 <= ee) {
									P.next_out = te, P.avail_out = ee, P.next_in = W, P.avail_in = H, c.hold = j, c.bits = E, l(P, K), te = P.next_out, re = P.output, ee = P.avail_out, W = P.next_in, R = P.input, H = P.avail_in, j = c.hold, E = c.bits, c.mode === 12 && (c.back = -1);
									break
								}
								for (c.back = 0; ie = (g = c.lencode[j & (1 << c.lenbits) - 1]) >>> 16 & 255, pe = 65535 & g, !((ne = g >>> 24) <= E);) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if (ie && (240 & ie) == 0) {
									for (ce = ne, _e = ie, we = pe; ie = (g = c.lencode[we + ((j & (1 << ce + _e) - 1) >> ce)]) >>> 16 & 255, pe = 65535 & g, !(ce + (ne = g >>> 24) <= E);) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									j >>>= ce, E -= ce, c.back += ce
								}
								if (j >>>= ne, E -= ne, c.back += ne, c.length = pe, ie === 0) {
									c.mode = 26;
									break
								}
								if (32 & ie) {
									c.back = -1, c.mode = 12;
									break
								}
								if (64 & ie) {
									P.msg = "invalid literal/length code", c.mode = 30;
									break
								}
								c.extra = 15 & ie, c.mode = 22;
							case 22:
								if (c.extra) {
									for (_ = c.extra; E < _;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									c.length += j & (1 << c.extra) - 1, j >>>= c.extra, E -= c.extra, c.back += c.extra
								}
								c.was = c.length, c.mode = 23;
							case 23:
								for (; ie = (g = c.distcode[j & (1 << c.distbits) - 1]) >>> 16 & 255, pe = 65535 & g, !((ne = g >>> 24) <= E);) {
									if (H === 0) break e;
									H--, j += R[W++] << E, E += 8
								}
								if ((240 & ie) == 0) {
									for (ce = ne, _e = ie, we = pe; ie = (g = c.distcode[we + ((j & (1 << ce + _e) - 1) >> ce)]) >>> 16 & 255, pe = 65535 & g, !(ce + (ne = g >>> 24) <= E);) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									j >>>= ce, E -= ce, c.back += ce
								}
								if (j >>>= ne, E -= ne, c.back += ne, 64 & ie) {
									P.msg = "invalid distance code", c.mode = 30;
									break
								}
								c.offset = pe, c.extra = 15 & ie, c.mode = 24;
							case 24:
								if (c.extra) {
									for (_ = c.extra; E < _;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									c.offset += j & (1 << c.extra) - 1, j >>>= c.extra, E -= c.extra, c.back += c.extra
								}
								if (c.offset > c.dmax) {
									P.msg = "invalid distance too far back", c.mode = 30;
									break
								}
								c.mode = 25;
							case 25:
								if (ee === 0) break e;
								if (V = K - ee, c.offset > V) {
									if ((V = c.offset - V) > c.whave && c.sane) {
										P.msg = "invalid distance too far back", c.mode = 30;
										break
									}
									ue = V > c.wnext ? (V -= c.wnext, c.wsize - V) : c.wnext - V, V > c.length && (V = c.length), ve = c.window
								} else ve = re, ue = te - c.offset, V = c.length;
								for (ee < V && (V = ee), ee -= V, c.length -= V; re[te++] = ve[ue++], --V;);
								c.length === 0 && (c.mode = 21);
								break;
							case 26:
								if (ee === 0) break e;
								re[te++] = c.length, ee--, c.mode = 21;
								break;
							case 27:
								if (c.wrap) {
									for (; E < 32;) {
										if (H === 0) break e;
										H--, j |= R[W++] << E, E += 8
									}
									if (K -= ee, P.total_out += K, c.total += K, K && (P.adler = c.check = c.flags ? u(c.check, re, K, te - K) : o(c.check, re, K, te - K)), K = ee, (c.flags ? j : m(j)) !== c.check) {
										P.msg = "incorrect data check", c.mode = 30;
										break
									}
									E = j = 0
								}
								c.mode = 28;
							case 28:
								if (c.wrap && c.flags) {
									for (; E < 32;) {
										if (H === 0) break e;
										H--, j += R[W++] << E, E += 8
									}
									if (j !== (4294967295 & c.total)) {
										P.msg = "incorrect length check", c.mode = 30;
										break
									}
									E = j = 0
								}
								c.mode = 29;
							case 29:
								I = 1;
								break e;
							case 30:
								I = -3;
								break e;
							case 31:
								return -4;
							case 32:
							default:
								return h
						}
						return P.next_out = te, P.avail_out = ee, P.next_in = W, P.avail_in = H, c.hold = j, c.bits = E, (c.wsize || K !== P.avail_out && c.mode < 30 && (c.mode < 27 || T !== 4)) && Q(P, P.output, P.next_out, K - P.avail_out) ? (c.mode = 31, -4) : ($ -= P.avail_in, K -= P.avail_out, P.total_in += $, P.total_out += K, c.total += K, c.wrap && K && (P.adler = c.check = c.flags ? u(c.check, re, K, P.next_out - K) : o(c.check, re, K, P.next_out - K)), P.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === 12 ? 128 : 0) + (c.mode === 20 || c.mode === 15 ? 256 : 0), ($ == 0 && K === 0 || T === 4) && I === w && (I = -5), I)
					}, a.inflateEnd = function(P) {
						if (!P || !P.state) return h;
						var T = P.state;
						return T.window && (T.window = null), P.state = null, w
					}, a.inflateGetHeader = function(P, T) {
						var c;
						return P && P.state ? (2 & (c = P.state)
							.wrap) == 0 ? h : ((c.head = T)
							.done = !1, w) : h
					}, a.inflateSetDictionary = function(P, T) {
						var c, R = T.length;
						return P && P.state ? (c = P.state)
							.wrap !== 0 && c.mode !== 11 ? h : c.mode === 11 && o(1, T, R, 0) !== c.check ? -3 : Q(P, T, R, R) ? (c.mode = 31, -4) : (c.havedict = 1, w) : h
					}, a.inflateInfo = "pako inflate (from Nodeca project)"
				}, {
					"../utils/common": 41,
					"./adler32": 43,
					"./crc32": 45,
					"./inffast": 48,
					"./inftrees": 50
				}],
				50: [function(e, n, a) {
					var t = e("../utils/common"),
						o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
						u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
						l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
						f = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
					n.exports = function(p, b, w, h, v, k, d, m) {
						var y, S, x, C, D, F, U, N, G, Q = m.bits,
							P = 0,
							T = 0,
							c = 0,
							R = 0,
							re = 0,
							W = 0,
							te = 0,
							H = 0,
							ee = 0,
							j = 0,
							E = null,
							$ = 0,
							K = new t.Buf16(16),
							V = new t.Buf16(16),
							ue = null,
							ve = 0;
						for (P = 0; P <= 15; P++) K[P] = 0;
						for (T = 0; T < h; T++) K[b[w + T]]++;
						for (re = Q, R = 15; 1 <= R && K[R] === 0; R--);
						if (R < re && (re = R), R === 0) return v[k++] = 20971520, v[k++] = 20971520, m.bits = 1, 0;
						for (c = 1; c < R && K[c] === 0; c++);
						for (re < c && (re = c), P = H = 1; P <= 15; P++)
							if (H <<= 1, (H -= K[P]) < 0) return -1;
						if (0 < H && (p === 0 || R !== 1)) return -1;
						for (V[1] = 0, P = 1; P < 15; P++) V[P + 1] = V[P] + K[P];
						for (T = 0; T < h; T++) b[w + T] !== 0 && (d[V[b[w + T]]++] = T);
						if (F = p === 0 ? (E = ue = d, 19) : p === 1 ? (E = o, $ -= 257, ue = u, ve -= 257, 256) : (E = l, ue = f, -1), P = c, D = k, te = T = j = 0, x = -1, C = (ee = 1 << (W = re)) - 1, p === 1 && 852 < ee || p === 2 && 592 < ee) return 1;
						for (;;) {
							for (U = P - te, G = d[T] < F ? (N = 0, d[T]) : d[T] > F ? (N = ue[ve + d[T]], E[$ + d[T]]) : (N = 96, 0), y = 1 << P - te, c = S = 1 << W; v[D + (j >> te) + (S -= y)] = U << 24 | N << 16 | G | 0, S !== 0;);
							for (y = 1 << P - 1; j & y;) y >>= 1;
							if (y !== 0 ? (j &= y - 1, j += y) : j = 0, T++, --K[P] == 0) {
								if (P === R) break;
								P = b[w + d[T]]
							}
							if (re < P && (j & C) !== x) {
								for (te === 0 && (te = re), D += c, H = 1 << (W = P - te); W + te < R && !((H -= K[W + te]) <= 0);) W++, H <<= 1;
								if (ee += 1 << W, p === 1 && 852 < ee || p === 2 && 592 < ee) return 1;
								v[x = j & C] = re << 24 | W << 16 | D - k | 0
							}
						}
						return j !== 0 && (v[D + j] = P - te << 24 | 64 << 16 | 0), m.bits = re, 0
					}
				}, {
					"../utils/common": 41
				}],
				51: [function(e, n, a) {
					n.exports = {
						2: "need dictionary",
						1: "stream end",
						0: "",
						"-1": "file error",
						"-2": "stream error",
						"-3": "data error",
						"-4": "insufficient memory",
						"-5": "buffer error",
						"-6": "incompatible version"
					}
				}, {}],
				52: [function(e, n, a) {
					var t = e("../utils/common"),
						o = 0,
						u = 1;

					function l(g) {
						for (var O = g.length; 0 <= --O;) g[O] = 0
					}
					var f = 0,
						p = 29,
						b = 256,
						w = b + 1 + p,
						h = 30,
						v = 19,
						k = 2 * w + 1,
						d = 15,
						m = 16,
						y = 7,
						S = 256,
						x = 16,
						C = 17,
						D = 18,
						F = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
						U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
						N = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
						G = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
						Q = new Array(2 * (w + 2));
					l(Q);
					var P = new Array(2 * h);
					l(P);
					var T = new Array(512);
					l(T);
					var c = new Array(256);
					l(c);
					var R = new Array(p);
					l(R);
					var re, W, te, H = new Array(h);

					function ee(g, O, L, M, A) {
						this.static_tree = g, this.extra_bits = O, this.extra_base = L, this.elems = M, this.max_length = A, this.has_stree = g && g.length
					}

					function j(g, O) {
						this.dyn_tree = g, this.max_code = 0, this.stat_desc = O
					}

					function E(g) {
						return g < 256 ? T[g] : T[256 + (g >>> 7)]
					}

					function $(g, O) {
						g.pending_buf[g.pending++] = 255 & O, g.pending_buf[g.pending++] = O >>> 8 & 255
					}

					function K(g, O, L) {
						g.bi_valid > m - L ? (g.bi_buf |= O << g.bi_valid & 65535, $(g, g.bi_buf), g.bi_buf = O >> m - g.bi_valid, g.bi_valid += L - m) : (g.bi_buf |= O << g.bi_valid & 65535, g.bi_valid += L)
					}

					function V(g, O, L) {
						K(g, L[2 * O], L[2 * O + 1])
					}

					function ue(g, O) {
						for (var L = 0; L |= 1 & g, g >>>= 1, L <<= 1, 0 < --O;);
						return L >>> 1
					}

					function ve(g, O, L) {
						var M, A, Z = new Array(d + 1),
							Y = 0;
						for (M = 1; M <= d; M++) Z[M] = Y = Y + L[M - 1] << 1;
						for (A = 0; A <= O; A++) {
							var X = g[2 * A + 1];
							X !== 0 && (g[2 * A] = ue(Z[X]++, X))
						}
					}

					function ne(g) {
						var O;
						for (O = 0; O < w; O++) g.dyn_ltree[2 * O] = 0;
						for (O = 0; O < h; O++) g.dyn_dtree[2 * O] = 0;
						for (O = 0; O < v; O++) g.bl_tree[2 * O] = 0;
						g.dyn_ltree[2 * S] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0
					}

					function ie(g) {
						8 < g.bi_valid ? $(g, g.bi_buf) : 0 < g.bi_valid && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0
					}

					function pe(g, O, L, M) {
						var A = 2 * O,
							Z = 2 * L;
						return g[A] < g[Z] || g[A] === g[Z] && M[O] <= M[L]
					}

					function ce(g, O, L) {
						for (var M = g.heap[L], A = L << 1; A <= g.heap_len && (A < g.heap_len && pe(O, g.heap[A + 1], g.heap[A], g.depth) && A++, !pe(O, M, g.heap[A], g.depth));) g.heap[L] = g.heap[A], L = A, A <<= 1;
						g.heap[L] = M
					}

					function _e(g, O, L) {
						var M, A, Z, Y, X = 0;
						if (g.last_lit !== 0)
							for (; M = g.pending_buf[g.d_buf + 2 * X] << 8 | g.pending_buf[g.d_buf + 2 * X + 1], A = g.pending_buf[g.l_buf + X], X++, M === 0 ? V(g, A, O) : (V(g, (Z = c[A]) + b + 1, O), (Y = F[Z]) !== 0 && K(g, A -= R[Z], Y), V(g, Z = E(--M), L), (Y = U[Z]) !== 0 && K(g, M -= H[Z], Y)), X < g.last_lit;);
						V(g, S, O)
					}

					function we(g, O) {
						var L, M, A, Z = O.dyn_tree,
							Y = O.stat_desc.static_tree,
							X = O.stat_desc.has_stree,
							J = O.stat_desc.elems,
							oe = -1;
						for (g.heap_len = 0, g.heap_max = k, L = 0; L < J; L++) Z[2 * L] !== 0 ? (g.heap[++g.heap_len] = oe = L, g.depth[L] = 0) : Z[2 * L + 1] = 0;
						for (; g.heap_len < 2;) Z[2 * (A = g.heap[++g.heap_len] = oe < 2 ? ++oe : 0)] = 1, g.depth[A] = 0, g.opt_len--, X && (g.static_len -= Y[2 * A + 1]);
						for (O.max_code = oe, L = g.heap_len >> 1; 1 <= L; L--) ce(g, Z, L);
						for (A = J; L = g.heap[1], g.heap[1] = g.heap[g.heap_len--], ce(g, Z, 1), M = g.heap[1], g.heap[--g.heap_max] = L, g.heap[--g.heap_max] = M, Z[2 * A] = Z[2 * L] + Z[2 * M], g.depth[A] = (g.depth[L] >= g.depth[M] ? g.depth[L] : g.depth[M]) + 1, Z[2 * L + 1] = Z[2 * M + 1] = A, g.heap[1] = A++, ce(g, Z, 1), 2 <= g.heap_len;);
						g.heap[--g.heap_max] = g.heap[1],
							function(ae, ge) {
								var xe, ke, je, fe, De, qe, Pe = ge.dyn_tree,
									_r = ge.max_code,
									rn = ge.stat_desc.static_tree,
									tn = ge.stat_desc.has_stree,
									nn = ge.stat_desc.extra_bits,
									kr = ge.stat_desc.extra_base,
									Ne = ge.stat_desc.max_length,
									Le = 0;
								for (fe = 0; fe <= d; fe++) ae.bl_count[fe] = 0;
								for (Pe[2 * ae.heap[ae.heap_max] + 1] = 0, xe = ae.heap_max + 1; xe < k; xe++) Ne < (fe = Pe[2 * Pe[2 * (ke = ae.heap[xe]) + 1] + 1] + 1) && (fe = Ne, Le++), Pe[2 * ke + 1] = fe, _r < ke || (ae.bl_count[fe]++, De = 0, kr <= ke && (De = nn[ke - kr]), qe = Pe[2 * ke], ae.opt_len += qe * (fe + De), tn && (ae.static_len += qe * (rn[2 * ke + 1] + De)));
								if (Le !== 0) {
									do {
										for (fe = Ne - 1; ae.bl_count[fe] === 0;) fe--;
										ae.bl_count[fe]--, ae.bl_count[fe + 1] += 2, ae.bl_count[Ne]--, Le -= 2
									} while (0 < Le);
									for (fe = Ne; fe !== 0; fe--)
										for (ke = ae.bl_count[fe]; ke !== 0;) _r < (je = ae.heap[--xe]) || (Pe[2 * je + 1] !== fe && (ae.opt_len += (fe - Pe[2 * je + 1]) * Pe[2 * je], Pe[2 * je + 1] = fe), ke--)
								}
							}(g, O), ve(Z, oe, g.bl_count)
					}

					function s(g, O, L) {
						var M, A, Z = -1,
							Y = O[1],
							X = 0,
							J = 7,
							oe = 4;
						for (Y === 0 && (J = 138, oe = 3), O[2 * (L + 1) + 1] = 65535, M = 0; M <= L; M++) A = Y, Y = O[2 * (M + 1) + 1], ++X < J && A === Y || (X < oe ? g.bl_tree[2 * A] += X : A !== 0 ? (A !== Z && g.bl_tree[2 * A]++, g.bl_tree[2 * x]++) : X <= 10 ? g.bl_tree[2 * C]++ : g.bl_tree[2 * D]++, Z = A, oe = (X = 0) === Y ? (J = 138, 3) : A === Y ? (J = 6, 3) : (J = 7, 4))
					}

					function I(g, O, L) {
						var M, A, Z = -1,
							Y = O[1],
							X = 0,
							J = 7,
							oe = 4;
						for (Y === 0 && (J = 138, oe = 3), M = 0; M <= L; M++)
							if (A = Y, Y = O[2 * (M + 1) + 1], !(++X < J && A === Y)) {
								if (X < oe)
									for (; V(g, A, g.bl_tree), --X != 0;);
								else A !== 0 ? (A !== Z && (V(g, A, g.bl_tree), X--), V(g, x, g.bl_tree), K(g, X - 3, 2)) : X <= 10 ? (V(g, C, g.bl_tree), K(g, X - 3, 3)) : (V(g, D, g.bl_tree), K(g, X - 11, 7));
								Z = A, oe = (X = 0) === Y ? (J = 138, 3) : A === Y ? (J = 6, 3) : (J = 7, 4)
							}
					}
					l(H);
					var z = !1;

					function _(g, O, L, M) {
						K(g, (f << 1) + (M ? 1 : 0), 3),
							function(A, Z, Y, X) {
								ie(A), X && ($(A, Y), $(A, ~Y)), t.arraySet(A.pending_buf, A.window, Z, Y, A.pending), A.pending += Y
							}(g, O, L, !0)
					}
					a._tr_init = function(g) {
						z || (function() {
							var O, L, M, A, Z, Y = new Array(d + 1);
							for (A = M = 0; A < p - 1; A++)
								for (R[A] = M, O = 0; O < 1 << F[A]; O++) c[M++] = A;
							for (c[M - 1] = A, A = Z = 0; A < 16; A++)
								for (H[A] = Z, O = 0; O < 1 << U[A]; O++) T[Z++] = A;
							for (Z >>= 7; A < h; A++)
								for (H[A] = Z << 7, O = 0; O < 1 << U[A] - 7; O++) T[256 + Z++] = A;
							for (L = 0; L <= d; L++) Y[L] = 0;
							for (O = 0; O <= 143;) Q[2 * O + 1] = 8, O++, Y[8]++;
							for (; O <= 255;) Q[2 * O + 1] = 9, O++, Y[9]++;
							for (; O <= 279;) Q[2 * O + 1] = 7, O++, Y[7]++;
							for (; O <= 287;) Q[2 * O + 1] = 8, O++, Y[8]++;
							for (ve(Q, w + 1, Y), O = 0; O < h; O++) P[2 * O + 1] = 5, P[2 * O] = ue(O, 5);
							re = new ee(Q, F, b + 1, w, d), W = new ee(P, U, 0, h, d), te = new ee(new Array(0), N, 0, v, y)
						}(), z = !0), g.l_desc = new j(g.dyn_ltree, re), g.d_desc = new j(g.dyn_dtree, W), g.bl_desc = new j(g.bl_tree, te), g.bi_buf = 0, g.bi_valid = 0, ne(g)
					}, a._tr_stored_block = _, a._tr_flush_block = function(g, O, L, M) {
						var A, Z, Y = 0;
						0 < g.level ? (g.strm.data_type === 2 && (g.strm.data_type = function(X) {
							var J, oe = 4093624447;
							for (J = 0; J <= 31; J++, oe >>>= 1)
								if (1 & oe && X.dyn_ltree[2 * J] !== 0) return o;
							if (X.dyn_ltree[18] !== 0 || X.dyn_ltree[20] !== 0 || X.dyn_ltree[26] !== 0) return u;
							for (J = 32; J < b; J++)
								if (X.dyn_ltree[2 * J] !== 0) return u;
							return o
						}(g)), we(g, g.l_desc), we(g, g.d_desc), Y = function(X) {
							var J;
							for (s(X, X.dyn_ltree, X.l_desc.max_code), s(X, X.dyn_dtree, X.d_desc.max_code), we(X, X.bl_desc), J = v - 1; 3 <= J && X.bl_tree[2 * G[J] + 1] === 0; J--);
							return X.opt_len += 3 * (J + 1) + 5 + 5 + 4, J
						}(g), A = g.opt_len + 3 + 7 >>> 3, (Z = g.static_len + 3 + 7 >>> 3) <= A && (A = Z)) : A = Z = L + 5, L + 4 <= A && O !== -1 ? _(g, O, L, M) : g.strategy === 4 || Z === A ? (K(g, 2 + (M ? 1 : 0), 3), _e(g, Q, P)) : (K(g, 4 + (M ? 1 : 0), 3), function(X, J, oe, ae) {
							var ge;
							for (K(X, J - 257, 5), K(X, oe - 1, 5), K(X, ae - 4, 4), ge = 0; ge < ae; ge++) K(X, X.bl_tree[2 * G[ge] + 1], 3);
							I(X, X.dyn_ltree, J - 1), I(X, X.dyn_dtree, oe - 1)
						}(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, Y + 1), _e(g, g.dyn_ltree, g.dyn_dtree)), ne(g), M && ie(g)
					}, a._tr_tally = function(g, O, L) {
						return g.pending_buf[g.d_buf + 2 * g.last_lit] = O >>> 8 & 255, g.pending_buf[g.d_buf + 2 * g.last_lit + 1] = 255 & O, g.pending_buf[g.l_buf + g.last_lit] = 255 & L, g.last_lit++, O === 0 ? g.dyn_ltree[2 * L]++ : (g.matches++, O--, g.dyn_ltree[2 * (c[L] + b + 1)]++, g.dyn_dtree[2 * E(O)]++), g.last_lit === g.lit_bufsize - 1
					}, a._tr_align = function(g) {
						K(g, 2, 3), V(g, S, Q),
							function(O) {
								O.bi_valid === 16 ? ($(O, O.bi_buf), O.bi_buf = 0, O.bi_valid = 0) : 8 <= O.bi_valid && (O.pending_buf[O.pending++] = 255 & O.bi_buf, O.bi_buf >>= 8, O.bi_valid -= 8)
							}(g)
					}
				}, {
					"../utils/common": 41
				}],
				53: [function(e, n, a) {
					n.exports = function() {
						this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
					}
				}, {}],
				54: [function(e, n, a) {
					n.exports = typeof setImmediate == "function" ? setImmediate : function() {
						var t = [].slice.apply(arguments);
						t.splice(1, 0, 0), setTimeout.apply(null, t)
					}
				}, {}]
			}, {}, [10])(10)
		})
	})(tr);

	function Fr(i) {
		return i?.replace(/[ .]+/g, "-")
			.replace(/[&]+/g, "and")
			.toLowerCase()
	}

	function ze(i) {
		var r = i.lastIndexOf("/") + 1,
			e = r == 0 ? "" : i.substring(0, r),
			n = r == 0 ? i : i.substring(r);
		return [e, n]
	}

	function Me(i, r) {
		try {
			var e = "http://docx/",
				n = new URL(i, e + r)
				.toString();
			return n.substring(e.length)
		} catch {
			return "".concat(r)
				.concat(i)
		}
	}

	function Tr(i, r) {
		return i.reduce(function(e, n) {
			return e[r(n)] = n, e
		}, {})
	}

	function Ir(i) {
		return new Promise(function(r, e) {
			var n = new FileReader;
			n.onloadend = function() {
				return r(n.result.replace(/application\/octet\-stream;/, "image/png;"))
			}, n.readAsDataURL(i)
		})
	}

	function We(i) {
		return i && typeof i == "object" && !Array.isArray(i)
	}

	function Fe(i) {
		for (var r, e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
		if (!e.length) return i;
		var a = e.shift();
		if (We(i) && We(a))
			for (var t in a)
				if (We(a[t])) {
					var o = (r = i[t]) !== null && r !== void 0 ? r : i[t] = {};
					Fe(o, a[t])
				} else i[t] = a[t];
		return Fe.apply(void 0, Pr([i], e, !1))
	}
	var Rr = function() {
		function i(r, e) {
			Object.defineProperty(this, "_zip", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: r
			}), Object.defineProperty(this, "options", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: e
			}), Object.defineProperty(this, "xmlParser", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: new er
			})
		}
		return Object.defineProperty(i.prototype, "get", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r) {
				return this._zip.files[Dr(r)]
			}
		}), Object.defineProperty(i.prototype, "update", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r, e) {
				this._zip.file(r, e)
			}
		}), Object.defineProperty(i, "load", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r, e) {
				return tr.exports.loadAsync(r)
					.then(function(n) {
						return new i(n, e)
					})
			}
		}), Object.defineProperty(i.prototype, "save", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r) {
				return r === void 0 && (r = "blob"), this._zip.generateAsync({
					type: r
				})
			}
		}), Object.defineProperty(i.prototype, "load", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r, e) {
				var n, a;
				return e === void 0 && (e = "string"), (a = (n = this.get(r)) === null || n === void 0 ? void 0 : n.async(e)) !== null && a !== void 0 ? a : Promise.resolve(null)
			}
		}), Object.defineProperty(i.prototype, "loadRelationships", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r) {
				var e = this;
				r === void 0 && (r = null);
				var n = "_rels/.rels";
				if (r != null) {
					var a = ze(r),
						t = a[0],
						o = a[1];
					n = "".concat(t, "_rels/")
						.concat(o, ".rels")
				}
				return this.load(n)
					.then(function(u) {
						return u ? Sr(e.parseXmlDocument(u)
							.firstElementChild, e.xmlParser) : null
					})
			}
		}), Object.defineProperty(i.prototype, "parseXmlDocument", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(r) {
				return Cr(r, this.options.trimXmlDeclaration)
			}
		}), i
	}();

	function Dr(i) {
		return i.startsWith("/") ? i.substr(1) : i
	}
	var Lr = function(i) {
		be(r, i);

		function r(e, n, a) {
			var t = i.call(this, e, n) || this;
			return Object.defineProperty(t, "_documentParser", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: void 0
			}), Object.defineProperty(t, "body", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: void 0
			}), t._documentParser = a, t
		}
		return Object.defineProperty(r.prototype, "parseXml", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(e) {
				this.body = this._documentParser.parseDocumentFile(e)
			}
		}), r
	}(ye);

	function Te(i, r) {
		return {
			type: r.attr(i, "val"),
			color: r.attr(i, "color"),
			size: r.lengthAttr(i, "sz", he.Border),
			offset: r.lengthAttr(i, "space", he.Point),
			frame: r.boolAttr(i, "frame"),
			shadow: r.boolAttr(i, "shadow")
		}
	}

	function Ur(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "left":
					e.left = Te(t, r);
					break;
				case "top":
					e.top = Te(t, r);
					break;
				case "right":
					e.right = Te(t, r);
					break;
				case "bottom":
					e.bottom = Te(t, r);
					break
			}
		}
		return e
	}
	var nr;
	(function(i) {
		i.Continuous = "continuous", i.NextPage = "nextPage", i.NextColumn = "nextColumn", i.EvenPage = "evenPage", i.OddPage = "oddPage"
	})(nr || (nr = {}));

	function ar(i, r) {
		var e, n;
		r === void 0 && (r = B);
		for (var a = {}, t = 0, o = r.elements(i); t < o.length; t++) {
			var u = o[t];
			switch (u.localName) {
				case "pgSz":
					a.pageSize = {
						width: r.lengthAttr(u, "w"),
						height: r.lengthAttr(u, "h"),
						orientation: r.attr(u, "orient")
					};
					break;
				case "type":
					a.type = r.attr(u, "val");
					break;
				case "pgMar":
					a.pageMargins = {
						left: r.lengthAttr(u, "left"),
						right: r.lengthAttr(u, "right"),
						top: r.lengthAttr(u, "top"),
						bottom: r.lengthAttr(u, "bottom"),
						header: r.lengthAttr(u, "header"),
						footer: r.lengthAttr(u, "footer"),
						gutter: r.lengthAttr(u, "gutter")
					};
					break;
				case "cols":
					a.columns = Mr(u, r);
					break;
				case "headerReference":
					((e = a.headerRefs) !== null && e !== void 0 ? e : a.headerRefs = [])
					.push(ir(u, r));
					break;
				case "footerReference":
					((n = a.footerRefs) !== null && n !== void 0 ? n : a.footerRefs = [])
					.push(ir(u, r));
					break;
				case "titlePg":
					a.titlePage = r.boolAttr(u, "val", !0);
					break;
				case "pgBorders":
					a.pageBorders = Ur(u, r);
					break;
				case "pgNumType":
					a.pageNumber = Wr(u, r);
					break
			}
		}
		return a
	}

	function Mr(i, r) {
		return {
			numberOfColumns: r.intAttr(i, "num"),
			space: r.lengthAttr(i, "space"),
			separator: r.boolAttr(i, "sep"),
			equalWidth: r.boolAttr(i, "equalWidth", !0),
			columns: r.elements(i, "col")
				.map(function(e) {
					return {
						width: r.lengthAttr(e, "w"),
						space: r.lengthAttr(e, "space")
					}
				})
		}
	}

	function Wr(i, r) {
		return {
			chapSep: r.attr(i, "chapSep"),
			chapStyle: r.attr(i, "chapStyle"),
			format: r.attr(i, "fmt"),
			start: r.intAttr(i, "start")
		}
	}

	function ir(i, r) {
		return {
			id: r.attr(i, "id"),
			type: r.attr(i, "type")
		}
	}

	function Hr(i, r) {
		return {
			before: r.lengthAttr(i, "before"),
			after: r.lengthAttr(i, "after"),
			line: r.intAttr(i, "line"),
			lineRule: r.attr(i, "lineRule")
		}
	}

	function He(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			Zr(t, e, r)
		}
		return e
	}

	function Zr(i, r, e) {
		return !!Qe(i, r, e)
	}

	function or(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			sr(t, e, r)
		}
		return e
	}

	function sr(i, r, e) {
		if (i.namespaceURI != Je.wordml) return !1;
		if (Qe(i, r, e)) return !0;
		switch (i.localName) {
			case "tabs":
				r.tabs = Xr(i, e);
				break;
			case "sectPr":
				r.sectionProps = ar(i, e);
				break;
			case "numPr":
				r.numbering = Gr(i, e);
				break;
			case "spacing":
				return r.lineSpacing = Hr(i, e), !1;
			case "textAlignment":
				return r.textAlignment = e.attr(i, "val"), !1;
			case "keepNext":
				r.keepLines = e.boolAttr(i, "val", !0);
				break;
			case "pageBreakBefore":
				r.pageBreakBefore = e.boolAttr(i, "val", !0);
				break;
			case "outlineLvl":
				r.outlineLevel = e.intAttr(i, "val");
				break;
			case "pStyle":
				r.styleName = e.attr(i, "val");
				break;
			case "rPr":
				r.runProps = He(i, e);
				break;
			default:
				return !1
		}
		return !0
	}

	function Xr(i, r) {
		return r.elements(i, "tab")
			.map(function(e) {
				return {
					position: r.lengthAttr(e, "pos"),
					leader: r.attr(e, "leader"),
					style: r.attr(e, "val")
				}
			})
	}

	function Gr(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "numId":
					e.id = r.attr(t, "val");
					break;
				case "ilvl":
					e.level = r.intAttr(t, "val");
					break
			}
		}
		return e
	}

	function Vr(i, r) {
		for (var e = {
			numberings: [],
			abstractNumberings: [],
			bulletPictures: []
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "num":
					e.numberings.push(Kr(t, r));
					break;
				case "abstractNum":
					e.abstractNumberings.push(Yr(t, r));
					break;
				case "numPicBullet":
					e.bulletPictures.push(Jr(t, r));
					break
			}
		}
		return e
	}

	function Kr(i, r) {
		for (var e = {
			id: r.attr(i, "numId"),
			overrides: []
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "abstractNumId":
					e.abstractId = r.attr(t, "val");
					break;
				case "lvlOverride":
					e.overrides.push(qr(t, r));
					break
			}
		}
		return e
	}

	function Yr(i, r) {
		for (var e = {
			id: r.attr(i, "abstractNumId"),
			levels: []
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "name":
					e.name = r.attr(t, "val");
					break;
				case "multiLevelType":
					e.multiLevelType = r.attr(t, "val");
					break;
				case "numStyleLink":
					e.numberingStyleLink = r.attr(t, "val");
					break;
				case "styleLink":
					e.styleLink = r.attr(t, "val");
					break;
				case "lvl":
					e.levels.push(lr(t, r));
					break
			}
		}
		return e
	}

	function lr(i, r) {
		for (var e = {
			level: r.intAttr(i, "ilvl")
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "start":
					e.start = r.attr(t, "val");
					break;
				case "lvlRestart":
					e.restart = r.intAttr(t, "val");
					break;
				case "numFmt":
					e.format = r.attr(t, "val");
					break;
				case "lvlText":
					e.text = r.attr(t, "val");
					break;
				case "lvlJc":
					e.justification = r.attr(t, "val");
					break;
				case "lvlPicBulletId":
					e.bulletPictureId = r.attr(t, "val");
					break;
				case "pStyle":
					e.paragraphStyle = r.attr(t, "val");
					break;
				case "pPr":
					e.paragraphProps = or(t, r);
					break;
				case "rPr":
					e.runProps = He(t, r);
					break
			}
		}
		return e
	}

	function qr(i, r) {
		for (var e = {
			level: r.intAttr(i, "ilvl")
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "startOverride":
					e.start = r.intAttr(t, "val");
					break;
				case "lvl":
					e.numberingLevel = lr(t, r);
					break
			}
		}
		return e
	}

	function Jr(i, r) {
		var e = r.element(i, "pict"),
			n = e && r.element(e, "shape"),
			a = n && r.element(n, "imagedata");
		return a ? {
			id: r.attr(i, "numPicBulletId"),
			referenceId: r.attr(a, "id"),
			style: r.attr(n, "style")
		} : null
	}
	var $r = function(i) {
			be(r, i);

			function r(e, n, a) {
				var t = i.call(this, e, n) || this;
				return Object.defineProperty(t, "_documentParser", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "numberings", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "abstractNumberings", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "bulletPictures", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "domNumberings", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), t._documentParser = a, t
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					Object.assign(this, Vr(e, this._package.xmlParser)), this.domNumberings = this._documentParser.parseNumberingFile(e)
				}
			}), r
		}(ye),
		Qr = function(i) {
			be(r, i);

			function r(e, n, a) {
				var t = i.call(this, e, n) || this;
				return Object.defineProperty(t, "styles", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "_documentParser", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), t._documentParser = a, t
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
										this.styles = this._documentParser.parseStylesFile(e)
					// console.log(" XML->this.styles:",this.styles)
				}
			}), r
		}(ye),
		q;
	(function(i) {
		i.Document = "document", i.Paragraph = "paragraph", i.Run = "run", i.Break = "break", i.NoBreakHyphen = "noBreakHyphen", i.Table = "table", i.Row = "row", i.Cell = "cell", i.Hyperlink = "hyperlink", i.Drawing = "drawing", i.Image = "image", i.Text = "text", i.Tab = "tab", i.Symbol = "symbol", i.BookmarkStart = "bookmarkStart", i.BookmarkEnd = "bookmarkEnd", i.Footer = "footer", i.Header = "header", i.FootnoteReference = "footnoteReference", i.EndnoteReference = "endnoteReference", i.Footnote = "footnote", i.Endnote = "endnote", i.SimpleField = "simpleField", i.ComplexField = "complexField", i.Instruction = "instruction"
	})(q || (q = {}));
	var et = function() {
			function i() {
				Object.defineProperty(this, "type", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: q.Header
				}), Object.defineProperty(this, "children", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "cssStyle", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "className", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "parent", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return i
		}(),
		rt = function() {
			function i() {
				Object.defineProperty(this, "type", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: q.Footer
				}), Object.defineProperty(this, "children", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "cssStyle", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "className", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "parent", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return i
		}(),
		ur = function(i) {
			be(r, i);

			function r(e, n, a) {
				var t = i.call(this, e, n) || this;
				return Object.defineProperty(t, "rootElement", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "_documentParser", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), t._documentParser = a, t
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.rootElement = this.createRootElement(), this.rootElement.children = this._documentParser.parseBodyElements(e)
				}
			}), r
		}(ye),
		tt = function(i) {
			be(r, i);

			function r() {
				return i !== null && i.apply(this, arguments) || this
			}
			return Object.defineProperty(r.prototype, "createRootElement", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					return new et
				}
			}), r
		}(ur),
		nt = function(i) {
			be(r, i);

			function r() {
				return i !== null && i.apply(this, arguments) || this
			}
			return Object.defineProperty(r.prototype, "createRootElement", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					return new rt
				}
			}), r
		}(ur);

	function at(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "Template":
					e.template = t.textContent;
					break;
				case "Pages":
					e.pages = Se(t.textContent);
					break;
				case "Words":
					e.words = Se(t.textContent);
					break;
				case "Characters":
					e.characters = Se(t.textContent);
					break;
				case "Application":
					e.application = t.textContent;
					break;
				case "Lines":
					e.lines = Se(t.textContent);
					break;
				case "Paragraphs":
					e.paragraphs = Se(t.textContent);
					break;
				case "Company":
					e.company = t.textContent;
					break;
				case "AppVersion":
					e.appVersion = t.textContent;
					break
			}
		}
		return e
	}

	function Se(i) {
		if (!(typeof i > "u")) return parseInt(i)
	}
	var it = function(i) {
		be(r, i);

		function r() {
			var e = i !== null && i.apply(this, arguments) || this;
			return Object.defineProperty(e, "props", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: void 0
			}), e
		}
		return Object.defineProperty(r.prototype, "parseXml", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(e) {
				this.props = at(e, this._package.xmlParser)
			}
		}), r
	}(ye);

	function ot(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "title":
					e.title = t.textContent;
					break;
				case "description":
					e.description = t.textContent;
					break;
				case "subject":
					e.subject = t.textContent;
					break;
				case "creator":
					e.creator = t.textContent;
					break;
				case "keywords":
					e.keywords = t.textContent;
					break;
				case "language":
					e.language = t.textContent;
					break;
				case "lastModifiedBy":
					e.lastModifiedBy = t.textContent;
					break;
				case "revision":
					t.textContent && (e.revision = parseInt(t.textContent));
					break
			}
		}
		return e
	}
	var st = function(i) {
			be(r, i);

			function r() {
				var e = i !== null && i.apply(this, arguments) || this;
				return Object.defineProperty(e, "props", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), e
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.props = ot(e, this._package.xmlParser)
				}
			}), r
		}(ye),
		lt = function() {
			function i() {
				Object.defineProperty(this, "colorScheme", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "fontScheme", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return i
		}();

	function ut(i, r) {
		for (var e = new lt, n = r.element(i, "themeElements"), a = 0, t = r.elements(n); a < t.length; a++) {
			var o = t[a];
			switch (o.localName) {
				case "clrScheme":
					e.colorScheme = ct(o, r);
					break;
				case "fontScheme":
					e.fontScheme = ft(o, r);
					break
			}
		}
		return e
	}

	function ct(i, r) {
		for (var e = {
			name: r.attr(i, "name"),
			colors: {}
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n],
				o = r.element(t, "srgbClr"),
				u = r.element(t, "sysClr");
			o ? e.colors[t.localName] = r.attr(o, "val") : u && (e.colors[t.localName] = r.attr(u, "lastClr"))
		}
		return e
	}

	function ft(i, r) {
		for (var e = {
			name: r.attr(i, "name")
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "majorFont":
					e.majorFont = cr(t, r);
					break;
				case "minorFont":
					e.minorFont = cr(t, r);
					break
			}
		}
		return e
	}

	function cr(i, r) {
		return {
			latinTypeface: r.elementAttr(i, "latin", "typeface"),
			eaTypeface: r.elementAttr(i, "ea", "typeface"),
			csTypeface: r.elementAttr(i, "cs", "typeface")
		}
	}
	var ht = function(i) {
			be(r, i);

			function r(e, n) {
				var a = i.call(this, e, n) || this;
				return Object.defineProperty(a, "theme", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), a
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.theme = ut(e, this._package.xmlParser)
				}
			}), r
		}(ye),
		fr = function() {
			function i() {
				Object.defineProperty(this, "id", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "type", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "noteType", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "children", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "cssStyle", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "className", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "parent", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return i
		}(),
		dt = function(i) {
			be(r, i);

			function r() {
				var e = i !== null && i.apply(this, arguments) || this;
				return Object.defineProperty(e, "type", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: q.Footnote
				}), e
			}
			return r
		}(fr),
		pt = function(i) {
			be(r, i);

			function r() {
				var e = i !== null && i.apply(this, arguments) || this;
				return Object.defineProperty(e, "type", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: q.Endnote
				}), e
			}
			return r
		}(fr),
		hr = function(i) {
			be(r, i);

			function r(e, n, a) {
				var t = i.call(this, e, n) || this;
				return Object.defineProperty(t, "_documentParser", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(t, "notes", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), t._documentParser = a, t
			}
			return r
		}(ye),
		bt = function(i) {
			be(r, i);

			function r(e, n, a) {
				return i.call(this, e, n, a) || this
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.notes = this._documentParser.parseNotes(e, "footnote", dt)
				}
			}), r
		}(hr),
		mt = function(i) {
			be(r, i);

			function r(e, n, a) {
				return i.call(this, e, n, a) || this
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.notes = this._documentParser.parseNotes(e, "endnote", pt)
				}
			}), r
		}(hr);

	function vt(i, r) {
		for (var e = {}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "defaultTabStop":
					e.defaultTabStop = r.lengthAttr(t, "val");
					break;
				case "footnotePr":
					e.footnoteProps = dr(t, r);
					break;
				case "endnotePr":
					e.endnoteProps = dr(t, r);
					break;
				case "autoHyphenation":
					e.autoHyphenation = r.boolAttr(t, "val");
					break
			}
		}
		return e
	}

	function dr(i, r) {
		for (var e = {
			defaultNoteIds: []
		}, n = 0, a = r.elements(i); n < a.length; n++) {
			var t = a[n];
			switch (t.localName) {
				case "numFmt":
					e.nummeringFormat = r.attr(t, "val");
					break;
				case "footnote":
				case "endnote":
					e.defaultNoteIds.push(r.attr(t, "id"));
					break
			}
		}
		return e
	}
	var gt = function(i) {
		be(r, i);

		function r(e, n) {
			var a = i.call(this, e, n) || this;
			return Object.defineProperty(a, "settings", {
				enumerable: !0,
				configurable: !0,
				writable: !0,
				value: void 0
			}), a
		}
		return Object.defineProperty(r.prototype, "parseXml", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(e) {
				this.settings = vt(e, this._package.xmlParser)
			}
		}), r
	}(ye);

	function yt(i, r) {
		return r.elements(i, "property")
			.map(function(e) {
				var n = e.firstChild;
				return {
					formatId: r.attr(e, "fmtid"),
					name: r.attr(e, "name"),
					type: n.nodeName,
					value: n.textContent
				}
			})
	}
	var wt = function(i) {
			be(r, i);

			function r() {
				var e = i !== null && i.apply(this, arguments) || this;
				return Object.defineProperty(e, "props", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), e
			}
			return Object.defineProperty(r.prototype, "parseXml", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(e) {
					this.props = yt(e, this._package.xmlParser)
				}
			}), r
		}(ye),
		_t = [{
			type: de.OfficeDocument,
			target: "word/document.xml"
		}, {
			type: de.ExtendedProperties,
			target: "docProps/app.xml"
		}, {
			type: de.CoreProperties,
			target: "docProps/core.xml"
		}, {
			type: de.CustomProperties,
			target: "docProps/custom.xml"
		}],
		kt = function() {
			function i() {
				Object.defineProperty(this, "_package", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "_parser", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "_options", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "rels", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "parts", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "partsMap", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "documentPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "fontTablePart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "numberingPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "stylesPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "footnotesPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "endnotesPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "themePart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "corePropsPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "extendedPropsPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "settingsPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				})
			}
			return Object.defineProperty(i, "load", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					var a = new i;
					return a._options = n, a._parser = e, Rr.load(r, n)
						.then(function(t) {
							return a._package = t, a._package.loadRelationships()
						})
						.then(function(t) {
							a.rels = t;
							var o = _t.map(function(u) {
								var l, f = (l = t.find(function(p) {
									return p.type === u.type
								})) !== null && l !== void 0 ? l : u;
								return a.loadRelationshipPart(f.target, f.type)
							});
							return Promise.all(o)
						})
						.then(function() {
							return a
						})
				}
			}), Object.defineProperty(i.prototype, "save", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return r === void 0 && (r = "blob"), this._package.save(r)
				}
			}), Object.defineProperty(i.prototype, "loadRelationshipPart", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
					if (this.partsMap[r]) return Promise.resolve(this.partsMap[r]);
					if (!this._package.get(r)) return Promise.resolve(null);
					var a = null;
					switch (e) {
						case de.OfficeDocument:
							this.documentPart = a = new Lr(this._package, r, this._parser);
							break;
						case de.FontTable:
							this.fontTablePart = a = new zr(this._package, r);
							break;
						case de.Numbering:
							this.numberingPart = a = new $r(this._package, r, this._parser);
							break;
						case de.Styles:
							this.stylesPart = a = new Qr(this._package, r, this._parser);
							break;
						case de.Theme:
							this.themePart = a = new ht(this._package, r);
							break;
						case de.Footnotes:
							this.footnotesPart = a = new bt(this._package, r, this._parser);
							break;
						case de.Endnotes:
							this.endnotesPart = a = new mt(this._package, r, this._parser);
							break;
						case de.Footer:
							a = new nt(this._package, r, this._parser);
							break;
						case de.Header:
							a = new tt(this._package, r, this._parser);
							break;
						case de.CoreProperties:
							this.corePropsPart = a = new st(this._package, r);
							break;
						case de.ExtendedProperties:
							this.extendedPropsPart = a = new it(this._package, r);
							break;
						case de.CustomProperties:
							a = new wt(this._package, r);
							break;
						case de.Settings:
							this.settingsPart = a = new gt(this._package, r);
							break
					}
					return a == null ? Promise.resolve(null) : (this.partsMap[r] = a, this.parts.push(a), a.load()
						.then(function() {
							if (a.rels == null || a.rels.length == 0) return a;
							var t = ze(a.path)[0],
								o = a.rels.map(function(u) {
									return n.loadRelationshipPart(Me(u.target, t), u.type)
								});
							return Promise.all(o)
								.then(function() {
									return a
								})
						}))
				}
			}), Object.defineProperty(i.prototype, "loadDocumentImage", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
					return this.loadResource(e??this.documentPart, r, "blob")
						.then(function(a) {
							return n.blobToURL(a)
						})
				}
			}), Object.defineProperty(i.prototype, "loadNumberingImage", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this;
					return this.loadResource(this.numberingPart, r, "blob")
						.then(function(n) {
							return e.blobToURL(n)
						})
				}
			}), Object.defineProperty(i.prototype, "loadFont", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
					return this.loadResource(this.fontTablePart, r, "uint8array")
						.then(function(a) {
							return a && n.blobToURL(new Blob([Pt(a, e)]))
						})
				}
			}), Object.defineProperty(i.prototype, "blobToURL", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return r ? this._options.useBase64URL ? Ir(r) : URL.createObjectURL(r) : null
				}
			}), Object.defineProperty(i.prototype, "findPartByRelId", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n;
					e === void 0 && (e = null);
					var a = ((n = e.rels) !== null && n !== void 0 ? n : this.rels)
						.find(function(o) {
							return o.id == r
						}),
						t = e ? ze(e.path)[0] : "";
					return a ? this.partsMap[Me(a.target, t)] : null
				}
			}), Object.defineProperty(i.prototype, "getPathById", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = r.rels.find(function(t) {
							return t.id == e
						}),
						a = ze(r.path)[0];
					return n ? Me(n.target, a) : null
				}
			}), Object.defineProperty(i.prototype, "loadResource", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					var a = this.getPathById(r, e);
					return a ? this._package.load(a, n) : Promise.resolve(null)
				}
			}), i
		}();

	function Pt(i, r) {
		for (var e = 16, n = r.replace(/{|}|-/g, ""), a = new Array(e), t = 0; t < e; t++) a[e - t - 1] = parseInt(n.substr(t * 2, 2), 16);
		for (var t = 0; t < 32; t++) i[t] = i[t] ^ a[t % e];
		return i
	}

	function St(i, r) {
		return {
			type: q.BookmarkStart,
			id: r.attr(i, "id"),
			name: r.attr(i, "name"),
			colFirst: r.intAttr(i, "colFirst"),
			colLast: r.intAttr(i, "colLast")
		}
	}

	function Ot(i, r) {
		return {
			type: q.BookmarkEnd,
			id: r.attr(i, "id")
		}
	}
	var Ie = {
			shd: "inherit",
			color: "black",
			borderColor: "black",
			highlight: "transparent"
		},
		Ct = function() {
			function i(r) {
				Object.defineProperty(this, "options", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), this.options = me({
					ignoreWidth: !1,
					debug: !1
				}, r)
			}
			return Object.defineProperty(i.prototype, "parseNotes", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					for (var a = [], t = 0, o = B.elements(r, e); t < o.length; t++) {
						var u = o[t],
							l = new n;
						l.id = B.attr(u, "id"), l.noteType = B.attr(u, "type"), l.children = this.parseBodyElements(u), a.push(l)
					}
					return a
				}
			}), Object.defineProperty(i.prototype, "parseDocumentFile", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.element(r, "body"),
						n = B.element(r, "background"),
						a = B.element(e, "sectPr");
					return {
						type: q.Document,
						children: this.parseBodyElements(e),
						props: a ? ar(a, B) : null,
						cssStyle: n ? this.parseBackground(n) : {}
					}
				}
			}), Object.defineProperty(i.prototype, "parseBackground", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = {},
						n = se.colorAttr(r, "color");
					return n && (e["background-color"] = n), e
				}
			}), Object.defineProperty(i.prototype, "parseBodyElements", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = [];
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "p":
								n.push(e.parseParagraph(a));
								break;
							case "tbl":
								n.push(e.parseTable(a));
								break;
							case "sdt":
								e.parseSdt(a)
									.forEach(function(t) {
										return n.push(t)
									});
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseStylesFile", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = [];
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "style":
								n.push(e.parseStyle(a));
								break;
							case "docDefaults":
								n.push(e.parseDefaultStyles(a));
								break
						}
					}), n  
				}
			}), Object.defineProperty(i.prototype, "parseDefaultStyles", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							id: null,
							name: null,
							target: null,
							basedOn: null,
							styles: []
						};
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "rPrDefault":
								var t = B.element(a, "rPr");
								t && n.styles.push({
									target: "span",
									values: e.parseDefaultProperties(t, {})
								});
								break;
							case "pPrDefault":
								var o = B.element(a, "pPr");
								o && n.styles.push({
									target: "p",
									values: e.parseDefaultProperties(o, {})
								});
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseStyle", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							id: B.attr(r, "styleId"),
							isDefault: B.boolAttr(r, "default"),
							name: null,
							target: null,
							basedOn: null,
							styles: [],
							linked: null
						};
					switch (B.attr(r, "type")) {
						case "paragraph":
							n.target = "p";
							break;
						case "table":
							n.target = "table";
							break;
						case "character":
							n.target = "span";
							break
					}
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "basedOn":
								n.basedOn = B.attr(a, "val");
								break;
							case "name":
								n.name = B.attr(a, "val");
								break;
							case "link":
								n.linked = B.attr(a, "val");
								break;
							case "next":
								n.next = B.attr(a, "val");
								break;
							case "aliases":
								n.aliases = B.attr(a, "val")
									.split(",");
								break;
							case "pPr":
								n.styles.push({
									target: "p",
									values: e.parseDefaultProperties(a, {})
								}), n.paragraphProps = or(a, B);  
								break;
							case "rPr":
								n.styles.push({
									target: "span",
									values: e.parseDefaultProperties(a, {})
								}), n.runProps = He(a, B);
								break;
							case "tblPr":
							case "tcPr":
								n.styles.push({
									target: "td",
									values: e.parseDefaultProperties(a, {})
								});
								break;
							case "tblStylePr":
								for (var t = 0, o = e.parseTableStyle(a); t < o.length; t++) {
									var u = o[t];
									n.styles.push(u)
								}
								break;
							case "rsid":
							case "qFormat":
							case "hidden":
							case "semiHidden":
							case "unhideWhenUsed":
							case "autoRedefine":
							case "uiPriority":
								break;
							default:
								e.options.debug && console.warn("DOCX: Unknown style element: ".concat(a.localName))
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseTableStyle", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = [],
						a = B.attr(r, "type"),
						t = "",
						o = "";
					switch (a) {
						case "firstRow":
							o = ".first-row", t = "tr.first-row td";
							break;
						case "lastRow":
							o = ".last-row", t = "tr.last-row td";
							break;
						case "firstCol":
							o = ".first-col", t = "td.first-col";
							break;
						case "lastCol":
							o = ".last-col", t = "td.last-col";
							break;
						case "band1Vert":
							o = ":not(.no-vband)", t = "td.odd-col";
							break;
						case "band2Vert":
							o = ":not(.no-vband)", t = "td.even-col";
							break;
						case "band1Horz":
							o = ":not(.no-hband)", t = "tr.odd-row";
							break;
						case "band2Horz":
							o = ":not(.no-hband)", t = "tr.even-row";
							break;
						default:
							return []
					}
					return se.foreach(r, function(u) {
						switch (u.localName) {
							case "pPr":
								n.push({
									target: "".concat(t, " p"),
									mod: o,
									values: e.parseDefaultProperties(u, {})
								});
								break;
							case "rPr":
								n.push({
									target: "".concat(t, " span"),
									mod: o,
									values: e.parseDefaultProperties(u, {})
								});
								break;
							case "tblPr":
							case "tcPr":
								n.push({
									target: t,
									mod: o,
									values: e.parseDefaultProperties(u, {})
								});
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseNumberingFile", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = [],
						a = {},
						t = [];
					return se.foreach(r, function(o) {
						switch (o.localName) {
							case "abstractNum":
								e.parseAbstractNumbering(o, t)
									.forEach(function(f) {
										return n.push(f)
									});
								break;
							case "numPicBullet":
								t.push(e.parseNumberingPicBullet(o));
								break;
							case "num":
								var u = B.attr(o, "numId"),
									l = B.elementAttr(o, "abstractNumId", "val");
								a[l] = u;
								break
						}
					}), n.forEach(function(o) {
						return o.id = a[o.id]
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseNumberingPicBullet", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.element(r, "pict"),
						n = e && B.element(e, "shape"),
						a = n && B.element(n, "imagedata");
					return a ? {
						id: B.intAttr(r, "numPicBulletId"),
						src: B.attr(a, "id"),
						style: B.attr(n, "style")
					} : null
				}
			}), Object.defineProperty(i.prototype, "parseAbstractNumbering", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this,
						a = [],
						t = B.attr(r, "abstractNumId");
					return se.foreach(r, function(o) {
						switch (o.localName) {
							case "lvl":
								a.push(n.parseNumberingLevel(t, o, e));
								break
						}
					}), a
				}
			}), Object.defineProperty(i.prototype, "parseNumberingLevel", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					var a = this,
						t = {
							id: r,
							level: B.intAttr(e, "ilvl"),
							pStyleName: void 0,
							pStyle: {},
							rStyle: {},
							suff: "tab"
						};
					return se.foreach(e, function(o) {
						switch (o.localName) {
							case "pPr":
								a.parseDefaultProperties(o, t.pStyle);
								break;
							case "rPr":
								a.parseDefaultProperties(o, t.rStyle);
								break;
							case "lvlPicBulletId":
								var u = B.intAttr(o, "val");
								t.bullet = n.find(function(l) {
									return l.id == u
								});
								break;
							case "lvlText":
								t.levelText = B.attr(o, "val");
								break;
							case "pStyle":
								t.pStyleName = B.attr(o, "val");
								break;
							case "numFmt":
								t.format = B.attr(o, "val");
								break;
							case "suff":
								t.suff = B.attr(o, "val");
								break
						}
					}), t
				}
			}), Object.defineProperty(i.prototype, "parseSdt", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.element(r, "sdtContent");
					return e ? this.parseBodyElements(e) : []
				}
			}), Object.defineProperty(i.prototype, "parseParagraph", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							type: q.Paragraph,
							children: []
						};
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "r":
								n.children.push(e.parseRun(a, n));
								break;
							case "hyperlink":
								n.children.push(e.parseHyperlink(a, n));
								break;
							case "bookmarkStart":
								n.children.push(St(a, B));
								break;
							case "bookmarkEnd":
								n.children.push(Ot(a, B));
								break;
							case "pPr":
								e.parseParagraphProperties(a, n);
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseParagraphProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
				
					this.parseDefaultProperties(r, e.cssStyle = {}, null, function(a) {
						if (sr(a, e, B)) return !0;
						switch (a.localName) {
							case "pStyle":
								e.styleName = B.attr(a, "val");
								break;
							case "cnfStyle":
								e.className = le.classNameOfCnfStyle(a);
								break;
							case "framePr":
								n.parseFrame(a, e);
								break;
							case "rPr":
								break;
							default:
								return !1
						}
						return !0
					})
				}
			}), Object.defineProperty(i.prototype, "parseFrame", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.attr(r, "dropCap");
					n == "drop" && (e.cssStyle.float = "left")
				}
			}), Object.defineProperty(i.prototype, "parseHyperlink", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this,
						a = {
							type: q.Hyperlink,
							parent: e,
							children: []
						},
						t = B.attr(r, "anchor");
					return t && (a.href = "#" + t), se.foreach(r, function(o) {
						switch (o.localName) {
							case "r":
								a.children.push(n.parseRun(o, a));
								break
						}
					}), a
				}
			}), Object.defineProperty(i.prototype, "parseRun", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this,
						a = {
							type: q.Run,
							parent: e,
							children: []
						};
					return se.foreach(r, function(t) {
						switch (t.localName) {
							case "t":
								a.children.push({
									type: q.Text,
									text: t.textContent
								});
								break;
							case "fldSimple":
								a.children.push({
									type: q.SimpleField,
									instruction: B.attr(t, "instr"),
									lock: B.boolAttr(t, "lock", !1),
									dirty: B.boolAttr(t, "dirty", !1)
								});
								break;
							case "instrText":
								a.fieldRun = !0, a.children.push({
									type: q.Instruction,
									text: t.textContent
								});
								break;
							case "fldChar":
								a.fieldRun = !0, a.children.push({
									type: q.ComplexField,
									charType: B.attr(t, "fldCharType"),
									lock: B.boolAttr(t, "lock", !1),
									dirty: B.boolAttr(t, "dirty", !1)
								});
								break;
							case "noBreakHyphen":
								a.children.push({
									type: q.NoBreakHyphen
								});
								break;
							case "br":
								a.children.push({
									type: q.Break,
									break: B.attr(t, "type") || "textWrapping"
								});
								break;
							case "lastRenderedPageBreak":
								a.children.push({
									type: q.Break,
									break: "lastRenderedPageBreak"
								});
								break;
							case "sym":
								a.children.push({
									type: q.Symbol,
									font: Math.ceil(parseInt(B.attr(t, "font")) * 4 / 3) + "px",
									char: B.attr(t, "char")
								});
								break;
							case "tab":
								a.children.push({
									type: q.Tab
								});
								break;
							case "footnoteReference":
								a.children.push({
									type: q.FootnoteReference,
									id: B.attr(t, "id")
								});
								break;
							case "endnoteReference":
								a.children.push({
									type: q.EndnoteReference,
									id: B.attr(t, "id")
								});
								break;
							case "drawing":
								var o = n.parseDrawing(t);
								o && (a.children = [o]);
								break;
							case "rPr":
								n.parseRunProperties(t, a);
								break
						}
					}), a
				}
			}), Object.defineProperty(i.prototype, "parseRunProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					let _n=this;
					this.parseDefaultProperties(r, e.cssStyle = {}, null, function(n) {
						switch (n.localName) {
							case "rStyle":
								e.styleName = B.attr(n, "val");
								break;
							case "vertAlign":
								e.verticalAlign = le.valueOfVertAlign(n, !0);
								break;
							default:
								return !1
						}
						return !0
					})
				}
			}), Object.defineProperty(i.prototype, "parseDrawing", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = 0, n = B.elements(r); e < n.length; e++) {
						var a = n[e];
						switch (a.localName) {
							case "inline":
							case "anchor":
								return this.parseDrawingWrapper(a)
						}
					}
				}
			}), Object.defineProperty(i.prototype, "parseDrawingWrapper", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e, n = {
						type: q.Drawing,
						children: [],
						cssStyle: {}
					}, a = r.localName == "anchor", t = null, o = B.boolAttr(r, "simplePos"), u = {
						relative: "page",
						align: "left",
						offset: "0"
					}, l = {
						relative: "page",
						align: "top",
						offset: "0"
					}, f = 0, p = B.elements(r); f < p.length; f++) {
						var b = p[f];
						switch (b.localName) {
							case "simplePos":
								o && (u.offset = B.lengthAttr(b, "x", he.Emu), l.offset = B.lengthAttr(b, "y", he.Emu));
								break;
							case "extent":
								n.cssStyle.width = B.lengthAttr(b, "cx", he.Emu), n.cssStyle.height = B.lengthAttr(b, "cy", he.Emu);
								break;
							case "positionH":
							case "positionV":
								if (!o) {
									var w = b.localName == "positionH" ? u : l,
										h = B.element(b, "align"),
										v = B.element(b, "posOffset");
									w.relative = (e = B.attr(b, "relativeFrom")) !== null && e !== void 0 ? e : w.relative, h && (w.align = h.textContent), v && (w.offset = se.sizeValue(v, he.Emu))
								}
								break;
							case "wrapTopAndBottom":
								t = "wrapTopAndBottom";
								break;
							case "wrapNone":
								t = "wrapNone";
								break;
							case "graphic":
								var k = this.parseGraphic(b);
								k && n.children.push(k);
								break
						}
					}
					return t == "wrapTopAndBottom" ? (n.cssStyle.display = "block", u.align && (n.cssStyle["text-align"] = u.align, n.cssStyle.width = "100%")) : t == "wrapNone" ? (n.cssStyle.display = "block", n.cssStyle.position = "relative", n.cssStyle.width = "0px", n.cssStyle.height = "0px", u.offset && (n.cssStyle.left = u.offset), l.offset && (n.cssStyle.top = l.offset)) : a && (u.align == "left" || u.align == "right") && (n.cssStyle.float = u.align), n
				}
			}), Object.defineProperty(i.prototype, "parseGraphic", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = B.element(r, "graphicData"), n = 0, a = B.elements(e); n < a.length; n++) {
						var t = a[n];
						switch (t.localName) {
							case "pic":
								return this.parsePicture(t)
						}
					}
					return null
				}
			}), Object.defineProperty(i.prototype, "parsePicture", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = {
							type: q.Image,
							src: "",
							cssStyle: {}
						},
						n = B.element(r, "blipFill"),
						a = B.element(n, "blip");
					e.src = B.attr(a, "embed");
					var t = B.element(r, "spPr"),
						o = B.element(t, "xfrm");
					e.cssStyle.position = "relative";
					for (var u = 0, l = B.elements(o); u < l.length; u++) {
						var f = l[u];
						switch (f.localName) {
							case "ext":
								e.cssStyle.width = B.lengthAttr(f, "cx", he.Emu), e.cssStyle.height = B.lengthAttr(f, "cy", he.Emu);
								break;
							case "off":
								e.cssStyle.left = B.lengthAttr(f, "x", he.Emu), e.cssStyle.top = B.lengthAttr(f, "y", he.Emu);
								break
						}
					}
					return e
				}
			}), Object.defineProperty(i.prototype, "parseTable", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							type: q.Table,
							children: []
						};
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "tr":
								n.children.push(e.parseTableRow(a));
								break;
							case "tblGrid":
								n.columns = e.parseTableColumns(a);
								break;
							case "tblPr":
								e.parseTableProperties(a, n);
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseTableColumns", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = [];
					return se.foreach(r, function(n) {
						switch (n.localName) {
							case "gridCol":
								e.push({
									width: B.lengthAttr(n, "w")
								});
								break
						}
					}), e
				}
			}), Object.defineProperty(i.prototype, "parseTableProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
					switch (e.cssStyle = {}, e.cellStyle = {}, this.parseDefaultProperties(r, e.cssStyle, e.cellStyle, function(a) {
						switch (a.localName) {
							case "tblStyle":
								e.styleName = B.attr(a, "val");
								break;
							case "tblLook":
								e.className = le.classNameOftblLook(a);
								break;
							case "tblpPr":
								n.parseTablePosition(a, e);
								break;
							case "tblStyleColBandSize":
								e.colBandSize = B.intAttr(a, "val");
								break;
							case "tblStyleRowBandSize":
								e.rowBandSize = B.intAttr(a, "val");
								break;
							default:
								return !1
						}
						return !0
					}), e.cssStyle["text-align"]) {
						case "center":
							delete e.cssStyle["text-align"], e.cssStyle["margin-left"] = "auto", e.cssStyle["margin-right"] = "auto";
							break;
						case "right":
							delete e.cssStyle["text-align"], e.cssStyle["margin-left"] = "auto";
							break
					}
				}
			}), Object.defineProperty(i.prototype, "parseTablePosition", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.lengthAttr(r, "topFromText"),
						a = B.lengthAttr(r, "bottomFromText"),
						t = B.lengthAttr(r, "rightFromText"),
						o = B.lengthAttr(r, "leftFromText");
					e.cssStyle.float = "left", e.cssStyle["margin-bottom"] = le.addSize(e.cssStyle["margin-bottom"], a), e.cssStyle["margin-left"] = le.addSize(e.cssStyle["margin-left"], o), e.cssStyle["margin-right"] = le.addSize(e.cssStyle["margin-right"], t), e.cssStyle["margin-top"] = le.addSize(e.cssStyle["margin-top"], n)
				}
			}), Object.defineProperty(i.prototype, "parseTableRow", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							type: q.Row,
							children: []
						};
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "tc":
								n.children.push(e.parseTableCell(a));
								break;
							case "trPr":
								e.parseTableRowProperties(a, n);
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseTableRowProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e.cssStyle = this.parseDefaultProperties(r, {}, null, function(n) {
						switch (n.localName) {
							case "cnfStyle":
								e.className = le.classNameOfCnfStyle(n);
								break;
							case "tblHeader":
								e.isHeader = B.boolAttr(n, "val");
								break;
							default:
								return !1
						}
						return !0
					})
				}
			}), Object.defineProperty(i.prototype, "parseTableCell", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n = {
							type: q.Cell,
							children: []
						};
					return se.foreach(r, function(a) {
						switch (a.localName) {
							case "tbl":
								n.children.push(e.parseTable(a));
								break;
							case "p":
								n.children.push(e.parseParagraph(a));
								break;
							case "tcPr":
								e.parseTableCellProperties(a, n);
								break
						}
					}), n
				}
			}), Object.defineProperty(i.prototype, "parseTableCellProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e.cssStyle = this.parseDefaultProperties(r, {}, null, function(n) {
						var a;
						switch (n.localName) {
							case "gridSpan":
								e.span = B.intAttr(n, "val", null);
								break;
							case "vMerge":
								e.verticalMerge = (a = B.attr(n, "val")) !== null && a !== void 0 ? a : "continue";
								break;
							case "cnfStyle":
								e.className = le.classNameOfCnfStyle(n);
								break;
							default:
								return !1
						}
						return !0
					})
				}
			}), Object.defineProperty(i.prototype, "parseDefaultProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n, a) {
					var t = this;
					return e === void 0 && (e = null), n === void 0 && (n = null), a === void 0 && (a = null), e = e || {}, se.foreach(r, function(o) {
						if (!a?.(o)) switch (o.localName) {
							case "jc":
								e["text-align"] = le.valueOfJc(o);
								break;
							case "textAlignment":
								e["vertical-align"] = le.valueOfTextAlignment(o);
								break;
							case "color":
								e.color = se.colorAttr(o, "val", null, Ie.color);
								break;
							case "sz":
								e["font-size"] = e["min-height"] = Math.ceil(parseInt(B.lengthAttr(o, "val", he.FontSize)) * 4 / 3) + "px";
								break;
							case "shd":
								e["background-color"] = se.colorAttr(o, "fill", null, Ie.shd);
								break;
							case "highlight":
								e["background-color"] = se.colorAttr(o, "val", null, Ie.highlight);
								break;
							case "vertAlign":
								break;
							case "position":
								e.verticalAlign = B.lengthAttr(o, "val", he.FontSize);
								break;
							case "tcW":
								if (t.options.ignoreWidth) break;
							case "tblW":
								e.width = le.valueOfSize(o, "w");
								break;
							case "trHeight":
								t.parseTrHeight(o, e);
								break;
							case "strike":
								e["text-decoration"] = B.boolAttr(o, "val", !0) ? "line-through" : "none";
								break;
							case "b":
								e["font-weight"] = B.boolAttr(o, "val", !0) ? "bold" : "normal";
								break;
							case "i":
								e["font-style"] = B.boolAttr(o, "val", !0) ? "italic" : "normal";
								break;
							case "caps":
								e["text-transform"] = B.boolAttr(o, "val", !0) ? "uppercase" : "none";
								break;
							case "smallCaps":
								e["text-transform"] = B.boolAttr(o, "val", !0) ? "lowercase" : "none";
								break;
							case "u":
								t.parseUnderline(o, e);
								break;
							case "ind":
							case "tblInd":
								t.parseIndentation(o, e);
								break;
							case "rFonts":
								t.parseFont(o, e);
								break;
							case "tblBorders":
								t.parseBorderProperties(o, n || e);
								break;
							case "tblCellSpacing":
								e["border-spacing"] = le.valueOfMargin(o), e["border-collapse"] = "separate";
								break;
							case "pBdr":
								t.parseBorderProperties(o, e);
								break;
							case "bdr":
								e.border = le.valueOfBorder(o);
								break;
							case "tcBorders":
								t.parseBorderProperties(o, e);
								break;
							case "vanish":
								B.boolAttr(o, "val", !0) && (e.display = "none");
								break;
							case "kern":
								break;
							case "noWrap":
								break;
							case "tblCellMar":
							case "tcMar":
								t.parseMarginProperties(o, n || e);
								break;
							case "tblLayout":
								e["table-layout"] = le.valueOfTblLayout(o);
								break;
							case "vAlign":
								e["vertical-align"] = le.valueOfTextAlignment(o);
								break;
							case "spacing":
								r.localName == "pPr" && t.parseSpacing(o, e);
								break;
							case "wordWrap":
								B.boolAttr(o, "val") && (e["overflow-wrap"] = "break-word");
								break;
							case "bCs":
							case "iCs":
							case "szCs":
							case "tabs":
							case "outlineLvl":
							case "contextualSpacing":
							case "tblStyleColBandSize":
							case "tblStyleRowBandSize":
							case "webHidden":
							case "pageBreakBefore":
							case "suppressLineNumbers":
							case "keepLines":
							case "keepNext":
							case "lang":
							case "widowControl":
							case "bidi":
							case "rtl":
							case "noProof":
								break;
							default:
								t.options.debug && console.warn("DOCX: Unknown document element: ".concat(r.localName, ".")
									.concat(o.localName));
								break
						}
					}), e
				}
			}), Object.defineProperty(i.prototype, "parseUnderline", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.attr(r, "val");
					if (n != null) {
						switch (n) {
							case "dash":
							case "dashDotDotHeavy":
							case "dashDotHeavy":
							case "dashedHeavy":
							case "dashLong":
							case "dashLongHeavy":
							case "dotDash":
							case "dotDotDash":
								e["text-decoration-style"] = "dashed";
								break;
							case "dotted":
							case "dottedHeavy":
								e["text-decoration-style"] = "dotted";
								break;
							case "double":
								e["text-decoration-style"] = "double";
								break;
							case "single":
							case "thick":
								e["text-decoration"] = "underline";
								break;
							case "wave":
							case "wavyDouble":
							case "wavyHeavy":
								e["text-decoration-style"] = "wavy";
								break;
							case "words":
								e["text-decoration"] = "underline";
								break;
							case "none":
								e["text-decoration"] = "none";
								break
						}
						var a = se.colorAttr(r, "color");
						a && (e["text-decoration-color"] = a)
					}
				}
			}), Object.defineProperty(i.prototype, "parseFont", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.attr(r, "ascii"),
						a = le.themeValue(r, "asciiTheme"),
						t = [n, a].filter(function(o) {
							return o
						})
						.join(", ");
					t.length > 0 && (e["font-family"] = t)
				}
			}), Object.defineProperty(i.prototype, "parseIndentation", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.lengthAttr(r, "firstLine"),
						a = B.lengthAttr(r, "hanging"),
						t = B.lengthAttr(r, "left"),
						o = B.lengthAttr(r, "start"),
						u = B.lengthAttr(r, "right"),
						l = B.lengthAttr(r, "end");
					n && (e["text-indent"] = n), a && (e["text-indent"] = "-".concat(a)), (t || o) && (e["margin-left"] = t || o), (u || l) && (e["margin-right"] = u || l)
				}
			}), Object.defineProperty(i.prototype, "parseSpacing", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.lengthAttr(r, "before"),
						a = B.lengthAttr(r, "after"),
						t = B.intAttr(r, "line", null),
						o = B.attr(r, "lineRule");
					if (n && (e["margin-top"] = n), a && (e["margin-bottom"] = a), t !== null) switch (o) {
						case "auto":
							e["line-height"] = "".concat((t / 240)
								.toFixed(2));
							break;
						case "atLeast":
							e["line-height"] = "calc(100% + ".concat(Math.ceil(t / 15), "px)");
							break;
						default:
							e["line-height"] = e["min-height"] = "".concat(Math.ceil(t / 15), "px");
							break
					}
				}
			}), Object.defineProperty(i.prototype, "parseMarginProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					se.foreach(r, function(n) {
						switch (n.localName) {
							case "left":
								e["padding-left"] = le.valueOfMargin(n);
								break;
							case "right":
								e["padding-right"] = le.valueOfMargin(n);
								break;
							case "top":
								e["padding-top"] = le.valueOfMargin(n);
								break;
							case "bottom":
								e["padding-bottom"] = le.valueOfMargin(n);
								break
						}
					})
				}
			}), Object.defineProperty(i.prototype, "parseTrHeight", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					switch (B.attr(r, "hRule")) {
						case "exact":
							e.height = B.lengthAttr(r, "val");
							break;
						case "atLeast":
						default:
							e.height = B.lengthAttr(r, "val");
							break
					}
				}
			}), Object.defineProperty(i.prototype, "parseBorderProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					se.foreach(r, function(n) {
						switch (n.localName) {
							case "start":
							case "left":
								e["border-left"] = le.valueOfBorder(n);
								break;
							case "end":
							case "right":
								e["border-right"] = le.valueOfBorder(n);
								break;
							case "top":
								e["border-top"] = le.valueOfBorder(n);
								break;
							case "bottom":
								e["border-bottom"] = le.valueOfBorder(n);
								break
						}
					})
				}
			}), i
		}(),
		At = ["black", "blue", "cyan", "darkBlue", "darkCyan", "darkGray", "darkGreen", "darkMagenta", "darkRed", "darkYellow", "green", "lightGray", "magenta", "none", "red", "white", "yellow"],
		se = function() {
			function i() {}
			return Object.defineProperty(i, "foreach", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					for (var n = 0; n < r.childNodes.length; n++) {
						var a = r.childNodes[n];
						a.nodeType == Node.ELEMENT_NODE && e(a)
					}
				}
			}), Object.defineProperty(i, "colorAttr", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n, a) {
					n === void 0 && (n = null), a === void 0 && (a = "black");
					var t = B.attr(r, e);
					if (t) return t == "auto" ? a : At.includes(t) ? t : "#".concat(t);
					var o = B.attr(r, "themeColor");
					return o ? "var(--docx-".concat(o, "-color)") : n
				}
			}), Object.defineProperty(i, "sizeValue", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return e === void 0 && (e = he.Dxa), $e(r.textContent, e)
				}
			}), i
		}(),
		le = function() {
			function i() {}
			return Object.defineProperty(i, "themeValue", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = B.attr(r, e);
					return n ? "var(--docx-".concat(n, "-font)") : null
				}
			}), Object.defineProperty(i, "valueOfSize", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = he.Dxa;
					switch (B.attr(r, "type")) {
						case "dxa":
							break;
						case "pct":
							n = he.Percent;
							break;
						case "auto":
							return "auto"
					}
					return B.lengthAttr(r, e, n)
				}
			}), Object.defineProperty(i, "valueOfMargin", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return B.lengthAttr(r, "w")
				}
			}), Object.defineProperty(i, "valueOfBorder", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.attr(r, "val");
					if (e == "nil") return "none";
					var n = se.colorAttr(r, "color"),
						a = B.lengthAttr(r, "sz", he.Border);
					return "".concat(a, " solid ")
						.concat(n == "auto" ? Ie.borderColor : n)
				}
			}), Object.defineProperty(i, "valueOfTblLayout", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.attr(r, "val");
					return e == "fixed" ? "fixed" : "auto"
				}
			}), Object.defineProperty(i, "classNameOfCnfStyle", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.attr(r, "val"),
						n = ["first-row", "last-row", "first-col", "last-col", "odd-col", "even-col", "odd-row", "even-row", "ne-cell", "nw-cell", "se-cell", "sw-cell"];
					return n.filter(function(a, t) {
							return e[t] == "1"
						})
						.join(" ")
				}
			}), Object.defineProperty(i, "valueOfJc", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.attr(r, "val");
					switch (e) {
						case "start":
						case "left":
							return "left";
						case "center":
							return "center";
						case "end":
						case "right":
							return "right";
						case "both":
							return "justify"
					}
					return e
				}
			}), Object.defineProperty(i, "valueOfVertAlign", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e === void 0 && (e = !1);
					var n = B.attr(r, "val");
					switch (n) {
						case "subscript":
							return "sub";
						case "superscript":
							return e ? "sup" : "super"
					}
					return e ? null : n
				}
			}), Object.defineProperty(i, "valueOfTextAlignment", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.attr(r, "val");
					switch (e) {
						case "auto":
						case "baseline":
							return "baseline";
						case "top":
							return "top";
						case "center":
							return "middle";
						case "bottom":
							return "bottom"
					}
					return e
				}
			}), Object.defineProperty(i, "addSize", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return r == null ? e : e == null ? r : "calc(".concat(r, " + ")
						.concat(e, ")")
				}
			}), Object.defineProperty(i, "classNameOftblLook", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = B.hexAttr(r, "val", 0),
						n = "";
					return (B.boolAttr(r, "firstRow") || e & 32) && (n += " first-row"), (B.boolAttr(r, "lastRow") || e & 64) && (n += " last-row"), (B.boolAttr(r, "firstColumn") || e & 128) && (n += " first-col"), (B.boolAttr(r, "lastColumn") || e & 256) && (n += " last-col"), (B.boolAttr(r, "noHBand") || e & 512) && (n += " no-hband"), (B.boolAttr(r, "noVBand") || e & 1024) && (n += " no-vband"), n.trim()
				}
			}), i
		}(),
		pr = {
			pos: 0,
			leader: "none",
			style: "left"
		},
		Et = 50;

	function xt(i) {
		i === void 0 && (i = document.body);
		var r = document.createElement("div");
		r.style.width = "100pt", i.appendChild(r);
		var e = 100 / r.offsetWidth;
		return i.removeChild(r), e
	}

	function jt(i, r, e, n) {
		n === void 0 && (n = 72 / 96);
		var a = i.closest("p"),
			t = i.getBoundingClientRect(),
			o = a.getBoundingClientRect(),
			u = getComputedStyle(a),
			l = r?.length > 0 ? r.map(function(U) {
				return {
					pos: br(U.position),
					leader: U.leader,
					style: U.style
				}
			})
			.sort(function(U, N) {
				return U.pos - N.pos
			}) : [pr],
			f = l[l.length - 1],
			p = o.width * n,
			b = br(e),
			w = f.pos + b;
		if (w < p)
			for (; w < p && l.length < Et; w += b) l.push(me(me({}, pr), {
				pos: w
			}));
		var h = parseFloat(u.marginLeft),
			v = o.left + h,
			k = (t.left - v) * n,
			d = l.find(function(U) {
				return U.style != "clear" && U.pos > k
			});
		if (d != null) {
			var m = 1;
			if (d.style == "right" || d.style == "center") {
				var y = Array.from(a.querySelectorAll(".".concat(i.className))),
					S = y.indexOf(i) + 1,
					x = document.createRange();
				x.setStart(i, 1), S < y.length ? x.setEndBefore(y[S]) : x.setEndAfter(a);
				var C = d.style == "center"?.5 : 1,
					D = x.getBoundingClientRect(),
					F = D.left + C * D.width - (o.left - h);
				m = d.pos - F * n
			} else m = d.pos - k;
			switch (i.innerHTML = "&nbsp;", i.style.textDecoration = "inherit", i.style.wordSpacing = "".concat(m.toFixed(0), "pt"), d.leader) {
				case "dot":
				case "middleDot":
					i.style.textDecoration = "underline", i.style.textDecorationStyle = "dotted";
					break;
				case "hyphen":
				case "heavy":
				case "underscore":
					i.style.textDecoration = "underline";
					break
			}
		}
	}

	function br(i) {
		return parseFloat(i)
	}
	var mr = {
			exports: {}
		},
		Ze = {
			exports: {}
		},
		Xe = {
			exports: {}
		},
		Oe = 1e3,
		Ce = Oe * 60,
		Ae = Ce * 60,
		Ee = Ae * 24,
		Nt = Ee * 365.25,
		Bt = function(i, r) {
			r = r || {};
			var e = typeof i;
			if (e === "string" && i.length > 0) return zt(i);
			if (e === "number" && isNaN(i) === !1) return r.long ? Tt(i) : Ft(i);
			throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i))
		};

	function zt(i) {
		if (i = String(i), !(i.length > 100)) {
			var r = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(i);
			if (!!r) {
				var e = parseFloat(r[1]),
					n = (r[2] || "ms")
					.toLowerCase();
				switch (n) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y":
						return e * Nt;
					case "days":
					case "day":
					case "d":
						return e * Ee;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h":
						return e * Ae;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m":
						return e * Ce;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s":
						return e * Oe;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms":
						return e;
					default:
						return
				}
			}
		}
	}

	function Ft(i) {
		return i >= Ee ? Math.round(i / Ee) + "d" : i >= Ae ? Math.round(i / Ae) + "h" : i >= Ce ? Math.round(i / Ce) + "m" : i >= Oe ? Math.round(i / Oe) + "s" : i + "ms"
	}

	function Tt(i) {
		return Re(i, Ee, "day") || Re(i, Ae, "hour") || Re(i, Ce, "minute") || Re(i, Oe, "second") || i + " ms"
	}

	function Re(i, r, e) {
		if (!(i < r)) return i < r * 1.5 ? Math.floor(i / r) + " " + e : Math.ceil(i / r) + " " + e + "s"
	}(function(i, r) {
		r = i.exports = a.debug = a.default = a, r.coerce = l, r.disable = o, r.enable = t, r.enabled = u, r.humanize = Bt, r.names = [], r.skips = [], r.formatters = {};
		var e;

		function n(f) {
			var p = 0,
				b;
			for (b in f) p = (p << 5) - p + f.charCodeAt(b), p |= 0;
			return r.colors[Math.abs(p) % r.colors.length]
		}

		function a(f) {
			function p() {
				if (!!p.enabled) {
					var b = p,
						w = +new Date,
						h = w - (e || w);
					b.diff = h, b.prev = e, b.curr = w, e = w;
					for (var v = new Array(arguments.length), k = 0; k < v.length; k++) v[k] = arguments[k];
					v[0] = r.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
					var d = 0;
					v[0] = v[0].replace(/%([a-zA-Z%])/g, function(y, S) {
						if (y === "%%") return y;
						d++;
						var x = r.formatters[S];
						if (typeof x == "function") {
							var C = v[d];
							y = x.call(b, C), v.splice(d, 1), d--
						}
						return y
					}), r.formatArgs.call(b, v);
					var m = p.log || r.log || console.log.bind(console);
					m.apply(b, v)
				}
			}
			return p.namespace = f, p.enabled = r.enabled(f), p.useColors = r.useColors(), p.color = n(f), typeof r.init == "function" && r.init(p), p
		}

		function t(f) {
			r.save(f), r.names = [], r.skips = [];
			for (var p = (typeof f == "string" ? f : "")
				.split(/[\s,]+/), b = p.length, w = 0; w < b; w++) !p[w] || (f = p[w].replace(/\*/g, ".*?"), f[0] === "-" ? r.skips.push(new RegExp("^" + f.substr(1) + "$")) : r.names.push(new RegExp("^" + f + "$")))
		}

		function o() {
			r.enable("")
		}

		function u(f) {
			var p, b;
			for (p = 0, b = r.skips.length; p < b; p++)
				if (r.skips[p].test(f)) return !1;
			for (p = 0, b = r.names.length; p < b; p++)
				if (r.names[p].test(f)) return !0;
			return !1
		}

		function l(f) {
			return f instanceof Error ? f.stack || f.message : f
		}
	})(Xe, Xe.exports),
	function(i, r) {
		r = i.exports = Xe.exports, r.log = a, r.formatArgs = n, r.save = t, r.load = o, r.useColors = e, r.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : u(), r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];

		function e() {
			return typeof window < "u" && window.process && window.process.type === "renderer" ? !0 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase()
				.match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase()
				.match(/applewebkit\/(\d+)/)
		}
		r.formatters.j = function(l) {
			try {
				return JSON.stringify(l)
			} catch (f) {
				return "[UnexpectedJSONParseError]: " + f.message
			}
		};

		function n(l) {
			var f = this.useColors;
			if (l[0] = (f ? "%c" : "") + this.namespace + (f ? " %c" : " ") + l[0] + (f ? "%c " : " ") + "+" + r.humanize(this.diff), !!f) {
				var p = "color: " + this.color;
				l.splice(1, 0, p, "color: inherit");
				var b = 0,
					w = 0;
				l[0].replace(/%[a-zA-Z%]/g, function(h) {
					h !== "%%" && (b++, h === "%c" && (w = b))
				}), l.splice(w, 0, p)
			}
		}

		function a() {
			return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments)
		}

		function t(l) {
			try {
				l == null ? r.storage.removeItem("debug") : r.storage.debug = l
			} catch {}
		}

		function o() {
			var l;
			try {
				l = r.storage.debug
			} catch {}
			return !l && typeof process < "u" && "env" in process && (l = {}.DEBUG), l
		}
		r.enable(o());

		function u() {
			try {
				return window.localStorage
			} catch {}
		}
	}(Ze, Ze.exports),
	function(i) {
		(function(r, e) {
			var n = i.exports;
			n ? i.exports = e(Ze.exports("eventproxy")) : this[r] = e()
		})("EventProxy", function(r) {
			r = r || function() {};
			var e = Array.prototype.slice,
				n = Array.prototype.concat,
				a = "__all__",
				t = function() {
					if (!(this instanceof t)) return new t;
					this._callbacks = {}, this._fired = {}
				};
			t.prototype.addListener = function(l, f) {
				return r("Add listener for %s", l), this._callbacks[l] = this._callbacks[l] || [], this._callbacks[l].push(f), this
			}, t.prototype.bind = t.prototype.addListener, t.prototype.on = t.prototype.addListener, t.prototype.subscribe = t.prototype.addListener, t.prototype.headbind = function(l, f) {
				return r("Add listener for %s", l), this._callbacks[l] = this._callbacks[l] || [], this._callbacks[l].unshift(f), this
			}, t.prototype.removeListener = function(l, f) {
				var p = this._callbacks;
				if (!l) r("Remove all listeners"), this._callbacks = {};
				else if (!f) r("Remove all listeners of %s", l), p[l] = [];
				else {
					var b = p[l];
					if (b)
						for (var w = b.length, h = 0; h < w; h++) f === b[h] && (r("Remove a listener of %s", l), b[h] = null)
				}
				return this
			}, t.prototype.unbind = t.prototype.removeListener, t.prototype.removeAllListeners = function(l) {
				return this.unbind(l)
			}, t.prototype.bindForAll = function(l) {
				this.bind(a, l)
			}, t.prototype.unbindForAll = function(l) {
				this.unbind(a, l)
			}, t.prototype.trigger = function(l, f) {
				var p, b, w, h, v, k = 2,
					d = this._callbacks;
				for (r("Emit event %s with data %j", l, f); k--;)
					if (b = k ? l : a, p = d[b], p)
						for (h = 0, v = p.length; h < v; h++)
							if (!(w = p[h])) p.splice(h, 1), h--, v--;
							else {
								for (var m = [], y = k ? 1 : 0, S = y; S < arguments.length; S++) m.push(arguments[S]);
								w.apply(this, m)
							} return this
			}, t.prototype.emit = t.prototype.trigger, t.prototype.fire = t.prototype.trigger, t.prototype.once = function(l, f) {
				var p = this,
					b = function() {
						f.apply(p, arguments), p.unbind(l, b)
					};
				return this.bind(l, b), this
			};
			var o = typeof setImmediate < "u" && setImmediate || typeof process < "u" && process.nextTick || function(l) {
				setTimeout(l, 0)
			};
			t.prototype.emitLater = function() {
				var l = this,
					f = arguments;
				o(function() {
					l.trigger.apply(l, f)
				})
			}, t.prototype.immediate = function(l, f, p) {
				return this.bind(l, f), this.trigger(l, p), this
			}, t.prototype.asap = t.prototype.immediate;
			var u = function(l, f, p, b) {
				var w = this,
					h = arguments.length,
					v = 0,
					k = {};
				if (h < 3) return this;
				var d = e.call(arguments, 0, -2),
					m = arguments[h - 2],
					y = arguments[h - 1];
				if (typeof m != "function") return this;
				r("Assign listener for events %j, once is %s", d, !!y);
				for (var S = function(F) {
					var U = y ? "once" : "bind";
					w[U](F, function(N) {
						w._fired[F] = w._fired[F] || {}, w._fired[F].data = N, k[F] || (k[F] = !0, v++)
					})
				}, x = d.length, C = 0; C < x; C++) S(d[C]);
				var D = function(F) {
					if (!(v < x) && !!k[F]) {
						for (var U = [], N = 0; N < x; N++) U.push(w._fired[d[N]].data);
						y && w.unbindForAll(D), r("Events %j all emited with data %j", d, U), m.apply(null, U)
					}
				};
				w.bindForAll(D)
			};
			return t.prototype.all = function(l, f, p) {
				var b = n.apply([], arguments);
				return b.push(!0), u.apply(this, b), this
			}, t.prototype.assign = t.prototype.all, t.prototype.fail = function(l) {
				var f = this;
				return f.once("error", function() {
					f.unbind(), l.apply(null, arguments)
				}), this
			}, t.prototype.throw = function() {
				var l = this;
				l.emit.apply(l, ["error"].concat(e.call(arguments)))
			}, t.prototype.tail = function() {
				var l = n.apply([], arguments);
				return l.push(!1), u.apply(this, l), this
			}, t.prototype.assignAll = t.prototype.tail, t.prototype.assignAlways = t.prototype.tail, t.prototype.after = function(l, f, p) {
				if (f === 0) return p.call(null, []), this;
				var b = this,
					w = [];
				this._after = this._after || {};
				var h = l + "_group";
				this._after[h] = {
					index: 0,
					results: []
				}, r("After emit %s times, event %s's listenner will execute", f, l);
				var v = function(k, d) {
					k === l && (f--, w.push(d), f < 1 && (r("Event %s was emit %s, and execute the listenner", l, f), b.unbindForAll(v), p.apply(null, [w]))), k === h && (f--, b._after[h].results[d.index] = d.result, f < 1 && (r("Event %s was emit %s, and execute the listenner", l, f), b.unbindForAll(v), p.call(null, b._after[h].results)))
				};
				return b.bindForAll(v), this
			}, t.prototype.group = function(l, f) {
				var p = this,
					b = l + "_group",
					w = p._after[b].index;
				return p._after[b].index++,
					function(h, v) {
						if (h) return p.emit.apply(p, ["error"].concat(e.call(arguments)));
						p.emit(b, {
							index: w,
							result: f ? f.apply(null, e.call(arguments, 1)) : v
						})
					}
			}, t.prototype.any = function() {
				var l = this,
					f = arguments[arguments.length - 1],
					p = e.call(arguments, 0, -1),
					b = p.join("_");
				r("Add listenner for Any of events %j emit", p), l.once(b, f);
				for (var w = function(v) {
					l.bind(v, function(k) {
						r("One of events %j emited, execute the listenner"), l.trigger(b, {
							data: k,
							eventName: v
						})
					})
				}, h = 0; h < p.length; h++) w(p[h])
			}, t.prototype.not = function(l, f) {
				var p = this;
				r("Add listenner for not event %s", l), p.bindForAll(function(b, w) {
					b !== l && (r("listenner execute of event %s emit, but not event %s.", b, l), f(w))
				})
			}, t.prototype.done = function(l, f) {
				var p = this;
				return function(b, w) {
					if (b) return p.emit.apply(p, ["error"].concat(e.call(arguments)));
					var h = e.call(arguments, 1);
					if (typeof l == "string") return f ? p.emit(l, f.apply(null, h)) : p.emit.apply(p, [l].concat(h));
					if (arguments.length <= 2) return l(w);
					l.apply(null, h)
				}
			}, t.prototype.doneLater = function(l, f) {
				var p = this.done(l, f);
				return function(b, w) {
					var h = arguments;
					o(function() {
						p.apply(null, h)
					})
				}
			}, t.create = function() {
				var l = new t,
					f = n.apply([], arguments);
				if (f.length) {
					var p = f[f.length - 1],
						b = f[f.length - 2];
					typeof p == "function" && typeof b == "function" && (f.pop(), l.fail(p)), l.assign.apply(l, f)
				}
				return l
			}, t.EventProxy = t, t
		})
	}(mr);
	var It = mr.exports,
		Rt = function() {
			function i(r) {
				Object.defineProperty(this, "htmlDocument", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: r
				}), Object.defineProperty(this, "className", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: "docx"
				}), Object.defineProperty(this, "document", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "options", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "styleMap", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "currentPart", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: null
				}), Object.defineProperty(this, "tableVerticalMerges", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "currentVerticalMerge", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: null
				}), Object.defineProperty(this, "tableCellPositions", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "currentCellPosition", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: null
				}), Object.defineProperty(this, "footnoteMap", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "endnoteMap", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "currentFootnoteIds", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "currentEndnoteIds", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "usedHederFooterParts", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "renderImageCount", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: 0
				}), Object.defineProperty(this, "defaultTabSize", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: void 0
				}), Object.defineProperty(this, "domNumberings", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: {}
				}), Object.defineProperty(this, "ep2", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: new It
				}), Object.defineProperty(this, "currentTabs", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: []
				}), Object.defineProperty(this, "tabsTimeout", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: 0
				}), Object.defineProperty(this, "createElement", {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: vr
				})
			}
			return Object.defineProperty(i.prototype, "render", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n, a) {
					var t = this;
					return n === void 0 && (n = null), new Promise(function(o) {
						var u;
						t.document = r, t.options = a, t.className = a.className, 
						// 更新 prcessStyles
						// t.styleMap = null,
						// r.stylesPart.styles.map(c=>{c &&( t.styleMap[c.id]=c)}) ,
						t.styleMap= t.processStyles(r.stylesPart.styles),
						t.renderImageCount = 0, n = n || e, Dt(e), r.numberingPart && (t.prodessNumberings(r.numberingPart.domNumberings), r.numberingPart.domNumberings.forEach(function(f) {
							!t.domNumberings[f.id] && (t.domNumberings[f.id] = {}), t.domNumberings[f.id][f.level] = me(me({}, f), {
								count: 1,
								pCount: 1
							})
						})), r.settingsPart && (t.defaultTabSize = (u = r.settingsPart.settings) === null || u === void 0 ? void 0 : u.defaultTabStop), !a.ignoreFonts && r.fontTablePart && t.renderFontTable(r.fontTablePart, n), t.countNum = 100;
						var l = t.renderSections(r.documentPart.body);
 					
						Ge(e, l), t.refreshTabStops(), t.ep2.after("renderImage", t.renderImageCount, function(f) {
							setTimeout(function() {
								o("ok")
							}, 200)
						})
					})
				}
			}), Object.defineProperty(i.prototype, "renderTheme", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n, a, t = {},
						o = (n = r.theme) === null || n === void 0 ? void 0 : n.fontScheme;
					o && (o.majorFont && (t["--docx-majorHAnsi-font"] = o.majorFont.latinTypeface), o.minorFont && (t["--docx-minorHAnsi-font"] = o.minorFont.latinTypeface));
					var u = (a = r.theme) === null || a === void 0 ? void 0 : a.colorScheme;
					if (u)
						for (var l = 0, f = Object.entries(u.colors); l < f.length; l++) {
							var p = f[l],
								b = p[0],
								w = p[1];
							t["--docx-".concat(b, "-color")] = "#".concat(w)
						}
					var h = this.styleToString(".".concat(this.className), t);
					e.appendChild(Ve(h))
				}
			}), Object.defineProperty(i.prototype, "renderFontTable", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					for (var n = this, a = function(f) {
						for (var p = function(v) {
							t.document.loadFont(v.id, v.key)
								.then(function(k) {
									var d = {
										"font-family": f.name,
										src: "url(".concat(k, ")")
									};
									(v.type == "bold" || v.type == "boldItalic") && (d["font-weight"] = "bold"), (v.type == "italic" || v.type == "boldItalic") && (d["font-style"] = "italic"), Lt(e, "docxjs ".concat(f.name, " font"));
									var m = n.styleToString("@font-face", d);
									e.appendChild(Ve(m)), n.refreshTabStops()
								})
						}, b = 0, w = f.embedFontRefs; b < w.length; b++) {
							var h = w[b];
							p(h)
						}
					}, t = this, o = 0, u = r.fonts; o < u.length; o++) {
						var l = u[o];
						a(l)
					}
				}
			}), Object.defineProperty(i.prototype, "processStyleName", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return r ? "".concat(this.className, "_")
						.concat(Fr(r)) : this.className
				}
			}), Object.defineProperty(i.prototype, "processStyles", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = Tr(r.filter(function(v) {
						return v.id != null
					}), function(v) {
						return v.id
					}), n = 0, a = r.filter(function(v) {
						return v.basedOn
					}); n < a.length; n++) {
						var t = a[n],
							o = e[t.basedOn];
						if (o) {
							t.paragraphProps = Fe(t.paragraphProps, o.paragraphProps), t.runProps = Fe(t.runProps, o.runProps);
							for (var u = function(v) {
								var k = t.styles.find(function(d) {
									return d.target == v.target
								});
								k ? l.copyStyleProperties(v.values, k.values) : t.styles.push(me(me({}, v), {
									values: me({}, v.values)
								}))
							}, l = this, f = 0, p = o.styles; f < p.length; f++) {
								var b = p[f];
								u(b)
							}
						} else this.options.debug && console.warn("Can't find base style ".concat(t.basedOn))
					}
					for (var w = 0, h = r; w < h.length; w++) {
						var t = h[w];
						t.cssName = this.processStyleName(t.id)
					}
					return e
				}
			}), Object.defineProperty(i.prototype, "prodessNumberings", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e, n = 0, a = r.filter(function(u) {
						return u.pStyleName
					}); n < a.length; n++) {
						var t = a[n],
							o = this.findStyle(t.pStyleName);
						!((e = o?.paragraphProps) === null || e === void 0) && e.numbering && (o.paragraphProps.numbering.level = t.level)
					}
				}
			}), Object.defineProperty(i.prototype, "processElement", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					if (r.children)
						for (var e = 0, n = r.children; e < n.length; e++) {
							var a = n[e];
							a.parent = r, a.type == q.Table ? this.processTable(a) : this.processElement(a)
						}
				}
			}), Object.defineProperty(i.prototype, "processTable", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = 0, n = r.children; e < n.length; e++)
						for (var a = n[e], t = 0, o = a.children; t < o.length; t++) {
							var u = o[t];
							u.cssStyle = this.copyStyleProperties(r.cellStyle, u.cssStyle, ["border-left", "border-right", "border-top", "border-bottom", "padding-left", "padding-right", "padding-top", "padding-bottom"]), this.processElement(u)
						}
				}
			}), Object.defineProperty(i.prototype, "copyStyleProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					if (n === void 0 && (n = null), !r) return e;
					e == null && (e = {}), n == null && (n = Object.getOwnPropertyNames(r));
					for (var a = 0, t = n; a < t.length; a++) {
						var o = t[a];
						r.hasOwnProperty(o) && !e.hasOwnProperty(o) && (e[o] = r[o])
					}
					return e
				}
			}), Object.defineProperty(i.prototype, "createSection", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this.createElement("div", {
						className: r
					});
					return n
				}
			}), Object.defineProperty(i.prototype, "renderSections", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = [];
					this.processElement(r);
					for (var n = this.splitBySection(r.children), a = null, t = 0, o = n.length; t < o; t++) {
						this.currentFootnoteIds = [];
						var u = n[t],
							l = u.sectProps || r.props,
							f = this.createSection(this.className + "-centent-body", l);
						this.options.renderHeaders && this.renderHeaderFooter(l.headerRefs, l, e.length, a != l, f);
						var p = this.createElement("div");
						this.renderElements(u.elements, p), f.appendChild(p), this.options.renderFootnotes && this.renderNotes(this.currentFootnoteIds, this.footnoteMap, f), this.options.renderEndnotes && t == o - 1 && this.renderNotes(this.currentEndnoteIds, this.endnoteMap, f), this.options.renderFooters && this.renderHeaderFooter(l.footerRefs, l, e.length, a != l, f), e.push(f), a = l
					}
					return e
				}
			}), Object.defineProperty(i.prototype, "renderHeaderFooter", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n, a, t) {
					var o, u;
					if (!!r) {
						var l = (u = (o = e.titlePage && a ? r.find(function(p) {
								return p.type == "first"
							}) : null) !== null && o !== void 0 ? o : n % 2 == 1 ? r.find(function(p) {
								return p.type == "even"
							}) : null) !== null && u !== void 0 ? u : r.find(function(p) {
								return p.type == "default"
							}),
							f = l && this.document.findPartByRelId(l.id, this.document.documentPart);
						f && (this.currentPart = f, this.usedHederFooterParts.includes(f.path) || (this.processElement(f.rootElement), this.usedHederFooterParts.push(f.path)), this.renderElements([f.rootElement], t), this.currentPart = null)
					}
				}
			}), Object.defineProperty(i.prototype, "isPageBreakElement", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return r.type != q.Break ? !1 : r.break == "lastRenderedPageBreak" ? !this.options.ignoreLastRenderedPageBreak : r.break == "page"
				}
			}), Object.defineProperty(i.prototype, "splitBySection", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = this, n, a = {
						sectProps: null,
						elements: []
					}, t = [a], o = 0, u = r; o < u.length; o++) {
						var l = u[o];
						if (l.type == q.Paragraph) {
							var f = this.findStyle(l.styleName);
							!((n = f?.paragraphProps) === null || n === void 0) && n.pageBreakBefore && (a.sectProps = b, a = {
								sectProps: null,
								elements: []
							}, t.push(a))
						}
						if (a.elements.push(l), l.type == q.Paragraph) {
							var p = l,
								b = p.sectionProps,
								w = -1,
								h = -1;
							if (this.options.breakPages && p.children && (w = p.children.findIndex(function(D) {
								var F, U;
								return h = (U = (F = D.children) === null || F === void 0 ? void 0 : F.findIndex(e.isPageBreakElement.bind(e))) !== null && U !== void 0 ? U : -1, h != -1
							})), (b || w != -1) && (a.sectProps = b, a = {
								sectProps: null,
								elements: []
							}, t.push(a)), w != -1) {
								var v = p.children[w],
									k = h < v.children.length - 1;
								if (w < p.children.length - 1 || k) {
									var d = l.children,
										m = me(me({}, l), {
											children: d.slice(w)
										});
									if (l.children = d.slice(0, w), a.elements.push(m), k) {
										var y = v.children,
											S = me(me({}, v), {
												children: y.slice(0, h)
											});
										l.children.push(S), v.children = y.slice(h)
									}
								}
							}
						}
					}
					for (var x = null, C = t.length - 1; C >= 0; C--) t[C].sectProps == null ? t[C].sectProps = x : x = t[C].sectProps;
					return t
				}
			}), Object.defineProperty(i.prototype, "renderWrapper", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return this.createElement("div", {
						className: "".concat(this.className, "-wrapper")
					}, r)
				}
			}), Object.defineProperty(i.prototype, "renderDefaultStyle", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					var r = this.className,
						e = `
.`.concat(r, `-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.`)
						.concat(r, "-wrapper>section.")
						.concat(r, ` { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }
.`)
						.concat(r, ` { color: black; }
section.`)
						.concat(r, ` { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.`)
						.concat(r, `>article { margin-bottom: auto; }
.`)
						.concat(r, ` table { border-collapse: collapse; }
.`)
						.concat(r, " table td, .")
						.concat(r, ` table th { vertical-align: top; }
.`)
						.concat(r, ` p { margin: 0pt; min-height: 1em; }
.`)
						.concat(r, ` span { white-space: pre-wrap; overflow-wrap: break-word; }
.`)
						.concat(r, ` a { color: inherit; text-decoration: inherit; }
`);
					return Ve(e)
				}
			}), Object.defineProperty(i.prototype, "renderNotes", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					var a = r.map(function(o) {
							return e[o]
						})
						.filter(function(o) {
							return o
						});
					if (a.length > 0) {
						var t = this.createElement("ol", null, this.renderElements(a));
						n.appendChild(t)
					}
				}
			}), Object.defineProperty(i.prototype, "renderElement", { //返回需要创建的标签[]
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
	 					switch (r.type) {
						case q.Paragraph:
							if(r.parent.type===q.Cell){ // table--td--innerHTML
								return this.renderRun(r);
							}
							return this.renderParagraph(r);
						case q.BookmarkStart:
							return this.renderBookmarkStart(r);
						case q.BookmarkEnd:
							return null;
						case q.Run:
							return this.renderRun(r);
						case q.Table:
							return this.renderTable(r);
						case q.Row:
							return this.renderTableRow(r);
						case q.Cell:
							return this.renderTableCell(r);
						case q.Hyperlink:
							return this.renderHyperlink(r);
						case q.Drawing:
							return this.renderDrawing(r);
						case q.Image:
							return this.renderImage(r);
						case q.Text:
							return this.renderText(r);
						case q.Tab:
							return this.renderTab(r);
						case q.Symbol:
							return this.renderSymbol(r);
						case q.Break:
							return this.renderBreak(r);
						case q.Footer:
							return this.renderContainer(r, "footer");
						case q.Header:
							return this.renderContainer(r, "header");
						case q.Footnote:
						case q.Endnote:
							return this.renderContainer(r, "li");
						case q.FootnoteReference:
							return this.renderFootnoteReference(r);
						case q.EndnoteReference:
							return this.renderEndnoteReference(r);
						case q.NoBreakHyphen:
							return this.createElement("wbr")
					}
					return null
				}
			}), Object.defineProperty(i.prototype, "renderChildren", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return this.renderElements(r.children, e)
				}
			}), Object.defineProperty(i.prototype, "renderElements", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					var n = this;
					if (r == null) return null;
		 
					var a = r.map(function(t) {
							return n.renderElement(t)
						})
						.filter(function(t) {
							return t != null
						});
					return e && Ge(e, a), a
				}
			}), Object.defineProperty(i.prototype, "renderContainer", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return this.createElement(e, null, this.renderChildren(r))
				}
			}), Object.defineProperty(i.prototype, "renderParagraph", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					//如果需要h1-h6 在此根据styleName的数字进行创建
					var e, n, a, t, o;
					if(/\d/.test(r.styleName)){
					   e, n, a, t, o = this.createElement("h"+r.styleName)
					}else{
						e, n, a, t, o = this.createElement("p")
					}
					//var e, n, a, t, o = this.createElement("p"),
						var u = this.findStyle(r.styleName);
						//update: stylePart-->cssStyle 
					  u&&(r.cssStyle=Object.assign({},u.runProps,u.target===u.styles[0].target?u.styles[0].values:{},r.cssStyle));
					  (e = r.tabs) !== null && e !== void 0 || (r.tabs = (n = u?.paragOraphProps) === null || n === void 0 ? void 0 : n.tabs), this.renderClass(r, o), this.renderChildren(r, o), this.renderStyleValues(r.cssStyle, o), this.renderCommonProperties(o.style, r);
					var l = (a = r.numbering) !== null && a !== void 0 ? a : (t = u?.paragraphProps) === null || t === void 0 ? void 0 : t.numbering;
					
					if (l) {
						if (this.domNumberings[l.id] && this.domNumberings[l.id][l.level]) {
							var f = this.domNumberings[l.id][l.level];
							if (o.firstChild && o.firstChild.innerHTML) o.firstChild.innerHTML = this.numLevelTextToContent(f) + o.firstChild.innerHTML;
							else {
								var p = this.createElement("span");
								p.innerHTML = this.numLevelTextToContent(f), o.appendChild(p)
							}
						}
						o.classList.add(this.numberingClass(l.id, l.level))
					}
					return o
				}
			}), Object.defineProperty(i.prototype, "renderRunProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					this.renderCommonProperties(r, e)
				}
			}), Object.defineProperty(i.prototype, "renderCommonProperties", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e != null && (e.color && (r.color = e.color), e.fontSize && (r["font-size"] = e.fontSize))
				}
			}), Object.defineProperty(i.prototype, "renderHyperlink", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("a");
					return this.renderChildren(r, e), this.renderStyleValues(r.cssStyle, e), r.href && (e.href = r.href), e
				}
			}), Object.defineProperty(i.prototype, "renderDrawing", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e, n = this.createElement("p");
					return n.style.display = "inline-block", r.children && ((e = r.children[0]) === null || e === void 0 ? void 0 : e.type) !== "image" && (n.style.position = "relative", n.style.textIndent = "0px"), this.renderChildren(r, n), this.renderStyleValues(r.cssStyle, n), n
				}
			}), Object.defineProperty(i.prototype, "renderImage", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e, n, a = this.createElement("img");
					!r.cssStyle["max-width"] && (r.cssStyle["max-width"] = "100%");
					//r.cssStyle.width && (r.cssStyle.width = parseFloat(r.cssStyle.width) * 2 + "pt"), r.cssStyle.height && (r.cssStyle.height = parseFloat(r.cssStyle.height) * 2 + "pt");// pt.replace --> px
					var t = "";
					((n = (e = r.parent) === null || e === void 0 ? void 0 : e.parent) === null || n === void 0 ? void 0 : n.parent) && r.parent.parent.parent.cssStyle && (t = r.parent.parent.parent.cssStyle["text-align"]), t == "right" && (r.cssStyle.float = "right", r.cssStyle.height.replace(/(\d+(.\d+)?)pt/g,(str,p)=>{ return Math.floor(p*96/72)  +'px'})  ), t == "center" && (r.cssStyle.display = "block", r.cssStyle["margin-left"] = "auto", r.cssStyle["margin-right"] = "auto"), this.renderStyleValues(r.cssStyle, a);
					var o = this;
					return o.renderImageCount++, a.setAttribute("data-tp-src", r.src), this.document && this.document.loadDocumentImage(r.src, this.currentPart)
						.then(function(u) {
							o.ep2.emit("renderImage", {
								status: "ok",
								src: u,
								rId: r.src
							}), 
							 //a.parentNode.style.width = "100%",a.parentNode.style.height = null,	// make img size  as imageSize
							a.parentNode.style.display = "inline-block", a.src = u
						}), a
				}
			}), Object.defineProperty(i.prototype, "renderText", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return this.htmlDocument.createTextNode(r.text) ;
				}
			}), Object.defineProperty(i.prototype, "renderBreak", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					return r.break == "textWrapping" ? this.createElement("br") : null
				}
			}), Object.defineProperty(i.prototype, "renderSymbol", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("span");
					return e.style.fontFamily = r.font, e.innerHTML = "&#x".concat(r.char, ";"), e
				}
			}), Object.defineProperty(i.prototype, "renderFootnoteReference", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("sup");
					return this.currentFootnoteIds.push(r.id), e.textContent = "".concat(this.currentFootnoteIds.length), e
				}
			}), Object.defineProperty(i.prototype, "renderEndnoteReference", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("sup");
					return this.currentEndnoteIds.push(r.id), e.textContent = "".concat(this.currentEndnoteIds.length), e
				}
			}), Object.defineProperty(i.prototype, "renderTab", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e, n = this.createElement("span");
					if (n.innerHTML = "&emsp;", this.options.experimental) {
						n.className = this.tabStopClass();
						var a = (e = Ut(r, q.Paragraph)) === null || e === void 0 ? void 0 : e.tabs;
						this.currentTabs.push({
							stops: a,
							span: n
						})
					}
					return n
				}
			}), Object.defineProperty(i.prototype, "renderBookmarkStart", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("span");
					return e.id = r.name, e
				}
			}), Object.defineProperty(i.prototype, "renderRun", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					if (r.fieldRun) return null;
					var e = this.createElement("span");
					if (r.id && (e.id = r.id), this.renderClass(r, e), this.renderStyleValues(r.cssStyle, e), r.verticalAlign) {
						var n = this.createElement(r.verticalAlign);
						this.renderChildren(r, n), e.appendChild(n)
					} else this.renderChildren(r, e);
					return e
				}
			}), Object.defineProperty(i.prototype, "renderTable", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("table");
					e.setAttribute("border",1);
					return this.tableCellPositions.push(this.currentCellPosition), this.tableVerticalMerges.push(this.currentVerticalMerge), this.currentVerticalMerge = {}, this.currentCellPosition = {
						col: 0,
						row: 0
					}, r.columns && e.appendChild(this.renderTableColumns(r.columns)), !r.cssStyle["border-collapse"] && (r.cssStyle["border-collapse"] = "collapse"), this.renderClass(r, e), this.renderChildren(r, e), this.renderStyleValues(r.cssStyle, e), this.currentVerticalMerge = this.tableVerticalMerges.pop(), this.currentCellPosition = this.tableCellPositions.pop(), e
				}
			}), Object.defineProperty(i.prototype, "renderTableColumns", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					for (var e = this.createElement("colgroup"), n = 0, a = r; n < a.length; n++) {
						var t = a[n],
							o = this.createElement("col");
						t.width && (o.style.width = t.width), e.appendChild(o)
					}
					return e
				}
			}), Object.defineProperty(i.prototype, "renderTableRow", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("tr");
					return this.currentCellPosition.col = 0, this.renderClass(r, e), this.renderChildren(r, e), this.renderStyleValues(r.cssStyle, e), this.currentCellPosition.row++, e
				}
			}), Object.defineProperty(i.prototype, "renderTableCell", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this.createElement("td");
					if (r.verticalMerge) {
						var n = this.currentCellPosition.col;
						r.verticalMerge == "restart" ? (this.currentVerticalMerge[n] = e, e.rowSpan = 1) : this.currentVerticalMerge[n] && (this.currentVerticalMerge[n].rowSpan += 1, e.style.display = "none")
					}
					// console.log("Td:",e,r,this)//ｍｙ找到td style 内联方式
					return this.renderClass(r, e), this.renderChildren(r, e), this.renderStyleValues(r.cssStyle, e), r.span && (e.colSpan = r.span), this.currentCellPosition.col++, e
				}
			}),Object.defineProperty(i.prototype, "renderStyles", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r,e) {
					const stylesMap = this.styleMap;
					var _a,	styleText = "",styles=r;	
					var defautStyles = styles.filter(s => s.isDefault).reduce((a,x)=>{
										a[x.target]=x;
										return a;
									 },{});
					for (const style of styles) {
							var subStyles = style.styles;
							if (style.linked) {
								var linkedStyle = style.linked && stylesMap[style.linked];
								if (linkedStyle)
									subStyles = subStyles.concat(linkedStyle.styles);
								else if (this.options.debug)
									console.warn(`Can't find linked style ${style.linked}`);
							}
							for (const subStyle of subStyles) {
								var selector = `${(_a = style.target) !== null && _a !== void 0 ? _a : ''}.${style.cssName}`;
								if (style.target != subStyle.target)
									selector += ` ${subStyle.target}`;
								if (defautStyles[style.target] == style)
									selector = `.${this.className} ${style.target}, ` + selector;
								styleText += this.styleToString(selector, subStyle.values);
							}
						}
					
        			 return  e.appendChild(Ve(styleText));// <style> </style>
  		          }
			}),Object.defineProperty(i.prototype, "renderNumbering", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r,e) {
					 var styleText = "",numberings=r,styleContainer=e;
					var rootCounters = [];
					for (var num of numberings) {
						var selector = `p.${this.numberingClass(num.id, num.level)}`;
						var listStyleType = "none";
						if (num.bullet) {
							let valiable = `--${this.className}-${num.bullet.src}`.toLowerCase();
							styleText += this.styleToString(`${selector}:before`, {
								"content": "' '",
								"display": "inline-block",
								"background": `var(${valiable})`
							}, num.bullet.style);
							this.document.loadNumberingImage(num.bullet.src).then(data => {
								var text = `${this.rootSelector} { ${valiable}: url(${data}) }`;
								styleContainer.appendChild(ve(text));
							});
						}
						else if (num.levelText) {
							let counter = this.numberingCounter(num.id, num.level);
							if (num.level > 0) {
								styleText += this.styleToString(`p.${this.numberingClass(num.id, num.level - 1)}`, {
									"counter-reset": counter
								});
							}
							else {
								rootCounters.push(counter);
							}
							styleText += this.styleToString(`${selector}:before`, Object.assign({ "content": this.levelTextToContent(num.levelText, num.suff, num.id, this.numFormatToCssValue(num.format)), "counter-increment": counter }, num.rStyle));
						}
						else {
							listStyleType = this.numFormatToCssValue(num.format);
						}
						styleText += this.styleToString(selector, Object.assign({ "display": "list-item", "list-style-position": "inside", "list-style-type": listStyleType }, num.pStyle));
					}
					if (rootCounters.length > 0) {
						styleText += this.styleToString(this.rootSelector, {
							"counter-reset": rootCounters.join(" ")
						});
					}
        			 return  e.appendChild(Ve(styleText));// <style> </style>
				}
			}),
			Object.defineProperty(i.prototype, "renderStyleValues", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					r && Object.keys(r)
						.forEach(function(n) {
							e.style[n] = typeof r[n] == "string" ? r[n].replace(/(\d+(.\d+)?)pt/g,(str,p)=>{ return Math.floor(p*96/72)  +'px'}) : r[n]
						})
				}
			}), Object.defineProperty(i.prototype, "renderClass", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					r.className && (e.className = r.className), r.styleName && e.classList.add(this.processStyleName(r.styleName))
				}
			}), Object.defineProperty(i.prototype, "findStyle", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e;
					// console.log("findStyle:",r)
					 return r && ((e = this.styleMap) === null || e === (void 0 )? (void 0) : e[r])
				}
			}), Object.defineProperty(i.prototype, "numberingClass", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return "".concat(this.className, "-num-")
						.concat(r, "-")
						.concat(e)
				}
			}), Object.defineProperty(i.prototype, "tabStopClass", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					return "".concat(this.className, "-tab-stop")
				}
			}), Object.defineProperty(i.prototype, "styleToString", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n) {
					n === void 0 && (n = null);
					var a = "".concat(r, ` {\r
`);
					for (var t in e) a += "  ".concat(t, ": ")
						.concat(e[t], `;\r
`);
					return n && (a += n), a + `}\r
`
				}
			}), Object.defineProperty(i.prototype, "styleInlineToString", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					e === void 0 && (e = null);
					var n = 'style="';
					!r["font-style"] && (r["font-style"] = "normal");
					for (var a in r) n += "".concat(a, ": ")
						.concat(r[a], "; ");
					return e && (n += e), n + '"'
				}
			}), Object.defineProperty(i.prototype, "numberingCounter", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e) {
					return "".concat(this.className, "-num-")
						.concat(r, "-")
						.concat(e)
				}
			}), Object.defineProperty(i.prototype, "levelTextToContent", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r, e, n, a) {
					var t = this,
						o, u = {
							tab: "\\9",
							space: "\\a0"
						},
						l = r.replace(/%\d*/g, function(f) {
							var p = parseInt(f.substring(1), 10) - 1;
							return '"counter('.concat(t.numberingCounter(n, p), ", ")
								.concat(a, ')"')
						});
					return '"'.concat(l)
						.concat((o = u[numberingData.suff]) !== null && o !== void 0 ? o : "", '"')
				}
			}), Object.defineProperty(i.prototype, "numLevelTextToContent", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = this,
						n, a = {
							tab: "&emsp;",
							space: "&nbsp;"
						},
						t = {
							chineseCounting: ["\u96F6", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],
							decimalEnclosedCircleChinese: ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473", "\u3251", "\u3252", "\u3253", "\u3254", "\u3255", "\u3256", "\u3257", "\u3258", "\u3259", "\u325A", "\u325B", "\u325C", "\u325D", "\u325E", "\u325F", "\u32B1", "\u32B2", "\u32B3", "\u32B4", "\u32B5", "\u32B6", "\u32B7", "\u32B8", "\u32B9", "\u32BA", "\u32BB", "\u32BC", "\u32BD", "\u32BE", "\u32BF"],
							upperLetter: ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
							lowerLetter: ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
							test1: [" ", "\u24B6", "\u24B7", "\u24B8", "\u24B9", "\u24BA", "\u24BB", "\u24BC", "\u24BD", "\u24BE", "\u24BF", "\u24C0", "\u24C1", "\u24C2", "\u24C3", "\u24C4", "\u24C5", "\u24C6", "\u24C7", "\u24C8", "\u24C9", "\u24CA", "\u24CB", "\u24CC", "\u24CD", "\u24CE", "\u24CF"],
							test2: [" ", "\u24D0", "\u24D1", "\u24D2", "\u24D3", "\u24D4", "\u24D5", "\u24D6", "\u24D7", "\u24D8", "\u24D9", "\u24DA", "\u24DB", "\u24DC", "\u24DD", "\u24DE", "\u24DF", "\u24E0", "\u24E1", "\u24E2", "\u24E3", "\u24E4", "\u24E5", "\u24E6", "\u24E7", "\u24E8", "\u24E9"],
							test3: [" ", "\u2776", "\u2777", "\u2778", "\u2779", "\u277A", "\u277B", "\u277C", "\u277D", "\u277E", "\u277F", "\u24EB", "\u24EC", "\u24ED", "\u24EE", "\u24EF", "\u24F0", "\u24F1", "\u24F2", "\u24F3", "\u24F4"],
							test4: [" ", "\u24F5", "\u24F6", "\u24F7", "\u24F8", "\u24F9", "\u24FA", "\u24FB", "\u24FC", "\u24FD", "\u24FE"],
							test5: [" ", "\u3280", "\u3281", "\u3282", "\u3283", "\u3284", "\u3285", "\u3286", "\u3287", "\u3288", "\u3289"],
							upperRoman: [" ", "\u2160", "\u2161", "\u2162", "\u2163", "\u2164", "\u2165", "\u2166", "\u2167", "\u2168", "\u2169", "\u216A", "\u216B"],
							lowerRoman: ["", "\u2170", "\u2171", "\u2172", "\u2173", "\u2174", "\u2175", "\u2176", "\u2177", "\u2178", "\u2179", "\u217A", "\u217B"]
						},
						o = r.levelText.replace(/%\d*/g, function(u) {
							var l = parseInt(u.substring(1), 10) - 1,
								f = 1;
							return l == r.level ? (f = r.count, e.domNumberings[r.id][l].pCount = f, e.domNumberings[r.id][l + 1] && (e.domNumberings[r.id][l + 1].count = 1), r.count++) : e.domNumberings[r.id] && e.domNumberings[r.id][l] && (f = e.domNumberings[r.id][l].count - 1, f == 0 && (f = 1)), t[r.format] && (f = t[r.format][f]), "".concat(f)
						});
					return r.format == "bullet" && (o = "<em " + this.styleInlineToString(r.rStyle) + '">' + r.levelText + "</em>"), "".concat(o)
						.concat((n = a[r.suff]) !== null && n !== void 0 ? n : "")
				}
			}), Object.defineProperty(i.prototype, "numFormatToCssValue", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function(r) {
					var e = {
						none: "none",
						bullet: "disc",
						decimal: "decimal",
						lowerLetter: "lower-alpha",
						upperLetter: "upper-alpha",
						lowerRoman: "lower-roman",
						upperRoman: "upper-roman"
					};
					return e[r] || r
				}
			}), Object.defineProperty(i.prototype, "refreshTabStops", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function() {
					var r = this;
					!this.options.experimental || (clearTimeout(this.tabsTimeout), this.tabsTimeout = setTimeout(function() {
						for (var e = xt(), n = 0, a = r.currentTabs; n < a.length; n++) {
							var t = a[n];
							jt(t.span, t.stops, r.defaultTabSize, e)
						}
					}, 500))
				}
			}), i
		}();

	function vr(i, r, e) {
		r === void 0 && (r = void 0), e === void 0 && (e = void 0);
		var n = Object.assign(document.createElement(i), r);
		return e && Ge(n, e), n
	}

	function Dt(i) {
		i.innerHTML = ""
	}

	function Ge(i, r) {
		r.forEach(function(e) {
			return i.appendChild(e)
		})
	}

	function Ve(i) {
		return vr("style", {
			innerHTML: i
		})
	}

	function Lt(i, r) {
		i.appendChild(document.createComment(r))
	}

	function Ut(i, r) {
		for (var e = i.parent; e != null && e.type != r;) e = e.parent;
		return e
	}
	var Mt = {
		ignoreHeight: !1,
		ignoreWidth: !1,
		ignoreFonts: !1,
		breakPages: !0,
		debug: !1,
		experimental: !0,
		className: "tp-importword",
		inWrapper: !1,
		trimXmlDeclaration: !0,
		ignoreLastRenderedPageBreak: !0,
		renderHeaders: !1,
		renderFooters: !1,
		renderFootnotes: !1,
		renderEndnotes: !1,
		useBase64URL:!0// !1
	};

	function Wt(i, r) {
		r === void 0 && (r = null);
		var e = me(me({}, Mt), r),
			n = window.document.createElement("content"),
			a = new Rt(window.document),
			styleContainer= window.document.createElement("header");
		return new Promise(function(t) {
			let NCt= new Ct(e);
		 
			kt.load(i, NCt, e)
				.then(function(o) {		    
					a.render(o, n, null, e)
						.then(function() {
						 
					//   console.log("a render:",a,e,i,o,n,styleContainer,r,t);
					 const {document,options}=a;
					 
					    styleContainer.appendChild(a.renderDefaultStyle());
						if (document.themePart) {
						//appendComment(styleContainer, "docxjs document theme values");
							a.renderTheme(document.themePart, styleContainer);
						}
						if (document.stylesPart != null) {
							a.styleMap = a.processStyles(document.stylesPart.styles);
							//appendComment(styleContainer, "docxjs document styles");
							 a.renderStyles(document.stylesPart.styles,styleContainer);
						}
						if (document.numberingPart) {
							a.prodessNumberings(document.numberingPart.domNumberings);
						// appendComment(styleContainer, "docxjs document numbering styles");
							a.renderNumbering(document.numberingPart.domNumberings, styleContainer)
						}
						
						if (!options.ignoreFonts && document.fontTablePart)
						{	a.renderFontTable(document.fontTablePart, styleContainer);}
						var sectionElements = a.renderSections(document.documentPart.body);
						if (a.options.inWrapper) {
							window.document.body.appendChild(a.renderWrapper(sectionElements));
						}

						let style='';
 								const styles=styleContainer.querySelectorAll('style') ;
								for(let i=0;i<styles.length;i++){
									style+=styles[i].innerHTML;
								}
							t({
								html: n.innerHTML,
								style // 从a.styleMap的styleMap 获取字符串
							})
						})
				})
		})
	}
	var Ht = Promise,
		Zt = tinymce.util.Tools.resolve("tinymce.Env"),
		Xt = tinymce.util.Tools.resolve("tinymce.util.Delay"),
		Gt = function(i) {
			return new Ht(function(r) {
				var e = document.createElement("input");
				e.type = "file", e.style.position = "fixed", e.style.left = "0", e.style.top = "0", e.style.opacity = "0.001", document.body.appendChild(e);
				var n = function(t) {
					r(Array.prototype.slice.call(t.target.files))
				};
				e.addEventListener("change", n);
				var a = function(t) {
					var o = function(u) {
						try {
							r(Array.prototype.slice.call(u.target ? u.target.files : []))
						} catch {}
						e.parentNode.removeChild(e)
					};
					Zt.os.isAndroid() && t.type !== "remove" ? Xt.setEditorTimeout(i, o, 0) : o(), i.off("focusin remove", a)
				};
				i.on("focusin remove", a), e.click()
			})
		},
		gr = null,
		Ke = null;

	function yr(i, r) {
		Kt(r, function(e) {
			Wt(e)
				.then(function(n) {
					Vt(i, n)
				})
		})
	}

	function Vt(i, r) {
		var e = r.html;
		if (typeof gr != "function") {
			i.insertContent(e.replace(/\s\s\s/gi, "&nbsp;&nbsp; "));
			i.dom.addStyle(r.style);
			// console.log("DOM:",i,r)
			try {
				top.tinymce.activeEditor.notificationManager.close()
			} catch {
				try {
					i.notificationManager.close()
				} catch {}
			}
			i.notificationManager.open({
				text: "Import to Word succeeded",
				type: "success",
				timeout: 2e3
			})
		}
	}

	function Kt(i, r) {
		var e = i[0],
			n = new FileReader;
		n.onload = function(a) {
			var t = a.target.result;
			r(t)
		}, n.readAsArrayBuffer(e)
	}
	var Yt = function(i) {
			gr = i.getParam("tp_importword_filter", void 0, "function"), Ke = i.getParam("tp_importword_handler", void 0, "function")
		},
		Ye = function(i, r) {
			Yt(i), Gt(i)
				.then(function(e) {
					if (typeof Ke == "function") {
						var n = function(t) {
							yr(i, t)
						};
						Ke(i, e, n)
					} else {
						var a = e[0].name || "defule.docx";
						a.substr(a.lastIndexOf(".") + 1) == "docx" ? (i.notificationManager.open({
							text: "Converting...",
							type: "info",
							closeButton: !1
						}), yr(i, e)) : i.notificationManager.open({
							text: "Currently only supports docx file format, if it is doc format, please convert it to docx",
							type: "warning"
						})
					}
				})
		},
		qt = function(i, r) {
			i.ui.registry.getAll()
				.icons[r.registryName] || i.ui.registry.addIcon(r.registryName, r.icon), i.ui.registry.addButton(r.registryName, {
					icon: r.registryName,
					tooltip: r.title,
					onAction: function() {
						return Ye(i)
					}
				}), i.ui.registry.addMenuItem(r.registryName, {
					icon: r.registryName,
					text: r.title,
					onAction: function() {
						return Ye(i)
					}
				})
		},
		Jt = function(i, r) {
			i.addCommand("mce".concat(r.registryName.substring(0, 1)
				.toUpperCase() + r.registryName.substring(1)), function() {
				Ye(i)
			})
		},
		$t = function(i, r) {
			tinymce.util.XHR.send({
				url: i.editorManager.PluginManager.urls[r.registryName] + "/langs/" + (i.settings.language || "en") + ".json",
				async: !1,
				dataType: "json",
				success: function(e) {
					try {
						i.tp$.I18n.add(i.settings.language, JSON.parse(e))
					} catch {}
				}
			})
		},
		Qt = function(i) {
			tinymce.PluginManager.add(i.registryName, function(r, e) {
				return $t(r, i), qt(r, i), Jt(r, i), {
					getMetadata: function() {
						return {
							name: i.name,
							url: i.repo
						}
					}
				}
			})
		},
		wr = {
			name: "Importword",
			registryName: "tpImportword",
			title: "import word document",
			repo: "https://github.com/Five-great/tinymce-plugin/tp-importword",
			icon: '<svg t="1604625110140" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14669" width="24" height="24"><path d="M546.21184 76.9024a30.72 30.72 0 0 1 21.70368 8.9856l248.22784 247.75168a30.72 30.72 0 0 1 9.0112 21.74464v163.3792a10.24 10.24 0 0 1-10.24 10.24h-51.712a10.24 10.24 0 0 1-10.24-10.24v-109.568h-232.448a30.72 30.72 0 0 1-30.72-30.72v-229.888h-330.752v726.016h438.272a10.24 10.24 0 0 1 10.24 10.24v51.2a10.24 10.24 0 0 1-10.24 10.24h-478.72a30.72 30.72 0 0 1-30.72-30.72V107.6224a30.72 30.72 0 0 1 30.72-30.72h427.61728z m197.84192 531.712l-171.40736 141.43488a30.72 30.72 0 0 0 0 47.39072l171.40736 141.43488a10.24 10.24 0 0 0 14.2848-1.2288l36.01408-41.95328a10.24 10.24 0 0 0-1.6128-14.848l-94.68416-71.26016h232.43264a10.24 10.24 0 0 0 10.24-10.24v-51.2a10.24 10.24 0 0 0-10.24-10.24h-232.448l94.69952-71.26016a10.24 10.24 0 0 0 1.6128-14.848l-36.01408-41.95328a10.24 10.24 0 0 0-14.2848-1.2288z m-323.8912-224.512a10.24 10.24 0 0 1 10.24 10.24v51.2a10.24 10.24 0 0 1-10.24 10.24h-190.464a10.24 10.24 0 0 1-10.24-10.24v-51.2a10.24 10.24 0 0 1 10.24-10.24h190.464z m141.312-207.36v155.648a5.12 5.12 0 0 0 5.12 5.12h155.648l-160.768-160.768zM276.48 542.72l37.888 171.008 45.056-171.008h59.904l43.52 173.568 38.4-173.568h50.688l-60.928 248.832H437.76l-49.664-185.856-49.664 185.856H284.16L225.28 542.72h51.2z m143.68768-292.2496a10.24 10.24 0 0 1 10.24 10.24v51.2a10.24 10.24 0 0 1-10.24 10.24h-190.464a10.24 10.24 0 0 1-10.24-10.24v-51.2a10.24 10.24 0 0 1 10.24-10.24h190.464z" ></path></svg>'
		};
	Qt(wr);
	var en = {
		opt: wr
	};
	return en
})();