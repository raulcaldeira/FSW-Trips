'use client'

import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

import { motion } from 'framer-motion'
import { useRouter } from "next/router";

interface TripitemProps {
    trip: Trip
}

const TripItem = ({trip}: TripitemProps) => {

    return(
        <Link  className="h-full w-full md:max-w-[400px]" href={`/trips/${trip.id}`}>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-[10px]"
            >

                <Image 
                    className="h-full w-full rounded-2xl object-cover md:h-[280px] 2xl:h-[390px] "
                    src={trip.coverImage}
                    alt=""
                    width={1470}
                    height={980}
                />

                <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium text-primaryDarker">
                        {trip.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <ReactCountryFlag countryCode={trip.countryCode} svg />
                        <p className="text-xs font-normal text-grayPrimary">
                        {trip.location}
                        </p>
                    </div>
                    <p className="flex items-center gap-1 text-xs font-normal text-grayPrimary">
                        <span className="text-lg font-semibold text-primary">
                        R$
                        {trip.pricePerDay.toString()}
                        </span>
                        <span>por noite</span>
                    </p>
                </div>
            </motion.div>
        </Link>
    )
};

export default TripItem;