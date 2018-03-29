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
var utils_1 = require("../utils");
var validate_1 = require("../validate");
var XmlNode_1 = require("./XmlNode");
/**
 * Represents an XML element declaration in a document type definition.
 *
 * An XML element declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ELEMENT {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdElement nodes cannot have any children.
 */
var XmlDtdElement = (function (_super) {
    __extends(XmlDtdElement, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdElement} class.
     *
     * @param {string} text The text associated with the XML element
     *                      declaration.
     */
    function XmlDtdElement(text) {
        _super.call(this);
        this.text = text;
    }
    Object.defineProperty(XmlDtdElement.prototype, "text", {
        /**
         * Gets the text associated with the XML element declaration.
         *
         * @return {string} The text associated with the XML element declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML element declaration.
         *
         * @param {string} text The text associated with the XML element
         *                      declaration.
         */
        set: function (text) {
            if (!utils_1.isType(text, "String")) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("data should not contain characters" +
                    " not allowed in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     */
    XmlDtdElement.prototype.children = function () {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     */
    XmlDtdElement.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     */
    XmlDtdElement.prototype.removeChild = function (node) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     */
    XmlDtdElement.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlDtdElement.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!ELEMENT " + this.text + ">";
    };
    return XmlDtdElement;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlDtdElement;
