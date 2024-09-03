"use client";
import { API } from "@/app/api/api";
import React from "react";
import DragNdrop from "./components/dragAndDrop";

export function YouRequest(): React.JSX.Element {
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [audioUrl, setAudioUrl] = React.useState<string>("");
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const mediaRecorderRef = React.useRef(null);
  const [text, setText] = React.useState<string>("")
  const [selectedLanguageTo, setSelectedLanguageTo] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchLanguages() {
      try {
        const languages = await API.FEEDBACK.GET_LANGUAGES();
        setLanguages(languages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    }
    fetchLanguages();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
        setIsRecording(true);
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setAudioBlob(event.data);
      const url = URL.createObjectURL(event.data);
      setAudioUrl(url);
    }
  };

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleLanguageTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguageTo(event.target.value);
  };

  const geetFeedback = async(): Promise<void> => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    formData.append("text", text);
    formData.append("language", selectedLanguageTo)

    const response = await API.FEEDBACK.GET_FEEDBACK(formData);
    console.info(response);
  }

  return (
    <section className="flex flex-col items-center justify-center p-6">
      <div className="space-y-6">
        <div className="justify-start pb-7">
          <h4 className="text-white text-sm pb-2">¿Qué Idioma Hablas? 🤔</h4>
          <select
            name="SelectLanguage"
            className="bg-[#1E293B] text-white/50 w-[447px] h-[47px] p-1 items-center rounded-sm"
          >
            <option
              className="bg-transparent w-25 text-white/50"
              disabled
              selected
            >
              Elige un idioma
            </option>
            {languages?.length > 0 &&
              languages.map((language) => (
                <option
                  className="bg-transparent w-25 text-white/80"
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}
          </select>
        </div>
        <div className="justify-start pb-7">
          <h4 className="text-white text-sm pb-2">
            ¿En qué Idioma quieres hablar? 😉
          </h4>
          <select
            name="SelectLanguage"
            className="bg-[#1E293B] text-white/50 w-[447px] h-[47px] p-1 items-center rounded-sm"
            value={selectedLanguageTo}
            onChange={handleLanguageTo}
         >
            <option
              className="bg-transparent w-25 text-white/50"
              disabled
              selected
            >
              Elige un idioma
            </option>
            {languages?.length > 0 &&
              languages.map((language) => (
                <option
                  className="bg-transparent w-25 text-white/80"
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}
          </select>
        </div>

        <div className="justify-start">
          <h4 className="text-white text-sm pb-2">Dime qué quieres decir 💻</h4>
          <textarea
            name="text-spected"
            id="tex"
            className="bg-[#1E293B] min-w-[447px] min-h-12 rounded-lg pl-3 pt-2 text-white text-sm"
            placeholder="Ingresa tu texto..."
            value={text}
            onChange={handleText}
          ></textarea>
        </div>

        <div className="flex justify-center items-center gap-2 pt-2 flex-wrap">
          <div>
            <p className="text-white">Graba un audio 🎙</p>
            <div className="flex justify-center items-center pt-3">
              <button
                className="bg-[#4a90e2]/60 text-[12px] text-white px-8 py-2 rounded"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? "Parar de grabar" : "Poner a grabar"}
              </button>
            </div>
          </div>
          ó
          <div>
            <DragNdrop onFilesSelected={setFiles} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-[#1E293B] text-white text-sm p-2 px-14 rounded-xl mt-5"
            onClick={() => geetFeedback()}
          >
            Obtener Feedback 😉
          </button>
        </div>
      </div>
    </section>
  );
}
