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
var utils_1 = require("./utils");
/**
 * @private
 */
var stringOptionsDefaults = {
    doubleQuotes: false,
    indent: "    ",
    newline: "\n",
    pretty: true,
};
Object.freeze(stringOptionsDefaults);
/**
 * Validates a string options object and replaces undefined values with their
 * appropriate defaults.
 *
 * @param {IStringOptions} options The string options object to validate.
 *
 * @returns {IStringOptions} The updated string options object.
 *
 * @private
 */
function validateStringOptions(options) {
    if (!utils_1.isType(options.doubleQuotes, "Boolean", "Undefined")) {
        throw new TypeError("options.doubleQuotes should be a boolean or"
            + " undefined");
    }
    if (!utils_1.isType(options.doubleQuotes, "Boolean")) {
        options.doubleQuotes = stringOptionsDefaults.doubleQuotes;
    }
    if (!utils_1.isType(options.indent, "String", "Undefined")) {
        throw new TypeError("options.indent should be a string or undefined");
    }
    if (!utils_1.isType(options.indent, "String")) {
        options.indent = stringOptionsDefaults.indent;
    }
    if (!utils_1.isType(options.newline, "String", "Undefined")) {
        throw new TypeError("options.newline should be a string or undefined");
    }
    if (!utils_1.isType(options.newline, "String")) {
        options.newline = stringOptionsDefaults.newline;
    }
    if (!utils_1.isType(options.pretty, "Boolean", "Undefined")) {
        throw new TypeError("options.pretty should be a boolean or undefined");
    }
    if (!utils_1.isType(options.pretty, "Boolean")) {
        options.pretty = stringOptionsDefaults.pretty;
    }
    return options;
}
exports.validateStringOptions = validateStringOptions;
/**
 * @private
 */
var declarationOptionsDefaults = {
    encoding: undefined,
    standalone: undefined,
    version: "1.0",
};
Object.freeze(declarationOptionsDefaults);
/**
 * Validates an XML declaration options object and replaces undefined values
 * with their appropriate defaults.
 *
 * @param {IDeclarationOptions} options The XML declaration options object to
 *                                     validate.
 *
 * @returns {IDeclarationOptions} The updated XML declaration options object.
 *
 * @private
 */
function validateDeclarationOptions(options) {
    if (!utils_1.isType(options.encoding, "String", "Undefined")) {
        throw new TypeError("options.encoding should be a string or undefined");
    }
    if (!utils_1.isType(options.standalone, "String", "Undefined")) {
        throw new TypeError("options.standalone should be a string or" +
            " undefined");
    }
    if (!utils_1.isType(options.version, "String", "Undefined")) {
        throw new TypeError("options.version should be a string or undefined");
    }
    if (!utils_1.isType(options.version, "String")) {
        options.version = declarationOptionsDefaults.version;
    }
    return options;
}
exports.validateDeclarationOptions = validateDeclarationOptions;
