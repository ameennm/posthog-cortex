import React, { useState } from 'react';
import { mockData } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DollarSign, TrendingUp, Users, Sparkles, Target, ArrowUpRight } from 'lucide-react';

const Revenue = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Calculate total revenue
  const totalRevenue = mockData.featureRevenue.reduce((sum, feature) => {
    return sum + parseInt(feature.revenueInfluenced.replace(/[$,]/g, ''));
  }, 0);

  const avgRevenuePerUser = Math.round(totalRevenue / 44700);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
            <p className="text-gray-600">Track revenue influence across all features and campaigns</p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
              className={timeRange === 'week' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
              className={timeRange === 'month' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={timeRange === 'quarter' ? 'default' : 'outline'}
              onClick={() => setTimeRange('quarter')}
              className={timeRange === 'quarter' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              Quarter
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 font-medium">Total Revenue Influenced</CardDescription>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-800">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-emerald-700">
              <ArrowUpRight className="w-4 h-4" />
              <span>+23% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Active Features</CardDescription>
              <Sparkles className="w-5 h-5 text-[#F9BD2B]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockData.featureRevenue.length}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <span>Revenue generating</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Avg Revenue/User</CardDescription>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${avgRevenuePerUser}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <span>Per active user</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Conversion Rate</CardDescription>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">18.4%</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">+2.3% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Revenue Breakdown */}
      <Card className="bg-white border-gray-200 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Feature Revenue Breakdown</CardTitle>
          <CardDescription>Detailed revenue influence by feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.featureRevenue.map((feature) => {
              const revenueValue = parseInt(feature.revenueInfluenced.replace(/[$,]/g, ''));
              const percentage = Math.round((revenueValue / totalRevenue) * 100);
              
              return (
                <div
                  key={feature.id}
                  className={`p-5 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                    selectedFeature === feature.id
                      ? 'border-[#F9BD2B] bg-[#F9BD2B]/5'
                      : 'border-gray-200 bg-gray-50 hover:border-[#F9BD2B]/50'
                  }`}
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{feature.featureName}</h3>
                        <p className="text-sm text-gray-600">{feature.monthlyUsage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">{feature.revenueInfluenced}</div>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border mt-1">
                        {percentage}% of total
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Top Revenue Driver</CardTitle>
            <CardDescription>Highest performing feature this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">New AI Dashboard</h3>
              <p className="text-emerald-700 mb-4">
                Drives 74% of new premium subscriptions and shows 45% higher LTV among early adopters.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">14,200 users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">$38,200 influenced</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Revenue Optimization</CardTitle>
            <CardDescription>AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-1">Recommendation #1</p>
                <p className="text-sm text-blue-700">
                  Add "New AI Dashboard" to onboarding flow - potential +$12K/month
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800 font-medium mb-1">Recommendation #2</p>
                <p className="text-sm text-purple-700">
                  Sunset "Old Report Builder" - redirect users to higher-value features
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800 font-medium mb-1">Recommendation #3</p>
                <p className="text-sm text-amber-700">
                  Promote "Team Invite Flow" to increase collaboration - +18% revenue potential
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;