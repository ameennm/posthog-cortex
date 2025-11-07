import React, { useState } from 'react';
import { mockData } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, TrendingUp, Target, Users, DollarSign, Zap, ChevronDown } from 'lucide-react';

const Funnels = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('google-ai');
  const [expandedStep, setExpandedStep] = useState(null);

  // Calculate conversion rates
  const calculateConversionRate = (current, next) => {
    const currentValue = parseInt(current.replace(/[^0-9]/g, ''));
    const nextValue = parseInt(next.replace(/[^0-9]/g, ''));
    return Math.round((nextValue / currentValue) * 100);
  };

  const campaigns = [
    {
      id: 'google-ai',
      name: 'Google AI Campaign',
      funnel: mockData.adFunnel,
      ratio: '3:1',
      status: 'excellent'
    },
    {
      id: 'linkedin-b2b',
      name: 'LinkedIn B2B Campaign',
      funnel: [
        { stage: "LinkedIn Ad Spend", value: "$8,000" },
        { stage: "Signups", value: "320 users" },
        { stage: "Activated (PQLs)", value: "110 users" },
        { stage: "Converted to Paid", value: "45 users" },
        { stage: "Projected LTV", value: "$19,800" }
      ],
      ratio: '2.5:1',
      status: 'good'
    },
    {
      id: 'organic-seo',
      name: 'Organic SEO',
      funnel: [
        { stage: "Organic Traffic", value: "12,500 visits" },
        { stage: "Signups", value: "890 users" },
        { stage: "Activated (PQLs)", value: "245 users" },
        { stage: "Converted to Paid", value: "67 users" },
        { stage: "Projected LTV", value: "$28,900" }
      ],
      ratio: 'N/A',
      status: 'excellent'
    }
  ];

  const currentCampaign = campaigns.find(c => c.id === selectedCampaign);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Funnel Analytics</h1>
            <p className="text-gray-600">Track conversion funnels and campaign performance</p>
          </div>
          <div className="flex space-x-2">
            {campaigns.map(campaign => (
              <Button
                key={campaign.id}
                size="sm"
                variant={selectedCampaign === campaign.id ? 'default' : 'outline'}
                onClick={() => setSelectedCampaign(campaign.id)}
                className={selectedCampaign === campaign.id ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
              >
                {campaign.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Overview */}
      <Card className="bg-white border-gray-200 shadow-lg mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-900">{currentCampaign.name}</CardTitle>
              <CardDescription>End-to-end conversion funnel analysis</CardDescription>
            </div>
            <Badge className={`${
              currentCampaign.status === 'excellent'
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                : 'bg-blue-100 text-blue-700 border-blue-300'
            } border px-3 py-1 text-sm`}>
              {currentCampaign.status === 'excellent' ? 'Excellent Performance' : 'Good Performance'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Funnel Visualization */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-4 mb-8">
            {currentCampaign.funnel.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex-1 w-full">
                  <div 
                    className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 text-center hover:border-[#F9BD2B]/50 transition-all duration-300 cursor-pointer hover:shadow-lg"
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-[#F9BD2B]/20 rounded-full flex items-center justify-center mx-auto hover:bg-[#F9BD2B]/30 transition-colors">
                        <span className="text-[#F9BD2B] font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-3">{step.stage}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{step.value}</p>
                    
                    {/* Conversion rate */}
                    {index < currentCampaign.funnel.length - 1 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Conversion to next</p>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300 border text-xs">
                          {calculateConversionRate(
                            currentCampaign.funnel[index].value,
                            currentCampaign.funnel[index + 1].value
                          )}%
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* Expanded Details */}
                  {expandedStep === index && (
                    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                      <p className="text-sm text-blue-800 font-medium mb-2">Stage Insights:</p>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Average time in stage: {Math.floor(Math.random() * 5) + 1} days</li>
                        <li>• Drop-off rate: {Math.floor(Math.random() * 30) + 10}%</li>
                        <li>• Top source: {selectedCampaign === 'organic-seo' ? 'Blog posts' : 'Paid ads'}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {index < currentCampaign.funnel.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Performance Summary */}
          {currentCampaign.ratio !== 'N/A' && (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <span className="text-lg font-semibold text-gray-900">Campaign Performance</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">{currentCampaign.ratio}</div>
                  <div className="text-sm text-gray-600">LTV:CAC Ratio</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Funnel Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Total Conversions</CardDescription>
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">162</div>
            <div className="text-sm text-gray-600 mt-1">Across all campaigns</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Avg Conversion Rate</CardDescription>
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">12.8%</div>
            <div className="text-sm text-emerald-600 mt-1">+3.2% from last month</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Total Spend</CardDescription>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$13K</div>
            <div className="text-sm text-gray-600 mt-1">This month</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Projected ROI</CardDescription>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">285%</div>
            <div className="text-sm text-gray-600 mt-1">12-month projection</div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Funnel Bottlenecks</CardTitle>
            <CardDescription>Areas for optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ChevronDown className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">Signup to Activation</p>
                    <p className="text-xs text-amber-700">30% drop-off - improve onboarding flow</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ChevronDown className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-orange-800 mb-1">Activation to Conversion</p>
                    <p className="text-xs text-orange-700">67% drop-off - add pricing clarity</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Optimization Tips</CardTitle>
            <CardDescription>AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-800 font-medium mb-1">✓ Google AI performing exceptionally</p>
                <p className="text-xs text-emerald-700">Scale budget by 40% - ROI potential +$8K/month</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-1">→ Optimize LinkedIn targeting</p>
                <p className="text-xs text-blue-700">Focus on enterprise decision-makers for better conversion</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800 font-medium mb-1">→ Invest in SEO content</p>
                <p className="text-xs text-purple-700">Zero CAC with 7.5% conversion - create more guides</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Funnels;