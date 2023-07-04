

import { prisma } from "@/lib/prisma"

const getTrips = async () => {
    const trips = await prisma.trip.findMany({})

    return trips
}

const Trips = async () =>{
    // const data = await getTrips()

    // console.log( { data } )
    return(
        <div>Trips</div>
    )
}

export default Trips