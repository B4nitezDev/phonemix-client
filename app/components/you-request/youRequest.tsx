"use client";

import { API } from "@/app/api/api";
import React from "react";
import DragNdrop from "./components/dragAndDrop";

export function YouRequest(): React.JSX.Element {
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);

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
          ></textarea>
        </div>

        <div className="flex justify-center items-center gap-2 pt-2 flex-wrap">
          <div>
            <p className="text-white">Graba un audio 🎙</p>
            <div className="flex justify-center items-center pt-3">
              <button className="bg-[#4a90e2]/60 text-[12px] text-white px-8 py-2 rounded">
                Grabar
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
          >
            Obtener Feedback 😉
          </button>
        </div>
      </div>
    </section>
  );
}
