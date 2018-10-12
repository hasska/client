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
 * Represents an XML processing instruction.
 *
 * An XML processing instruction is structured as follows, where `{target}`
 * and `{content}` are the target and content of the processing instruction
 * respectively.
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 *
 * The `{target}` and `{content}` values are properties of this node.
 *
 * XmlProcInst nodes cannot have any children.
 */
var XmlProcInst = (function (_super) {
    __extends(XmlProcInst, _super);
    /**
     * Initializes a new instance of the {@link XmlProcInst} class.
     *
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     */
    function XmlProcInst(target, content) {
        _super.call(this);
        this.target = target;
        this.content = content;
    }
    Object.defineProperty(XmlProcInst.prototype, "target", {
        /**
         * Gets the target of the processing instruction.
         *
         * @returns {string} The target of the processing instruction.
         */
        get: function () {
            return this._target;
        },
        /**
         * Sets the target of the processing instruction.
         *
         * @param {string} target The target of the processing instruction.
         */
        set: function (target) {
            if (!utils_1.isType(target, "String")) {
                throw new TypeError("target should be a string");
            }
            else if (!validate_1.validateChar(target)) {
                throw new Error("target should not contain characters" +
                    " not allowed in XML");
            }
            else if (target === "xml") {
                throw new Error("target should not be the string 'xml'");
            }
            this._target = target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlProcInst.prototype, "content", {
        /**
         * Gets the data of the processing instruction.
         *
         * @returns {string} The data of the processing instruction. This value
         *                   may be undefined.
         */
        get: function () {
            return this._content;
        },
        /**
         * Sets the data of the processing instruction.
         *
         * @param {string} content The data of the processing instruction. This
         *                         value may be undefined.
         */
        set: function (content) {
            if (!utils_1.isType(content, "String", "Undefined")) {
                throw new TypeError("data should be a string or undefined");
            }
            if (utils_1.isType(content, "String")) {
                if (!validate_1.validateChar(content)) {
                    throw new Error("data should not contain characters" +
                        " not allowed in XML");
                }
                else if (/\?>/.test(content)) {
                    throw new Error("data should not contain the string '?>'");
                }
            }
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    XmlProcInst.prototype.children = function () {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    XmlProcInst.prototype.insertChild = function (node, index) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    XmlProcInst.prototype.removeChild = function (node) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     */
    XmlProcInst.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlProcInst.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        if (this.content === undefined) {
            return "<?" + this.target + "?>";
        }
        else {
            return "<?" + this.target + " " + this.content + "?>";
        }
    };
    return XmlProcInst;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlProcInst;
