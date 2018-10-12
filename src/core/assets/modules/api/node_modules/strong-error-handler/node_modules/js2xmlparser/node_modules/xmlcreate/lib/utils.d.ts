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
export declare function getCodePoint(str: string, index: number): number;
/**
 * Determines whether a number is an integer.
 *
 * @param {number} value The number to check.
 *
 * @returns {boolean} Whether or not the number is an integer.
 *
 * @private
 */
export declare function isInteger(value: number): boolean;
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
export declare function isType(val: any, ...types: string[]): boolean;
