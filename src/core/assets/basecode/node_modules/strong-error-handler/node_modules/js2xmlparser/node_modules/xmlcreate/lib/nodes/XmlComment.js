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
 * Represents an XML comment.
 *
 * An XML character reference is structured as follows, where `{content}` is
 * the text of the comment.
 *
 * ```xml
 * <!--{content}-->
 * ```
 *
 * The `{content}` value is a property of this node.
 *
 * XmlComment nodes cannot have any children.
 */
var XmlComment = (function (_super) {
    __extends(XmlComment, _super);
    /**
     * Initializes a new instance of the {@link XmlComment} class.
     *
     * @param {string} content The content of the comment.
     */
    function XmlComment(content) {
        _super.call(this);
        this.content = content;
    }
    Object.defineProperty(XmlComment.prototype, "content", {
        /**
         * Gets the content of the comment.
         *
         * @returns {string} The content of the comment.
         */
        get: function () {
            return this._content;
        },
        /**
         * Sets the content of the comment.
         *
         * @param {string} content The content of the comment.
         */
        set: function (content) {
            if (!utils_1.isType(content, "String")) {
                throw new TypeError("content should be a string");
            }
            else if (!validate_1.validateChar(content)) {
                throw new Error("content should not contain characters" +
                    " not allowed in XML");
            }
            else if (!/^([^-]|-[^-])*$/.test(content)) {
                throw new Error("content should not contain the string '--' or" +
                    " end with '-'");
            }
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    XmlComment.prototype.children = function () {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    XmlComment.prototype.insertChild = function (node, index) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    XmlComment.prototype.removeChild = function (node) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     */
    XmlComment.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlComment.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!--" + this.content + "-->";
    };
    return XmlComment;
}(XmlNode_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XmlComment;
