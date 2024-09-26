import React from "react";
import { Suggetions } from "./components/Suggetions";
import { GetFeedbackResponse } from "@/src/interfaces/response";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { base64ToBlob } from "@/src/utils/Base64ToBlob";
interface Props {
  feedback: GetFeedbackResponse | null;
}

export function YouResponse({ feedback }: Props): React.JSX.Element {
  const [audio, setAudio] = React.useState<string>("");
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (feedback?.expected_audio) {
      const audioBlob: Blob = base64ToBlob({
        base64: feedback?.expected_audio,
        mimeType: "audio/mpeg",
      });
      const audioUrl: string = URL.createObjectURL(audioBlob);
      console.log("Audio URL:", audioUrl);
      setAudio(audioUrl);
    }
  }, [feedback?.expected_audio]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = offsetX / width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  return (
    <section className="mb-[8%]">
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
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-white/90 text-center">Un audio de ejemplo 😏</h4>
          <div className="h-24 w-full max-w-[250px] p-0 mt-4">
            {audio ? (
              <div className="flex flex-col items-center bg-[#1E293B] rounded-lg w-full">
                <audio
                  ref={audioRef}
                  src={audio}
                  className="hidden"
                  preload="auto"
                  onTimeUpdate={handleTimeUpdate}
                ></audio>
                <button
                  className="bg-[#1E293B] text-white/80 rounded-md cursor-pointer text-[12px] p-2"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? "⏸️ Pausa" : "▶️ Reproducir"}
                </button>
                <div
                  className="flex-1 h-1 bg-[#333] rounded-sm ml-2 cursor-pointer relative"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full w-0 bg-[#4CAF50] rounded-sm absolute top-0 left-0"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-teal-200 text-[8px]">Audio no disponible</p>
            )}
          </div>
        </div>
        <ReactMarkdown
          className={"text-white/60 w-64 text-xs"}
          remarkPlugins={[remarkGfm]}
        >
          {feedback?.suggestions}
        </ReactMarkdown>
        {/*<Suggetions formal="Hola que tal" informal="Como estas" /> */}
      </div>
    </section>
  );
}
