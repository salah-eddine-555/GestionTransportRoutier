
import PDFDocument from "pdfkit";
import { buffer } from "node:stream/consumers";
import Trajet from '../models/Trajet.js';



export const generateOrderMission = async (id) => {

    const trajet = await Trajet.findById(id);

    if(!trajet){
        throw new Error("cette trajet introuvable ");
    }

    const doc = new PDFDocument({
        size: "A4",
        margin: 50,
    });


    const pdfPromise = buffer(doc);

    doc.fontSize(20).text("ORDRE DE MISSION", {
        align: "center",
    });

    doc.moveDown(2);
    doc.fontSize(12);

    doc.text(`Reference du trajet : ${trajet._id}`);
    doc.moveDown();

    doc.text(`Site de depart : ${trajet.siteDepart}`);
    doc.text(`Site d'arrivee : ${trajet.siteArrivee}`);
    doc.text(`Marchandise : ${trajet.marchandise}`);

    doc.text(
        `Date de depart prevue : ${
            new Date(trajet.dateDepartPrevu).toLocaleString("fr-FR")
        }`
    );

    doc.text(
        `Date d'arrivee prevue : ${
            new Date(trajet.dateArriveePrevue).toLocaleString("fr-FR")
        }`
    );

    doc.moveDown();
    doc.text(`Statut : ${trajet.statut}`);

    doc.end();

  
    const pdfBuffer = await pdfPromise;

    return pdfBuffer;
};
