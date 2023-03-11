import { IconButton } from '@mui/material';

export default function SectionHeader({title, description, iconButtons}) {
    return (
        <div className="section-header">
            {title && <h2 className="title">{title}</h2>}
            {description && <p>{description}</p>}

            {/* Buttons */}
            {Array.isArray(iconButtons) && <div className="wrap-btns">
                {iconButtons.map((item, index) => {
                    return item?.display && <IconButton
                        key={item?.id + index}
                        onClick={item?.action}
                        {...item?.props}
                    >
                        <item.Icon/>
                    </IconButton>
                })}
            </div>}
        </div>
    );
}
