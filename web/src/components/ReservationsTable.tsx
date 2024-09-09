import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductChargesTable from './ProductChargesTable.tsx';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Reservation } from "../models/reservation.model.ts";

const ReservationsTable = () => {
    const [isOpen, setIsOpen] = useState<string | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(50);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios("/api/reservationsWithCharges");
            setReservations(data);
            setFilteredReservations(data);
        };

        fetchData();
    }, []);

    const handleToggle = (reservationUUID: string) => {
        setIsOpen((prevUUID) => (prevUUID === reservationUUID ? null : reservationUUID));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
        const newFiltered = event.target.value
            ? reservations.filter((r) =>
                r.reservation_uuid.includes(event.target.value)
            )
            : reservations;
        setFilteredReservations(newFiltered);
    };

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = filteredReservations.slice(
        indexOfFirstReservation,
        indexOfLastReservation
    );

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const totalPages = Math.ceil(
        filteredReservations.length / reservationsPerPage
    );

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by Reservation UUID"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: "5px",
                        width: "300px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Reservation UUID</th>
                    <th>Number of Active Purchases</th>
                    <th>Sum of Active Charges</th>
                </tr>
                </thead>
                <tbody>
                {currentReservations.map((reservation) => (
                    <>
                        <tr
                            onClick={() =>
                                handleToggle(reservation.reservation_uuid)
                            }>
                            <td>
                                {isOpen === reservation.reservation_uuid ? (
                                    <FaChevronDown />
                                ) : (
                                    <FaChevronRight />
                                )}
                                {reservation.reservation_uuid}
                            </td>
                            <td>{reservation.activePurchases}</td>
                            <td>{reservation.sumOfActiveCharges}</td>
                        </tr>
                        {isOpen === reservation.reservation_uuid && (
                            <tr>
                                <td colSpan={3}>
                                    <ProductChargesTable
                                        reservationUUID={
                                            reservation.reservation_uuid
                                        }
                                    />
                                </td>
                            </tr>
                        )}
                    </>
                ))}
                </tbody>
            </table>
            <div
                style={{
                    display: "flex",
                    gap: "5px",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
            </div>
        </>
    );
};

export default ReservationsTable;
