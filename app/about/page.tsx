import '../styles.css' // This should be the correct relative path
import Head from 'next/head'

export default function Page() {
  return (
    <div className="inner_page">
      {/* Head component for SEO enhancements */}
      <Head>
        <title>
          About BNNGPT - Leading AI-Powered Search Engine for Accurate Answers
        </title>
        <meta
          name="description"
          content="Learn how BNNGPT redefines search with AI, delivering precise, human-like responses to your queries."
        />
        <meta
          property="og:title"
          content="About BNNGPT - Leading AI-Powered Search Engine for Accurate Answers"
        />
        <meta
          property="og:description"
          content="Learn how BNNGPT redefines search with AI, delivering precise, human-like responses to your queries."
        />
        <meta property="og:url" content="https://www.bnngpt.com/about" />
        <meta property="og:image" content="https://www.bnngpt.com/logo.jpg" />
        <meta property="og:site_name" content="BNNGPT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashadphz" />
        <meta name="twitter:creator" content="@rashadphz" />
        <meta
          name="twitter:title"
          content="About BNNGPT - Leading AI-Powered Search Engine for Accurate Answers"
        />
        <meta
          name="twitter:description"
          content="Learn how BNNGPT redefines search with AI, delivering precise, human-like responses to your queries."
        />
        <meta name="twitter:image" content="https://www.bnngpt.com/logo.jpg" />
      </Head>
      <a href="/" className="logo_div"></a>
      <h2>About Us</h2>
      <h3>Welcome to BNNGPT – The Future of AI-Powered Search</h3>
      <p>
        At BNNGPT, we're redefining the way you search and interact with
        information. As a leading AI-powered search engine, we are dedicated to
        providing the most accurate, relevant, and human-like responses to your
        queries. BNNGPT stands at the forefront of artificial intelligence,
        leveraging cutting-edge deep learning and natural language processing
        techniques to deliver an unparalleled search experience.
      </p>
      <h3>Our Technology</h3>
      <p>
        BNNGPT, or "Big Neural Network GPT," represents the pinnacle of AI
        innovation. Building on the revolutionary GPT (Generative Pre-trained
        Transformer), BNNGPT utilizes advanced transformers to comprehend and
        generate text with remarkable coherence and relevance. Trained on vast
        amounts of data, our AI understands patterns, context, and semantics,
        ensuring that you receive the most contextually appropriate and accurate
        responses.
      </p>
      <p>
        Powered by{' '}
        <a href="https://epiphany-ai.com/" target="_blank">
          ePiphany AI
        </a>
        , BNNGPT benefits from a robust AI core that seamlessly integrates with
        intricate application layers and user-focused interfaces. ePiphany AI is
        known for its revolutionary approach to artificial intelligence,
        blending advanced technology with user-friendly solutions to transform
        business operations and everyday interactions. This powerful partnership
        enhances BNNGPT's capabilities, ensuring it remains at the cutting edge
        of AI development.
      </p>
      <h3>Why Use BNNGPT?</h3>
      <ul>
        <li>
          Precision and Accuracy: Our sophisticated algorithms ensure that you
          get precise answers, cutting through the noise to deliver exactly what
          you need.
        </li>
        <li>
          Human-like Interaction: BNNGPT offers a conversational search
          experience, making your interactions with the search engine feel
          natural and intuitive.
        </li>
        <li>
          Broad Applications: From everyday questions to complex research
          topics, BNNGPT is designed to handle a wide range of queries,
          supporting both casual users and professionals alike.
        </li>
        <li>
          Continuous Improvement: Our AI constantly learns and evolves,
          incorporating the latest advancements in AI research to stay ahead of
          the curve and provide you with the best possible service.
        </li>
      </ul>
      <h3>Our Mission</h3>
      <p>
        At BNNGPT, our mission is to transform the way people access and engage
        with information. We aim to empower users by making knowledge more
        accessible, understandable, and actionable. Whether you're a student, a
        professional, or just someone with a curious mind, BNNGPT is here to
        help you find the answers you seek with ease and confidence.
      </p>

      <h3>Join Us in Shaping the Future</h3>
      <p>
        Discover the power of AI with BNNGPT and experience a new era of search
        technology. Join our growing community of users who trust BNNGPT for its
        reliability, accuracy, and innovative approach to information retrieval.
      </p>
      <p>
        Explore BNNGPT today and see how we're making the future of search
        smarter, faster, and more intuitive.
      </p>
    </div>
  )
}
