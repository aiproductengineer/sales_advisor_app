import React from 'react';
import { CheckCircle2, Circle, Calendar, AlertCircle, User, Gift, Heart, Clock } from 'lucide-react';
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
      <div className="card bg-gradient-to-r from-primary-700 to-primary-600 text-white border-0">
        <h1 className="text-2xl font-display font-bold mb-1">Daily Tasks</h1>
        <p className="text-primary-100">
          {pendingTodos.length} pending, {completedTodos.length} completed
        </p>
      </div>

      {/* Pending Tasks */}
      {pendingTodos.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Pending Tasks</h2>
          {sortedPending.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onComplete={completeTodo} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">All caught up!</h3>
          <p className="text-gray-500">No pending tasks at the moment</p>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
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
        return <Gift className="w-5 h-5 text-pink-600" />;
      case 'anniversary':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'follow-up':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'reservation-expiring':
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = () => {
    if (isCompleted) return 'border-gray-300';
    switch (todo.priority) {
      case 'high':
        return 'border-red-500 border-l-4';
      case 'medium':
        return 'border-yellow-500 border-l-4';
      case 'low':
        return 'border-blue-500 border-l-4';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className={`card ${getPriorityColor()} ${isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex gap-3">
        <button
          onClick={() => !isCompleted && onComplete(todo.id)}
          disabled={isCompleted}
          className="flex-shrink-0 mt-1"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-primary-600 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              {getTypeIcon()}
              <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                {todo.customerName}
              </h3>
            </div>
            {!isCompleted && (
              <span className={`badge ${
                todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {todo.priority}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-2">{todo.description}</p>

          {todo.suggestedAction && !isCompleted && (
            <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm text-blue-800 mb-2">
              <strong>Suggested:</strong> {todo.suggestedAction}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(todo.dueDate)}</span>
            </div>
            <span className={isPastDue ? 'text-red-600 font-medium' : ''}>
              {formatRelativeTime(todo.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
