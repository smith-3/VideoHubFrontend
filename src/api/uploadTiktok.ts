// api/uploadVideo.ts
export const uploadVideo = async (formData: FormData): Promise<any> => {
    const response = await fetch('http://127.0.0.1:8000/upload_video/', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Error al subir el video: ${response.statusText}`);
    }

    return response.json();
};
