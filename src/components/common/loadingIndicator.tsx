const LoadingIndicator: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
      </div>
    </>
  );
};
export default LoadingIndicator;
