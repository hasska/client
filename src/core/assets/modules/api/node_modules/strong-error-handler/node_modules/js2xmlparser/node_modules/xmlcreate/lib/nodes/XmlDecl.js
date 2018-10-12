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
var XmlNode_1 = require("./XmlNode");
/**
 * Represents an XML declaration.
 *
 * An XML declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 *
 * The `{version}`, `{encoding}`, and `{standalone}` values are properties of
 * this node.
 *
 * XmlDecl nodes cannot have any children.
 */
var XmlDecl = (function (_super) {
    __extends(XmlDecl, _super);
    /**
     * Initializes a new instance of the {@link XmlDecl} class.
     *
     * @param {IDeclarationOptions} [options] The options associated with the
     *     XML declaration.
     */
    function XmlDecl(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        options_1.validateDeclarationOptions(options);
        this.encoding = options.encoding;
        this.standalone = options.standalone;
        this.version = options.version;
    }
    Object.defineProperty(XmlDecl.prototype, "encoding", {
        /**
         * Gets the XML encoding to be included in the declaration.
         *
         * @returns {string} The XML encoding to be included in the declaration.
         *                   This value may be undefined.
         */
        get: function () {
            return this._encoding;
        },
        /**
         * Sets the XML encoding to be included in the declaration.
         *
         * @param encoding {string} The XML encoding to be included in the
         *                          declaration. This value must be a valid
         *                          encoding. If left undefined, no encoding is
         *                          included.
         */
        set: function (encoding) {
            if (utils_1.isType(encoding, "String")) {
                if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(encoding)) {
                    throw new Error("encoding should be a valid XML encoding");
                }
            }
            else if (!utils_1.isType(encoding, "Undefined")) {
                throw new TypeError("name should be a string or undefined");
            }
            this._encoding = encoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "standalone", {
        /**
         * Gets the XML standalone attribute to be included in the declaration.
         *
         * @returns {string} The XML standalone attribute to be included in the
         *                   declaration. This value may be undefined.
         */
        get: function () {
            return this._standalone;
        },
        /**
         * Sets the XML standalone attribute to be included in the declaration.
         *
         * @param {string} standalone The XML standalone attribute to be included.
         *                            This value must be "yes" or "no". If left
         *                            undefined, no standalone attribute is
         *                            included.
         */
        set: function (standalone) {
            if (utils_1.isType(standalone, "String")) {
                if (!/^(yes|no)$/.test(standalone)) {
                    throw new Error("standalone should be either the string" +
                        " 'yes' or the string 'no'");
                }
            }
            else if (!utils_1.isType(standalone, "Undefined")) {
                throw new TypeError("standalone should be a string or undefined");
            }
            this._standalone = standalone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "version", {
        /**
         * Gets the XML version to be included in the declaration.
         *
         * @returns {string} The XML version to tbe included in the declaration.
         */
        get: function () {
            return this._version;
        },
        /**
         * Sets the XML version to be included in the declaration.
         *
         * @param {string} version The XML version to be included in the
         *                         declaration. This value must be a valid XML
         *                         version number. If left undefined, the default
         *                         version is "1.0".
         */
        set: function (version) {
            if (!utils_1.isType(version, "String")) {
                throw new TypeError("version should be a string");
            }
            else if (!/^1\.[0-9]+$/.test(version)) {
                throw new Error("version should be a valid XML version");
            }
            this._version = version;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    XmlDecl.prototype.children = function () {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    XmlDecl.prototype.insertChild = function (node, index) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    XmlDecl.prototype.removeChild = function (node) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     */
    XmlDecl.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlDecl.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        options_1.validateStringOptions(options);
        var quote = options.doubleQuotes ? '"' : "'";
        var str = "<?xml version=" + quote + this.version + quote;
        if (utils_1.isType(this.encoding, "String")) {
            str += " encoding=" + quote + this.encoding + quote;
        }
        if (utils_1.isType(this.standalone, "String")) {
            str += " standalone=" + quote + this.standalone + quote;
        }
        str += "?>";
        return str;
    };
    return XmlDecl;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlDecl;
