import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.question.subject,
    temperature: 0.6,
    max_tokens: 2048,
    // stream: true
  });
  res.status(200).json({ result: completion.data.choices[0].text });
};

export default api;
