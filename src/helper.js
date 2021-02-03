export const isElementVisible = (ele) => {
    return ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length;
}

export const removeClass = (ele, className)=>{
    const list = ele.classList;
    list.remove(className);
}

export const addClass = (ele, className)=>{
    const list = ele.target.classList;
    ele.target.classList = [[...list, className].join(' ')];
}