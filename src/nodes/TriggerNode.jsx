import { Handle } from 'reactflow';
import { Sparkle } from "@phosphor-icons/react";
import React from 'react';


const TriggerNode = ({ data }) => {
  const handleStopPropagation = (event) => {
    event.stopPropagation()
    event.preventDefault();
  };

  return (
    <div className="p-4 bg-blue-500 text-white rounded shadow">
      <div className="flex flex-wrap place-content-center">
      <Sparkle/>
        <p className="text-sm">{data.label}</p>
      </div>
      <p className="text-xs w-full">{data.description || 'No description provided'}</p>
      {/* Left handle (for incoming connections) */}
      <Handle type="target" position="top" id="a" />
      {/* Right handle (for outgoing connections) */}
      <Handle type="source" position="bottom" id="b" />
    </div>
  );
};

export default TriggerNode;