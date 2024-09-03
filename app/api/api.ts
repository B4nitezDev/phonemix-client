import { LangValidationRespose } from "../interfaces/response";

export const API = {
    FEEDBACK: {
        GET_LANGUAGES: async (): Promise<string[]> => {
            const response = await fetch("http://ec2-3-143-225-37.us-east-2.compute.amazonaws.com:8000/supported_languages",{
                method: "GET"
            });

            return await response.json();
        },
        GET_VALIDATION: async (): Promise<LangValidationRespose> => {
            const response = await fetch("http://ec2-3-143-225-37.us-east-2.compute.amazonaws.com:8000/lang_validation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    expected_text: "",
                    language: ""
                })
            });
        
            return response.json();
        },
        GET_FEEDBACK: async (formData: FormData) => {
            const response = await fetch('http://ec2-3-143-225-37.us-east-2.compute.amazonaws.com:8000/get_feedback', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                },
                body: formData
            });

            return await response.json()
        }
    }
}