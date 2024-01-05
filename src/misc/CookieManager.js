export function setCookie(key, value) {
    const date = new Date();
    date.setTime(date.getTime() + 43200000);
    document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for(let i=0; i < cookies.length; i++) {
        let _cookie = cookies[i];
        while (_cookie.charAt(0)===' ') {
            _cookie = _cookie.substring(1, _cookie.length);
        }
        if (_cookie.indexOf(name) === 0) {
            return _cookie.substring(name.length+1, _cookie.length)
        }
    }
    return null;
}
export function deleteCookie(key) {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    document.cookie = key + "=; expires=" + date.toUTCString() + "; path=/";
}