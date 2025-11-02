import React from 'react';
import { TrendingUp, Target, Award, Star, Users, CheckCircle2, Sparkles, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/format';

export const Dashboard: React.FC = () => {
  const currentAdvisor = useStore((state) => state.currentAdvisor);
  const getPerformanceMetrics = useStore((state) => state.getPerformanceMetrics);
  const getPendingTodos = useStore((state) => state.getPendingTodos);

  const metrics = getPerformanceMetrics();
  const pendingTodos = getPendingTodos();

  if (!currentAdvisor) return null;

  const progressColor = metrics.targetVsAchieved.percentComplete >= 90
    ? 'from-green-500 to-emerald-600'
    : metrics.targetVsAchieved.percentComplete >= 70
    ? 'from-yellow-500 to-amber-600'
    : 'from-red-500 to-rose-600';

  return (
    <div className="space-y-4 sm:space-y-6 p-4 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="card-premium p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-luxury-gold/20 to-transparent rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-luxury-gold" />
            <h1 className="text-2xl font-display font-bold text-white">
              Welcome back, {currentAdvisor.name.split(' ')[0]}!
            </h1>
          </div>
          <p className="text-gray-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            {currentAdvisor.storeName}
          </p>
        </div>
      </div>

      {/* Target vs Achievement */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-luxury-gold/20 rounded-lg">
              <Target className="w-5 h-5 text-luxury-gold" />
            </div>
            <h2 className="font-semibold text-lg text-white">Monthly Target</h2>
          </div>
          <span className={`text-sm font-semibold ${
            metrics.targetVsAchieved.variance >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {metrics.targetVsAchieved.variance >= 0 ? '+' : ''}
            {formatCurrency(metrics.targetVsAchieved.variance)}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Target</span>
            <span className="font-semibold text-gray-300">{formatCurrency(metrics.targetVsAchieved.target)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Achieved</span>
            <span className="font-semibold text-luxury-gold">
              {formatCurrency(metrics.targetVsAchieved.achieved)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progress</span>
              <span className="font-semibold text-white">{metrics.targetVsAchieved.percentComplete.toFixed(1)}%</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl border border-white/10">
              <div
                className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-500 rounded-full relative overflow-hidden`}
                style={{ width: `${Math.min(metrics.targetVsAchieved.percentComplete, 100)}%` }}
              >
                <div className="absolute inset-0 shimmer" />
              </div>
            </div>
          </div>

          {/* Commission Estimate */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Estimated Commission</span>
              <span className="text-xl font-bold text-gradient-gold">
                {formatCurrency(metrics.commissionEstimate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="glass-card p-3 sm:p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">MTD Transactions</p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {currentAdvisor.performance.mtdTransactions}
            </p>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">Conversion Rate</p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {currentAdvisor.performance.conversionRate}%
            </p>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">NPS Score</p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {currentAdvisor.performance.npsScore}
            </p>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-amber-500/20 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">Mystery Audit</p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {currentAdvisor.performance.mysteryAuditScore}
            </p>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div className="glass-card p-5 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-white">
              <CheckCircle2 className="w-5 h-5 text-orange-400" />
              Pending Tasks
            </h3>
            <span className="badge bg-orange-500/20 text-orange-300 border-orange-500/30">
              {pendingTodos.length}
            </span>
          </div>
          <p className="text-sm text-gray-300">
            You have {pendingTodos.length} pending {pendingTodos.length === 1 ? 'task' : 'tasks'} that need your attention.
            Visit the Tasks tab to view details.
          </p>
        </div>
      )}

      {/* ECAL Conversion */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-2">ECAL Conversion Rate</p>
            <p className="text-4xl font-bold text-gradient-gold">{metrics.ecalConversion}%</p>
            <p className="text-xs text-gray-500 mt-3">
              Keep promoting Ethos Card for better conversion rates
            </p>
          </div>
          <div className="p-4 bg-luxury-gold/20 rounded-2xl">
            <Award className="w-10 h-10 text-luxury-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};
