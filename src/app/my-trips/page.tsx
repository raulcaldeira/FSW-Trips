"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import ModalCancelReservation from "./components/ModalCancelReservation";

import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn } from '@/animation/variants'

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const [reservationToCancel, setReservationToCancel] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`);

    const json = await response.json();

    setReservations(json);
    setIsLoading(false)
  };

  const handleClickCancelReservation = (id: string) =>{
    setReservationToCancel(id)
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5 lg:pb-10">
      <motion.h1 
        className="font-semibold text-primaryDarker text-xl lg:mb-5" 
        variants={fadeIn('up',0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        Minhas Viagens
      </motion.h1>
      
      {isLoading && (
        <div className="flex h-[500px] w-[380px] animate-pulse rounded-2xl bg-gray-200 px-5"></div>
      )}

      {reservations.length > 0 ? (
        <AlertDialog.Root>
          <motion.div 
            className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14"
            variants={fadeIn('up',0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {reservations?.map((reservation) => (
              <UserReservationItem cancelReservation={handleClickCancelReservation} key={reservation.id} reservation={reservation} />
            ))}
          </motion.div>
          
          <AnimatePresence>
            <ModalCancelReservation reservationId={reservationToCancel}  fetchReservations={fetchReservations} />
          </AnimatePresence>

        </AlertDialog.Root>
      ) : (
        !isLoading &&(
          <motion.div 
            className="flex flex-col lg:max-w-[500px]"
            variants={fadeIn('up',0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <p className="mt-2 font-medium text-primaryDarker">Você ainda não tem nenhuma reserva! =(</p>

            <Link href="/">
              <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
            </Link>
          </motion.div>
        )
      )}
    </div>
  );
};

export default MyTrips;