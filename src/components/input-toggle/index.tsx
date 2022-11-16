import React from 'react';

import './input-toggle.scss';

type IProps = {
    id: string;
    value: boolean;
    onChange: (on: boolean) => void;
}

const InputToggle = ({ id, value, onChange }: IProps) => (
    <div id={id} className={`c-input-toggle ${value ? 'is-on' : 'is-off'}`}>
        <div style={{ position: 'relative' }}>
            <button
                type="button"
                id={`${id}-switch`}
                className="c-input-toggle__switch"
                onClick={() => onChange(!value)}
            >
                <span className="on-text">Yes</span>
                <span className="off-text">No</span>
            </button>
        </div>
    </div>
);

export default InputToggle;
