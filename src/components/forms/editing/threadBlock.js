import ThreadRuleEdit from "./threadRule";
import Button from '@mui/material/Button';
import { useState } from "react";

export default function ThreadBlockEdit({blockData, pageData}) {
    const threadChildren = [...blockData.blocks, ...blockData.rules];
    const chidrenSorted = threadChildren.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });
    const [sorted, setSorted] = useState(chidrenSorted);

    return (
        <div className="thread-block-form">
            <div className="section-header">
                <h3>Bloco</h3>
                <Button variant="standard">Excluir Bloco</Button>
            </div>
            <hr/>
            {sorted.map(child => {
                switch (child.type) {
                    case 'evaluation': {
                        return <ThreadRuleEdit key={child._id} ruleData={child} pageData={pageData} />
                    }
                    case 'block': {
                        return <ThreadBlockEdit key={child._id} blockData={child} pageData={pageData} />
                    }
                }
            })}

            <Button variant="standard" sx={{width: '100%'}}>Adicionar Bloco</Button>
        </div>
    );
}
