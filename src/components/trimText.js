function TrimText(text) {

    if(text.split(" ").length > 6) return text.split(" ").slice(0, 6).join(' ') + '...'
    return text


}

export default TrimText;
