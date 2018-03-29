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
var options_1 = require("../options");
var utils_1 = require("../utils");
var validate_1 = require("../validate");
var XmlAttribute_1 = require("./XmlAttribute");
var XmlCdata_1 = require("./XmlCdata");
var XmlCharRef_1 = require("./XmlCharRef");
var XmlComment_1 = require("./XmlComment");
var XmlEntityRef_1 = require("./XmlEntityRef");
var XmlNode_1 = require("./XmlNode");
var XmlProcInst_1 = require("./XmlProcInst");
var XmlText_1 = require("./XmlText");
/**
 * Represents an XML element.
 *
 * A sample XML element is structured as follows, where `{name}` is the name
 * of the element:
 *
 * ```xml
 * <{name} attname="attvalue">
 *     <subelem/>
 *     <?pitarget picontent?>
 *     text
 * </{name}></pre>
 * ```
 *
 * The `{name}` value is a property of the node, while the attributes and
 * children of the element (such as other elements, processing instructions,
 * and text) are children of this node.
 *
 * XmlElement nodes can have an unlimited number of {@link XmlAttribute},
 * {@link XmlCdata}, {@link XmlCharRef}, {@link XmlComment},
 * {@link XmlElement}, {@link XmlEntityRef}, {@link XmlProcInst}, or
 * {@link XmlText} nodes as children.
 */
var XmlElement = (function (_super) {
    __extends(XmlElement, _super);
    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param {string} name The name of the element.
     */
    function XmlElement(name) {
        _super.call(this);
        this.name = name;
    }
    Object.defineProperty(XmlElement.prototype, "name", {
        /**
         * Gets the name of the element.
         *
         * @returns {string} The name of the element.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of the element.
         *
         * @param {string} name The name of the element.
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
     * Inserts an new attribute at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} name
     *        The name of the attribute.
     * @param {string|XmlNode|Array.<string|XmlNode>} value
     *        The value of the attribute. Strings are converted to XmlText
     *        nodes.
     * @param {number} [index]
     *        The index at which the node should be inserted. If no index is
     *        specified, the node is inserted at the end of this node's
     *        children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    XmlElement.prototype.attribute = function (name, value, index) {
        if (utils_1.isType(value, "String")) {
            value = new XmlText_1.default(value);
        }
        else if (utils_1.isType(value, "Array")) {
            var arrayVal = value;
            for (var i = 0; i < arrayVal.length; i++) {
                if (utils_1.isType(arrayVal[i], "String")) {
                    var strVal = arrayVal[i];
                    arrayVal[i] = new XmlText_1.default(strVal);
                }
            }
        }
        var attribute = new XmlAttribute_1.default(name, value);
        this.insertChild(attribute, index);
        return attribute;
    };
    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns {XmlAttribute[]} An array containing all of the children of
     *                           this node that are instances of
     *                           {@link XmlAttribute}.
     */
    XmlElement.prototype.attributes = function () {
        return this._children.filter(function (node) { return node instanceof XmlAttribute_1.default; });
    };
    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the CDATA section.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCdata} The newly created CDATA section.
     */
    XmlElement.prototype.cdata = function (content, index) {
        var cdata = new XmlCdata_1.default(content);
        this.insertChild(cdata, index);
        return cdata;
    };
    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created character reference.
     */
    XmlElement.prototype.charRef = function (char, hex, index) {
        var charRef = new XmlCharRef_1.default(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the comment.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlComment} The newly created comment.
     */
    XmlElement.prototype.comment = function (content, index) {
        var comment = new XmlComment_1.default(content);
        this.insertChild(comment, index);
        return comment;
    };
    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} name    The name of the element.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlElement} The newly created element.
     */
    XmlElement.prototype.element = function (name, index) {
        var element = new XmlElement(name);
        this.insertChild(element, index);
        return element;
    };
    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created entity reference.
     */
    XmlElement.prototype.entityRef = function (entity, index) {
        var entityRef = new XmlEntityRef_1.default(entity);
        this.insertChild(entityRef, index);
        return entityRef;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlAttribute}, {@link XmlCdata},
     * {@link XmlCharRef}, {@link XmlComment}, {@link XmlElement},
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlText} nodes can
     * be inserted; otherwise, an exception will be thrown.
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
    XmlElement.prototype.insertChild = function (node, index) {
        if (!(node instanceof XmlAttribute_1.default ||
            node instanceof XmlCdata_1.default ||
            node instanceof XmlCharRef_1.default ||
            node instanceof XmlComment_1.default ||
            node instanceof XmlElement ||
            node instanceof XmlEntityRef_1.default ||
            node instanceof XmlProcInst_1.default ||
            node instanceof XmlText_1.default)) {
            throw new TypeError("node should be an instance of XmlAttribute,"
                + " XmlCdata, XmlCharRef, XmlComment,"
                + " XmlElement, XmlEntityRef, XmlProcInst,"
                + " or XmlText");
        }
        if (node instanceof XmlAttribute_1.default) {
            var attributes = this._children.filter(function (n) { return n instanceof XmlAttribute_1.default; });
            for (var _i = 0, _a = attributes; _i < _a.length; _i++) {
                var attribute = _a[_i];
                if (attribute.name === node.name) {
                    throw new Error("element already contains an" +
                        " XmlAttribute object with name "
                        + node.name);
                }
            }
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     * @param {number} [index]   The index at which the node should be inserted.
     *                           If no index is specified, the node is inserted
     *                           at the end of this node's children.
     *
     * @returns {XmlProcInst} The newly created processing instruction.
     */
    XmlElement.prototype.procInst = function (target, content, index) {
        var procInst = new XmlProcInst_1.default(target, content);
        this.insertChild(procInst, index);
        return procInst;
    };
    /**
     * Inserts some new text at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created text node.
     */
    XmlElement.prototype.text = function (text, index) {
        var txt = new XmlText_1.default(text);
        this.insertChild(txt, index);
        return txt;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlElement.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        options_1.validateStringOptions(options);
        var attributes = this.attributes();
        var nodes = this._children.filter(function (node) {
            return attributes.indexOf(node) === -1;
        });
        // Element tag start
        var str = "<" + this._name;
        // Attributes
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attribute = attributes_1[_i];
            str += " " + attribute.toString(options);
        }
        // Child nodes
        if (nodes.length > 0) {
            // Element non-empty tag end
            str += ">";
            var indenter = function (line) { return options.indent + line; };
            for (var i = 0; i < nodes.length; i++) {
                var next = nodes[i];
                var nextStr = next.toString(options);
                var prev = i > 0 ? nodes[i - 1] : undefined;
                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlText
                if (options.pretty) {
                    if (!allSameLineNodes(nodes)) {
                        if (!(i > 0 && onSameLine(next, prev))) {
                            str += options.newline;
                            nextStr = nextStr.split(options.newline)
                                .map(indenter)
                                .join(options.newline);
                        }
                    }
                }
                str += nextStr;
            }
            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlText
            if (options.pretty) {
                if (!allSameLineNodes(nodes)) {
                    str += options.newline;
                }
            }
            // Element end tag
            str += "</" + this._name + ">";
        }
        else {
            // Element empty tag end
            str += "/>";
        }
        return str;
    };
    return XmlElement;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlElement;
/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode[]} nodes The specified nodes.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 *
 * @private
 */
function allSameLineNodes(nodes) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (!((node instanceof XmlCharRef_1.default ||
            node instanceof XmlEntityRef_1.default ||
            node instanceof XmlText_1.default))) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlText}.
 *
 * @param {XmlNode} prev The first specified node.
 * @param {XmlNode} next The second specified node.
 *
 * @returns {boolean} Whether or not the specified nodes are all of type
 *                    {@link XmlCharRef}, {@link XmlEntityRef}, or
 *                    {@link XmlText}.
 *
 * @private
 */
function onSameLine(prev, next) {
    return (prev instanceof XmlCharRef_1.default ||
        prev instanceof XmlEntityRef_1.default ||
        prev instanceof XmlText_1.default) &&
        (next instanceof XmlCharRef_1.default ||
            next instanceof XmlEntityRef_1.default ||
            next instanceof XmlText_1.default);
}
