import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Charge} from "../models/reservation.model.ts";

const ProductChargesTable = ({ reservationUUID }) => {
    const [charges, setCharges] = useState<Charge[]>([]);

    useEffect(() => {
        const fetchCharges = async () => {
            const { data } = await axios.get(`/api/reservation/${reservationUUID}/charges`);
            setCharges(data);
        };
        fetchCharges();
    }, [reservationUUID]);

    return (
        <table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Status</th>
                <th>Charge</th>
            </tr>
            </thead>
            <tbody>
            {charges.map((charge, index) => (
                <tr
                    key={index}
                    style={{ backgroundColor: charge.status === 'Active' ? 'green' : 'red' }}
                >
                    <td>{charge.productName}</td>
                    <td>{charge.status}</td>
                    <td>{charge.charge}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductChargesTable;
