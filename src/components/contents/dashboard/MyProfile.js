import { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MasterAcctountsGrid from './masterAccountsGrid';
import AJAX from '../../../utils/ajax';

export default function MyProfile({ pageData, pageID }) {
    const { myProfile } = Object(pageData);
    const [ tokenForm, setTokenForm ] = useState(null);

    async function saveToken(ev) {
        ev.preventDefault();

        try {
            const sent = await new AJAX('/user/binance-keys/save-keys').put(tokenForm);
            
            debugger
        } catch (err) {
            throw err;   
        }
    }

    return <div className="container" page-id={pageID}>
        <div className="content-fullwidth">
            <h1 className="page-title">Meu Perfil</h1>
        </div>

        <section className="content-sidebar">
            <div className="content">
                <div className="card form-card">
                    <MasterAcctountsGrid masterAccounts={myProfile?.masterAccounts || []} />
                </div>
            </div>

            <div className="sidebar">
                <div className="card form-card">
                    <div className="card-header">
                        <h2 className="title">Meus Dados</h2>
                    </div>

                    <div className="card-body flex-data">
                        <div className="row">
                            <div className="column">
                                <label>Nome:</label>
                            </div>

                            <div className="column">
                                <span>{myProfile?.firstName} {myProfile?.lastName}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="column">
                                <label>E-mail:</label>
                            </div>

                            <div className="column">
                                <span>{myProfile?.email}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="column">
                                <label>Celular:</label>
                            </div>

                            <div className="column">
                                <span>{myProfile?.phone}</span>
                            </div>
                        </div>
                    </div>

                    <IconButton aria-label="delete" size="medium" className="float-btn">
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <form className="binance-token card form-card" onSubmit={(ev) => saveToken(ev)}>
                    <h3>Binance Token</h3>

                    <div className="token-wrap empty">
                        <span className="token">TOKEN_HERE</span>
                    </div>

                    {tokenForm && <div className="flex-data">
                        <div className="row">
                            <FormControl margin="dense" className="column">
                                <TextField
                                    label="Insira o API KEY gerado"
                                    variant="standard"
                                    value={tokenForm.binanceAPIKey || ''}
                                    onInput={(ev) => setTokenForm(prev => ({ ...prev, binanceAPIKey: ev.target.value }))}
                                    type="password"
                                />
                            </FormControl>
                        </div>

                        <div className="row">
                            <FormControl margin="dense" className="column">
                                <TextField
                                    label="Insira o SECRET KEY gerado"
                                    variant="standard"
                                    value={tokenForm.binanceSecretKey || ''}
                                    onInput={(ev) => setTokenForm(prev => ({ ...prev, binanceSecretKey: ev.target.value }))}
                                    type="password"
                                />
                            </FormControl>
                        </div>
                    </div>}

                    <div className="buttons-wrap">
                        {!tokenForm && <Button
                            variant="contained"
                            className="cta"
                            onClick={() => setTokenForm({})}
                        >
                            Add Binance Token
                        </Button>}

                        {tokenForm && <Button
                            variant="contained"
                            className="cta"
                            type="submit"
                        >
                            Save Token
                        </Button>}
                    </div>
                </form>
            </div>
        </section>
    </div>
}