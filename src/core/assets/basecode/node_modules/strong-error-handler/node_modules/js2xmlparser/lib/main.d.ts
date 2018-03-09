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
import { IOptions } from "./options";
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
export declare function parse(root: string, object: any, options?: IOptions): string;
