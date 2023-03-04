import { useState, useContext } from 'react';

import MiniMasterAccountTile from '../tiles/miniMasterAccount';
import ModalButton from '../buttons/modalButton';
import CreateBot from '../forms/createBot';
import CardSlider from '../sliders/card-slider';
import ListDocs from '../base/listDocs';
import ListDocContent from './listDocs/FisrtTest';
import FormFillModal from '../modals/formFill';
import CreateMasterForm from '../forms/createMaster';
import PageDataContext from '../../context/pageData';

export default function HomeContent(){
    const {pageData} = useContext(PageDataContext);
    const {user, myBots} = pageData || {};
    const {masterAccounts} = user || {};
    const createMasterState = useState(false);
    const [ createMaster, setCreateMaster ] = createMasterState;

    return (<>
        <div className="container section-header">
            <h2 className="title">Contas</h2>
            <button className="button transparent" onClick={() => setCreateMaster(true)}>Criar conta</button>

            <FormFillModal
                openState={createMaster}
                pageData={pageData}
                title="Criar conta"
                Content={CreateMasterForm}
                onClose={() => setCreateMaster(false)}
            />
        </div>
        <section className="container standard-grid grid columns-2">
            {masterAccounts && masterAccounts.map(master=>{
                return <MiniMasterAccountTile key={master.cod} master={master} />
            })}
        </section>

        <section className="container">
            <h2>New ListDocs component</h2>
            <ListDocs
                collection="functions"
                Content={ListDocContent}
            />
        </section>

        <div className="container section-header">
            <h2>Meus Bots</h2>
            <ModalButton className="button transparent" ModalContent={CreateBot} pageData={pageData}>Criar</ModalButton>
        </div>

        <section className="container">
            <CardSlider data={myBots} pageData={pageData} />
        </section>
    </>);
}
