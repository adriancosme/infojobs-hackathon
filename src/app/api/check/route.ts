import { ICheckDescription } from '@/models/CheckDescription.model';
import { NextRequest, NextResponse } from 'next/server';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const INITIAL_PROMPT: Array<ChatCompletionRequestMessage> = [
    {
        content: `
        You are a world class HR Recruiter
        You will be provided with JSON with the following keys. The JSON will start delimitated by triple quotes
        {
           "text": [text],
           "lang": [lang]
        }
        
        Check if the text follow the rules:
        Resume language should be:
        • Specific rather than general
        • Active rather than passive
        • Written to express not impress
        • Articulate rather than “flowery”
        • Fact-based (quantify and qualify)
        • Written for people who scan quickly
        
        Don't:
        • Use personal pronouns (such as I)
        • Abbreviate
        • Use a narrative style
        • Use slang or colloquialisms        
        
        Do: 
        • Be consistent in format and content
        • Use consistent spacing, underlining, italics, bold,
        and capitalization for emphasis        
        
        Check common mistakes. Make sure that you validate the following:
        • Spelling and grammar errors
        • Using passive language instead of “action” words
        • Not well organized, concise, or easy to skim
        • Not demonstrating results
        • Too long
        • Buzzwords
        
        You should validate all previous mentioned and give a score from 1 to 10 of the text and give feedback.
        If the JSON provided with the key [lang] contains [ES] you will provide feedback in Spanish. If the JSON provided with the key [lang] contains [EN] you will provide feedback in English. By default provide feedback in English.
        
        The output should be a JSON with the following format:
        {
           "score": [score],
           "feedback": [feedback]
        }
        `,
        role: ChatCompletionRequestMessageRoleEnum.System,
    }
];

const getCompletion = async (prompt: string, model: string = "gpt-3.5-turbo") => {
    const messages: Array<ChatCompletionRequestMessage> = [
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: prompt,
        }
    ]

    const response = await openai.createChatCompletion({
        model,
        temperature: 0,
        messages: [
            ...INITIAL_PROMPT,
            ...messages
        ]
    })
    return response;
}

const getPrompt = (checkDescription: ICheckDescription) => {
    return `"""
    ${JSON.stringify(checkDescription)}
    """`
}

export async function POST(request: NextRequest) {
    try {
        const { text, lang } = await request.json();
        const prompt = getPrompt({ text, lang });
        const completion = await getCompletion(prompt);
        const jsonResponse = completion.data.choices[0].message?.content ?? '';
        return NextResponse.json(JSON.parse(jsonResponse), { status: 200 });
    }
    catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}