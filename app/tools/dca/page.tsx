import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DCACalculator from "./DCACalculatorClient";

export const metadata = {
  title: "DCA Calculator - Compare Bitcoin vs Traditional Assets | soundsfair",
  description: "Calculate and compare Dollar Cost Averaging (DCA) performance between Bitcoin, S&P 500, Gold, and MSCI World. Interactive tool with historical data and visualizations.",
};

export default function DCACalculatorPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <DCACalculator />

        {/* Educational Section */}
        <section className="max-w-4xl mx-auto mt-16 space-y-8">
          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-yellow">
              What is Dollar Cost Averaging (DCA)?
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Dollar Cost Averaging is an investment strategy where you invest a fixed amount of money
                at regular intervals, regardless of the asset's price. This approach helps reduce the impact
                of market volatility and removes the emotional aspect of trying to time the market.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By investing consistently over time, you buy more units when prices are low and fewer units
                when prices are high, potentially lowering your average cost per unit over the long term.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-yellow">
              Understanding the Metrics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-brand-yellow">ROI (Return on Investment)</h3>
                <p className="text-sm text-gray-300">
                  The percentage gain or loss on your total investment. Calculated as
                  (Current Value - Total Invested) / Total Invested × 100.
                </p>
              </div>

              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-brand-yellow">CAGR (Compound Annual Growth Rate)</h3>
                <p className="text-sm text-gray-300">
                  The mean annual growth rate of your investment over time, providing a smoothed
                  average that accounts for compounding.
                </p>
              </div>

              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-brand-yellow">Maximum Drawdown</h3>
                <p className="text-sm text-gray-300">
                  The largest peak-to-trough decline in portfolio value. This indicates the maximum
                  loss you would have experienced during the investment period.
                </p>
              </div>

              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-brand-yellow">Volatility</h3>
                <p className="text-sm text-gray-300">
                  A measure of price fluctuation over time. Higher volatility means larger price swings,
                  both up and down.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-4 text-brand-yellow">
              Why Compare Different Assets?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Understanding how Bitcoin performs relative to traditional assets helps you make informed
              investment decisions. Each asset class has different characteristics:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-brand-yellow mr-2">•</span>
                <span><strong>Bitcoin:</strong> Digital, scarce, decentralized. High volatility, high potential returns.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-2">•</span>
                <span><strong>S&P 500:</strong> Diversified US stocks. Moderate growth, lower volatility than Bitcoin.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-2">•</span>
                <span><strong>Gold:</strong> Traditional store of value. Low volatility, inflation hedge.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-2">•</span>
                <span><strong>MSCI World:</strong> Global diversified equities. Balanced international exposure.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-brand-yellow rounded-lg p-6">
            <p className="text-sm text-gray-400 text-center">
              <strong className="text-brand-yellow">Disclaimer:</strong> This calculator is for educational purposes only.
              Past performance does not guarantee future results. Not financial advice.
              Always do your own research and consult with financial professionals.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
