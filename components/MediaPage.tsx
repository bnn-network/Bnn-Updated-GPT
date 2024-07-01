export default function MediaPage() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex flex-row justify-center mt-10 ml-14">
        <main className="w-[786px] px-4 py-8 mt-10">
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
