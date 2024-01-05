export const SERVER = window.location.hostname === "localhost" ? 'http://localhost:5000' : ""

export const header = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
}
