import { IStringOptions } from "../options";
import XmlNode from "./XmlNode";
/**
 * Represents text in an XML document.
 *
 * This text may only consist of character data, not markup. Restricted
 * characters, such as the ampersand (`&`) and the opening angle bracket (`<`)
 * are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlText nodes cannot have any children.
 */
export default class XmlText extends XmlNode {
    private _text;
    /**
     * Initializes a new instance of the {@link XmlText} class.
     *
     * @param {string} text Arbitrary character data.
     */
    constructor(text: string);
    /**
     * Gets the text associated with this node.
     *
     * @returns {string} The text associated with this node.
     */
    /**
     * Sets the text associated with this node.
     *
     * @param {string} text Arbitrary character data.
     */
    text: string;
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    children(): XmlNode[];
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    insertChild(node: XmlNode, index?: number): XmlNode;
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
     * children.
     */
    removeChild(node: XmlNode): boolean;
    /**
     * Throws an exception since {@link XmlText} nodes cannot have any
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
