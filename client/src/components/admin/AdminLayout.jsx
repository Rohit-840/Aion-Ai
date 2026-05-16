import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

/**
 * Shell for the admin dashboard: sidebar + topbar + content area.
 * Handles the mobile sidebar drawer state.
 */
const AdminLayout = ({
  activeTab,
  onTabChange,
  title,
  onRefresh,
  refreshing,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    onTabChange(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <AdminTopbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
        <main className="px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
