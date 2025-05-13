/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, B = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), F = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (r) => new rt(typeof r == "string" ? r : r + "", void 0, W), dt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new rt(e, r, W);
}, ut = (r, t) => {
  if (B) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, J = B ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ct(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: $t, getOwnPropertyDescriptor: ft, getOwnPropertyNames: _t, getOwnPropertySymbols: mt, getPrototypeOf: gt } = Object, _ = globalThis, K = _.trustedTypes, yt = K ? K.emptyScript : "", L = _.reactiveElementPolyfillSupport, S = (r, t) => r, N = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? yt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (r, t) => !pt(r, t), Z = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Z) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && $t(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Z;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [..._t(e), ...mt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(J(i));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : N;
      this._$Em = i, this[i] = a.fromAttribute(e, h.type) ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i;
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? q)(o, e) || s.useDefault && s.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: h } = o, a = this[n];
        h !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[S("elementProperties")] = /* @__PURE__ */ new Map(), b[S("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: b }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, R = C.trustedTypes, G = R ? R.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ot = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, nt = "?" + f, At = `<${nt}>`, A = document, x = () => A.createComment(""), O = (r) => r === null || typeof r != "object" && typeof r != "function", V = Array.isArray, bt = (r) => V(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, X = />/g, m = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Y = /'/g, tt = /"/g, at = /^(?:script|style|textarea|title)$/i, vt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), et = vt(1), v = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), g = A.createTreeWalker(A, 129);
function ht(r, t) {
  if (!V(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const Et = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === w ? u[1] === "!--" ? o = Q : u[1] !== void 0 ? o = X : u[2] !== void 0 ? (at.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = m) : u[3] !== void 0 && (o = m) : o === m ? u[0] === ">" ? (o = i ?? w, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? m : u[3] === '"' ? tt : Y) : o === tt || o === Y ? o = m : o === Q || o === X ? o = w : (o = m, i = void 0);
    const $ = o === m && r[h + 1].startsWith("/>") ? " " : "";
    n += o === w ? a + At : l >= 0 ? (s.push(c), a.slice(0, l) + ot + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [ht(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = Et(t, e);
    if (this.el = U.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(ot)) {
          const p = u[o++], $ = i.getAttribute(l).split(f), M = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: M[2], strings: $, ctor: M[1] === "." ? St : M[1] === "?" ? Ct : M[1] === "@" ? Pt : D }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (at.test(i.tagName)) {
          const l = i.textContent.split(f), p = l.length - 1;
          if (p > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let $ = 0; $ < p; $++) i.append(l[$], x()), g.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[p], x());
          }
        }
      } else if (i.nodeType === 8) if (i.data === nt) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(r, t, e = r, s) {
  var o, h;
  if (t === v) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = O(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = E(r, i._$AS(r, t.values), i, s)), t;
}
class wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new T(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new xt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = g.nextNode(), o++);
    }
    return g.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), O(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(ht(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new wt(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    V(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new T(this.O(x()), this.O(x()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== v, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = E(this, h[s + a], e, a), c === v && (c = this._$AH[a]), o || (o = !O(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class St extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ct extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Pt extends D {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === v) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const j = C.litHtmlPolyfillSupport;
j == null || j(U, T), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.3.0");
const Ot = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new T(t.insertBefore(x(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class P extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return v;
  }
}
var it;
P._$litElement$ = !0, P.finalized = !0, (it = y.litElementHydrateSupport) == null || it.call(y, { LitElement: P });
const z = y.litElementPolyfillSupport;
z == null || z({ LitElement: P });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q }, Mt = (r = Tt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ht(r) {
  return (t, e) => typeof e == "object" ? Mt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Nt(r) {
  return Ht({ ...r, state: !0, attribute: !1 });
}
var Rt = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, lt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? kt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Rt(t, e, i), i;
};
let k = class extends P {
  constructor() {
    super(...arguments), this.isLoading = !1;
  }
  render() {
    return et`
      <uui-box>
  <section aria-labelledby="dashboard-title">
    <header>
      <h2 id="dashboard-title" class="uui-h2">Welcome to the Rick and Morty Dashboard!</h2>
    </header>
    <p>
      On this page, you can use the two buttons below - <strong>Import</strong> and <strong>Delete</strong> - to
      programmatically manage the content of the Characters page.
    </p>
    <ul>
      <li>
        <strong>Import</strong>: Clicking this button will contact the <cite>Rick and Morty API</cite> and download character data. New characters will be created and existing characters will be updated.
      </li>
      <li>
        <strong>Delete</strong>: Clicking this button will remove all characters currently shown on the Characters page.
      </li>
    </ul>
  </section>

  <section class="dashboard-button-container" aria-label="Buttons which perform actions for managing character content">
    <uui-button
      @click=${this._handleImportCharacters}
      ?disabled=${this.isLoading}
      look="outline"
      label="Import"
      type="button"
      color="default"
    >
      Import
    </uui-button>
    <uui-button
      @click=${this._handleDeleteCharacters}
      ?disabled=${this.isLoading}
      look="outline"
      label="Delete"
      type="button"
      color="default"
    >
      Delete
    </uui-button>
</section>

  ${this.isLoading ? et`<section aria-label="Character import or delete in progress" role="status">
        <p>
          Performing selected action. This may take a couple of minutes to complete. Please stay on this page.
          <span class="spinner-border spinner-border-sm text-primary ms-2" role="status" aria-hidden="true"></span>
        </p>
      </section>` : null}
</uui-box>
`;
  }
  async _handleImportCharacters() {
    this.isLoading = !0;
    try {
      const r = await fetch("/umbraco/api/rickandmortycharacters", {
        method: "GET",
        credentials: "include"
      });
      if (!r.ok) throw new Error(`HTTP error ${r.status}`);
      alert("Import successful");
    } catch (r) {
      console.error("Error importing characters:", r), alert("Failed to import characters");
    } finally {
      this.isLoading = !1;
    }
  }
  async _handleDeleteCharacters() {
    this.isLoading = !0;
    try {
      const r = await fetch("/umbraco/api/rickandmortycharacters", {
        method: "DELETE",
        credentials: "include"
      });
      if (!r.ok) throw new Error(`HTTP error ${r.status}`);
      alert("Delete successful");
    } catch (r) {
      console.error("Error deleting characters:", r), alert("Failed to delete characters");
    } finally {
      this.isLoading = !1;
    }
  }
};
k.styles = dt`
    :host {
    display: block;
    padding: var(--uui-size-layout-1);
}

button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

.dashboard-button-container {
    width: 100%;
    display: flex;
}

.dashboard-button-container uui-button:first-child {
    margin-right: 0.5em;
}
  `;
lt([
  Nt()
], k.prototype, "isLoading", 2);
k = lt([
  Ut("my-element")
], k);
export {
  k as MyElement
};
//# sourceMappingURL=rick-and-morty-dashboard.js.map
