import TopBar from '@/components/TopBar'
import DynamicShareButton from '@/components/share-button'

export default function Page() {
  const sections = [
    {
      heading: 'Last updated: May 18th, 2024.',
      content: `This privacy policy (“Policy”) describes how www.bnngpt.com and associated websites (“BNNGPT,” “we,” “us,” or “our”) collect, use, share, and protect information about you when you use our website, products, and services (collectively, the “Services”). This Privacy Policy does not cover the BNNGPT API, which is subject to the terms outlined in the Data Processing Agreement.`
    },
    {
      heading: 'Our Services',
      content: `BNNGPT, powered by ePiphany AI, provides advanced AI-powered search and text generation services. BNNGPT is available viawww.bnngpt.com and other related internet domains.`
    },
    {
      heading: 'Information We Collectet',
      content: (
        <>
          When you visit our website, we may automatically collect certain
          information from your device. This information may include your IP
          address, device type, unique device identification numbers, browser
          type, broad geographic location (e.g., country or city-level
          location), and other technical information. We may also collect
          information about how your device has interacted with our website,
          including the pages accessed and links clicked. Collecting this
          information helps us better understand the visitors to our website,
          their locations, and their interests. We use this information for
          internal analytics purposes and to improve the quality and relevance
          of our services.
          <br />
          <br />
          If you create an account on our website, we will collect certain
          information from you, such as your name, email address, and password.
          We use this information to provide you with access to your account and
          customer support.
        </>
      )
    },
    {
      heading: 'Information We Do Not Collect',
      content: (
        <>
          We do not knowingly collect any sensitive information from you, such
          as information about your race or ethnic origin, political opinions,
          religion, or health.
        </>
      )
    },
    {
      heading: 'Sharing of Information',
      content: [
        'We do not sell, trade, or otherwise share your personal information with third parties, except as described in this Policy. We may share your personal information with the following types of third parties:',
        'Service Providers: We may share personal information with service providers that perform certain services on our behalf, such as sending emails, processing payments, or providing customer support.',
        `Analytics Service Providers: We may share anonymized usage information with analytics service providers that assist us in improving and optimizing our website. For example, we use Google Analytics: Google's Privacy Policy.`
      ]
    },
    {
      heading: 'Third-Party Services',
      content: (
        <>
          We may use third-party services, such as Application Programming
          Interfaces (APIs), to maintain and improve our services. For example,
          queries may be transmitted to the OpenAI API to serve requests. No
          personally identifiable information (PII) is transmitted unless
          required for service continuity, such as sending emails, processing
          payments, or providing customer support.
          <br />
          <br />
          We may use site monitoring tools, such as Cloudflare, Sentry, and
          Umami, to collect anonymized information about usage. These tools may
          collect your IP address, device type, browser type, operating system,
          geographic location, and other technical information. We use this
          information to improve the quality and relevance of our website for
          our visitors.
        </>
      )
    },
    {
      heading: 'Security',
      content: (
        <>
          We take reasonable measures to protect the personal information we
          collect from you. Data is securely stored on Amazon Web Services.
          However, no security measure is perfect, and we cannot guarantee the
          absolute security of your personal information.
        </>
      )
    }
  ]

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-primary">
        <div className="max-w-3xl mx-auto py-12">
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
    </>
  )
}
