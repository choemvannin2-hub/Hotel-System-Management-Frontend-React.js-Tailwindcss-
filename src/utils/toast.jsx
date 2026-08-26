import toast from 'react-hot-toast';
import { CircleCheck, CircleAlert, AlertTriangle, Info } from 'lucide-react';

const baseStyle = {
  className: 'bg-slate-900 text-white rounded-2xl p-4 shadow-2xl text-sm font-medium flex items-center gap-3 max-w-md',
  duration: 4000,
};

export const customToast = {
  success: (message) =>
    toast(message, {
      ...baseStyle,
      icon: <CircleCheck className="h-5 w-5 text-emerald-400 shrink-0" />,
    }),

  error: (message) =>
    toast(message, {
      ...baseStyle,
      icon: <CircleAlert className="h-5 w-5 text-red-400 shrink-0" />,
    }),

  warning: (message) =>
    toast(message, {
      ...baseStyle,
      icon: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
    }),

  info: (message) =>
    toast(message, {
      ...baseStyle,
      icon: <Info className="h-5 w-5 text-blue-400 shrink-0" />,
    }),

  // Toast with interactive action button (e.g., Redirect / Login)
  action: (message, buttonText, onAction) =>
    toast(
      (t) => (
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400 shrink-0" />
            <span>{message}</span>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onAction();
            }}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shrink-0"
          >
            {buttonText}
          </button>
        </div>
      ),
      {
        ...baseStyle,
        duration: 5000,
      }
    ),
};