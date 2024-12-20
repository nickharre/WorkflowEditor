import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import custom nodes
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import WaitNode from './nodes/WaitNode';
import DatabaseNode from './nodes/DatabaseNode';


const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [pendingNode, setPendingNode] = useState(null); // Temporarily store dropped node
  const [selectedLabel, setSelectedLabel] = useState(''); // Store label selection
  const [descriptionInput, setDescriptionInput] = useState(''); // Store description input

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


  // Handle drag-and-drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - event.target.getBoundingClientRect().x,
        y: event.clientY - event.target.getBoundingClientRect().y,
      };

      if (!type) return;

      // Prefill the label using default labels
      const defaultLabel = defaultLabels[type] || 'New Node';

      // Temporarily store the node and open the label + description prompt
      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: defaultLabel, description: '' },
      };
      setPendingNode(newNode); // Store the node in pending state
      setSelectedLabel(defaultLabel); // Prefill the label
      setDescriptionInput(''); // Clear description input
    },
    []
  );

  // Confirm node details
  const confirmNodeData = () => {
    if (pendingNode) {
      setNodes((nds) =>
        nds.concat({
          ...pendingNode,
          data: { label: selectedLabel, description: descriptionInput },
        })
      );
      setPendingNode(null);
      setSelectedLabel('');
      setDescriptionInput('');
    }
  };

  const cancelNodeCreation = () => {
    setPendingNode(null);
    setSelectedLabel('');
    setDescriptionInput('');
  };


  const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    wait: WaitNode,
    database: DatabaseNode
  };

    // Default labels for node types
    const defaultLabels = {
        trigger: 'Split Audience',
        action: 'Send Mailout',
        condition: 'Message Engagement',
        wait: 'Wait',
        database: 'Existing Database Record'
      };
    

  // Dropdown options for labels
  const labelOptions = [
    'Send Mailout', 
    'Send SMS', 
    'Send Push Notification',
    'Wait',
    'New Database Record',
    'Existing Database Record',
    'New Transaction',
    'Previous Transaction',
    'Split Audience',
    'Message Engagement'
    ];

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-4">
        <h3 className="text-2xl font-bold mb-2">New Journey</h3>
        <h3 className="text-md font-bold mb-2">Drag Nodes</h3>
        <div
          className="p-2 mb-2 bg-slate-100 text-slate-800 rounded cursor-pointer"
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'trigger')}
        >
          Split
        </div>
        <div
          className="p-2 mb-2 bg-slate-100 text-slate-800 rounded cursor-pointer"
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'wait')}
        >
          Wait
        </div>

        <div
          className="p-2 mb-2 bg-slate-100 text-slate-800 rounded cursor-pointer"
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'database')}
        >
          Database or Transaction
        </div>

        <div
          className="p-2 mb-2 bg-slate-100 text-slate-800 rounded cursor-pointer"
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'action')}
        >
          Action
        </div>
        <div
          className="p-2 bg-slate-100 text-slate-800 rounded cursor-pointer"
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'condition')}
        >
          Condition Node
        </div>
      </aside>

      {/* ReactFlow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Label and Description Input Modal */}
      {pendingNode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">New Node</h2>
            <label className="block mb-2 font-semibold">Type</label>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
            >
              <option value="" disabled>Select a type</option>
              {labelOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label className="block mb-2 font-semibold">Detail</label>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter node description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={cancelNodeCreation}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={confirmNodeData}
                disabled={!selectedLabel} // Disable if no label is selected
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowBuilder;