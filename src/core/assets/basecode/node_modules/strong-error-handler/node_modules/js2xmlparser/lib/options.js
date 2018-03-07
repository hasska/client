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
var defaults = {
    aliasString: "=",
    attributeString: "@",
    cdataInvalidChars: false,
    cdataKeys: [],
    declaration: {
        include: true
    },
    dtd: {
        include: false
    },
    format: {},
    typeHandlers: {},
    valueString: "#",
    wrapHandlers: {}
};
Object.freeze(defaults);
/**
 * Validates the cdataKeys property of an options object.
 *
 * @param {string[]} cdataKeys The cdataKeys object.
 *
 * @returns {string[]} The updated cdataKeys object.
 *
 * @private
 */
function validateCdataKeys(cdataKeys) {
    for (var _i = 0, cdataKeys_1 = cdataKeys; _i < cdataKeys_1.length; _i++) {
        var key = cdataKeys_1[_i];
        if (!utils_1.isType(key, "String")) {
            throw new TypeError(key + " should be a string");
        }
    }
    return cdataKeys;
}
/**
 * Validates the declaration property of an options object.
 *
 * @param {IDeclarationOptions} declaration The declaration object.
 *
 * @returns {IDeclarationOptions} The updated declaration object.
 *
 * @private
 */
function validateDecl(declaration) {
    if (!utils_1.isType(declaration.include, "Boolean", "Undefined")) {
        throw new TypeError("declaration.include should be a string or" +
            " undefined");
    }
    if (!utils_1.isType(declaration.include, "Boolean")) {
        declaration.include = defaults.declaration.include;
    }
    return declaration;
}
/**
 * Validates the dtd property of an options object.
 *
 * @param {IDtdOptions} dtd The dtd object.
 *
 * @returns {IDtdOptions} The updated dtd object.
 *
 * @private
 */
function validateDtd(dtd) {
    if (!utils_1.isType(dtd.include, "Boolean", "Undefined")) {
        throw new TypeError("dtdOptions.include should be a string or" +
            " undefined");
    }
    if (!utils_1.isType(dtd.include, "Boolean")) {
        dtd.include = defaults.dtd.include;
    }
    return dtd;
}
/**
 * Validates the typeHandlers property of an options object.
 *
 * @param {ITypeHandlers} typeHandlers The typeHandlers object.
 *
 * @returns {ITypeHandlers} The updated typeHandlers object.
 *
 * @private
 */
function validateTypeHandlers(typeHandlers) {
    for (var key in typeHandlers) {
        if (typeHandlers.hasOwnProperty(key)) {
            if (!utils_1.isType(typeHandlers[key], "Function")) {
                throw new TypeError("options.typeHandlers['" + key + "']" +
                    " should be a Function");
            }
        }
    }
    return typeHandlers;
}
/**
 * Validates the wrapHandlers property of an options object.
 *
 * @param {IWrapHandlers} wrapHandlers The wrapHandlers object.
 *
 * @return {IWrapHandlers} The updated wrapHandlers object.
 *
 * @private
 */
function validateWrapHandlers(wrapHandlers) {
    for (var key in wrapHandlers) {
        if (wrapHandlers.hasOwnProperty(key)) {
            if (!utils_1.isType(wrapHandlers[key], "Function")) {
                throw new TypeError("options.wrapHandlers"
                    + "['" + key + "'] should be a Function");
            }
        }
    }
    return wrapHandlers;
}
/**
 * Validates an options object and replaces undefined values with their
 * appropriate defaults.
 *
 * @param {IOptions} options The options object to validate.
 *
 * @returns {IOptions} The updated options object.
 *
 * @private
 */
function validateOptions(options) {
    if (!utils_1.isType(options.aliasString, "String", "Undefined")) {
        throw new TypeError("options.aliasString should be a string or"
            + " undefined");
    }
    if (!utils_1.isType(options.aliasString, "String")) {
        options.aliasString = defaults.aliasString;
    }
    if (!utils_1.isType(options.attributeString, "String", "Undefined")) {
        throw new TypeError("options.attributeString should be a string or" +
            " undefined");
    }
    if (!utils_1.isType(options.attributeString, "String")) {
        options.attributeString = defaults.attributeString;
    }
    if (!utils_1.isType(options.cdataInvalidChars, "Boolean", "Undefined")) {
        throw new TypeError("options.cdataInvalidChars should be a boolean or"
            + " undefined");
    }
    if (!utils_1.isType(options.cdataInvalidChars, "Boolean")) {
        options.cdataInvalidChars = defaults.cdataInvalidChars;
    }
    if (!utils_1.isType(options.cdataKeys, "Array", "Undefined")) {
        throw new TypeError("options.cdataKeys should be an Array or" +
            " undefined");
    }
    if (!utils_1.isType(options.cdataKeys, "Array")) {
        options.cdataKeys = defaults.cdataKeys;
    }
    options.cdataKeys = validateCdataKeys(options.cdataKeys);
    if (!utils_1.isType(options.declaration, "Object", "Undefined")) {
        throw new TypeError("options.declaration should be an Object or"
            + " undefined");
    }
    if (!utils_1.isType(options.declaration, "Object")) {
        options.declaration = defaults.declaration;
    }
    options.declaration = validateDecl(options.declaration);
    if (!utils_1.isType(options.dtd, "Object", "Undefined")) {
        throw new TypeError("options.dtd should be an Object or undefined");
    }
    if (!utils_1.isType(options.dtd, "Object")) {
        options.dtd = defaults.dtd;
    }
    options.dtd = validateDtd(options.dtd);
    if (!utils_1.isType(options.format, "Object", "Undefined")) {
        throw new TypeError("options.format should be an Object or undefined");
    }
    if (!utils_1.isType(options.format, "Object")) {
        options.format = defaults.format;
    }
    if (!utils_1.isType(options.typeHandlers, "Object", "Undefined")) {
        throw new TypeError("options.typeHandlers should be an Object or" +
            " undefined");
    }
    if (!utils_1.isType(options.typeHandlers, "Object")) {
        options.typeHandlers = defaults.typeHandlers;
    }
    options.typeHandlers = validateTypeHandlers(options.typeHandlers);
    if (!utils_1.isType(options.valueString, "String", "Undefined")) {
        throw new TypeError("options.valueString should be a string or" +
            " undefined");
    }
    if (!utils_1.isType(options.valueString, "String")) {
        options.valueString = defaults.valueString;
    }
    if (!utils_1.isType(options.wrapHandlers, "Object", "Undefined")) {
        throw new TypeError("options.wrapHandlers should be an"
            + " Object or undefined");
    }
    if (!utils_1.isType(options.wrapHandlers, "Object")) {
        options.wrapHandlers = defaults.wrapHandlers;
    }
    options.wrapHandlers = validateWrapHandlers(options.wrapHandlers);
    return options;
}
exports.validateOptions = validateOptions;
