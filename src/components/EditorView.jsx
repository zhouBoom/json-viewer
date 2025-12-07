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
    <div className="editor-container">
      <button
        onClick={handleFormat}
        className="format-btn"
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