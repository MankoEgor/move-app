import type React from 'react';
import s from './InfoItem.module.css'

interface Info {
    label: string;
    value: string | number;
    prefix?: React.ReactNode
}

function InfoItem({label, value, prefix}: Info){
    return (
        <div className={s.infoItem}>
            <p className={s.titleInfo }>{label}</p>
            <p className={label === 'ПРОДЮСЕР' || label === 'DIRECTOR' ? s.infoDir : s.info}>
                {prefix && <span>{prefix}</span>}
                {value}
            </p>
        </div>
    )
}

export default InfoItem;