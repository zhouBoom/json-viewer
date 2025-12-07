import React, { useState } from 'react';
import './styles/App.css';
import TreeView from './components/TreeView';
import ListView from './components/ListView';
import EditorView from './components/EditorView';
import DataPreview from './components/DataPreview';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [currentView, setCurrentView] = useState('tree');
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setJsonData(data);
          setError(null);
        } catch (err) {
          setError('无效的JSON文件');
          setJsonData(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonInput = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      setJsonData(data);
      setError(null);
    } catch (err) {
      setError('无效的JSON格式');
    }
  };

  const renderCurrentView = () => {
    if (!jsonData) return null;

    switch (currentView) {
      case 'tree':
        return <TreeView data={jsonData} />;
      case 'list':
        return <ListView data={jsonData} />;
      case 'editor':
        return <EditorView data={jsonData} onJsonChange={handleJsonInput} />;
      default:
        return <TreeView data={jsonData} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon">{ }</span>
          <h1>JSON Viewer</h1>
        </div>
        <p className="subtitle">现代化的 JSON 数据可视化工具</p>
      </header>

      <main className="main-content">
        <div className="glass-panel viewer-card">
          <div className="controls-bar">
            <div className="view-toggles">
              <button
                className={`toggle-btn ${currentView === 'tree' ? 'active' : ''}`}
                onClick={() => setCurrentView('tree')}
              >
                树状视图
              </button>
              <button
                className={`toggle-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                列表视图
              </button>
              <button
                className={`toggle-btn ${currentView === 'editor' ? 'active' : ''}`}
                onClick={() => setCurrentView('editor')}
              >
                编辑器
              </button>
            </div>

            <div className="actions">
              <label className="upload-btn primary">
                <span>上传文件</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="content-area">
            {!jsonData && !error && (
              <div className="empty-state">
                <div className="empty-icon">📂</div>
                <h3>开始使用</h3>
                <p>上传 JSON 文件</p>
                <label className="upload-btn large">
                  选择文件
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            {jsonData && (
              <>
                <div className="view-viewport custom-scrollbar">
                  {renderCurrentView()}
                </div>
                <div className="data-preview-sidebar">
                  <DataPreview data={jsonData} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>JSON Viewer Tool © 2024</p>
      </footer>
    </div>
  );
}

export default App;
