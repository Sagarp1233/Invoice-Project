const TailwindForceStyles = () => {
  // This component is never shown, it's only here to force Tailwind to include certain classes
  return (
    <div className="hidden">
      {/* Status badge styles */}
      <span className="bg-red-100 text-red-800"></span>
      <span className="bg-amber-100 text-amber-800"></span>
      <span className="bg-green-100 text-green-800"></span>
      <span className="bg-gray-100 text-gray-600"></span>
      <span className="bg-gray-100 text-gray-800"></span>

      {/* Any other classes you want to preserve */}
      <span className="bg-invoice-purple text-white"></span>
      <span className="bg-invoice-darkPurple text-white"></span>
    </div>
  );
};

export default TailwindForceStyles;
