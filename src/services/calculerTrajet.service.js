


export const calculerDistance = (kiloDepart, kiloArrivee) => {
 
    if(kiloDepart >= kiloArrivee){
        // console.log('1gggg');
        throw new Error("kilometrage arrivee doit superieur a kilometrage de depart !");
    }

    return kiloArrivee - kiloDepart;
}

export const calculerMoyenneConsommation = (volumeGasoil, distance) => {

    if(distance <= 0){throw new Error("la distance doit etre positve")}

    return (volumeGasoil / distance) * 100;
}