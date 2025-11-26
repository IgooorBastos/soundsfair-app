"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DCAInput, DCAResult, Asset, Frequency } from '../types/tools';
import { formatCurrency, formatPercentage, formatNumber } from '../lib/dca-calculator';

const ASSET_COLORS = {
  BTC: '#FFD000',
  SP500: '#F7931A',
  GOLD: '#CCCCCC',
  MSCI_WORLD: '#666666'
};

const ASSET_LABELS = {
  BTC: 'Bitcoin',
  SP500: 'S&P 500',
  GOLD: 'Gold',
  MSCI_WORLD: 'MSCI World'
};

export default function DCACalculator() {
  const [formData, setFormData] = useState<DCAInput>({
    amount: 100,
    frequency: 'weekly',
    startDate: '2020-01-01',
    endDate: new Date().toISOString().split('T')[0],
    assets: ['BTC', 'SP500']
  });

  const [results, setResults] = useState<DCAResult[] | null>(null);
  const [chartData, setChartData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof DCAInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAsset = (asset: Asset) => {
    setFormData(prev => ({
      ...prev,
      assets: prev.assets.includes(asset)
        ? prev.assets.filter(a => a !== asset)
        : [...prev.assets, asset]
    }));
  };

  const handleCalculate = async () => {
    if (formData.assets.length === 0) {
      setError('Please select at least one asset');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/dca/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Calculation failed');
      }

      const data = await response.json();
      setResults(data.results);
      setChartData(data.chartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults(null);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      amount: 100,
      frequency: 'weekly',
      startDate: '2020-01-01',
      endDate: new Date().toISOString().split('T')[0],
      assets: ['BTC', 'SP500']
    });
    setResults(null);
    setChartData(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-brand-yellow">DCA</span> Calculator
        </h1>
        <p className="text-lg text-gray-300">
          Compare Bitcoin's performance vs traditional assets using Dollar Cost Averaging
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-brand-yellow">Settings</h2>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 focus:border-brand-yellow focus:outline-none"
                min="1"
              />
            </div>

            {/* Frequency */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Frequency
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['weekly', 'biweekly', 'monthly', 'daily'] as Frequency[]).map(freq => (
                  <button
                    key={freq}
                    onClick={() => handleInputChange('frequency', freq)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.frequency === freq
                        ? 'bg-brand-yellow text-black'
                        : 'bg-black border border-gray-800 text-gray-300 hover:border-brand-yellow'
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 focus:border-brand-yellow focus:outline-none"
              />
            </div>

            {/* End Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 focus:border-brand-yellow focus:outline-none"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Assets */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Assets to Compare
              </label>
              <div className="space-y-2">
                {(['BTC', 'SP500', 'GOLD', 'MSCI_WORLD'] as Asset[]).map(asset => (
                  <label key={asset} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.assets.includes(asset)}
                      onChange={() => toggleAsset(asset)}
                      className="mr-3 w-5 h-5 accent-brand-yellow"
                    />
                    <span className="text-sm">{ASSET_LABELS[asset]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCalculate}
                disabled={loading || formData.assets.length === 0}
                className="w-full bg-brand-yellow text-black font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Calculating...' : 'Calculate DCA'}
              </button>
              <button
                onClick={handleReset}
                className="w-full border border-gray-800 text-gray-300 font-medium py-3 rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results && chartData ? (
            <>
              {/* Chart */}
              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      stroke="#999"
                      tick={{ fill: '#999' }}
                    />
                    <YAxis
                      stroke="#999"
                      tick={{ fill: '#999' }}
                      label={{ value: 'Indexed (100 = start)', angle: -90, position: 'insideLeft', fill: '#999' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1A1A',
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    {results.map(result => (
                      <Line
                        key={result.asset}
                        type="monotone"
                        dataKey={result.asset}
                        name={ASSET_LABELS[result.asset]}
                        stroke={ASSET_COLORS[result.asset]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {results.map(result => (
                  <div
                    key={result.asset}
                    className="bg-dark-grey border border-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold">{ASSET_LABELS[result.asset]}</h4>
                      <span
                        className="text-3xl font-bold"
                        style={{ color: ASSET_COLORS[result.asset] }}
                      >
                        {formatPercentage(result.roi)}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invested:</span>
                        <span className="font-medium">{formatCurrency(result.totalInvested)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Value:</span>
                        <span className="font-medium">{formatCurrency(result.currentValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Units:</span>
                        <span className="font-medium">{formatNumber(result.units, 4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CAGR:</span>
                        <span className="font-medium">{formatPercentage(result.cagr)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Metrics Table */}
              <div className="bg-dark-grey border border-gray-800 rounded-lg p-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-6">Detailed Metrics</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4">Asset</th>
                      <th className="text-right py-3 px-4">Invested</th>
                      <th className="text-right py-3 px-4">Units</th>
                      <th className="text-right py-3 px-4">Value</th>
                      <th className="text-right py-3 px-4">ROI</th>
                      <th className="text-right py-3 px-4">CAGR</th>
                      <th className="text-right py-3 px-4">Max Drawdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(result => (
                      <tr key={result.asset} className="border-b border-gray-800/50">
                        <td className="py-3 px-4 font-medium">{ASSET_LABELS[result.asset]}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.totalInvested)}</td>
                        <td className="text-right py-3 px-4">{formatNumber(result.units, 4)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.currentValue)}</td>
                        <td className="text-right py-3 px-4">
                          <span className={result.roi >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {formatPercentage(result.roi)}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">{formatPercentage(result.cagr)}</td>
                        <td className="text-right py-3 px-4 text-red-400">
                          -{formatPercentage(result.drawdown, 1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 border border-gray-800 text-gray-300 font-medium py-3 rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors">
                  Export CSV
                </button>
                <button className="flex-1 border border-gray-800 text-gray-300 font-medium py-3 rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors">
                  Share Results
                </button>
              </div>
            </>
          ) : (
            <div className="bg-dark-grey border border-gray-800 rounded-lg p-12 text-center">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg font-medium">No Results Yet</p>
                <p className="text-sm mt-2">
                  Configure your DCA strategy on the left and click Calculate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
