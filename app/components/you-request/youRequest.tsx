"use client";
import { API } from "@/app/api/api";
import React from "react";
import DragNdrop from "./components/dragAndDrop";
import {
  GetFeedbackResponse,
  ValidationMessage,
} from "@/app/interfaces/response";

interface Props {
  setFeedback: (feedback: GetFeedbackResponse) => void;
}

export function YouRequest({ setFeedback }: Props): React.JSX.Element {
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [file, setFile] = React.useState<File | null>(null);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [audioUrl, setAudioUrl] = React.useState<string>("");
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const [text, setText] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("");
  const [textValidation, setTextValidation] = React.useState<string>("");
  const [textCorrect, setTextCorrect] = React.useState<boolean>(false);
  const [isRequest, setIsRequest] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<string>("");
  const [showError, setShowError] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    const textFunctionValidate = async (): Promise<void> => {
      const response: Promise<string> = API.FEEDBACK.GET_VALIDATION({
        text,
        language,
      })
        .then((result: ValidationMessage): string =>
          result.validation_message.toString()
        )
        .catch((e: any): string => {
          return "";
        });

      if (await response) {
        const text = await response;

        if (text == "The text is in it, but es was expected.") {
          setTextCorrect(true);
          setTextValidation(text);
          return;
        } else {
          setTextCorrect(false);
          setTextValidation(text);
          return;
        }
      }
    };

    if (text.length > 0) {
      textFunctionValidate()
        .then((response: void) => response)
        .catch((error) => error);
    } else {
      return;
    }
  }, [text]);

  React.useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showError]);

  const startRecording = async () => {
    try {
      if (file) return;
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
    setLanguage(event.target.value);
  };

  const geetFeedback = async (): Promise<void> => {
    setIsRequest(true);
    if (!language || !text) {
      console.log("me Ejecute");
      setIsRequest(false);
      setIsError("Revisa tus inputs");
      setShowError(true);
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("audio", file);
    } else if (audioBlob) {
      formData.append("audio", audioBlob, "recording.wav");
    } else {
      return;
    }
    formData.append("text", text);
    formData.append("language", language);

    const response: GetFeedbackResponse = await API.FEEDBACK.GET_FEEDBACK(
      formData
    );
    setFeedback(response);
    setIsRequest(false);
  };

  return (
    <section className="flex flex-col items-center justify-center p-">
      <div className="space-y-6 pt-0 mb-10">
        <div className="justify-start pb-7">
          <h4 className="text-white text-sm pb-2">
            ¿En qué Idioma quieres hablar? 😉
          </h4>
          <select
            name="SelectLanguage"
            className="bg-[#1E293B] text-white/50 w-[447px] h-[47px] p-1 items-center rounded-sm"
            onChange={handleLanguageTo}
          >
            <option
              className="bg-transparent w-25 text-white/50"
              disabled
              selected
              value={""}
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
          <p
            className={`p-3 font-serif ${
              textCorrect ? "text-emerald-700" : "text-red-600 "
            }`}
          >
            {textValidation.length > 0 ? textValidation : ""}
          </p>
        </div>

        <div className="flex justify-center items-center gap-2  flex-wrap">
          <div>
            <p className="text-white">Graba un audio 🎙</p>
            <div className="flex justify-center items-center pt-3">
              {!file ? (
                <button
                  className="bg-[#4a90e2]/60 text-[12px] text-white px-8 py-2 rounded"
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? "Parar de grabar" : "Poner a grabar"}
                </button>
              ) : (
                <button
                  className="bg-[#4a90e2]/20 text-[12px] text-white px-8 py-2 rounded"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled
                >
                  {isRecording ? "Parar de grabar" : "Poner a grabar"}
                </button>
              )}
            </div>
          </div>
          <p className="text-white/70  text-[21px] m-[15px]">ó</p>
          <div>
            {
              audioBlob != null ? (
                <p className="text-white/80">Ya tenemos su audio</p>
              ) : (
                <DragNdrop onFilesSelected={setFile} />
              )  }
            
          </div>
        </div>
        {showError && (
          <p
            className={`text-red-600/80 text-[16px] p-0 m-0 ${
              showError ? "hidden" : ""
            }`}
          >
            {isError}
          </p>
        )}
        <div className="flex items-center justify-center pb-7">
          {!isRequest ? (
            <>
              <button
                type="button"
                className="bg-[#1E293B]/80 text-white text-sm p-2 px-14 rounded-xl mt-2"
                onClick={() => geetFeedback()}
              >
                Obtener Feedback 😉
              </button>
            </>
          ) : (
            <>
              <p className="text-white/50 text-[12px] m-0 t-0">Cargando ...</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
