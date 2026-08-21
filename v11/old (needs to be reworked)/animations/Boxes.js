export function box(type, x, y, width, height) {
    return {
        type: type,
        offset: { x, y },
        width,
        height,
    };
}