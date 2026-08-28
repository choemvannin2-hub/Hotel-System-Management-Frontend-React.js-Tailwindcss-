import { CheckCircle2, Download, X, Calendar, User, CreditCard } from 'lucide-react';

const ReceiptPopup = ({ booking, payment, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 print:shadow-none print:w-full print:max-w-none">
        
        {/* Success Header */}
        <div className="bg-emerald-600 text-white p-6 text-center relative print:bg-none print:text-black print:p-0 print:mb-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-emerald-700 transition-colors print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md print:hidden">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold">Payment Successful!</h2>
          <p className="text-emerald-100 text-xs mt-1 print:text-gray-500">
            Thank you for your booking. Here is your receipt.
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-5">
          {/* Payment Summary Header */}
          <div className="text-center pb-4 border-b border-dashed border-gray-200">
            <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Total Paid</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              ${booking.totalPrice || payment?.amount || '0.00'}
            </div>
            {payment?.id && (
              <p className="text-xs text-gray-400 mt-1">Transaction ID: #{payment.id}</p>
            )}
          </div>

          {/* Details Grid */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-400" /> Booking Code
              </span>
              <span className="font-semibold text-gray-900">{booking.bookingCode || booking.id}</span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> Guests
              </span>
              <span className="font-medium text-gray-800">{booking.guest || booking.guests} Guest(s)</span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Check-in
              </span>
              <span className="font-medium text-gray-800">{booking.checkIn}</span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Check-out
              </span>
              <span className="font-medium text-gray-800">{booking.checkOut}</span>
            </div>
          </div>

          {/* Room info banner */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Room Details</span>
            <span className="font-semibold text-slate-800">
              Room #{booking.roomNumber || booking.roomId || 'Reserved'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="w-1/2 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReceiptPopup;