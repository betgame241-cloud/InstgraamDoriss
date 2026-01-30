import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Use process.env.API_KEY directly as per guidelines.
// Always instantiate GoogleGenAI with { apiKey: process.env.API_KEY }.

export const analyzeProfile = async (profileData: any) => {
  // Create a new instance right before the call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this Instagram profile with deep strategic reasoning: ${JSON.stringify(profileData)}. 
    
    Requirements:
    1. Identify the unique value proposition of this creator.
    2. Suggest 3 high-impact bio rewrites.
    3. Propose a content theme for the next 5 reels based on current trends.
    4. Provide specific advice on aesthetic consistency.
    
    Be comprehensive and insightful.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};

export const editPostImage = async (base64Image: string, prompt: string) => {
  // Create a new instance right before the call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generatePostVideo = async (prompt: string, initialImageBase64?: string) => {
  // Use window.aistudio helper for API key selection as required for Veo models.
  const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
  if (!hasKey) {
    await (window as any).aistudio?.openSelectKey();
    // Guideline: Assume successful selection and proceed.
  }

  // Create instance right before making an API call to ensure latest key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const config: any = {
    numberOfVideos: 1,
    resolution: '720p',
    aspectRatio: '9:16'
  };

  const payload: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config
  };

  if (initialImageBase64) {
    payload.image = {
      imageBytes: initialImageBase64,
      mimeType: 'image/png'
    };
  }

  try {
    let operation = await ai.models.generateVideos(payload);

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    // Append API key when fetching from download link.
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    // Handle specific error code to re-prompt for key if needed.
    if (error?.message?.includes("Requested entity was not found.")) {
      await (window as any).aistudio?.openSelectKey();
      throw new Error("Project not found or API key invalid. Please select a valid paid project key.");
    }
    throw error;
  }
};