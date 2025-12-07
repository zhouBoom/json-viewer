import React from 'react';

const DataPreview = ({ data }) => {
  const analyzeData = (obj) => {
    const stats = {
      totalItems: 0,
      strings: 0,
      numbers: 0,
      booleans: 0,
      nulls: 0,
      arrays: 0,
      objects: 0,
      maxDepth: 0
    };

    const traverse = (item, depth = 1) => {
      stats.totalItems++;
      
      if (depth > stats.maxDepth) {
        stats.maxDepth = depth;
      }

      if (item === null) {
        stats.nulls++;
        return;
      }

      const type = typeof item;

      if (type === 'string') {
        stats.strings++;
      } else if (type === 'number') {
        stats.numbers++;
      } else if (type === 'boolean') {
        stats.booleans++;
      } else if (Array.isArray(item)) {
        stats.arrays++;
        item.forEach(child => traverse(child, depth + 1));
      } else if (type === 'object') {
        stats.objects++;
        Object.values(item).forEach(child => traverse(child, depth + 1));
      }
    };

    traverse(obj);
    return stats;
  };

  const stats = analyzeData(data);

  return (
    <div className="data-preview">
      <h3>数据预览</h3>
      <div className="data-stats">
        <div className="stat-item">
          <div className="stat-label">总项数</div>
          <div className="stat-value">{stats.totalItems}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">字符串</div>
          <div className="stat-value">{stats.strings}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">数字</div>
          <div className="stat-value">{stats.numbers}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">布尔值</div>
          <div className="stat-value">{stats.booleans}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">空值</div>
          <div className="stat-value">{stats.nulls}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">数组</div>
          <div className="stat-value">{stats.arrays}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">对象</div>
          <div className="stat-value">{stats.objects}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">最大深度</div>
          <div className="stat-value">{stats.maxDepth}</div>
        </div>
      </div>
    </div>
  );
};

export default DataPreview;