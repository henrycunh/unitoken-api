import { Hono } from 'hono'
import { AnthropicEncoder, OpenAIEncoder } from 'unitoken'

const app = new Hono()

const providerEncoderMapping = {
    'openai': OpenAIEncoder,
    'anthropic': AnthropicEncoder
}

const modelProviderMapping = {
    'gpt-4': 'openai',
    'claude-2': 'anthropic'
}

app.post('/', async (c) => {
    let encoder
    
    const { text, model, provider } = await c.req.json()
    let resolvedProvider = provider
    

    if (!text) {
        return c.json({ error: 'Text is required' }, 400)
    }


    if (model) {
        if (!(model in modelProviderMapping)) {
            return c.json({ error: `Model ${model} not supported` }, 400)
        }

        resolvedProvider = modelProviderMapping[model as keyof typeof modelProviderMapping]
    }

    if (!(resolvedProvider in providerEncoderMapping)) {
        return c.json({ error: `Provider ${resolvedProvider} not supported` }, 400)
    }

    encoder = providerEncoderMapping[resolvedProvider as keyof typeof providerEncoderMapping]

    return c.json(encoder.encode(text).length)
})

export default app
