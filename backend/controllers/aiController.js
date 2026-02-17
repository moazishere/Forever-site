import { GoogleGenerativeAI } from "@google/generative-ai";
import productModel from "../models/productModel.js"; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiChat = async (req, res) => {
    try {
        const { userQuery } = req.body;

        const products = await productModel.find({});
        
        const productDataSummary = products.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description,
            category: p.category,
            price: p.price
        }));

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        You are an intelligent sales assistant for the "FOREVER" clothing store.
        Your goal is to analyze the customer's request and provide personalized outfit recommendations based on the provided product catalog.

        ### Available Products (JSON Data):
        ${JSON.stringify(productDataSummary)}

        ### Customer's Request:
        "${userQuery}"

        ### Instructions:
        1. Analyze the customer's needs (style, occasion, budget, etc.).
        2. Filter the available products to find the best matches.
        3. Respond ONLY in valid JSON format.
        4. The "analysis" and "reason" fields MUST be in ARABIC.

        ### Expected JSON Structure:
        {
          "analysis": "A direct, helpful response to the customer in Arabic",
          "recommendations": [
            { 
              "productName": "Product Name", 
              "reason": "Explain why this product suits their request", 
              "productId": "The actual product ID" 
            }
          ]
        }
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        res.json(JSON.parse(cleanJson));

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An Error happend to The AI Engine" });
    }
};

export { aiChat };