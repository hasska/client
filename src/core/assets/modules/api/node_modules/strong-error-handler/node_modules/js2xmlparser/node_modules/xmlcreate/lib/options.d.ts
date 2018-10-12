/**
 * Formatting options for the string representation of an {@link XmlNode} and
 * its children. This object is used by the `toString` method of
 * {@link XmlNode}.
 */
export interface IStringOptions {
    /**
     * Whether double quotes or single quotes should be used in XML attributes.
     * If left undefined, single quotes are used.
     */
    doubleQuotes?: boolean;
    /**
     * The indent string used for pretty-printing. If left undefined, the
     * default indent string is four spaces.
     */
    indent?: string;
    /**
     * The newline string used for pretty-printing. If left undefined, the
     * default newline string is "\n".
     */
    newline?: string;
    /**
     * Whether pretty-printing is enabled. If left undefined, pretty-printing
     * is enabled.
     */
    pretty?: boolean;
}
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
export declare function validateStringOptions(options: IStringOptions): IStringOptions;
/**
 * The options associated with the XML declaration. This object is used to
 * create a new {@link XmlDecl} object.
 */
export interface IDeclarationOptions {
    /**
     * The XML encoding to be included in the declaration. This value must be a
     * valid encoding. If left undefined, no encoding is included.
     */
    encoding?: string;
    /**
     * The XML standalone attribute to be included. This value must be "yes" or
     * "no". If left undefined, no standalone attribute is included.
     */
    standalone?: string;
    /**
     * The XML version to be included in the declaration. This value must be a
     * valid XML version number. If left undefined, the default version is
     * "1.0".
     */
    version?: string;
}
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
export declare function validateDeclarationOptions(options: IDeclarationOptions): IDeclarationOptions;
