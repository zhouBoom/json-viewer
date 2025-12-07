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
    <div className="app">
      <header className="header">
        <h1>JSON 查看工具</h1>
      </header>
      
      <main className="main">
        <div className="viewer-container">
          <div className="view-controls">
            <div className="view-toggle">
              <button 
                className={`view-btn ${currentView === 'tree' ? 'active' : ''}`}
                onClick={() => setCurrentView('tree')}
              >
                树状视图
              </button>
              <button 
                className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                列表视图
              </button>
              <button 
                className={`view-btn ${currentView === 'editor' ? 'active' : ''}`}
                onClick={() => setCurrentView('editor')}
              >
                编辑器视图
              </button>
            </div>
            
            <label className="upload-btn">
              上传JSON文件
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {!jsonData && !error && (
            <div className="upload-section">
              <h3>请上传JSON文件或在编辑器中输入JSON数据</h3>
              <label className="upload-btn" style={{ marginTop: '1rem' }}>
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
              <div className="view-content">
                {renderCurrentView()}
              </div>
              
              <DataPreview data={jsonData} />
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <p>JSON Viewer Tool © 2024</p>
      </footer>
    </div>
  );
}

export default App;
