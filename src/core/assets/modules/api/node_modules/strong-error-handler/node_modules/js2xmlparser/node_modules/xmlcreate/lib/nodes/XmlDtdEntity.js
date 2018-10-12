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
 * Represents an XML entity declaration in a document type definition.
 *
 * An XML entity declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ENTITY {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdEntity nodes cannot have any children.
 */
var XmlDtdEntity = (function (_super) {
    __extends(XmlDtdEntity, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdEntity} class.
     *
     * @param {string} text The text associated with the XML entity
     *                      declaration.
     */
    function XmlDtdEntity(text) {
        _super.call(this);
        this.text = text;
    }
    Object.defineProperty(XmlDtdEntity.prototype, "text", {
        /**
         * Gets the text associated with the XML entity declaration.
         *
         * @return {string} The text associated with the XML entity declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML entity declaration.
         *
         * @param {string} text The text associated with the XML entity declaration.
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
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    XmlDtdEntity.prototype.children = function () {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    XmlDtdEntity.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    XmlDtdEntity.prototype.removeChild = function (node) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     */
    XmlDtdEntity.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlDtdEntity.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!ENTITY " + this.text + ">";
    };
    return XmlDtdEntity;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlDtdEntity;
