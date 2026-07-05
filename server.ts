import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (error) {
      console.error("Failed to initialize Gemini Client:", error);
    }
  } else {
    console.warn("GEMINI_API_KEY is missing or using default placeholder value.");
  }

  // API Route: AI Style & Motivation Recommender for Seonhaeng Brand
  app.post("/api/recommend", async (req, res) => {
    const { goal, feeling } = req.body;

    if (!goal || !feeling) {
      return res.status(400).json({ error: "Goal and feeling are required." });
    }

    if (!ai) {
      // Fallback response when API key is missing or not configured yet
      return res.json({
        message: `[API Key 미설정 데모 모드]\n\n"남들이 주저할 때 한 발 더 나아가는 자, 그가 바로 선행자(先行者)다."\n\n오늘 당신이 행동하고자 하는 목표 '${goal}'은(는) 새로운 흐름을 이끄는 첫 단추가 될 것입니다. 흔들리지 말고 당신만의 확신으로 가장 먼저 움직이십시오.\n\n추천 볼캡: Black Cap (블랙 볼캡)\n이유: 가장 깊고 단단한 블랙은 어떤 흔들림에도 타협하지 않는 독립적인 개성과 선행자의 묵직한 존재감을 완벽히 대변합니다.`,
        suggestedColor: "black"
      });
    }

    try {
      const prompt = `당신은 아방가르드하고 프리미엄한 스트릿 패션 브랜드 '선행(先行, Who Moves First)'의 정신을 대변하는 단단하고 카리스마 넘치는 철학자이자 디자이너입니다.
      
사용자가 작성한 오늘 주도적으로 시작하고 극복하려는 목표와 마음가짐을 듣고, 격려와 단단한 동기부여를 주는 '선행자(先行者)를 위한 지침'을 작성해 주세요.

사용자의 정보:
- 오늘 먼저 움직이고 싶은 목표: "${goal}"
- 현재 마주한 감정/마음가짐: "${feeling}"

요구 사항:
1. 어조는 부드럽고 가벼운 위로가 아닙니다. 가슴을 뜨겁게 울리고 주체성을 깨우는 카리스마 있고 묵직한 명언 스타일(예: '~하라', '~할 것이다', 또는 진중하고 격식 있는 어조)로 한국어로 작성해 주세요.
2. 이 목표를 달성하는 데 영감을 주는 추천 볼캡 컬러(Black, White, Navy 중 하나)와 그 감각적인 패션 디자인적인 이유를 추천해 주세요.
3. 응답은 아래의 JSON 포맷으로 정확히 리턴해 주세요. JSON 외에 다른 서두나 맺음말(예: \`\`\`json 등)은 완전히 배제하고 순수한 JSON 데이터만 제공하세요.

JSON 출력 포맷 예시:
{
  "message": "행동하지 않는 자에게 내일은 없다. 오직 먼저 발을 내딛는 자만이 길을 만든다. 당신의 목표를 향해 당당히 첫 걸음을 떼라.",
  "suggestedColor": "black",
  "reason": "블랙은 모든 빛을 흡수하는 가장 깊은 색입니다. 타인의 조급함이나 시선에 흔들리지 않고 당신만의 깊은 확신으로 묵직하게 전진하는 선행자에게 완벽한 파트너가 될 것입니다."
}`;

      // gemini-2.5-flash is the recommended model for general tasks
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "{}";
      const result = JSON.parse(responseText.trim());
      res.json(result);
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed to generate recommendation.",
        message: "Gemini API 호출 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      });
    }
  });

  // Serve static assets in production, otherwise mount Vite in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[先行] Server is listening on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
