import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import InvoiceNew from './pages/InvoiceNew'
import ProposalNew from './pages/ProposalNew'
import Templates from './pages/Templates'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoice/new" element={<InvoiceNew />} />
          <Route path="/proposal/new" element={<ProposalNew />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
