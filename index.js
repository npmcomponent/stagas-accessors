
/*!
 *
 * Accessors.
 *
 */

/**
 * Module dependencies.
 */

var merge = require('merge')

/**
 * Exports.
 */

module.exports = Accessors

/**
 * Accessors class / mixin.
 *
 * @param {Object} [obj]
 * @api public
 */

function Accessors (obj) {
  if (!(this instanceof Accessors)) {
    if (obj) {
      return merge(obj, Accessors.prototype)
    }
    else return new Accessors()
  }
}

/**
 * Getter.
 *
 * @param {String} key
 * @return {Mixed} val
 * @api public
 */

Accessors.prototype.get = function (key) {
  return this._properties[key]
}

/**
 * Setter.
 *
 * @param {String} key
 * @param {Mixed} val...
 * @api public
 */

Accessors.prototype.set = function (key, a, b, c, d, e, f) {
  this._context[key] = this._context[key] || {}
  this._properties[key] = this._schema[key].setter.call(this._context[key], a, b, c, d, e, f)
  return this
}

/**
 * Define an accessor on an object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {Function} [setter]
 * @param {Mixed} [def]
 * @api public
 */

Accessors.defineAccessor = function (obj, key, setter, def) {
  obj._schema = obj._schema || {}
  obj._context = obj._context || {}
  obj._properties = obj._properties || {}
  setter = setter || thruSetter
  obj._schema[key] = { setter: setter, default: def }
  obj[key] = createAccessor(key)
  return obj
}

Accessors.attr = Accessors.defineAccessor

/**
 * Create an accessor function.
 *
 * @param {String} key
 * @return {Function} fn
 * @api private
 */

function createAccessor (key) {
  return function (a, b, c, d, e, f) {
    if (!(key in this._properties)) {
      this.set(key, this._schema[key].default)
    }
    if (!arguments.length) return this.get(key)
    else return this.set(key, a, b, c, d, e, f)
  }
}

/**
 * A through setter.
 *
 * @param {Mixed} v
 * @return {Mixed} v
 * @api private
 */

function thruSetter (v) { return v }
