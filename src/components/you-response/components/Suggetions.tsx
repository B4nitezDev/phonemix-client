import React from "react";

interface Props {
    formal: string;
    informal: string;
}

export function Suggetions({formal, informal}: Props): React.JSX.Element {

    return (
        <article className="gap-[30px]">
            <h3 className="text-white">Suggetions</h3>
            <p className="text-[15px] text-white/80">Texto Formal</p>
            <p className="text-[10px] text-white/60">{formal}</p>
            <p className="text-[15px] text-white/80">Texto informal</p>
            <p className="text-[10px] text-white/60">{informal}</p>
        </article>
    )
}