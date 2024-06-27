import TopBar from '@/components/TopBar'
import DynamicShareButton from '@/components/share-button'

export default function Page() {
  const sections = [
    {
      heading: 'Welcome to BNNGPT — The Future of AI-Powered Search',
      content:
        "At BNNGPT, we're redefining the way you search and interact with information. As a leading AI-powered search engine, we are dedicated to providing the most accurate, relevant, and human-like responses to your queries. BNNGPT stands at the forefront of artificial intelligence, leveraging cutting-edge deep learning and natural language processing techniques to deliver an unparalleled search experience."
    },
    {
      heading: 'Our Technology',
      content: `BNNGPT, or "Big Neural Network GPT," represents the pinnacle of AI innovation. Building on the revolutionary GPT (Generative Pre-trained Transformer), BNNGPT utilizes advanced transformers to comprehend and generate text with remarkable coherence and relevance. Trained on vast amounts of data, our AI understands patterns, context, and semantics, ensuring that you receive the most contextually appropriate and accurate responses. Powered by ePiphany AI, BNNGPT's benefits from a robust AI core that seamlessly integrates with intricate application layers and user-focused interfaces. ePiphany AI is known for its revolutionary approach to artificial intelligence, blending advanced technology with user-friendly solutions to transform business operations and everyday interactions. This powerful partnership enhances BNNGPT capabilities, ensuring it remains at the cutting edge of AI development.`
    },
    {
      heading: 'Why Use BNNGPT?',
      content: [
        'Precision and Accuracy: Our sophisticated algorithms ensure that you get precise answers, cutting through the noise to deliver exactly what you need.',
        'Human-like Interaction: BNNGPT offers a conversational search experience, making your interactions with the search engine feel natural and intuitive.',
        'Broad Applications: From everyday questions to complex research topics, BNNGPT is designed to handle a wide range of queries, supporting both casual users and professionals alike.',
        'Continuous Improvement: Our AI constantly learns and evolves, incorporating the latest advancements in AI research to stay ahead of the curve and provide you with the best possible service.'
      ]
    },
    {
      heading: 'Our Mission',
      content: `At BNNGPT, our mission is to transform the way people access and engage with information. We aim to empower users by making knowledge more accessible, understandable, and actionable. Whether you're a student, a professional, or just someone with a curious mind, BNNGPT is here to help you find the answers you seek with ease and confidence.`
    },
    {
      heading: 'Join Us in Shaping the Future',
      content: `Discover the power of AI with BNNGPT and experience a new era of search technology. Join our growing community of users who trust BNNGPT for its reliability, accuracy, and innovative approach to information retrieval.

Explore BNNGPT today and see how we're making the future of search smarter, faster, and more intuitive.`
    }
  ]

  return (
    <div>
      <TopBar />
      <DynamicShareButton />
      <div className="min-h-screen bg-primary">
        <div className="max-w-3xl mx-auto py-12">
          {/* <h1 className="text-lg font-base mb-8 items-center">About Us</h1> */}
          {sections.map((section, index) => (
            <div
              key={index}
              className="mb-8 p-6 bg-results-foreground rounded-xl"
            >
              <h2 className="text-lg font-medium mb-4">{section.heading}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-5 text-text-secondary text-sm">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary text-sm">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
