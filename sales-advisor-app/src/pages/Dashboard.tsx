import React from 'react';
import { TrendingUp, Target, Award, Star, Users, CheckCircle2 } from 'lucide-react';
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
    ? 'bg-green-600'
    : metrics.targetVsAchieved.percentComplete >= 70
    ? 'bg-yellow-600'
    : 'bg-red-600';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary-700 to-primary-600 text-white border-0">
        <h1 className="text-2xl font-display font-bold mb-1">
          Welcome back, {currentAdvisor.name.split(' ')[0]}!
        </h1>
        <p className="text-primary-100">
          {currentAdvisor.storeName}
        </p>
      </div>

      {/* Target vs Achievement */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-lg">Monthly Target</h2>
          </div>
          <span className={`text-sm font-medium ${
            metrics.targetVsAchieved.variance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.targetVsAchieved.variance >= 0 ? '+' : ''}
            {formatCurrency(metrics.targetVsAchieved.variance)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Target</span>
            <span className="font-semibold">{formatCurrency(metrics.targetVsAchieved.target)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Achieved</span>
            <span className="font-semibold text-primary-700">
              {formatCurrency(metrics.targetVsAchieved.achieved)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{metrics.targetVsAchieved.percentComplete.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${progressColor} transition-all duration-500 rounded-full`}
                style={{ width: `${Math.min(metrics.targetVsAchieved.percentComplete, 100)}%` }}
              />
            </div>
          </div>

          {/* Commission Estimate */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated Commission</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(metrics.commissionEstimate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-blue-50 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">MTD Transactions</p>
              <p className="text-2xl font-bold text-blue-900">
                {currentAdvisor.performance.mtdTransactions}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-900">
                {currentAdvisor.performance.conversionRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">NPS Score</p>
              <p className="text-2xl font-bold text-purple-900">
                {currentAdvisor.performance.npsScore}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-amber-50 border-amber-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Mystery Audit</p>
              <p className="text-2xl font-bold text-amber-900">
                {currentAdvisor.performance.mysteryAuditScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div className="card border-orange-200 bg-orange-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
              Pending Tasks
            </h3>
            <span className="badge bg-orange-200 text-orange-800">
              {pendingTodos.length}
            </span>
          </div>
          <p className="text-sm text-gray-700">
            You have {pendingTodos.length} pending {pendingTodos.length === 1 ? 'task' : 'tasks'} that need your attention.
            Visit the Tasks tab to view details.
          </p>
        </div>
      )}

      {/* ECAL Conversion */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">ECAL Conversion Rate</p>
            <p className="text-3xl font-bold text-primary-700">{metrics.ecalConversion}%</p>
          </div>
          <div className="p-3 bg-primary-50 rounded-lg">
            <Award className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Keep promoting Ethos Card for better conversion rates
          </p>
        </div>
      </div>
    </div>
  );
};
