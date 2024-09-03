import React from "react";
import { Suggetions } from "./components/Suggetions";

export function YouResponse(): React.JSX.Element {
  return (
    <section className="mb-[10%]">
      <div className="justify-start pb-7">
        <p className="text-white pb-2">Lo que dijiste: 🗣️</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            nostrum rerum cupiditate et. Cum qui ullam nostrum quis laudantium
            exercitationem, atque temporibus quidem, in, neque quod blanditiis
            aliquid! Qui, sequi.
          </p>
        </div>
      </div>

      <div className="justify-start pb-7">
        <p className="text-white pb-2">Tus Fonemas: 😱</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            nostrum rerum cupiditate et. Cum qui ullam nostrum quis laudantium
            exercitationem, atque temporibus quidem, in, neque quod blanditiis
            aliquid! Qui, sequi.
          </p>
        </div>
      </div>

      <div className="justify-start pb-7">
        <p className="text-white pb-2">Fonemas Correctas: ✅</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            nostrum rerum cupiditate et. Cum qui ullam nostrum quis laudantium
            exercitationem, atque temporibus quidem, in, neque quod blanditiis
            aliquid! Qui, sequi.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-2 justify-center">
        <div></div>
        <Suggetions formal="Hola que tal" informal="Como estas" />
      </div>
    </section>
  );
}
