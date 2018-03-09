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
/**
 * Retrieve the Unicode code point at the specified index in the specified
 * string.
 *
 * @param {string} str The string from which to retrieve the Unicode code
 *                     point.
 * @param {number} index The specified index.
 *
 * @returns {number} The Unicode code point at the specified position.
 *
 * @private
 */
function getCodePoint(str, index) {
    var size = str.length;
    if (index < 0 || index >= size) {
        return undefined;
    }
    var first = str.charCodeAt(index);
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
        var second = str.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
exports.getCodePoint = getCodePoint;
/**
 * Determines whether a number is an integer.
 *
 * @param {number} value The number to check.
 *
 * @returns {boolean} Whether or not the number is an integer.
 *
 * @private
 */
function isInteger(value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
}
exports.isInteger = isInteger;
/**
 * Returns true if the specified value are of any of the specified types, as
 * determined by the Object.prototype.toString.call function.
 *
 * @param {*} val The specified value.
 * @param {...string[]} types The specified types.
 *
 * @returns {boolean} Whether or not the specified value are of any of the
 *                    specified types.
 *
 * @private
 */
function isType(val) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
        var type = types_1[_a];
        if (Object.prototype.toString.call(val) === "[object " + type + "]") {
            return true;
        }
    }
    return false;
}
exports.isType = isType;
