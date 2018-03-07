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
var utils_1 = require("../utils");
var validate_1 = require("../validate");
var XmlNode_1 = require("./XmlNode");
/**
 * Represents text in an XML document.
 *
 * This text may only consist of character data, not markup. Restricted
 * characters, such as the ampersand (`&`) and the opening angle bracket (`<`)
 * are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlText nodes cannot have any children.
 */
var XmlText = (function (_super) {
    __extends(XmlText, _super);
    /**
     * Initializes a new instance of the {@link XmlText} class.
     *
     * @param {string} text Arbitrary character data.
     */
    function XmlText(text) {
        _super.call(this);
        this.text = text;
    }
    Object.defineProperty(XmlText.prototype, "text", {
        /**
         * Gets the text associated with this node.
         *
         * @returns {string} The text associated with this node.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with this node.
         *
         * @param {string} text Arbitrary character data.
         */
        set: function (text) {
            if (!utils_1.isType(text, "String")) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("text should not contain characters not allowed" +
                    " in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    XmlText.prototype.children = function () {
        throw new Error("XmlText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    XmlText.prototype.insertChild = function (node, index) {
        throw new Error("XmlText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    XmlText.prototype.removeChild = function (node) {
        throw new Error("XmlText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    XmlText.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlText nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlText.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var str = this.text;
        str = escape_1.escapeAmpersands(str);
        str = escape_1.escapeLeftAngleBrackets(str);
        return str;
    };
    return XmlText;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlText;
