import React, { useState } from 'react';
import { mockData } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Bug, Users, Target, TrendingDown, Clock, AlertCircle } from 'lucide-react';

const Costs = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBug, setSelectedBug] = useState(null);

  // Calculate total cost
  const totalCost = mockData.bugWatchlist.reduce((sum, bug) => {
    return sum + parseInt(bug.monthlyCost.replace(/[$,]/g, ''));
  }, 0);

  const totalAffectedUsers = mockData.bugWatchlist.reduce((sum, bug) => sum + bug.affectedUsers, 0);
  const avgCostPerBug = Math.round(totalCost / mockData.bugWatchlist.length);

  const filteredBugs = filterStatus === 'all' 
    ? mockData.bugWatchlist 
    : mockData.bugWatchlist.filter(bug => bug.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cost Analytics</h1>
            <p className="text-gray-600">Monitor and manage revenue-impacting bugs and issues</p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-[#F9BD2B] text-black hover:bg-[#FFA500]' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filterStatus === 'Critical' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('Critical')}
              className={filterStatus === 'Critical' ? 'bg-red-600 text-white hover:bg-red-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              Critical
            </Button>
            <Button
              size="sm"
              variant={filterStatus === 'High' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('High')}
              className={filterStatus === 'High' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}
            >
              High
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-red-700 font-medium">Total Monthly Cost</CardDescription>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800">${totalCost.toLocaleString()}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-red-700">
              <span>Revenue impact</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Active Bugs</CardDescription>
              <Bug className="w-5 h-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockData.bugWatchlist.length}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <span>Tracked issues</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Affected Users</CardDescription>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalAffectedUsers.toLocaleString()}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <span>Total impacted</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription className="text-gray-700 font-medium">Avg Cost/Bug</CardDescription>
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${avgCostPerBug.toLocaleString()}</div>
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <span>Per issue</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bug Watchlist */}
      <Card className="bg-white border-gray-200 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Bug Watchlist</CardTitle>
          <CardDescription>Critical bugs impacting revenue and user experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBugs.map((bug) => {
              const costValue = parseInt(bug.monthlyCost.replace(/[$,]/g, ''));
              const severity = bug.status === 'Critical' ? 'critical' : 'high';
              
              return (
                <div
                  key={bug.id}
                  className={`p-5 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                    selectedBug === bug.id
                      ? 'border-[#F9BD2B] bg-[#F9BD2B]/5'
                      : severity === 'critical'
                      ? 'border-red-300 bg-red-50/50 hover:border-red-400'
                      : 'border-orange-300 bg-orange-50/50 hover:border-orange-400'
                  }`}
                  onClick={() => setSelectedBug(bug.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        severity === 'critical' ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{bug.bugName}</h3>
                          <Badge className={`${
                            severity === 'critical'
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : 'bg-orange-100 text-orange-700 border-orange-300'
                          } border`}>
                            {bug.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{bug.affectedUsers.toLocaleString()} affected users</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>{bug.relatedTickets} related tickets</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold mb-1 ${
                        severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {bug.monthlyCost}
                      </div>
                      <p className="text-xs text-gray-600">monthly cost</p>
                    </div>
                  </div>
                  
                  {/* Impact bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        severity === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min((costValue / totalCost) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Cost Breakdown</CardTitle>
            <CardDescription>Revenue impact by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-red-800">Critical Bugs</span>
                  </div>
                  <span className="text-red-700 font-bold">$12,450</span>
                </div>
                <div className="text-sm text-red-600">80% of total monthly cost impact</div>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-semibold text-orange-800">High Priority</span>
                  </div>
                  <span className="text-orange-700 font-bold">$3,100</span>
                </div>
                <div className="text-sm text-orange-600">20% of total monthly cost impact</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Urgent Actions</CardTitle>
            <CardDescription>Prioritized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-semibold mb-1">Fix 404-on-checkout immediately</p>
                    <p className="text-xs text-red-700">Causing 30% churn in Enterprise users - $12.4K/month impact</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                <div className="flex items-start space-x-2">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-orange-800 font-semibold mb-1">Mobile layout needs attention</p>
                    <p className="text-xs text-orange-700">1,200 users affected - potential revenue loss of $3.1K/month</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start space-x-2">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-semibold mb-1">Monitor session replays</p>
                    <p className="text-xs text-blue-700">85 replays captured for analysis - identify friction points</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Costs;