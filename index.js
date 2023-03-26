import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { OpenAIApi, Configuration } from 'openai';

dotenv.config();

const { KEY, PORT } = process.env;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.KEY
  })
);

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/favicon.ico', () => {});

app.post('/api/chat', async (req, res) => {
  try {
    const proompt = req.body.proompt;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: proompt,
      temperature: 0.6
      // max_tokens: /* 2048 */ 100
    });

    res.status(200).json({
      resp: completion.data.choices[0].text.replace(/\n/g, '')
    });
  } catch (err) {
    res.status(500);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
