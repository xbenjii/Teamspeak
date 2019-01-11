export function escape(string: string): string {
    return string
        .replace(/[\\\/\n\r\t\v\f]/g, '\\$&')
        .replace(/\|/g, '\\p')
        .replace(/ /g, '\\s');
}

export function unescape(string: string): string {
    return string.replace(/\\s/g, ' ')
        .replace(/\\p/, '|')
        .replace(/[\\]/g, '$&');
}