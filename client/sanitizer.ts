/**
 * Sanitize user content before printing to the screen.
 *
 * At the moment, this just strips out `<` and `>` when they look like
 * HTML tags.
 */
export function sanitize(text: string): string {
    const pattern = /<(\/?[-_\sa-zA-Z0-9]*?)>/g;
    return text.replace(pattern, " $1 ");
}
