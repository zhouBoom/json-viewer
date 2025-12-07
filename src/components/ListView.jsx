import React from 'react';

const ListView = ({ data }) => {
  const flattenObject = (obj, prefix = '') => {
    let flattened = [];

    if (obj === null) {
      flattened.push({ path: prefix, value: null, type: 'null' });
      return flattened;
    }

    const type = typeof obj;

    if (type !== 'object' || Array.isArray(obj)) {
      let valueType = type;
      if (Array.isArray(obj)) valueType = 'array';
      if (obj === null) valueType = 'null';
      
      flattened.push({ 
        path: prefix, 
        value: obj, 
        type: valueType 
      });
      return flattened;
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        flattened = flattened.concat(flattenObject(obj[key], newPrefix));
      }
    }

    return flattened;
  };

  const formatValue = (value, type) => {
    switch (type) {
      case 'string':
        return <span className="value-string">" {value} "</span>;
      case 'number':
        return <span className="value-number">{value}</span>;
      case 'boolean':
        return <span className="value-boolean">{value.toString()}</span>;
      case 'null':
        return <span className="value-null">null</span>;
      case 'array':
        return <span className="value-number">[{value.length} items]</span>;
      case 'object':
        return <span className="value-number">{Object.keys(value).length} keys</span>;
      default:
        return <span>{value}</span>;
    }
  };

  const flattenedData = flattenObject(data);

  return (
    <div className="list-view">
      {flattenedData.map((item, index) => (
        <div key={index} className="list-item">
          <span className="node-key">{item.path}:</span>
          <span className="node-value"> {formatValue(item.value, item.type)}</span>
        </div>
      ))}
    </div>
  );
};

export default ListView;