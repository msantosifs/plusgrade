import express from 'express';
import {loggerHandler} from "./middleware/logger.js";
import assignments from './product_assignment.json' assert { type: "json" };
import charges from './product_charges.json' assert { type: "json" };

const port = process.env.PORT || 3000;

const app = express();


app.use(loggerHandler);
app.use(express.json())


app.get('/api/reservationsWithCharges', (req, res) => {
    const reservationsWithCharges = assignments.reduce((acc, a) => {
        // If this reservation_uuid is already accumulated, use that, otherwise start a new reservation data
        const reservationData = acc.find(accumulated => accumulated.reservation_uuid === a.reservation_uuid) || { reservation_uuid: a.reservation_uuid, activePurchases: 0, sumOfActiveCharges: 0 };

        const relatedCharges = charges.filter(c => c.special_product_assignment_id === a.id);
        const activeCharges = relatedCharges.filter(c => c.active);

        // Increase count and sum for each active charge
        activeCharges.forEach(c => {
            reservationData.activePurchases++;
            reservationData.sumOfActiveCharges += c.amount;
        });

        if (!acc.includes(reservationData)) acc.push(reservationData); // If this is a new reservation data, add it to the array

        return acc;
    }, []);

    res.json(reservationsWithCharges);
});

app.get('/api/reservation/:uuid/charges', (req, res) => {
    const { uuid } = req.params;

    const assignmentsOfReservation = assignments.filter(a => a.reservation_uuid === uuid);
    if (!assignmentsOfReservation.length) {
        return res.status(404).json({ msg: `No assignments found for Reservation UUID: ${uuid}` });
    }

    const chargesData = assignmentsOfReservation.map(a => {
        const relatedCharges = charges.filter(c => c.special_product_assignment_id === a.id && c.active);
        return relatedCharges.map(charge => ({
            productName: a.name,
            status: 'Active',
            charge: charge.amount
        }));
    }).flat();

    res.json(chargesData);
});

app.listen(port, () => console.log(`Listen to port ${port}`));

