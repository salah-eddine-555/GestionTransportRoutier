import {useState, useEffect} from 'react';
import type {Remorque} from '../../../types/remorque.types';
import * as service from '../../../services/remorqueService';
import RemorqueList from './RemorqueList';


export default function RemorqueListPage(){

    const [remorques, setRemorques] = useState<Remorque[]>([])


    useEffect(async (): void => {
        const remorques = await service.getAll();
        setRemorques(remorques);

       }, [])


    return(
        <>
            <RemorqueList remorques= {remorques} />
        </>
    )
}