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
import XmlAttribute from "./XmlAttribute";
import XmlCdata from "./XmlCdata";
import XmlCharRef from "./XmlCharRef";
import XmlComment from "./XmlComment";
import XmlEntityRef from "./XmlEntityRef";
import XmlNode from "./XmlNode";
import XmlProcInst from "./XmlProcInst";
import XmlText from "./XmlText";
/**
 * Represents an XML element.
 *
 * A sample XML element is structured as follows, where `{name}` is the name
 * of the element:
 *
 * ```xml
 * <{name} attname="attvalue">
 *     <subelem/>
 *     <?pitarget picontent?>
 *     text
 * </{name}></pre>
 * ```
 *
 * The `{name}` value is a property of the node, while the attributes and
 * children of the element (such as other elements, processing instructions,
 * and text) are children of this node.
 *
 * XmlElement nodes can have an unlimited number of {@link XmlAttribute},
 * {@link XmlCdata}, {@link XmlCharRef}, {@link XmlComment},
 * {@link XmlElement}, {@link XmlEntityRef}, {@link XmlProcInst}, or
 * {@link XmlText} nodes as children.
 */
export default class XmlElement extends XmlNode {
    private _name;
    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param {string} name The name of the element.
     */
    constructor(name: string);
    /**
     * Gets the name of the element.
     *
     * @returns {string} The name of the element.
     */
    /**
     * Sets the name of the element.
     *
     * @param {string} name The name of the element.
     */
    name: string;
    /**
     * Inserts an new attribute at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} name
     *        The name of the attribute.
     * @param {string|XmlNode|Array.<string|XmlNode>} value
     *        The value of the attribute. Strings are converted to XmlText
     *        nodes.
     * @param {number} [index]
     *        The index at which the node should be inserted. If no index is
     *        specified, the node is inserted at the end of this node's
     *        children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    attribute(name: string, value: string | XmlNode | (string | XmlNode)[], index?: number): XmlAttribute;
    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns {XmlAttribute[]} An array containing all of the children of
     *                           this node that are instances of
     *                           {@link XmlAttribute}.
     */
    attributes(): XmlAttribute[];
    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the CDATA section.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCdata} The newly created CDATA section.
     */
    cdata(content: string, index?: number): XmlCdata;
    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} char    The character to represent using the reference.
     * @param {boolean} [hex]  Whether to use the hexadecimal or decimal
     *                         representation for the reference. If left
     *                         undefined, decimal is the default.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlCharRef} The newly created character reference.
     */
    charRef(char: string, hex?: boolean, index?: number): XmlCharRef;
    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} content The data of the comment.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlComment} The newly created comment.
     */
    comment(content: string, index?: number): XmlComment;
    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} name    The name of the element.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlElement} The newly created element.
     */
    element(name: string, index?: number): XmlElement;
    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param {string} entity  The entity to be referenced.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlEntityRef} The newly created entity reference.
     */
    entityRef(entity: string, index?: number): XmlEntityRef;
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlAttribute}, {@link XmlCdata},
     * {@link XmlCharRef}, {@link XmlComment}, {@link XmlElement},
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlText} nodes can
     * be inserted; otherwise, an exception will be thrown.
     *
     * @param {XmlNode} node   The node to insert.
     * @param {number} [index] The index at which to insert the node. Nodes at
     *                         or after the index are shifted to the right. If
     *                         no index is specified, the node is inserted at
     *                         the end.
     *
     * @returns {XmlNode} The node inserted into this node's children, or
     *                    undefined if no node was inserted.
     */
    insertChild(node: XmlNode, index?: number): XmlNode;
    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param {string} target    The target of the processing instruction.
     * @param {string} [content] The data of the processing instruction, or
     *                           undefined if there is no target.
     * @param {number} [index]   The index at which the node should be inserted.
     *                           If no index is specified, the node is inserted
     *                           at the end of this node's children.
     *
     * @returns {XmlProcInst} The newly created processing instruction.
     */
    procInst(target: string, content?: string, index?: number): XmlProcInst;
    /**
     * Inserts some new text at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param {string} text    Arbitrary character data.
     * @param {number} [index] The index at which the node should be inserted.
     *                         If no index is specified, the node is inserted
     *                         at the end of this node's children.
     *
     * @returns {XmlText} The newly created text node.
     */
    text(text: string, index?: number): XmlText;
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
