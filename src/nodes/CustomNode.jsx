const CustomNode = ({ data }) => (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <p className="text-sm font-bold">{data.label}</p>
    </div>
  );
  
  export default CustomNode;