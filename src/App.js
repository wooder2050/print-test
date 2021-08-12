import { useState, useCallback } from 'react';
import printJS from 'print-js';

function App() {
  const [isScan, setIsScan] = useState(false);

  const handleScan = useCallback(async () => {
    function loadingData() {
      console.log('loading complete!!');
    }
    await loadingData();
    setIsScan(true);
    printJS('print', 'html');
  }, [setIsScan]);

  return (
    <div>
      {isScan && <div id='print'>test page</div>}
      <button onClick={handleScan}>스캔</button>
    </div>
  );
}

export default App;
