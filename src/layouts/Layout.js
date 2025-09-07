
import Navigation from "./Navigation";

function Layout(props)
{
    return <>
        <Navigation/>
        <div>{props.children}</div>
        
    </>
}

export default Layout; 