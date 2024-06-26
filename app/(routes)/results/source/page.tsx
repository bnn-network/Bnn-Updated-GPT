export default function Page() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex flex-row justify-center mt-10 ml-14">
        <main className="w-[786px] px-4 py-8 mt-10">
          <h1 className="text-xl font-semibold mb-4 ">Paris</h1>
          <div className="bg-results-foreground rounded-lg p-6">
            <div className="flex mb-4 text-sm">
              <button className="mr-4">Answer</button>
              <button className="mr-4">Media</button>
              <button className="font-medium border-b-[1px] border-secondary">
                Sources
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[...Array(15)].map((_, i) => (
                // add custom color here
                <div key={i} className=" p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-1 truncate">
                    {i % 3 === 0 && 'Paris, France - Google Arts & Culture'}
                    {i % 3 === 1 && 'History of Paris - Wikipedia'}
                    {i % 3 === 2 &&
                      'HistoParis - Culture, Art, Romance | Britannica of Paris ...'}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {i % 3 === 0 && 'artsandculture.goo...'}
                    {i % 3 === 1 && 'en.wikipedia.org'}
                    {i % 3 === 2 && 'en.wikipedia.org'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-results-foreground p-4 rounded-lg  text-sm">
            <h2 className="font-bold mb-2">Related</h2>
            <ul className="space-y-2 text-text-secondary">
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

          <div className="mt-6 bg-results-foreground p-4 rounded-lg">
            <h2 className="font-bold mb-2 text-sm">Follow Up</h2>
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full p-2 rounded-lg  text-sm"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
