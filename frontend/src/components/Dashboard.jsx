import React, { useState } from 'react';
import { mockData } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Bug, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Target,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [sortBy, setSortBy] = useState('revenue');
  const [selectedBug, setSelectedBug] = useState(null);

  const sortedFeatures = [...mockData.featureRevenue].sort((a, b) => {
    if (sortBy === 'revenue') {
      return parseInt(b.revenueInfluenced.replace(/[$,]/g, '')) - 
             parseInt(a.revenueInfluenced.replace(/[$,]/g, ''));
    } else if (sortBy === 'usage') {
      return parseInt(b.monthlyUsage.replace(/[,users]/g, '')) - 
             parseInt(a.monthlyUsage.replace(/[,users]/g, ''));
    } else {
      return b.relatedBugs - a.relatedBugs;
    }
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            Cortex Command Center
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered insights connecting product actions to revenue impact
          </p>
        </div>
      </div>

      {/* Section 1: AI-Powered Insights */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Top 3 Insights This Week</h2>
          <p className="text-gray-600">Critical intelligence from Cortex AI analysis</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData.cortexInsights.map((insight) => (
            <Card
              key={insight.id}
              className={`bg-white border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                insight.sentiment === 'positive' 
                  ? 'border-emerald-500/40 hover:border-emerald-500/70' 
                  : 'border-red-500/40 hover:border-red-500/70'
              } ${selectedInsight === insight.id ? 'ring-2 ring-[#F9BD2B]' : ''}`}
              onClick={() => setSelectedInsight(insight.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    className={`${
                      insight.sentiment === 'positive'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : 'bg-red-100 text-red-700 border-red-300'
                    } border`}
                  >
                    {insight.type}
                  </Badge>
                  {insight.sentiment === 'positive' ? (
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-xl leading-snug text-gray-900">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {insight.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Revenue & Cost Dashboard */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Revenue & Cost Dashboard</h2>
          <p className="text-gray-600">Track feature performance and bug impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Revenue Per Feature */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Feature Revenue Influence</CardTitle>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  variant={sortBy === 'revenue' ? 'default' : 'outline'}
                  onClick={() => setSortBy('revenue')}
                  className={sortBy === 'revenue' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
                >
                  Revenue
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'usage' ? 'default' : 'outline'}
                  onClick={() => setSortBy('usage')}
                  className={sortBy === 'usage' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
                >
                  Usage
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'bugs' ? 'default' : 'outline'}
                  onClick={() => setSortBy('bugs')}
                  className={sortBy === 'bugs' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
                >
                  Bugs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#F9BD2B]/50 transition-all duration-300 cursor-pointer group hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-semibold text-gray-900">{feature.featureName}</span>
                          {index === 0 && (
                            <Badge className="bg-[#F9BD2B]/20 text-[#F9BD2B] border-[#F9BD2B]/30 border">
                              Top Performer
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{feature.monthlyUsage}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bug className="w-4 h-4" />
                            <span>{feature.relatedBugs} bugs</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          {feature.revenueInfluenced}
                        </div>
                        <div className="text-xs text-gray-500">influenced</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Column 2: Bug Watchlist */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Most Expensive Bugs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.bugWatchlist.map((bug) => (
                <Card
                  key={bug.id}
                  className={`bg-red-50/50 border-2 border-red-300/50 cursor-pointer transition-all duration-300 hover:border-red-400/70 hover:shadow-lg hover:shadow-red-100 ${
                    selectedBug === bug.id ? 'ring-2 ring-[#F9BD2B]' : ''
                  }`}
                  onClick={() => setSelectedBug(bug.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-xl text-gray-900">{bug.bugName}</CardTitle>
                          <Badge className="bg-red-100 text-red-700 border-red-300 border">
                            {bug.status}
                          </Badge>
                        </div>
                        <div className="text-4xl font-bold text-red-600 my-3">
                          {bug.monthlyCost}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{bug.affectedUsers} affected users</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>{bug.relatedTickets} related tickets</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 3: Marketing Funnel */}
      <section className="max-w-7xl mx-auto px-6 py-12 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Marketing Funnel Attribution</h2>
          <p className="text-gray-600">Ad-Spend-to-LTV Funnel: 'Google-AI' Campaign</p>
        </div>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4">
              {mockData.adFunnel.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex-1 w-full">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 text-center hover:border-[#F9BD2B]/50 transition-all duration-300 group cursor-pointer hover:shadow-lg">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-[#F9BD2B]/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#F9BD2B]/30 transition-colors">
                          <span className="text-[#F9BD2B] font-bold text-lg">{index + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-3">{step.stage}</h3>
                      <p className="text-2xl font-bold text-gray-900">{step.value}</p>
                    </div>
                  </div>
                  {index < mockData.adFunnel.length - 1 && (
                    <div className="hidden md:block">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-emerald-50 border border-emerald-300 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <span className="text-lg font-semibold text-gray-900">Campaign Performance</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">3:1</div>
                  <div className="text-sm text-gray-600">LTV:CAC Ratio</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;