import get from "lodash/get";

const catchError = async (_, action) => {
    switch (get(action, "payload.response.status")) {
        case 401: localStorage.setItem("401", true); global.location.href = "/logout"; break;
        default: break;
    }
    return {}
}

export default catchError
