import { Handle } from 'reactflow';
import { Fingerprint } from "@phosphor-icons/react";

const ConditionNode = ({ data }) => (
    <div className="p-4 bg-yellow-500 text-white flex place-content-center  rounded shadow-lg">
      <Fingerprint />
      <p className="text-sm">{data.label}</p>
      {/* Left handle (for incoming connections) */}
      <Handle type="target" position="top" id="a" />
      {/* Right handle (for outgoing connections) */}
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
  
  export default ConditionNode;