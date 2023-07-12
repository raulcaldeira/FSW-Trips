'use client'

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";




const MyTrips = () => {

    const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{include: {trip: true}}>[]>([])

    const { status, data } = useSession()

    const router = useRouter()

    useEffect(()=>{
        if(status == "unauthenticated" || !data?.user){
           return router.push('/')
        }

        const fetchReservations = async () => {
            const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`)
            const json = await response.json();

            setReservations(json)

            console.log(json)
        }

        fetchReservations()

    }, [status])

    console.log(reservations)

    return(
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-primaryDarker text-xl">
                Minhas viagens
            </h1>
            {reservations?.map(reservation => <UserReservationItem key={reservation.id} reservation={reservation} />)}
        </div>
    )
}

export default MyTrips;