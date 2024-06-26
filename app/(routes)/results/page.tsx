// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* <Head>
        <title>Paris Information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* for seo */}
      <div className="flex flex-row justify-center mt-10 ml-14">
        <main className="w-[786px]  px-4 py-8 mt-10">
          <h1 className="text-xl font-bold mb-4">Paris</h1>

          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 bg-results-foreground rounded text-sm">
              Culture
            </button>
            <button className="px-4 py-2 bg-results-foreground rounded text-sm">
              History
            </button>
          </div>

          <div className="bg-results-foreground rounded-lg  p-6">
            <div className="flex space-x-6 mb-4 text-sm">
              <button
                className="font-medium border-b-[1px]
            border-secondary"
              >
                Answer
              </button>
              <button>Media</button>
              <button>Sources</button>
            </div>
            <div className="mb-2 text-primary">Media</div>
            <div className="grid grid-cols-5 gap-2 mb-4 items-center">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-32 h-20 bg-gray-300 rounded"></div>
              ))}
              <div className="ml-8 text-sm font-medium">View All</div>
            </div>
            <div className="mb-8 text-primary">Sources</div>
            <div className="grid grid-cols-5 gap-2 mb-4 ml-4 text-sm">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className=" w-32 h-12">
                  {' '}
                  Sources
                </div>
              ))}
              <div className="font-medium">View All</div>
            </div>
            <h2 className="text-lg font-semibold mb-4">Discovering Paris</h2>

            <h3 className="text-base font-medium mb-2">History of Paris</h3>
            <p className="text-sm mb-4 text-text-secondary">
              Paris, the capital city of France, has a rich and complex history
              that dates back to ancient times. Here are some key historical
              highlights:
            </p>

            <div className="space-y-4">
              {[
                'Ancient and Medieval Periods:',
                'Renaissance and Enlightenment:',
                'Revolutionary and Napoleonic Eras:',
                '19th and 20th Centuries:',
                'Modern Era:'
              ].map(era => (
                <div key={era}>
                  <h4 className="font-medium ml-4">{era}</h4>
                  <p className="text-sm ml-8 text-text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-medium mb-2 mt-10">
              Culture of Paris
            </h3>
            <p className="text-sm mb-4">
              Paris is renowned for its vibrant and diverse cultural scene. Here
              are some key aspects:
            </p>

            <div className="space-y-4">
              {[
                'Art and Museums:',
                'Literature and Philosophy:',
                'Cafes and Salons:',
                'Fashion and Cuisine:',
                'Architecture and Landmarks:'
              ].map(era => (
                <div key={era}>
                  <h4 className="font-medium ml-4">{era}</h4>
                  <p className="text-sm ml-8 text-text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="flex flex-col space-y-4 mr-4 mt-40">
          <button className="w-10 h-10 bg-results-foreground rounded-full flex items-center justify-center">
            {/* Icon 1 */}
          </button>
          <button className="w-10 h-10 bg-results-foreground rounded-full  flex items-center justify-center">
            {/* Icon 2 */}
          </button>
          <button className="w-10 h-10 bg-results-foreground rounded-full  flex items-center justify-center">
            {/* Icon 3 */}
          </button>
        </div>
      </div>

      {/* <---->  */}
      <main className="w-[786px] mx-auto px-4 py-8 mt-10">
        <div className="bg-results-foreground rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Related</h2>

          <p className="text-sm mb-4 text-text-secondary">
            Paris, the capital city of France, has a rich and complex history
            that dates back to ancient times. Here are some key historical
            highlights:
          </p>
          <p className="text-sm mb-4 text-text-secondary">
            Paris, the capital city of France, has a rich and complex history
            that dates back to ancient times. Here are some key historical
            highlights:
          </p>
          <p className="text-sm mb-4 text-text-secondary">
            Paris, the capital city of France, has a rich and complex history
            that dates back to ancient times. Here are some key historical
            highlights:
          </p>
        </div>
      </main>
    </div>
  )
}
