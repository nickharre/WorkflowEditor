import { Handle } from 'reactflow';
import { Database } from "@phosphor-icons/react";

const DatabaseNode = ({ data }) => (
    <div className="p-4 bg-slate-100 text-slate-800 rounded shadow-lg">
        <div className="flex flex-wrap place-content-center">
        <div className="flex items-center justify-center w-6 h-6 bg-violet-500 rounded-full mr-2">
      <Database color="white"/>
        </div>  
        <p className="text-sm text-slate-500">{data.label}</p>
      </div>
      <p className="text-sm w-full">{data.description || 'No description provided'}</p>
      {/* Left handle (for incoming connections) */}
      <Handle type="target" position="top" id="a" />
      {/* Right handle (for outgoing connections) */}
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
  
  export default DatabaseNode;