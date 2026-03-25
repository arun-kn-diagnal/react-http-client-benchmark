// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { ApiProvider } from '@reduxjs/toolkit/query/react'
// import { Provider } from 'react-redux'

// import { benchmarkStore } from './Services/rtkqService.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { rtkApi } from './Services/rtkqService.tsx'

createRoot(document.getElementById('root')!).render(
    <ApiProvider api={rtkApi}>
      <App />
    </ApiProvider>

)
