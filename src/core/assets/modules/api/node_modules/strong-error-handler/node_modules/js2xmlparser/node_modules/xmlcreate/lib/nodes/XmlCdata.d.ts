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
import { IStringOptions } from "../options";
import XmlNode from "./XmlNode";
/**
 * Represents an XML CDATA section.
 *
 * An XML CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 *
 * The `{data}` value is a property of this node.
 *
 * XmlCdata nodes cannot have any children.
 */
export default class XmlCdata extends XmlNode {
    private _data;
    /**
     * Initializes a new instance of the {@link XmlCdata} class.
     *
     * @param {string} data The character data of the CDATA section.
     */
    constructor(data: string);
    /**
     * Gets the character data of the CDATA section.
     *
     * @returns {string} The character data of the CDATA section.
     */
    /**
     * Sets the character data of the CDATA section.
     *
     * @param {string} data The character data of the CDATA section.
     */
    data: string;
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    children(): XmlNode[];
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    insertChild(node: XmlNode, index?: number): XmlNode;
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    removeChild(node: XmlNode): boolean;
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     */
    removeChildAtIndex(index: number): XmlNode;
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    toString(options?: IStringOptions): string;
}
