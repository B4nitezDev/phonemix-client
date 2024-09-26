import { ValidationMessage, GetFeedbackResponse } from "../../src/interfaces/response";
import { TextValidation } from "../../src/interfaces/requests";

const URL_BASE: string = "https://phonemix-api-production.up.railway.app";

export const API = {
  FEEDBACK: {
    GET_LANGUAGES: async (): Promise<string[]> => {
      const response = await fetch(URL_BASE + "/supported_languages", {
        method: "GET",
      });

      return await response.json();
    },
    GET_VALIDATION: async ({
      text,
      language,
    }: TextValidation): Promise<ValidationMessage> => {
      const response = await fetch(URL_BASE + "/lang_validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expected_text: text,
          language: language,
        }),
      });

      return response.json();
    },
    GET_FEEDBACK: async (formData: FormData): Promise<GetFeedbackResponse> => {
      const response: Response = await fetch(URL_BASE + "/get_feedback", {
        method: "POST",
        headers: {
          accept: "application/json",
          //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        body: formData,
      });

      return await response.json();
    },
  },
  SUPABASE: {},
};
