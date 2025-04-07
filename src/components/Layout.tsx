import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold">InvoiceFill</Link>
          <nav className="flex space-x-4">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/invoice/new" className="hover:underline">New Invoice</Link>
            <Link to="/proposal/new" className="hover:underline">New Proposal</Link>
            <Link to="/templates" className="hover:underline">Templates</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Able Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
