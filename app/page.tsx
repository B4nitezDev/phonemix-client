"use client";
import React from "react";
import { YouRequest } from "./components/you-request/youRequest";
import { YouResponse } from "./components/you-response/youResponse";
import { GetFeedbackResponse } from "./interfaces/response";

export default function Home() {
  const [feedback, setFeedback] = React.useState<GetFeedbackResponse | null>(
    null
  );

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 bg-[#000113]">
      <div className="h-12">
        <h1 className="text-white pl-[13%] text-lg pb-[3%]">
          Phonemix | AI Tools
        </h1>
        <div className="h-px bg-gray-600 w-[220px]"></div>
      </div>
      <div className="flex flex-wrap items-center gap-20 top-0">
        <YouRequest
          setFeedback={(feedback: GetFeedbackResponse) => setFeedback(feedback)}
        />
        {feedback != null ? (
          <>
            <div className="w-px bg-gray-600 h-[600px]"></div>
            <YouResponse feedback={feedback} />
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
