interface Props {
    base64: string;
    mimeType: string;
}

export function base64ToBlob ({base64, mimeType}: Props): Blob {
    const byteCharacters: string = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let offset: number = 0; offset < byteCharacters.length; offset += 512) {
        const slice: string = byteCharacters.slice(offset, offset + 512)

        const byteNumbers: any[] = new Array(slice.length);

        for(let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
}

// Implementation example: 
/*
  const mimeType = 'audio/mpeg'; 
  const blob = base64ToBlob(base64Audio, mimeType);
  const audioUrl = URL.createObjectURL(blob);
  usar audioUrl para reproducir el audio
*/