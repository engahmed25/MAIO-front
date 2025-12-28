function UploadGroup({ title, children }) {
  return (
    <div className="mb-6 mt-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
export default UploadGroup;
