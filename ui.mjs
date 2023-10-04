// import { src } from "./data.mjs"

export function highlightLink(color) {
    if(color === 'red' || color === 'green') {
        return `0 0 4px 1px ${color}`;
    }
}

//window.location.href === active.links? then load user as active?