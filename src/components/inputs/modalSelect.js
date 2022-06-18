import ModalButton from '../buttons/modalButton';

export default function ModalSelect({ label, getter, setter, options}) {
    if (!options || !Array.isArray(options)) options = [];
    const currentOption = options.find(opt => opt.value === getter);

    return (<fieldset className="modal-select">
        {label && <label>{label}</label>}

        <ModalButton
            ModalContent={({modalCtrl})=>{
                return (<div className="options-wrap">
                    {options && Array.isArray(options) && options.map((option) => {
                        const {title, description, value} = option || {};

                        return (
                            <button
                                key={getUID()}
                                type="button"
                                className="option button transparent"
                                onClick={()=>{
                                    setter(value);
                                    modalCtrl(false);
                                }}
                            >
                                <h5 className="option-title">{title}</h5>
                                <p className="option-description">{description}</p>
                            </button>
                        );
                    })}
                </div>);
            }}
        >{validateProp(currentOption, ['title']) || 'Escolher'}</ModalButton>
    </fieldset>);
}

export class ModalSelectOptionModel {
    constructor(setup = {
        title: String(),
        description: String(),
        value: String() || Number()
    }) {
        this.title = setup.title;
        this.description = setup.description;
        this.value = setup.value;
    }
}
