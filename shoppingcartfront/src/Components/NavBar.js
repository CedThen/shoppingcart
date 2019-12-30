import React from 'react'

const NavBar = ({isSignedIn, accountEmail, onRouteChange, onSignOut}) => {
    if(isSignedIn){
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f5 link dim black underline pa3 pointer">{accountEmail}</p>
                <p className="f5 link dim black underline pa3 pointer" 
                onClick={onSignOut}>Sign Out</p>
            </nav>
        )
    }
    else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f5 link dim black underline pa1 pointer"
                onClick={() => onRouteChange("signin")}>Sign In</p>
                <p className="f5 link dim black underline pa1 pointer"
                onClick={() => onRouteChange("register")}>Register</p>
            </nav>
        )
    }
}

export default NavBar;