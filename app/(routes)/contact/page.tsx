import Footer from '@/components/footer'
import '../../styles.css' // This should be the correct relative path
import { NextSeo } from 'next-seo'

export async function generateMetadata() {
  return {
    title: 'Contact BNNGPT - Get in Touch with Our AI Search Engine Team',
    description: `Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs.`,
    metadataBase: new URL('https://www.bnngpt.com/contact')
  }
}

export default function Page() {
  return (
    <>
      <NextSeo
        title="Contact BNNGPT - Get in Touch with Our AI Search Engine Team"
        description="Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs."
        openGraph={{
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
          site_name: 'BNNGPT'
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@epiphanyaitech' // If you have a Twitter handle for your site
        }}
      />
      <div className="inner_page bg-secondary">
        <a href="/" className="logo_div"></a>
        <h2>Contact Us</h2>
        <iframe src="https://forms.zohopublic.in/vijendersingh/form/BNNGPT/formperma/BHAVU_QZ00PzHO8Wfnx5gYJ_pZIRndsBaHZxTkN679w"></iframe>
      </div>
      <Footer />
    </>
  )
}
