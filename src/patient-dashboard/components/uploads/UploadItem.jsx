import { FiFileText } from "react-icons/fi";

function UploadItem({ file, onView }) {
  const { name, type, time } = file;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7FAFF] border border-[#e5edff]">
      <div className="h-10 w-10 rounded-xl bg-white text-[#0057FF] border border-[#dfe7ff] flex items-center justify-center">
        <FiFileText />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[#0B1D4A]">{name}</p>
        <p className="text-xs text-slate-500">
          {type} • {time}
        </p>
      </div>
      <button
        type="button"
        className="text-xs font-semibold text-[#0057FF]"
        onClick={() => onView?.(file)}
      >
        View
      </button>
    </div>
  );
}

export default UploadItem;
