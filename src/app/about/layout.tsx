import React, {ReactNode} from "react"

const Layout = ({ children }: {children: ReactNode}) =>{
    return(
        <div>
            <h1>About Layout</h1>
            {children}
        </div>
    )   
}

export default Layout