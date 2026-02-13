import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

async function callDeepseek(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'user', content: prompt }
      ],
      stream: false
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Deepseek API:', error.message);
    throw error;
  }
}

function printOutput(content) {
  console.log('='.repeat(50));
  console.log('DeepSeek输出结果:');
  console.log('='.repeat(50));
  console.log(content);
  console.log('='.repeat(50));
}

async function main() {
  const prompt = '你好，请介绍一下你自己。';
  
  try {
    const response = await callDeepseek(prompt);
    printOutput(response);
  } catch (error) {
    console.error('程序执行失败:', error);
  }
}

main();
