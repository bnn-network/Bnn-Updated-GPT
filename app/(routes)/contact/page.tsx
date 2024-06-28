import { Metadata } from 'next'
import Footer from '@/components/footer'
import '../../styles.css' // This should be the correct relative path

export const metadata: Metadata = {
  title: 'Contact BNNGPT - Get in Touch with Our AI Search Engine Team',
  description: `Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs.`,
  openGraph: {
    type: 'website',
    url: 'https://www.bnngpt.com/contact',
    title: 'Contact BNNGPT - Get in Touch with Our AI Search Engine Team',
    description:
      "Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs.",
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
    title: 'Contact BNNGPT - Get in Touch with Our AI Search Engine Team',
    description:
      "Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs.",
    images: ['https://www.bnngpt.com/og-image.jpg']
  }
}

export default function ContactPage() {
  return (
    <>
      <div className="inner_page bg-secondary">
        <a href="/" className="logo_div"></a>
        <h2>Contact Us</h2>
        <iframe
          src="https://forms.zohopublic.in/vijendersingh/form/BNNGPT/formperma/BHAVU_QZ00PzHO8Wfnx5gYJ_pZIRndsBaHZxTkN679w"
          title="Contact Form"
          style={{ width: '100%', height: '500px', border: 'none' }}
        ></iframe>
      </div>
      <Footer />
    </>
  )
}
