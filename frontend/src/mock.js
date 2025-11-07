export const mockData = {
  cortexInsights: [
    {
      id: 1,
      title: "Bug '404-on-checkout' has cost $12,450 this month.",
      description: "We've correlated 85 session replays of 'Enterprise' plan users hitting this bug. 30% of them churned within 48 hours.",
      type: "Cost",
      sentiment: "negative"
    },
    {
      id: 2,
      title: "Feature 'New AI Dashboard' influenced $38,200 in LTV.",
      description: "Users who adopted this feature in their first 7 days have a 45% higher 12-month LTV. You should make this part of the onboarding flow.",
      type: "Revenue",
      sentiment: "positive"
    },
    {
      id: 3,
      title: "Ad Campaign 'Google-AI' has a 3:1 LTV:CAC ratio.",
      description: "While its initial CPL is high, users from this campaign activate 2x faster and convert to 'Scale' plans more often. Scale this campaign.",
      type: "Revenue",
      sentiment: "positive"
    }
  ],
  featureRevenue: [
    {
      id: 1,
      featureName: "New AI Dashboard",
      monthlyUsage: "14,200 users",
      revenueInfluenced: "$38,200",
      relatedBugs: 1
    },
    {
      id: 2,
      featureName: "Old Report Builder",
      monthlyUsage: "8,500 users",
      revenueInfluenced: "$1,500",
      relatedBugs: 4
    },
    {
      id: 3,
      featureName: "Team Invite Flow",
      monthlyUsage: "22,000 users",
      revenueInfluenced: "$12,100",
      relatedBugs: 0
    }
  ],
  bugWatchlist: [
    {
      id: 101,
      bugName: "404-on-checkout",
      status: "Critical",
      monthlyCost: "$12,450",
      affectedUsers: 85,
      relatedTickets: 34
    },
    {
      id: 102,
      bugName: "Mobile layout broken",
      status: "High",
      monthlyCost: "$3,100",
      affectedUsers: 1200,
      relatedTickets: 12
    }
  ],
  adFunnel: [
    { stage: "Google Ad 'AI' Spend", value: "$5,000" },
    { stage: "Signups", value: "500 users" },
    { stage: "Activated (PQLs)", value: "150 users" },
    { stage: "Converted to Paid", value: "50 users" },
    { stage: "Projected LTV", value: "$16,500" }
  ]
};