import { Handle } from 'reactflow';
import { ArrowsSplit } from "@phosphor-icons/react";

const TriggerNode = ({ data }) => (
    <div className="p-4 bg-slate-100 text-slate-800 rounded shadow-lg">
        <div className="flex flex-wrap place-content-center">
        <div className="flex items-center justify-center w-6 h-6 bg-sky-500 rounded-full mr-2">
      <ArrowsSplit color="white"/>
        </div>  
        <p className="text-sm text-slate-500">{data.label}</p>
      </div>
      <p className="text-sm w-full">{data.description || 'No description provided'}</p>
      {/* Left handle (for incoming connections) */}
      <Handle type="target" position="top" id="a" />
      {/* Right handle (for outgoing connections) */}
      <Handle
        type="source"
        position="bottom"
        id="a"
        style={{ left: '25%' }} // Position the first handle at 25% width
      />
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ left: '75%' }} // Position the second handle at 75% width
      />
    </div>
  );
  
  export default TriggerNode;