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


const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const [reservationToCancel, setReservationToCancel] = useState('')

  const { status, data } = useSession();

  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`);

    const json = await response.json();

    setReservations(json);
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
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">Minhas Viagens</h1>
      
      {reservations.length > 0 ? (
        <AlertDialog.Root>
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
            {reservations?.map((reservation) => (
              <UserReservationItem cancelReservation={handleClickCancelReservation} key={reservation.id} reservation={reservation} />
            ))}
          </div>

          <ModalCancelReservation reservationId={reservationToCancel}  fetchReservations={fetchReservations} />

        </AlertDialog.Root>
      ) : (
        <div className="flex flex-col lg:max-w-[500px]">
          <p className="mt-2 font-medium text-primaryDarker">Você ainda não tem nenhuma reserva! =(</p>

          <Link href="/">
            <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;