'use client'
import { API } from "@/app/api/api";
import React from "react";

export function YouRequest(): React.JSX.Element {
    // Especifica el tipo del estado como string[]
    const [languages, setLanguages] = React.useState<string[]>([]);

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
        <section className="flex flex-col items-center justify-center ">
            <div className="space-y-6">
            <div className="justify-start pb-7">
                <h4 className="text-white text-sm pb-2">¿Que Idioma Hablas? 🤔</h4>
                <select name="SelectLanguage" className="bg-[#1E293B] text-white/50 w-[447px] h-[47px] p-1 items-center rounded-sm">
                    <option className="bg-transparent w-25 text-white/50" disabled selected> elige un idioma</option>
                    {languages?.length > 0 && languages?.map((language) => (
                        <option className="bg-transparent w-25 text-white/80" key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>
            <div className="justify-start pb-7">
                <h4 className="text-white text-sm pb-2">¿En que Idioma quieres hablar? 😉</h4>
                <select name="SelectLanguage" className="bg-[#1E293B] text-white/50 w-[447px] h-[47px] p-1 items-center rounded-sm">
                    <option className="bg-transparent w-25 text-white/50" disabled selected> elige un idioma</option>
                    {languages?.length > 0 && languages?.map((language) => (
                        <option className="bg-transparent w-25 text-white/80" key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>

            <div className="justify-start pb-3">
                <h4 className="text-white text-sm pb-2">Dime que quieres decir 💻</h4>
                <textarea name="text-spected" id="tex" className="bg-[#1E293B] min-w-[447px] min-h-28 rounded-lg pl-3 pt-2 text-white text-sm text-pretty" placeholder="Ingresa tu texto..."></textarea>
            </div>

            <button type="button" className="bg-[#1E293B] text-white text-sm p-2 px-14 rounded-xl mt-5">Obtener Feedback 😉</button>
            </div>
        </section>
    );
}
