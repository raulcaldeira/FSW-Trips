
import Button from '@/components/Button';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { toast } from "react-toastify";

interface ModalCancelReservationProps {
    reservationId: string
    fetchReservations: () => void
}

const ModalCancelReservation = ({ reservationId, fetchReservations }: ModalCancelReservationProps) => {


    const handleDeleteClick = async () => {
        const response = await fetch(`/api/trips/reservation/${reservationId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            return toast.error("Ocorreu um erro ao cancelar a reserva!");
        }

        toast.success("Reserva cancelada com sucesso!", { position: "bottom-center" });

        fetchReservations()
    }

    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackOverlay data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50">
                    <AlertDialog.Title className='m-0 text-[17px] font-medium'> Tem certeza que deseja excluir a viagem? </AlertDialog.Title>
                    <AlertDialog.Description className='text-gray-500 mt-4 mb-5 text-[15px] leading-normal'>
                        Isso disponibilizará a sua data para uma nova reserva.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <Button variant='neutral' >
                                Voltar
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <Button variant='dangerFilled' onClick={handleDeleteClick}>
                                Sim, cancele a reserva
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
        </AlertDialog.Portal>
    )
}

export default ModalCancelReservation;
