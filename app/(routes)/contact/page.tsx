import Footer from '@/components/footer'
import '../../styles.css' // This should be the correct relative path


export async function generateMetadata() {
  return {
    title: 'Contact BNNGPT - Get in Touch with Our AI Search Engine Team',
    description: `Reach out to BNNGPT for support, inquiries, or feedback. We're here to assist with all your AI search engine needs.`,
    metadataBase: new URL('https://www.bnngpt.com'),
    alternates: {
      canonical: "/contact"
    }
  }
}

export default function Page() {
  return (
    <>
      <div className="inner_page bg-secondary">
        <a href="/" className="logo_div"></a>
        <h1>Contact Us</h1>
        <iframe src="https://forms.zohopublic.in/vijendersingh/form/BNNGPT/formperma/BHAVU_QZ00PzHO8Wfnx5gYJ_pZIRndsBaHZxTkN679w"></iframe>
      </div>
      <Footer />
    </>
  )
}
