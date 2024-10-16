function marking(text) {
    return text.replace(/([*_~#|=->])/g, '');
}
export default marking