import React from 'react';
import { logout } from "../../../store/auth/thunk/logout";
import { connect } from "react-redux";

const Logout = ({ toLogout }) => {
    toLogout()
    return (
        <div>...</div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout)
