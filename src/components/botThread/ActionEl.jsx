import ModalSelect, {ModalSelectOptionModel as SelectOption} from '../inputs/modalSelect';

export default function ActionEl({currentEl, evalThread}) {

    return (<div className="rounded">
        <ModalSelect
            label="Tipo de entrada de valor"
            getter={currentEl && currentEl.inputType} 
            setter={(value) => currentEl.setValue(evalThread, 'inputType', value)} 
            options={[
                new SelectOption({title: 'Função', value: 'function'}),
                new SelectOption({title: 'Valor Primitivo', value: 'primitive'})
            ]}
        />
    </div>);
}
