import React, {useEffect, useState} from "react";
import axios from "axios";
import ChargesTable from './ChargesTable';
import {FaChevronDown, FaChevronRight} from 'react-icons/fa';
import {Reservation} from "../models/reservation.model.ts";

const ReservationsTable = () => {
    const [isOpen, setIsOpen] = useState<string|null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios("/api/reservationsWithCharges");
            setReservations(data);
        };
        fetchData();
    }, []);

    const handleToggle = (reservationUUID: string) => {
        setIsOpen(prevUUID => prevUUID === reservationUUID ? null : reservationUUID);
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Reservation UUID</th>
                <th>Number of Active Purchases</th>
                <th>Sum of Active Charges</th>
            </tr>
            </thead>
            <tbody>
            {reservations.map(reservation => (
                <>
                    <tr onClick={() => handleToggle(reservation.reservation_uuid)}>
                        <td>
                            {isOpen === reservation.reservation_uuid ? <FaChevronDown /> : <FaChevronRight />}
                            {reservation.reservation_uuid}
                        </td>
                        <td>{reservation.activePurchases}</td>
                        <td>{reservation.sumOfActiveCharges}</td>
                    </tr>
                    {isOpen === reservation.reservation_uuid && (
                        <tr>
                            <td colSpan={3}>
                                <ChargesTable reservationUUID={reservation.reservation_uuid} />
                            </td>
                        </tr>
                    )}
                </>
            ))}
            </tbody>
        </table>
    );
};

export default ReservationsTable;
