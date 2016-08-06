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
        // TODO handle empty lines
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
    if (typeof markdown === 'string') {
        markdown = Array.from(tokenizeMarkdownLine(markdown));
    }
    let doms = [];
    
    function isStyleElement(elem) {
        return (elem === '*' || elem === '**' || elem === '_'); 
    }

    function addDom(type, content) {
        if(!type) { // text
            doms = doms.concat(content);
        } else if (type === '*' || type === '_') { // italics
            doms.push( new Italics(content) );
        } else if (type === '**') { // bold
            doms.push( new Bold(content) );
        }
    }

    let seperator = null;
    let content = [];

    for(let elem of markdown) {
        if(!isStyleElement(elem) || (seperator != null && seperator != elem)) { // if its text or a nested seperator
            content.push(elem);
        } else { // at closing or starting of a style element
            if (content.length > 0) {
                addDom(seperator, content)
                content = []; // reset
            }
            seperator = (!seperator) ? (elem) : null; // starting of a sepertor or ending
        }
    };

    if (content.length > 0) {
        addDom(null, content)
    }

    return doms;
}

const MARKDOWN_ESCAPE = /(\\[*\|_])/;
const MARKDOWN_LINK = /(\[[^\]]+\]\([^\)]+\))/;
const MARKDOWN_BOLD = /(\*\*)/;
const MARKDOWN_ITALICS = /([\_\|\*])/;

function* tokenizeMarkdownLine(markdown) {
    yield* tokenizeEscape(markdown);
}

function* tokenizeEscape(markdown) {
    let tokens = markdown.split(MARKDOWN_ESCAPE).filter(item => item != '');
    for(let item of tokens) {
        if(item.match(MARKDOWN_ESCAPE)) {
            yield new Escape(item);
        } else {
            yield* tokenizeLinks(item);
        }
    }
}

function* tokenizeLinks(markdown) {
    // first get all the links
    let tokens = markdown.split(MARKDOWN_LINK).filter(item => item != '');
    for(let item of tokens) {
        if(item.match(MARKDOWN_LINK)) {
            yield new Link(item);
        } else {
            yield* tokenizeBolds(item);
        }
    }
}

function* tokenizeBolds(markdown) {
    // split all bolds
    let tokens = markdown.split(MARKDOWN_BOLD).filter(item => item != '');
    for(let item of tokens) {
        if(item.match(MARKDOWN_BOLD)) {
            yield item;
        } else {
            yield* tokenizeItalics(item);
        }
    }
}

function* tokenizeItalics(markdown) {
    // split all italics 
    let tokens = markdown.split(MARKDOWN_ITALICS).filter(item => item != '');
    for(let item of tokens) {
        yield item;
    }
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
                    result += dom.toString();
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

class Italics extends Dom {
    constructor(raw) {
        let contents = parseContent(raw);
        super('i', null, contents);
    }

    toString() {
        return super.toHtml();
    }
}

class Bold extends Dom {
    constructor(raw) {
        let contents = parseContent(raw);
        super('b', null, contents);
    }

    toString() {
        return super.toHtml();
    }
}

class Link extends Dom {
    constructor(raw) {
        let [rawTitle, link] = raw.slice(1,-1).split(  /\]\(/ );
        let title = parseContent(rawTitle);
        super('a', { href: link }, title);
    }

    toString() {
        return super.toHtml();
    }
}

class Escape {
    constructor(raw) {
        this.escape = raw[1];
    }

    toString() {
        return this.escape;
    }
}
