import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StreamingTextResponse } from "ai"

export async function POST(req: NextRequest) {
  try {
    const input = await req.json()
    console.log(input)
    if (!input)
      return NextResponse.json({ error: "Missing input data." }, { status: 400 })
    const response = await fetch(
      "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: input }),
      }
    );
    const result = await response.json();
    // return new StreamingTextResponse(result)
    console.log("iasgdfuaafdd-------->", result)
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: response.status })
    }
    else {
      const data = result[0].generated_text.replace(input, "")
        .trim();
      return NextResponse.json({ data }, { status: response.status })
    }

  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 })
  }
}



// import { HfInference } from '@huggingface/inference';
// import { HuggingFaceStream, StreamingTextResponse } from 'ai';
// import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';

// // Create a new Hugging Face Inference instance
// const Hf = new HfInference("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");

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const messages = await req.json();
//     console.log("----------------------------------------------------")
//     const response = await Hf.textGenerationStream({
//       model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
//       inputs: experimental_buildOpenAssistantPrompt([messages.prompt]),
//       parameters: {
//         max_new_tokens: 200,
//         // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
//         typical_p: 0.2,
//         repetition_penalty: 1,
//         truncate: 1000,
//         return_full_text: false,
//       },
//     });

//     const stream = HuggingFaceStream(response);
//     const data = new StreamingTextResponse(stream);
//     console.log("Data: ", data)
//     return data;
//   } catch (error) {

//     console.log("Error : ", error)
//   }
// }