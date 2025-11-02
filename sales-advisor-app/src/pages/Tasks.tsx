import React from 'react';
import { CheckCircle2, Circle, Calendar, AlertCircle, User, Gift, Heart, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDate, formatRelativeTime } from '../utils/format';
import { TodoItem } from '../types';

export const Tasks: React.FC = () => {
  const todos = useStore((state) => state.todos);
  const completeTodo = useStore((state) => state.completeTodo);

  const pendingTodos = todos.filter((t) => t.status === 'pending');
  const completedTodos = todos.filter((t) => t.status === 'completed');

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedPending = [...pendingTodos].sort((a, b) => {
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="card-premium p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl font-display font-bold mb-1 text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-luxury-gold" />
            Daily Tasks
          </h1>
          <p className="text-gray-400">
            <span className="text-luxury-gold font-semibold">{pendingTodos.length}</span> pending, {' '}
            <span className="text-green-400 font-semibold">{completedTodos.length}</span> completed
          </p>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-300 px-1">Pending Tasks</h2>
          {sortedPending.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onComplete={completeTodo} />
          ))}
        </div>
      ) : (
        <div className="glass-card text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">All caught up!</h3>
          <p className="text-gray-400">No pending tasks at the moment</p>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-300 px-1">Completed</h2>
          {completedTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onComplete={completeTodo} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TodoCardProps {
  todo: TodoItem;
  onComplete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onComplete }) => {
  const isCompleted = todo.status === 'completed';
  const isPastDue = !isCompleted && new Date(todo.dueDate) < new Date();

  const getTypeIcon = () => {
    switch (todo.type) {
      case 'birthday':
        return <Gift className="w-5 h-5 text-pink-400" />;
      case 'anniversary':
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'follow-up':
        return <User className="w-5 h-5 text-blue-400" />;
      case 'reservation-expiring':
        return <Clock className="w-5 h-5 text-orange-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityStyles = () => {
    if (isCompleted) return 'border-l-2 border-l-gray-600';
    switch (todo.priority) {
      case 'high':
        return 'border-l-4 border-l-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      case 'medium':
        return 'border-l-4 border-l-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]';
      case 'low':
        return 'border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]';
      default:
        return 'border-l-2 border-l-gray-600';
    }
  };

  return (
    <div className={`glass-card p-4 ${getPriorityStyles()} ${isCompleted ? 'opacity-60' : ''} relative overflow-hidden`}>
      {!isCompleted && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl" />
      )}
      <div className="flex gap-3 relative z-10">
        <button
          onClick={() => !isCompleted && onComplete(todo.id)}
          disabled={isCompleted}
          className="flex-shrink-0 mt-1 group"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-500 group-hover:text-luxury-gold transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              {getTypeIcon()}
              <h3 className={`font-semibold text-white ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                {todo.customerName}
              </h3>
            </div>
            {!isCompleted && (
              <span className={`badge flex-shrink-0 ${
                todo.priority === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                todo.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                'bg-blue-500/20 text-blue-300 border-blue-500/30'
              }`}>
                {todo.priority}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-300 mb-2">{todo.description}</p>

          {todo.suggestedAction && !isCompleted && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-sm text-blue-300 mb-2 backdrop-blur-xl">
              <strong>Suggested:</strong> {todo.suggestedAction}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(todo.dueDate)}</span>
            </div>
            <span className={isPastDue ? 'text-red-400 font-medium' : ''}>
              {formatRelativeTime(todo.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
