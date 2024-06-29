// app/(routes)/search/layout.tsx
import dynamic from 'next/dynamic'

const ClientDynamicSeo = dynamic(
  () => import('@/components/ClientDynamicSeo'),
  {
    ssr: false
  }
)

export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientDynamicSeo />
      {children}
    </>
  )
}
