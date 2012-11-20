/* ===================================================
 * animate.js v1.0
 * http://joshuapekera.github.com/animate/
 * ===================================================
 * Copyright 2012 - Joshua Pekera & PyroCMS
 * Works with jQuery 1.4.3 and above
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://pyrocms.com/legal/license
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
(function(a) {
	var b = parseFloat(a.fn.jquery);
	if (!b) b = 0;
	var c = ["Webkit", "Moz", "O", "Ms", "Khtml", ""];
	var d = ["borderRadius", "boxShadow", "userSelect", "transformOrigin", "transformStyle", "transition", "transitionDuration", "transitionProperty", "transitionTimingFunction", "backgroundOrigin", "backgroundSize", "animation", "filter", "zoom", "columns", "perspective", "perspectiveOrigin", "appearance"];
	a.fn.cssSetQueue = function(b, c) {
		v = this;
		var d = v.data("cssQueue") ? v.data("cssQueue") : [];
		var e = v.data("cssCall") ? v.data("cssCall") : [];
		var f = 0;
		var g = {};
		a.each(c, function(a, b) {
			g[a] = b
		});
		while (1) {
			if (!e[f]) {
				e[f] = g.complete;
				break
			}
			f++
		}
		g.complete = f;
		d.push([b, g]);
		v.data({
			cssQueue: d,
			cssRunning: true,
			cssCall: e
		})
	};
	a.fn.cssRunQueue = function() {
		v = this;
		var a = v.data("cssQueue") ? v.data("cssQueue") : [];
		if (a[0]) v.cssEngine(a[0][0], a[0][1]);
		else v.data("cssRunning", false);
		a.shift();
		v.data("cssQueue", a)
	};
	a.cssMerge = function(b, c, d) {
		a.each(c, function(c, e) {
			a.each(d, function(a, d) {
				b[d + c] = e
			})
		});
		return b
	};
	a.fn.cssAnimationData = function(a, b) {
		var c = this;
		var d = c.data("cssAnimations");
		if (!d) d = {};
		if (!d[a]) d[a] = [];
		d[a].push(b);
		c.data("cssAnimations", d);
		return d[a]
	};
	a.fn.cssAnimationRemove = function() {
		var b = this;
		var c = b.data("cssAnimations");
		var d = b.data("identity");
		a.each(c, function(a, b) {
			c[a] = b.splice(d + 1, 1)
		});
		b.data("cssAnimations", c)
	};
	a.css3D = function(b) {
		a("body").data("cssPerspective", isFinite(b) ? b : b ? 1e3 : 0).cssOriginal(a.cssMerge({}, {
			TransformStyle: b ? "preserve-3d" : "flat"
		}, c))
	};
	a.cssPropertySupporter = function(b) {
		a.each(d, function(d, e) {
			if (b[e]) a.each(c, function(a, c) {
				var d = e.substr(0, 1);
				b[c + d[c ? "toUpperCase" : "toLowerCase"]() + e.substr(1)] = b[e]
			})
		});
		return b
	};
	a.cssAnimateSupport = function() {
		var b = false;
		a.each(c, function(a, c) {
			b = document.body.style[c + "AnimationName"] !== undefined ? true : b
		});
		return b
	};
	a.fn.cssEngine = function(b, d) {
		function f(a) {
			return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
		}
		var e = this;
		var e = this;
		if (typeof d.complete == "number") e.data("cssCallIndex", d.complete);
		var g = {
			linear: "linear",
			swing: "ease",
			easeIn: "ease-in",
			easeOut: "ease-out",
			easeInOut: "ease-in-out"
		};
		var h = {};
		var i = a("body").data("cssPerspective");
		if (b.transform) a.each(c, function(a, c) {
			var d = c + (c ? "T" : "t") + "ransform";
			var g = e.cssOriginal(f(d));
			var j = b.transform;
			if (!g || g == "none") h[d] = "scale(1)";
			b[d] = (i && !/perspective/gi.test(j) ? "perspective(" + i + ") " : "") + j
		});
		b = a.cssPropertySupporter(b);
		var j = [];
		a.each(b, function(a, b) {
			j.push(f(a))
		});
		var k = false;
		var l = [];
		var m = [];
		for (var n = 0; n < j.length; n++) {
			l.push(String(d.duration / 1e3) + "s");
			var o = g[d.easing];
			m.push(o ? o : d.easing)
		}
		l = e.cssAnimationData("dur", l.join(", ")).join(", ");
		m = e.cssAnimationData("eas", m.join(", ")).join(", ");
		var p = e.cssAnimationData("prop", j.join(", "));
		e.data("identity", p.length - 1);
		p = p.join(", ");
		var q = {
			TransitionDuration: l,
			TransitionProperty: p,
			TransitionTimingFunction: m
		};
		var r = {};
		r = a.cssMerge(r, q, c);
		var s = b;
		a.extend(r, b);
		if (r.display == "callbackHide") k = true;
		else if (r.display) h["display"] = r.display;
		e.cssOriginal(h);
		setTimeout(function() {
			e.cssOriginal(r);
			var b = e.data("runningCSS");
			b = !b ? s : a.extend(b, s);
			e.data("runningCSS", b);
			setTimeout(function() {
				e.data("cssCallIndex", "a");
				if (k) e.cssOriginal("display", "none");
				e.cssAnimationRemove();
				if (d.queue) e.cssRunQueue();
				if (typeof d.complete == "number") {
					e.data("cssCall")[d.complete].call(e);
					e.data("cssCall")[d.complete] = 0
				} else d.complete.call(e)
			}, d.duration)
		}, 0)
	};
	a.str2Speed = function(a) {
		return isNaN(a) ? a == "slow" ? 1e3 : a == "fast" ? 200 : 600 : a
	};
	a.fn.cssAnimate = function(b, c, d, e) {
		var f = this;
		var g = {
			duration: 0,
			easing: "swing",
			complete: function() {},
			queue: true
		};
		var h = {};
		h = typeof c == "object" ? c : {
			duration: c
		};
		h[d ? typeof d == "function" ? "complete" : "easing" : 0] = d;
		h[e ? "complete" : 0] = e;
		h.duration = a.str2Speed(h.duration);
		a.extend(g, h);
		if (a.cssAnimateSupport()) {
			f.each(function(c, d) {
				d = a(d);
				if (g.queue) {
					var e = !d.data("cssRunning");
					d.cssSetQueue(b, g);
					if (e) d.cssRunQueue()
				} else d.cssEngine(b, g)
			})
		} else f.animate(b, g);
		return f
	};
	a.cssPresetOptGen = function(a, b) {
		var c = {};
		c[a ? typeof a == "function" ? "complete" : "easing" : 0] = a;
		c[b ? "complete" : 0] = b;
		return c
	};
	a.fn.cssFadeTo = function(b, c, d, e) {
		var f = this;
		opt = a.cssPresetOptGen(d, e);
		var g = {
			opacity: c
		};
		opt.duration = b;
		if (a.cssAnimateSupport()) {
			f.each(function(b, d) {
				d = a(d);
				if (d.data("displayOriginal") != d.cssOriginal("display") && d.cssOriginal("display") != "none") d.data("displayOriginal", d.cssOriginal("display") ? d.cssOriginal("display") : "block");
				else d.data("displayOriginal", "block");
				g.display = c ? d.data("displayOriginal") : "callbackHide";
				d.cssAnimate(g, opt)
			})
		} else f.fadeTo(b, opt);
		return f
	};
	a.fn.cssFadeOut = function(b, c, d) {
		if (a.cssAnimateSupport()) {
			if (!this.cssOriginal("opacity")) this.cssOriginal("opacity", 1);
			this.cssFadeTo(b, 0, c, d)
		} else this.fadeOut(b, c, d);
		return this
	};
	a.fn.cssFadeIn = function(b, c, d) {
		if (a.cssAnimateSupport()) {
			if (this.cssOriginal("opacity")) this.cssOriginal("opacity", 0);
			this.cssFadeTo(b, 1, c, d)
		} else this.fadeIn(b, c, d);
		return this
	};
	a.cssPx2Int = function(a) {
		return a.split("p")[0] * 1
	};
	a.fn.cssStop = function() {
		var b = this,
			d = 0;
		b.data("cssAnimations", false).each(function(f, g) {
			g = a(g);
			var h = {
				TransitionDuration: "0s"
			};
			var i = g.data("runningCSS");
			var j = {};
			if (i) a.each(i, function(b, c) {
				c = isFinite(a.cssPx2Int(c)) ? a.cssPx2Int(c) : c;
				var d = [0, 1];
				var e = {
					color: ["#000", "#fff"],
					background: ["#000", "#fff"],
					"float": ["none", "left"],
					clear: ["none", "left"],
					border: ["none", "0px solid #fff"],
					position: ["absolute", "relative"],
					family: ["Arial", "Helvetica"],
					display: ["none", "block"],
					visibility: ["hidden", "visible"],
					transform: ["translate(0,0)", "scale(1)"]
				};
				a.each(e, function(a, c) {
					if ((new RegExp(a, "gi")).test(b)) d = c
				});
				j[b] = d[0] != c ? d[0] : d[1]
			});
			else i = {};
			h = a.cssMerge(j, h, c);
			g.cssOriginal(h);
			setTimeout(function() {
				var c = a(b[d]);
				c.cssOriginal(i).data({
					runningCSS: {},
					cssAnimations: {},
					cssQueue: [],
					cssRunning: false
				});
				if (typeof c.data("cssCallIndex") == "number") c.data("cssCall")[c.data("cssCallIndex")].call(c);
				c.data("cssCall", []);
				d++
			}, 0)
		});
		return b
	};
	a.fn.cssDelay = function(a) {
		return this.cssAnimate({}, a)
	};
	a.fn.cssOriginal = a.fn.css;
	a.fn.css = function(d, e) {
		var f = this,
			g = {};
		if (typeof d == "string") if (e) g[a.camelCase(d)] = e;
		else return f.cssOriginal(d);
		else g = d;
		if (!g.transitionDuration) g.transitionDuration = "0s";
		if (b < 1.8) g = a.cssPropertySupporter(g);
		var h = a("body").data("cssPerspective");
		if (g.transform) a.each(b < 1.8 ? c : [""], function(a, b) {
			var c = b + (b ? "T" : "t") + "ransform";
			var d = g.transform;
			g[c] = (h && !/perspective/gi.test(d) ? "perspective(" + h + ") " : "") + d
		});
		var i = f.cssOriginal("transition-duration");
		f.cssOriginal(g);
		setTimeout(function() {
			f.cssOriginal("transition-duration", i)
		}, 0);
		return f
	}
})(jQuery)