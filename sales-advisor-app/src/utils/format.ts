import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date, formatStr: string = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy, hh:mm a');
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatPhone = (phone: string): string => {
  // Format Indian phone numbers
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

export const getLoyaltyTierColor = (tier: string): string => {
  switch (tier) {
    case 'Platinum':
      return 'badge-platinum';
    case 'Gold':
      return 'badge-gold';
    case 'Silver':
      return 'badge-silver';
    case 'Bronze':
      return 'badge-bronze';
    default:
      return 'badge';
  }
};

export const getVelocityClass = (velocity: string): string => {
  switch (velocity) {
    case 'fast':
      return 'velocity-fast';
    case 'medium':
      return 'velocity-medium';
    case 'slow':
      return 'velocity-slow';
    default:
      return '';
  }
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};
