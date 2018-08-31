let authObj = null;

export function authenticate(authData) {
    authObj = authData;
}
export function isAuthenticated() {
    return authObj && authObj.expired_at && + authObj.expired_at > Date.now()
}
export function getAuthData() {
    return { ...authObj };
}
export function getEmail() {
    const { email } = authObj || {};
    return email;
}
export function getCellphone() {
    const { cellphone } = authObj || {};
    return cellphone;
}
export function getToken() {
    const { token } = authObj || {};
    return token;
}
export function getAuthExpired() {
    const { expired_at } = authObj || {};
    return expired_at;
}
