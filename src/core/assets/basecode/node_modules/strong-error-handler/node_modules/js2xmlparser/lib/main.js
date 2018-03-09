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
var options_1 = require("./options");
var utils_1 = require("./utils");
var xmlcreate_1 = require("xmlcreate");
/**
 * Parses a string into XML.
 *
 * @param {string} str                            The string to parse into XML.
 * @param {XmlAttribute|XmlElement} parentElement The XML element or attribute
 *                                                that will contain the string.
 * @param {IOptions} options                      Options for parsing the
 *                                                string into XML.
 *
 * @private
 */
function parseString(str, parentElement, options) {
    var requiresCdata = function (s) {
        return (options.cdataInvalidChars && (s.indexOf("<") !== -1
            || s.indexOf("&") !== -1))
            || options.cdataKeys.indexOf(parentElement.name) !== -1
            || options.cdataKeys.indexOf("*") !== -1;
    };
    if (parentElement instanceof xmlcreate_1.XmlElement && requiresCdata(str)) {
        var cdataStrs = str.split("]]>");
        for (var i = 0; i < cdataStrs.length; i++) {
            if (requiresCdata(cdataStrs[i])) {
                parentElement.cdata(cdataStrs[i]);
            }
            else {
                parentElement.text(cdataStrs[i]);
            }
            if (i < cdataStrs.length - 1) {
                parentElement.text("]]>");
            }
        }
    }
    else {
        parentElement.text(str);
    }
}
/**
 * Parses an attribute into XML.
 *
 * @param {string} name              The name of the attribute.
 * @param {string} value             The value of the attribute.
 * @param {XmlElement} parentElement The XML element that will contain the
 *                                   string.
 * @param {IOptions} options         Options for parsing the attribute into XML.
 *
 * @private
 */
function parseAttribute(name, value, parentElement, options) {
    var attribute = parentElement.attribute(name, "");
    if (utils_1.isType(value, "String") || utils_1.isType(value, "Number")
        || utils_1.isType(value, "Boolean") || utils_1.isType(value, "Undefined")
        || utils_1.isType(value, "Null")) {
        parseString(utils_1.stringify(value), attribute, options);
    }
    else {
        throw new Error("attribute value for name '" + name + "' should be a"
            + " primitive (string, number, boolean, null, or"
            + " undefined)");
    }
}
/**
 * Parses an object or Map entry into XML.
 *
 * @param {string} key               The key associated with the object or Map
 *                                   entry.
 * @param {*} value                  The object or map entry.
 * @param {XmlElement} parentElement The XML element that will contain the
 *                                   object or map entry.
 * @param {IOptions} options         Options for parsing the object or map
 *                                   entry into XML.
 *
 * @private
 */
function parseObjectOrMapEntry(key, value, parentElement, options) {
    // Alias key
    if (key === options.aliasString) {
        if (!utils_1.isType(value, "String")) {
            throw new Error("aliasString value for " + value
                + " should be a string");
        }
        parentElement.name = value;
        return;
    }
    // Attributes key
    if (key.indexOf(options.attributeString) === 0) {
        if (utils_1.isType(value, "Object")) {
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var subkey = _a[_i];
                parseAttribute(subkey, value[subkey], parentElement, options);
            }
        }
        else {
            throw new Error("attributes object for " + key + " should be an"
                + " object");
        }
        return;
    }
    // Value key
    if (key.indexOf(options.valueString) === 0) {
        if (utils_1.isType(value, "String") || utils_1.isType(value, "Number")
            || utils_1.isType(value, "Boolean") || utils_1.isType(value, "Null")
            || utils_1.isType(value, "Undefined")) {
            parseValue(key, value, parentElement, options);
            return;
        }
        else {
            throw new Error("value " + value + " should be a primitive"
                + " (string, number, boolean, null, or undefined)");
        }
    }
    // Standard handling (create new element for entry)
    var element = parentElement;
    if (!utils_1.isType(value, "Array") && !utils_1.isType(value, "Set")) {
        element = parentElement.element(key);
    }
    parseValue(key, value, element, options);
}
/**
 * Parses an Object or Map into XML.
 *
 * @param {*} objectOrMap            The object or map to parse into XML.
 * @param {XmlElement} parentElement The XML element that will contain the
 *                                   object.
 * @param {IOptions} options         Options for parsing the object into XML.
 *
 * @private
 */
function parseObjectOrMap(objectOrMap, parentElement, options) {
    if (utils_1.isType(objectOrMap, "Map")) {
        objectOrMap.forEach(function (value, key) {
            parseObjectOrMapEntry(utils_1.stringify(key), value, parentElement, options);
        });
    }
    else {
        for (var _i = 0, _a = Object.keys(objectOrMap); _i < _a.length; _i++) {
            var key = _a[_i];
            parseObjectOrMapEntry(key, objectOrMap[key], parentElement, options);
        }
    }
}
/**
 * Parses an array or Set into XML.
 *
 * @param {string} key               The key associated with the array or set to
 *                                   parse into XML.
 * @param {*} arrayOrSet             The array or set to parse into XML.
 * @param {XmlElement} parentElement The XML element that will contain the
 *                                   function.
 * @param {IOptions} options         Options for parsing the array or set into
 *                                   XML.
 *
 * @private
 */
function parseArrayOrSet(key, arrayOrSet, parentElement, options) {
    var arrayNameFunc;
    if (options.wrapHandlers.hasOwnProperty("*")) {
        arrayNameFunc = options.wrapHandlers["*"];
    }
    if (options.wrapHandlers.hasOwnProperty(key)) {
        arrayNameFunc = options.wrapHandlers[key];
    }
    var arrayKey = key;
    var arrayElement = parentElement;
    if (!utils_1.isType(arrayNameFunc, "Undefined")) {
        var arrayNameFuncKey = arrayNameFunc(arrayKey, arrayOrSet);
        if (utils_1.isType(arrayNameFuncKey, "String")) {
            arrayKey = arrayNameFuncKey;
            arrayElement = parentElement.element(key);
        }
        else if (!utils_1.isType(arrayNameFuncKey, "Null")) {
            throw new Error("wrapHandlers function for " + arrayKey
                + " should return a string or null");
        }
    }
    arrayOrSet.forEach(function (item) {
        var element = arrayElement;
        if (!utils_1.isType(item, "Array") && !utils_1.isType(item, "Set")) {
            element = arrayElement.element(arrayKey);
        }
        parseValue(arrayKey, item, element, options);
    });
}
/**
 * Parses an arbitrary JavaScript value into XML.
 *
 * @param {string} key               The key associated with the value to parse
 *                                   into XML.
 * @param {*} value                  The value to parse into XML.
 * @param {XmlElement} parentElement The XML element that will contain the
 *                                   value.
 * @param {IOptions} options         Options for parsing the value into XML.
 *
 * @private
 */
function parseValue(key, value, parentElement, options) {
    // If a handler for a particular type is user-defined, use that handler
    // instead of the defaults
    var type = Object.prototype.toString.call(value);
    var handler;
    if (options.typeHandlers.hasOwnProperty("*")) {
        handler = options.typeHandlers["*"];
    }
    if (options.typeHandlers.hasOwnProperty(type)) {
        handler = options.typeHandlers[type];
    }
    if (!utils_1.isType(handler, "Undefined")) {
        value = handler(value);
    }
    if (utils_1.isType(value, "Object") || utils_1.isType(value, "Map")) {
        parseObjectOrMap(value, parentElement, options);
        return;
    }
    if (utils_1.isType(value, "Array") || utils_1.isType(value, "Set")) {
        parseArrayOrSet(key, value, parentElement, options);
        return;
    }
    parseString(utils_1.stringify(value), parentElement, options);
}
/**
 * Returns a XML document corresponding to the specified value.
 *
 * @param {string} root      The name of the root XML element. When the value is
 *                           converted to XML, it will be a child of this root
 *                           element.
 * @param {*} value          The value to convert to XML.
 * @param {IOptions} options Options for parsing the value into XML.
 *
 * @returns {XmlDocument} An XML document corresponding to the specified value.
 *
 * @private
 */
function parseToDocument(root, value, options) {
    var document = new xmlcreate_1.XmlDocument(root);
    if (options.declaration.include) {
        document.decl(options.declaration);
    }
    if (options.dtd.include) {
        document.dtd(options.dtd.name, options.dtd.sysId, options.dtd.pubId);
    }
    parseValue(root, value, document.root(), options);
    return document;
}
/**
 * Returns a XML string representation of the specified object.
 *
 * @param {string} root        The name of the root XML element. When the
 *                             object is converted to XML, it will be a
 *                             child of this root element.
 * @param {*} object           The object to convert to XML.
 * @param {IOptions} [options] Options for parsing the object and
 *                             formatting the resulting XML.
 *
 * @returns {string} An XML string representation of the specified object.
 */
function parse(root, object, options) {
    if (options === void 0) { options = {}; }
    options = options_1.validateOptions(options);
    var document = parseToDocument(root, object, options);
    return document.toString(options.format);
}
exports.parse = parse;
