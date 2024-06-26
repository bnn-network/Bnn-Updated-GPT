export default function Page() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex flex-row justify-center mt-10 ml-14">
        <main className="w-[786px] px-4 py-8 mt-10">
          <h1 className="text-xl font-semibold mb-4 ">Paris</h1>
          <div className="bg-results-foreground rounded-lg p-6">
            <div className="flex mb-4 text-sm">
              <button className="mr-4">Answer</button>
              <button
                className="mr-4 font-medium border-b-[1px]
            border-secondary"
              >
                Media
              </button>
              <button>Sources</button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-full h-40 rounded-lg overflow-hidden">
                  <img
                    src={`https://picsum.photos/200/150?random=${i}`}
                    alt="Paris"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button className="w-full py-2rounded-lg">Load More</button>
          </div>

          <div className="mt-6 bg-results-foreground p-4 rounded-lg text-text-secondary text-sm">
            <h2 className="font-bold mb-2">Related</h2>
            <ul className="space-y-2">
              <li>
                What are the different types of inflation and how do they
                manifest in an economy?
              </li>
              <li>
                How do central banks control inflation through monetary policy
                tools like interest rates and money supply adjustments?
              </li>
              <li>
                What are the long-term effects of persistent inflation on an
                economy's growth, employment, and overall stability?
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
