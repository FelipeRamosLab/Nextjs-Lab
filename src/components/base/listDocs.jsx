import { useState, useEffect, useMemo } from 'react';
import ListDocsModel from '../../models/ListDocs';

export default function ListDocs(params = ListDocsModel.prototype) {
    const Model = new ListDocsModel({...params, state: useState([])});
    const data = Model.getState;
    const setData = Model.setState;

    useEffect(()=>{
        Model.loadData();
    }, [Model]);

    return <div>
        {(!data || !data.length) && <h2>Carregando...</h2>}

        {(Model.Content && data && data.length && data.map((doc, i) => <Model.Content key={i} doc={doc} />)) || ''}
    </div>
}
