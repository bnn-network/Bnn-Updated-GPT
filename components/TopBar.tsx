import TopBarItem from '@/components/Top-bar-items'
import DynamicShareButton from '@/components/share-button'

const TopBar = () => {
  return (
    <div className="flex flex-col  mt-20  max-w-3xl mx-auto ">
      <h1 className=" flex text-lg font-base mb-8 items-center justify-center">
        About Us
      </h1>
      <div className="flex flex-row gap-10">
        <TopBarItem href="/landing/about" title="General Information" />
        <TopBarItem href="/landing/about/privacy" title="Privacy Policy" />
        <TopBarItem href="/landing/about/tos" title="Terms of services" />
        <div className="absolute top-60 right-60">
          <div className="hidden lg:block top-60 xl:top-20">
            <DynamicShareButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
