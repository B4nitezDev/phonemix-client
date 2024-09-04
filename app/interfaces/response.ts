export interface ValidationMessage {
    validation_message: string;
}

export interface GetFeedbackResponse {
    transcribed_text: string;
    user_phonemes: string;
    correct_phonemes: string;
    detailed_feedback: string;
    expected_audio: string; // Base64
    suggestions: string; // MD
}