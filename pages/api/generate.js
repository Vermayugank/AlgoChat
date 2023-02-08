import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  "This is a chat related to Algorand Blockchain. You Only need to answer the questions related to Algorand Blockchain. Refuse to answer the Questions not related to Algorand Blockchain.";
const generateAction = async (req, res) => {

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.usrInput}`,
    temperature: 0.5,
    max_tokens: 650,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
