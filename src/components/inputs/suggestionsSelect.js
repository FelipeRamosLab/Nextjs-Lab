import { useState } from 'react';
import axios from 'axios';
import FeedbackResult from '../contents/feedbackResult';
import BotTile from '../tiles/botTile';

export default function SuggestionsSelect({label, setValue, valueLabel, mySuggestionsPath, storeSuggestionsPath}) {
    const [suggestionsState, setSuggestionsState] = useState(false);
    const [current, setCurrent] = useState(null);
    const [mySuggestions, setMySuggestions] = useState(null);

    async function selectOpen() {
        setMySuggestions('loading');
        setSuggestionsState(true);

        try {
            const suggestions = await axios.get(mySuggestionsPath);
            setMySuggestions(suggestions.data.result);
        } catch(err) {
            console.error(err);
            setMySuggestions('error');
        }
    }

    async function selectClick(item) {
        setCurrent(item);
        setValue(item);
        setSuggestionsState(false);
    }

    return (
        <fieldset className="suggestions-select">
            <label>{label}</label>
            {(mySuggestionsPath || storeSuggestionsPath) && <button type="button" className="button" onClick={selectOpen}>{current ? current[valueLabel] : 'Selecionar'}</button>}

            {suggestionsState && <div className="suggestions-select-list standard-grid grid columns-1">
                {mySuggestions !== 'loading' && mySuggestions !== 'error' ? (<>
                    {mySuggestions.length && mySuggestionsPath ? (<>
                        {mySuggestions.map(sugg=>{
                            return <div key={sugg._id} className="click-wrapper" onClick={()=>selectClick(sugg)}><BotTile bot={sugg} /></div>
                        })}
                    </>) : (
                        <FeedbackResult title="Nenhum bot foi encontrado!" />
                    )}
                </>) : (<>
                    {mySuggestions === 'loading' && <FeedbackResult title="Carregando..." />}
                    {mySuggestions === 'error' && <FeedbackResult title="Ocorreu um erro ao consultar o banco de dados!" />}
                </>)}
            </div>}
        </fieldset>
    );
}
