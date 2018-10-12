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
/**
 * Converts a value into a string.
 *
 * @param {*} value The value to convert to a string.
 *
 * @returns {String} The string representation of the specified value.
 *
 * @private
 */
function stringify(value) {
    if (!isType(value, "Undefined") && !isType(value, "Null")) {
        if (!isType(value.toString, "Function")) {
            value = value.toString();
        }
    }
    return String(value);
}
exports.stringify = stringify;
