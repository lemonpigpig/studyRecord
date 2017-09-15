const Utils = {
    range: end => [...Array(end).keys()],
    getTotalSpan: r => r.columns.reduce((sum, c) => sum + c.span, 0),
    showEmptyColText: (editing, i) => {
        if (editing) {
            return i + 1;
        }
        return i === 0 ? '+' : '';
    },
    getNextId: grid => Math.max(...grid.reduce((arr, row) => [
        ...arr,
        row.columns.length > 0
            ? Math.max(...row.columns.map(col => col.id)) + 1
            : 0
    ], [1])),
    findColumnById: (grid, id) => grid.reduce((c, r) => (
        r.columns.find(col => col.id === id) || c
    ), null),
    matches: (el, selector) => (
        el.matches
        || el.matchesSelector
        || el.msMatchesSelector
        || el.mozMatchesSelector
        || el.webkitMatchesSelector
        || el.oMatchesSelector
    ).call(el, selector),
    getParent: (el, selector) => (
        Utils.matches(el.parentNode, selector)
            ? el.parentNode
            : Utils.getParent(el.parentNode, selector)
    )
};

export default Utils;
