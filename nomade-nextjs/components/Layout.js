import NavBar from "./NavBar";

// children - _app.js의 Component
export default function Layout({children}){
    return(
        <>
            <NavBar /> 
            <div>{children}</div>
        </>
    )
}