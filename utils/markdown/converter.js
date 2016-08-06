'use strict';

module.exports = (markdown) => {
    return parseBlock(markdown);
}


/** Parsing a markdown
 */

function parseBlock(markdown) {
    let lines = markdown.split(/\n/);
    let result = [];
    for(let line of lines) {
        result.push(parseLine(line));
    }
    return result.join('');
}

/** Either a markdown line is a header line or a paragraph
 */

function parseLine(markdown) {
    if (markdown[0] === '#') {
        markdown = markdown.split(/^(#{1,7})/);
        markdown.shift(); // first item is empty
        var size = markdown.shift().length; // number of #s
        var raw = markdown.shift().trim(); // content of the header
        return new Header(size, raw);
    } else {
        return new Paragraph(markdown);
    }
}

/** Find formatting information in markdown text
 */

function parseContent(markdown) {
    //let tags = markdown.split(\[\(*\)\|\(_\)\|\(**\)\);
    return markdown;
}

/* Markdown to DOMs
 */

class Dom {
    constructor(tag, params, contents) {
        this.tag = tag; // string
        this.params = params; // key value pairs
        this.contents = contents; // contents
    }

    toHtml() {
        // opening tag
        let result = `<${this.tag}`;
        if (this.params) {
            for(let key in params) {
                let val = params[key];
                result += ` ${key}=${val}`;
            }
        }
        result += '>';

        // content
        if(this.contents) {
            for(let dom of this.contents) {
                if (typeof dom === 'string') {
                    result += dom;
                } else if (typeof dom === 'object') {
                    result += dom.toHtml();
                }
            }
        }

        // closing tag
        result += `</${this.tag}>`;
        return result;
    }
}

class Paragraph extends Dom {
    constructor(raw) {
        //console.log(`Paragraph ${raw}`);
        let contents = parseContent(raw);
        super('p', null, contents);
    }

    toString() {
        return super.toHtml();
    }
}

class Header extends Dom {
    constructor(size, raw) {
        //console.log(`Header ${size} ${raw}`);
        if (size > 7) {
            throw new Error(`illegal header h${n}`);
        }

        let contents = parseContent(raw);
        super(`h${size}`, null, contents);
    }

    toString() {
        return super.toHtml();
    }
}
