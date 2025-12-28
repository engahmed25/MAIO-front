function AppointmentCard({
  image,
  name,
  specialization,
  address,
  date,
  time,
  onPayment,
  onCancel
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md p-6 flex items-start gap-6 max-w-4xl">
      {/* Doctor Image */}
      <div className="flex-shrink-0">
        <img 
          src={image || "https://via.placeholder.com/120x140"} 
          alt={name}
          className="w-28 h-36 object-cover rounded-lg"
        />
      </div>
      
      {/* Doctor Info */}
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-gray-600 text-sm mb-4">{specialization}</p>
        
        <div className="space-y-2">
          <div>
            <p className="text-gray-700 font-semibold text-sm">Address:</p>
            <p className="text-gray-600 text-sm">{address}</p>
          </div>
          
          <div>
            <p className="text-gray-700 font-semibold text-sm">
              Date & Time: <span className="font-normal">{date} | {time}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <button 
          onClick={onPayment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-md font-medium transition-colors"
        >
          Pay here
        </button>
        <button 
          onClick={onCancel}
          className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-2.5 rounded-md font-medium border border-gray-300 transition-colors"
        >
          Cancel appointment
        </button>
      </div>
    </div>
  );
}

e