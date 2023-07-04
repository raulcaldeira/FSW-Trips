import React from "react"
import Trips from "./components/Trips"

export const metadata = {
    title: "About",
}

const Page = () => {
    return(
        <>
            <div> About </div>
            <Trips />
        </>
    )
}

export default Page