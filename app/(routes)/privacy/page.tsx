import { Metadata } from 'next'
import Footer from '@/components/footer'
import '../../styles.css' // Ensure this path is correct

export const metadata: Metadata = {
  title: 'BNNGPT Privacy Policy - Protecting Your Data and Privacy',
  description: `Read BNNGPT's Privacy Policy to learn how we collect, use, and protect your information.`,
  openGraph: {
    type: 'website',
    url: 'https://www.bnngpt.com/privacy',
    title: 'BNNGPT Privacy Policy - Protecting Your Data and Privacy',
    description:
      "Read BNNGPT's Privacy Policy to learn how we collect, use, and protect your information.",
    images: [
      {
        url: 'https://www.bnngpt.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'BNNGPT Open Graph Image'
      }
    ],
    siteName: 'BNNGPT'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@epiphanyaitech',
    title: 'BNNGPT Privacy Policy - Protecting Your Data and Privacy',
    description:
      "Read BNNGPT's Privacy Policy to learn how we collect, use, and protect your information.",
    images: ['https://www.bnngpt.com/og-image.jpg']
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="inner_page">
        <a href="/" className="logo_div"></a>
        <h2>BNNGPT Privacy Policy</h2>
        <p>Last updated: May 18th, 2024.</p>
        <p>
          This privacy policy ("Policy") describes how{' '}
          <a href="http://www.bnngpt.com/">www.bnngpt.com</a> and associated
          websites ("BNNGPT," "we," "us," or "our") collect, use, share, and
          protect information about you when you use our website, products, and
          services (collectively, the "Services"). This Privacy Policy does not
          cover the BNNGPT API, which is subject to the terms outlined in the
          Data Processing Agreement.
        </p>
        <h3>Our Services</h3>
        <p>
          BNNGPT, powered by ePiphany AI, provides advanced AI-powered search
          and text generation services. BNNGPT is available via
          <a href="http://www.bnngpt.com/">www.bnngpt.com</a> and other related
          internet domains.
        </p>
        <h3>Information We Collect</h3>
        <p>
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
        </p>
        <p>
          If you create an account on our website, we will collect certain
          information from you, such as your name, email address, and password.
          We use this information to provide you with access to your account and
          customer support.
        </p>
        <h3>Information We Do Not Collect</h3>
        <p>
          We do not knowingly collect any sensitive information from you, such
          as information about your race or ethnic origin, political opinions,
          religion, or health.
        </p>
        <h3>Sharing of Information</h3>
        <p>
          We do not sell, trade, or otherwise share your personal information
          with third parties, except as described in this Policy. We may share
          your personal information with the following types of third parties:
        </p>
        <ul>
          <li>
            Service Providers: We may share personal information with service
            providers that perform certain services on our behalf, such as
            sending emails, processing payments, or providing customer support.
          </li>
          <li>
            Analytics Service Providers: We may share anonymized usage
            information with analytics service providers that assist us in
            improving and optimizing our website. For example, we use Google
            Analytics:{' '}
            <a href="https://policies.google.com/technologies/partner-sites">
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
        </ul>
        <h3>Third-Party Services</h3>
        <p>
          We may use third-party services, such as Application Programming
          Interfaces (APIs), to maintain and improve our services. For example,
          queries may be transmitted to the OpenAI API to serve requests. No
          personally identifiable information (PII) is transmitted unless
          required for service continuity, such as sending emails, processing
          payments, or providing customer support.
        </p>
        <p>
          We may use site monitoring tools, such as Cloudflare, Sentry, and
          Umami, to collect anonymized information about usage. These tools may
          collect your IP address, device type, browser type, operating system,
          geographic location, and other technical information. We use this
          information to improve the quality and relevance of our website for
          our visitors.
        </p>
        <h3>Security</h3>
        <p>
          We take reasonable measures to protect the personal information we
          collect from you. Data is securely stored on Amazon Web Services.
          However, no security measure is perfect, and we cannot guarantee the
          absolute security of your personal information.
        </p>
        <h3>Data Retention</h3>
        <p>
          We retain your personal information for as long as your account is
          active or as needed to provide you with our services. You may opt out
          of data collection for AI improvement purposes in your account
          settings. If you delete your account, we will delete your personal
          information from our servers within 30 days. Please contact us at{' '}
          <a href="mailto:support@bnngpt.com">support@bnngpt.com</a> to request
          deletion.
        </p>
        <h3>Changes to Our Privacy Policy</h3>
        <p>
          We may update this Policy from time to time. If we make changes, we
          will post the revised Policy on our website and update the "Last
          updated" date above. We encourage you to review the Policy whenever
          you access or use our Services or otherwise interact with us to stay
          informed about our information practices and the choices available to
          you.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Policy, please contact us at{' '}
          <a href="mailto:support@bnngpt.com">support@bnngpt.com</a>.
        </p>
      </div>
      <Footer />
    </>
  )
}
