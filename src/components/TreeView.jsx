import React, { useState } from 'react';

const TreeView = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = (path) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderValue = (value, path) => {
    const valueType = typeof value;

    if (value === null) {
      return <span className="value-null">null</span>;
    }

    if (valueType === 'string') {
      return <span className="value-string">" {value} "</span>;
    }

    if (valueType === 'number') {
      return <span className="value-number">{value}</span>;
    }

    if (valueType === 'boolean') {
      return <span className="value-boolean">{value.toString()}</span>;
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedNodes.has(path);
      const nodeKey = `${path}[${value.length}]`;
      
      return (
        <div className="tree-node">
          <div 
            className="node-header"
            onClick={() => toggleNode(path)}
          >
            <span className={`node-toggle ${isExpanded ? 'open' : ''}`}>
              ▶
            </span>
            <span className="node-key">{nodeKey}</span>
          </div>
          
          {isExpanded && (
            <div className="children">
              {value.map((item, index) => 
                renderValue(item, `${path}[${index}]`)
              )}
            </div>
          )}
        </div>
      );
    }

    if (valueType === 'object') {
      const isExpanded = expandedNodes.has(path);
      const keys = Object.keys(value);
      const nodeKey = `${path}{${keys.length}}`;
      
      return (
        <div className="tree-node">
          <div 
            className="node-header"
            onClick={() => toggleNode(path)}
          >
            <span className={`node-toggle ${isExpanded ? 'open' : ''}`}>
              ▶
            </span>
            <span className="node-key">{nodeKey}</span>
          </div>
          
          {isExpanded && (
            <div className="children">
              {keys.map((key) => (
                <div key={key} className="tree-node">
                  <div className="node-header">
                    <span className="node-key">{key}:</span>
                    {renderValue(value[key], `${path}${path ? '.' : ''}${key}`)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="tree-view">
      {renderValue(data, '')}
    </div>
  );
};

export default TreeView;