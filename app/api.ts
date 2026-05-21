/**
 * Sends an image to the backend for passport processing.
 * * @param {File} imageFile - The file selected by the user.
 * @returns {Promise<string>} - An Object URL representing the processed image.
 */
async function processPassportImage(imageFile) {
    // 1. Package the file into FormData
    // The key 'file' MUST match the parameter name in your FastAPI endpoint
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
        // 2. Make the POST request to your FastAPI server
        // Replace with your actual backend URL if hosted elsewhere
        const response = await fetch("http://localhost:8000/images/process", {
            method: "POST",
            body: formData, 
            // Note: Do NOT manually set the 'Content-Type' header here. 
            // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
        });

        if (!response.ok) {
            // Attempt to parse the error message from the backend
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Server error: ${response.status}`);
        }

        // 3. Parse the response as a binary Blob
        const imageBlob = await response.blob();

        // 4. Create a temporary local URL for the blob so it can be displayed in an <img> tag
        const imageUrl = URL.createObjectURL(imageBlob);
        
        return imageUrl;

    } catch (error) {
        console.error("Error processing image:", error);
        throw error;
    }
}