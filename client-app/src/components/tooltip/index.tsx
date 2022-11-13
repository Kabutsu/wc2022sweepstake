import React from 'react';

import './tooltip.scss';

type IProps = {
    label: string;
    className?: string;
};

const Tooltip = ({ label, className }: IProps) => (
    <div className={`c-tooltip ${className}`}>
        <span className="c-tooltip__mark">?</span>
        <div className="c-tooltip__label">
            {label}
        </div>
    </div>
);

export default Tooltip;
