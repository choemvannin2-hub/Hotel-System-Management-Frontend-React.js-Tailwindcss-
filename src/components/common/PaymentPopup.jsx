import { useState } from 'react';
import { X, CreditCard, Loader2 } from 'lucide-react';

const PaymentPopup = ({ booking, onPay, onClose }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      setIsPaying(true);
      setError('');
      await onPay();
    } catch (err) {
      console.error("Payment failed:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Payment failed. Please try again."
      );
    } finally {
      setIsPaying(false);
    }
  };

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Confirm & Pay</span>
          </div>
          <button
            onClick={onClose}
            disabled={isPaying}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-gray-500 font-medium">Booking Code</span>
              <span className="font-semibold text-slate-900">{booking.bookingCode || booking.id}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Room</span>
              <span className="font-medium text-slate-800">{booking.roomNumber || booking.room?.roomNumber || 'Standard'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Check-in</span>
              <span className="font-medium text-slate-800">{booking.checkIn}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Check-out</span>
              <span className="font-medium text-slate-800">{booking.checkOut}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium text-slate-800">{booking.guest || booking.guests} guests</span>
            </div>
          </div>

          {/* Total Price Section */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-gray-700">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              ${booking.totalPrice || booking.price}
            </span>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPaying}
            className="w-1/3 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePayment}
            disabled={isPaying}
            className="w-2/3 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20"
          >
            {isPaying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Pay Now</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPopup;