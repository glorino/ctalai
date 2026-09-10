'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'idle' | 'error';
  health: number;
  tasksCompleted: number;
  successRate: number;
  tokensUsed: number;
  lastActive: string;
  uptime: string;
  avgResponseTime: string;
}

interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  details: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

const agents: Agent[] = [
  {
    id: 'growth',
    name: 'Growth Agent',
    description: 'Marketing, leads, sales',
    category: 'Growth & Sales',
    status: 'active',
    health: 98,
    tasksCompleted: 1247,
    successRate: 96.8,
    tokensUsed: 284000,
    lastActive: '2 min ago',
    uptime: '99.9%',
    avgResponseTime: '1.2s',
  },
  {
    id: 'customer-success',
    name: 'Customer Success Agent',
    description: 'CRM, onboarding, retention',
    category: 'Customer Relations',
    status: 'active',
    health: 95,
    tasksCompleted: 892,
    successRate: 94.5,
    tokensUsed: 198000,
    lastActive: '5 min ago',
    uptime: '99.7%',
    avgResponseTime: '1.8s',
  },
  {
    id: 'learning',
    name: 'Learning Agent',
    description: 'Programmes, engagement',
    category: 'Education',
    status: 'active',
    health: 100,
    tasksCompleted: 567,
    successRate: 98.2,
    tokensUsed: 156000,
    lastActive: '1 min ago',
    uptime: '100%',
    avgResponseTime: '0.9s',
  },
  {
    id: 'community',
    name: 'Community Agent',
    description: 'Alumni, networking',
    category: 'Community',
    status: 'idle',
    health: 87,
    tasksCompleted: 324,
    successRate: 91.3,
    tokensUsed: 89000,
    lastActive: '30 min ago',
    uptime: '98.5%',
    avgResponseTime: '2.1s',
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    description: 'Tasks, projects, SOPs',
    category: 'Operations',
    status: 'active',
    health: 92,
    tasksCompleted: 2103,
    successRate: 95.7,
    tokensUsed: 445000,
    lastActive: '1 min ago',
    uptime: '99.8%',
    avgResponseTime: '1.5s',
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    description: 'Payments, forecasting',
    category: 'Finance',
    status: 'active',
    health: 97,
    tasksCompleted: 456,
    successRate: 99.1,
    tokensUsed: 112000,
    lastActive: '8 min ago',
    uptime: '100%',
    avgResponseTime: '1.1s',
  },
  {
    id: 'people',
    name: 'People Agent',
    description: 'HR, performance',
    category: 'Human Resources',
    status: 'error',
    health: 45,
    tasksCompleted: 189,
    successRate: 78.4,
    tokensUsed: 67000,
    lastActive: '1 hour ago',
    uptime: '85.2%',
    avgResponseTime: '3.2s',
  },
  {
    id: 'ceo-intelligence',
    name: 'CEO Intelligence Agent',
    description: 'Dashboards, insights',
    category: 'Executive',
    status: 'active',
    health: 100,
    tasksCompleted: 89,
    successRate: 100,
    tokensUsed: 234000,
    lastActive: '3 min ago',
    uptime: '100%',
    avgResponseTime: '2.5s',
  },
];

const activityLogs: ActivityLog[] = [
  { id: '1', agentId: 'growth', agentName: 'Growth Agent', action: 'Lead Scoring', details: 'Processed 47 new leads from campaign "Spring Launch"', timestamp: '2 min ago', status: 'success' },
  { id: '2', agentId: 'operations', agentName: 'Operations Agent', action: 'Task Automation', details: 'Automated 12 SOPs for Q3 onboarding process', timestamp: '5 min ago', status: 'success' },
  { id: '3', agentId: 'learning', agentName: 'Learning Agent', action: 'Content Delivery', details: 'Distributed learning materials to 156 participants', timestamp: '8 min ago', status: 'success' },
  { id: '4', agentId: 'people', agentName: 'People Agent', action: 'Performance Review', details: 'Error: Failed to sync with HR database', timestamp: '12 min ago', status: 'error' },
  { id: '5', agentId: 'customer-success', agentName: 'Customer Success Agent', action: 'Onboarding', details: 'Initiated onboarding for 8 new enterprise accounts', timestamp: '15 min ago', status: 'success' },
  { id: '6', agentId: 'finance', agentName: 'Finance Agent', action: 'Revenue Forecast', details: 'Generated Q3 forecast - 23% growth projected', timestamp: '18 min ago', status: 'success' },
  { id: '7', agentId: 'community', agentName: 'Community Agent', action: 'Event Planning', details: 'Scheduled alumni networking event for Oct 15', timestamp: '22 min ago', status: 'success' },
  { id: '8', agentId: 'growth', agentName: 'Growth Agent', action: 'Campaign Analysis', details: 'Email campaign open rate exceeded target by 12%', timestamp: '25 min ago', status: 'success' },
  { id: '9', agentId: 'ceo-intelligence', agentName: 'CEO Intelligence Agent', action: 'Report Generation', details: 'Weekly executive summary compiled and distributed', timestamp: '30 min ago', status: 'success' },
  { id: '10', agentId: 'operations', agentName: 'Operations Agent', action: 'Bottleneck Alert', details: 'Detected delay in procurement pipeline - flagged for review', timestamp: '35 min ago', status: 'warning' },
];

export default function AIAgentsDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [logsModalOpen, setLogsModalOpen] = useState(false);
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ total: 0, active: 0, success: 0, tokens: 0 });

  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const avgSuccessRate = Number((agents.reduce((acc, a) => acc + a.successRate, 0) / agents.length).toFixed(1));
  const totalTokens = agents.reduce((acc, a) => acc + a.tokensUsed, 0);

  useEffect(() => {
    const animate = async () => {
      const duration = 1500;
      const steps = 60;
      const interval = duration / steps;
      
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, interval));
        setAnimatedStats({
          total: Math.round((totalAgents / steps) * i),
          active: Math.round((activeAgents / steps) * i),
          success: Number(((avgSuccessRate / steps) * i).toFixed(1)),
          tokens: Math.round((totalTokens / steps) * i),
        });
      }
    };
    animate();
  }, []);

  const filteredAgents = filter === 'all' 
    ? agents 
    : agents.filter(a => a.status === filter);

  const selectedAgentData = agents.find(a => a.id === selectedAgent);

  const statusColors = {
    active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/30' },
    idle: { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400', border: 'border-amber-500/30' },
    error: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/30' },
  };

  const categoryIcons: Record<string, string> = {
    'Growth & Sales': '📈',
    'Customer Relations': '🤝',
    'Education': '📚',
    'Community': '👥',
    'Operations': '⚙️',
    'Finance': '💰',
    'Human Resources': '👤',
    'Executive': '🎯',
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3452ff] to-[#ff1053] flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3452ff] to-[#ff1053] bg-clip-text text-transparent">
                AI Agents Control Center
              </h1>
              <p className="text-gray-400 text-sm mt-1">Monitor and manage your intelligent workforce</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Agents', value: animatedStats.total, suffix: '', icon: '🤖', color: 'from-[#3452ff] to-[#3452ff]/50' },
            { label: 'Active Tasks', value: animatedStats.active, suffix: '', icon: '⚡', color: 'from-emerald-500 to-emerald-500/50' },
            { label: 'Success Rate', value: animatedStats.success, suffix: '%', icon: '✓', color: 'from-[#ff1053] to-[#ff1053]/50' },
            { label: 'Tokens Used', value: animatedStats.tokens, suffix: '', icon: '📊', color: 'from-amber-500 to-amber-500/50', format: true },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-[#12131a] border border-white/5 p-5"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {stat.format ? (stat.value / 1000).toFixed(0) + 'K' : stat.value}
                    <span className="text-lg">{stat.suffix}</span>
                  </p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {['all', 'active', 'idle', 'error'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter === f
                  ? 'bg-[#3452ff] text-white'
                  : 'bg-[#1a1b23] text-gray-400 hover:bg-[#22232d] hover:text-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && ` (${agents.length})`}
              {f === 'active' && ` (${agents.filter(a => a.status === 'active').length})`}
              {f === 'idle' && ` (${agents.filter(a => a.status === 'idle').length})`}
              {f === 'error' && ` (${agents.filter(a => a.status === 'error').length})`}
            </button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Agent Cards */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
                    className={`relative overflow-hidden rounded-2xl bg-[#12131a] border p-5 cursor-pointer transition-all duration-300 ${
                      selectedAgent === agent.id
                        ? 'border-[#3452ff]/50 ring-1 ring-[#3452ff]/30'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Status Indicator */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      agent.status === 'active' ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' :
                      agent.status === 'idle' ? 'bg-gradient-to-r from-amber-500 to-amber-300' :
                      'bg-gradient-to-r from-red-500 to-red-300'
                    }`} />

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{categoryIcons[agent.category]}</div>
                        <div>
                          <h3 className="font-semibold text-white">{agent.name}</h3>
                          <p className="text-gray-400 text-xs mt-0.5">{agent.description}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[agent.status].bg} ${statusColors[agent.status].text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors[agent.status].dot}`} />
                        {agent.status}
                      </div>
                    </div>

                    {/* Health Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">Health</span>
                        <span className={agent.health >= 90 ? 'text-emerald-400' : agent.health >= 70 ? 'text-amber-400' : 'text-red-400'}>
                          {agent.health}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.health}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${
                            agent.health >= 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                            agent.health >= 70 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400">Tasks</p>
                        <p className="text-sm font-semibold">{agent.tasksCompleted.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400">Success</p>
                        <p className="text-sm font-semibold">{agent.successRate}%</p>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400">Tokens</p>
                        <p className="text-sm font-semibold">{(agent.tokensUsed / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-xs text-gray-500">Last active: {agent.lastActive}</span>
                      <span className="text-xs text-gray-500">Uptime: {agent.uptime}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Agent Details / Selected Agent Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl bg-[#12131a] border border-white/5 p-5"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3452ff]" />
                {selectedAgentData ? selectedAgentData.name : 'Select an Agent'}
              </h2>
              
              {selectedAgentData ? (
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <p className="text-xs text-gray-400 mb-1">Category</p>
                    <p className="text-sm font-medium">{selectedAgentData.category}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Response Time</p>
                      <p className="text-sm font-medium">{selectedAgentData.avgResponseTime}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">Uptime</p>
                      <p className="text-sm font-medium">{selectedAgentData.uptime}</p>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Quick Actions</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfigModalOpen(true); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#3452ff]/10 hover:bg-[#3452ff]/20 border border-[#3452ff]/20 text-[#3452ff] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Configure Agent
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setLogsModalOpen(true); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#ff1053]/10 hover:bg-[#ff1053]/20 border border-[#ff1053]/20 text-[#ff1053] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      View Logs
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDiagnosticsModalOpen(true); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Run Diagnostics
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Click on an agent card to view details and actions</p>
                </div>
              )}
            </motion.div>

            {/* Activity Log */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl bg-[#12131a] border border-white/5 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff1053]" />
                  Activity Logs
                </h2>
                <span className="text-xs text-gray-500">Live</span>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {activityLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 bg-white/5 rounded-xl hover:bg-white/8 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          log.status === 'success' ? 'bg-emerald-400' :
                          log.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                        }`} />
                        <span className="text-sm font-medium">{log.action}</span>
                      </div>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{log.details}</p>
                    <span className="text-xs text-gray-500">{log.agentName}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 rounded-2xl bg-[#12131a] border border-white/5 p-5"
        >
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3452ff] to-[#ff1053]" />
            Agent Performance Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
                    <circle
                      cx="18" cy="18" r="16" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeDasharray={`${agent.successRate} 100`}
                      strokeLinecap="round"
                      className={agent.successRate >= 95 ? 'text-emerald-400' : agent.successRate >= 85 ? 'text-amber-400' : 'text-red-400'}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{agent.successRate}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 truncate">{agent.name.replace(' Agent', '')}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {configModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setConfigModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#12131a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Configure {selectedAgentData?.name || 'Agent'}</h3>
                <button onClick={() => setConfigModalOpen(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Task Priority</label>
                  <select className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3452ff]">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Auto-Response</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6 bg-[#3452ff] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                    </div>
                    <span className="text-sm text-gray-300">Enabled</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Tokens per Task</label>
                  <input type="number" defaultValue={5000} className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3452ff]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Schedule</label>
                  <input type="text" defaultValue="*/15 * * * *" className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3452ff]" placeholder="Cron expression" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setConfigModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => setConfigModalOpen(false)} className="flex-1 px-4 py-2.5 bg-[#3452ff] hover:bg-[#3452ff]/80 rounded-lg text-sm font-medium transition-colors">
                    Save Configuration
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {logsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setLogsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] bg-[#12131a] border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Logs - {selectedAgentData?.name || 'All Agents'}</h3>
                <button onClick={() => setLogsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {activityLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-400' : log.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'}`} />
                      <span className="text-sm font-medium">{log.action}</span>
                      <span className="text-xs text-gray-500 ml-auto">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-400">{log.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {diagnosticsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setDiagnosticsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#12131a] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Diagnostics</h3>
                <button onClick={() => setDiagnosticsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {['Connection Test', 'Memory Usage', 'API Latency', 'Token Efficiency', 'Error Rate Analysis'].map((test, i) => (
                  <motion.div
                    key={test}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-sm">{test}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${i === 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {i === 3 ? 'Warning' : 'Passed'}
                    </span>
                  </motion.div>
                ))}
                <button onClick={() => setDiagnosticsModalOpen(false)} className="w-full mt-4 px-4 py-2.5 bg-[#3452ff] hover:bg-[#3452ff]/80 rounded-lg text-sm font-medium transition-colors">
                  Close Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
