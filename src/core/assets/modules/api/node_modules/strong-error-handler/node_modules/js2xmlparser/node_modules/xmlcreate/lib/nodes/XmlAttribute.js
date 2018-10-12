/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var escape_1 = require("../escape");
var options_1 = require("../options");
var utils_1 = require("../utils");
var validate_1 = require("../validate");
var XmlCharRef_1 = require("./XmlCharRef");
var XmlEntityRef_1 = require("./XmlEntityRef");
var XmlNode_1 = require("./XmlNode");
var XmlText_1 = require("./XmlText");
/**
 * Represents an XML element attribute.
 *
 * An XML element attribute is part of the start tag of an element and is
 * structured as follows, where `{name}` is the name of the attribute and
 * `{value}` is the value of the attribute:
 *
 * ```xml
 * <element {name}="{value}">
 * ```
 *
 * The `{name}` value is a property of this node, while the `{value}` property
 * consists of the children of this node.
 *
 * XmlAttribute nodes must have at least one child, and can have an unlimited
 * number of {@link XmlCharRef}, {@link XmlEntityRef}, and {@link XmlText}
 * nodes as children.
 */
var XmlAttribute = (function (_super) {
    __extends(XmlAttribute, _super);
    /**
     * Initializes a new instance of the {@link XmlAttribute} class.
     *
     * @param {string} name             The name of the XML attribute.
     * @param {XmlNode|XmlNode[]} value The initial value of the XML attribute.
     *                                  Additional children can be added later.
     *                                  Only {@link XmlCharRef},
     *                                  {@link XmlEntityRef}, and
     *                                  {@link XmlText} nodes are permitted.
     */
    function XmlAttribute(name, value) {
        _super.call(this);
        this.name = name;
        if (utils_1.isType(value, "Array")) {
            for (var _i = 0, _a = value; _i < _a.length; _i++) {
                var node = _a[_i];
                this.insertChild(node);
            }
        }
        else {
            this.insertChild(value);
        }
    }
    Object.defineProperty(XmlAttribute.prototype, "name", {
        /**
         * Gets the name of this attribute.
         *
         * @returns {string} The name of this attribute.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of this attribute.
         *
         * @param {string} name The name of this attribute.
         */
        set: function (name) {
            if (!utils_1.isType(name, "String")) {
                throw new TypeError("name should be a string");
            }
            else if (!validate_1.validateName(name)) {
                throw new Error("name should not contain characters not" +
                    " allowed in XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a new XML character reference at the specified index.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created XML declaration.
     */
    XmlAttribute.prototype.charRef = function (char, hex, index) {
        var charRef = new XmlCharRef_1.default(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts a new XML entity reference at the specified index.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created XML declaration.
     */
    XmlAttribute.prototype.entityRef = function (entity, index) {
        var charRef = new XmlEntityRef_1.default(entity);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlCharRef}, {@link XmlEntityRef}, and
     * {@link XmlText} nodes can be inserted; otherwise, an exception will be
     * thrown.
     *
     * @param {XmlNode} node   The node to insert.
     * @param {number} [index] The index at which to insert the node. Nodes at
     *                         or after the index are shifted to the right. If
     *                         no index is specified, the node is inserted at
     *                         the end.
     *
     * @returns {XmlNode} The node inserted into this node's children, or
     *                    undefined if no node was inserted.
     */
    XmlAttribute.prototype.insertChild = function (node, index) {
        if (!(node instanceof XmlCharRef_1.default || node instanceof XmlEntityRef_1.default ||
            node instanceof XmlText_1.default)) {
            throw new TypeError("node should be an instance of XmlCharRef," +
                " XmlEntityRef, or XmlText");
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Removes the specified node from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param {XmlNode} node The node to remove.
     *
     * @returns {boolean} Whether a node was removed.
     */
    XmlAttribute.prototype.removeChild = function (node) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return _super.prototype.removeChild.call(this, node);
    };
    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param {number} index The index at which the node to be removed is
     *                       located.
     *
     * @returns {XmlNode} The node that was removed, or undefined if no node
     *                    was removed.
     */
    XmlAttribute.prototype.removeChildAtIndex = function (index) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return _super.prototype.removeChildAtIndex.call(this, index);
    };
    /**
     * Inserts a new XML text node at the specified index.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created XML declaration.
     */
    XmlAttribute.prototype.text = function (text, index) {
        var textNode = new XmlText_1.default(text);
        this.insertChild(textNode, index);
        return textNode;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlAttribute.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        options_1.validateStringOptions(options);
        var quote = options.doubleQuotes ? "\"" : "'";
        var str = this.name + "=" + quote;
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (options.doubleQuotes) {
                str += escape_1.escapeDoubleQuotes(child.toString(options));
            }
            else {
                str += escape_1.escapeSingleQuotes(child.toString(options));
            }
        }
        str += quote;
        return str;
    };
    return XmlAttribute;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlAttribute;
