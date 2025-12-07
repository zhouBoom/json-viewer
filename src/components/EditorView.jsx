import React, { useState, useEffect } from 'react';

const EditorView = ({ data, onJsonChange }) => {
  const [jsonString, setJsonString] = useState('');

  useEffect(() => {
    if (data) {
      setJsonString(JSON.stringify(data, null, 2));
    }
  }, [data]);

  const handleChange = (event) => {
    const value = event.target.value;
    setJsonString(value);
  };

  const handleBlur = () => {
    onJsonChange(jsonString);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonString(formatted);
      onJsonChange(formatted);
    } catch (error) {
      alert('无效的JSON格式，无法格式化');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleFormat}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#5568d3'}
        onMouseLeave={(e) => e.target.style.background = '#667eea'}
      >
        格式化
      </button>
      <textarea
        className="json-input"
        value={jsonString}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="请输入JSON数据..."
      />
    </div>
  );
};

export default EditorView;