import React from "react"

function Footer(props){
    return (
        <footer className="footer">
            <h3>{props.title}</h3>
            <nav>
                <ul>
                    <li onClick={props.home}>Home</li>
                    <li onClick={props.about}>About</li>
                </ul>
            </nav>            
        </footer>
    )
}

export default Footer