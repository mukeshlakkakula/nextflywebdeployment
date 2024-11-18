"use client";
// src/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import {
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
} from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayLeads: 0,
    monthLeads: 0,
    conversionRate: 0,
  });
  const [trendsData, setTrendsData] = useState(null);
  const [sourceData, setSourceData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const leadsRef = collection(db, "leads");

      // Get date ranges
      const now = new Date();
      const today = startOfDay(now);
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);

      // Queries
      const totalQuery = await getDocs(leadsRef);
      const todayQuery = await getDocs(
        query(leadsRef, where("createdAt", ">=", Timestamp.fromDate(today)))
      );
      const monthQuery = await getDocs(
        query(
          leadsRef,
          where("createdAt", ">=", Timestamp.fromDate(monthStart)),
          where("createdAt", "<=", Timestamp.fromDate(monthEnd))
        )
      );

      // Calculate stats
      const totalLeads = totalQuery.size;
      const todayLeads = todayQuery.size;
      const monthLeads = monthQuery.size;

      // Calculate conversion rate
      const convertedLeads = totalQuery.docs.filter(
        (doc) => doc.data().status === "converted"
      ).length;
      const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);

      setStats({
        totalLeads,
        todayLeads,
        monthLeads,
        conversionRate,
      });

      // Fetch trends data (last 30 days)
      await fetchTrendsData();

      // Fetch source distribution
      await fetchSourceDistribution(totalQuery.docs);

      // Fetch status distribution
      await fetchStatusDistribution(totalQuery.docs);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const fetchTrendsData = async () => {
    try {
      const last30Days = eachDayOfInterval({
        start: startOfDay(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)),
        end: endOfDay(new Date()),
      });

      const leadsRef = collection(db, "leads");
      const snapshot = await getDocs(
        query(
          leadsRef,
          where("createdAt", ">=", Timestamp.fromDate(last30Days[0])),
          orderBy("createdAt", "asc")
        )
      );

      const dailyCounts = {};
      last30Days.forEach((date) => {
        dailyCounts[format(date, "MMM dd")] = 0;
      });

      snapshot.docs.forEach((doc) => {
        const date = doc.data().createdAt.toDate();
        const dateStr = format(date, "MMM dd");
        dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
      });

      setTrendsData({
        labels: Object.keys(dailyCounts),
        datasets: [
          {
            label: "Daily Leads",
            data: Object.values(dailyCounts),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.1)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching trends data:", error);
    }
  };

  const fetchSourceDistribution = async (leads) => {
    const sources = {};
    leads.forEach((doc) => {
      const source = doc.data().source || "Unknown";
      sources[source] = (sources[source] || 0) + 1;
    });

    setSourceData({
      labels: Object.keys(sources),
      datasets: [
        {
          data: Object.values(sources),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    });
  };

  const fetchStatusDistribution = async (leads) => {
    const statuses = {};
    leads.forEach((doc) => {
      const status = doc.data().status || "New";
      statuses[status] = (statuses[status] || 0) + 1;
    });

    setStatusData({
      labels: Object.keys(statuses),
      datasets: [
        {
          data: Object.values(statuses),
          backgroundColor: [
            "#4CAF50",
            "#FFC107",
            "#F44336",
            "#9C27B0",
            "#2196F3",
          ],
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={<FiUsers />}
          color="blue"
        />
        <StatCard
          title="Today's Leads"
          value={stats.todayLeads}
          icon={<FiTrendingUp />}
          color="green"
        />
        <StatCard
          title="This Month"
          value={stats.monthLeads}
          icon={<FiActivity />}
          color="purple"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<FiDollarSign />}
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {trendsData && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Lead Trends (Last 30 Days)
            </h2>
            <Line
              data={trendsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        )}

        {sourceData && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Lead Sources</h2>
            <Doughnut
              data={sourceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Status Distribution */}
      {statusData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Lead Status Distribution
          </h2>
          <Bar
            data={statusData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`text-${color}-500 text-2xl`}>{icon}</div>
    </div>
  </div>
);

export default Dashboard;
