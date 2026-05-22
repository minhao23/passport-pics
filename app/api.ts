export async function processPassportImage(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
        const response = await fetch("http://127.0.0.1:8000/images/process/", {
            method: "POST",
            body: formData, 
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Server error: ${response.status}`);
        }

        const imageBlob = await response.blob();

        const imageUrl = URL.createObjectURL(imageBlob);
        
        return imageUrl;

    } catch (error) {
        console.error("Error processing image:", error);
        throw error;
    }
}