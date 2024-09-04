import React from "react";
import { Suggetions } from "./components/Suggetions";
import { GetFeedbackResponse } from "@/app/interfaces/response";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//import { extractTextFromMarkdown } from "@/app/utils/MarkdwonToText";

interface Props {
  feedback: GetFeedbackResponse | null;
}

export function YouResponse({ feedback }: Props): React.JSX.Element {
  return (
    <section className="mb-[18%] pt-0">
      <div className="justify-start pb-7">
        <p className="text-white pb-2">Lo que dijiste: 🗣️</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>{feedback?.transcribed_text}</p>
        </div>
      </div>

      <div className="justify-start pb-7">
        <p className="text-white pb-2">Tus Fonemas: 😱</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>{feedback?.user_phonemes}</p>
        </div>
      </div>

      <div className="justify-start pb-7">
        <p className="text-white pb-2">Fonemas Correctas: ✅</p>
        <div className="inline-block p-[10px] rounded-md max-w-[498px] text-white/70 text-pretty text-[12px] bg-[#1E293B]">
          <p>{feedback?.correct_phonemes}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-2 justify-center">
        <div></div>
        <ReactMarkdown className={"text-white/60 w-64 text-xs"} remarkPlugins={[remarkGfm]}>
          {feedback?.suggestions}
        </ReactMarkdown>
        {/*<Suggetions formal="Hola que tal" informal="Como estas" /> */}
      </div>
    </section>
  );
}
