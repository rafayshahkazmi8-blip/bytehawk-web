import React, { useState, useEffect } from 'react';
import { Shield, Users, DollarSign, Activity, FileText, CheckCircle, Trash2, Mail, ExternalLink, Star, LogOut, RefreshCw, Edit, Globe } from 'lucide-react';
import GlassCard from './GlassCard';
import { getApiUrl } from '../apiConfig';

const AdminDashboard = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('orders'); // 'orders', 'messages', 'portfolio', 'websites'
  const [orderFilter, setOrderFilter] = useState('All');

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('3d-models');
  const [uploadType, setUploadType]         = useState('image');
  const [uploadName, setUploadName]         = useState('');
  const [uploadFile, setUploadFile]         = useState(null);
  const [uploading, setUploading]           = useState(false);

  // Website Form State
  const [webName, setWebName] = useState('');
  const [webLink, setWebLink] = useState('');
  const [webFile, setWebFile] = useState(null);
  const [webPreview, setWebPreview] = useState('');
  const [webUploading, setWebUploading] = useState(false);

  // Edit Website State
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState('');
  const [editUploading, setEditUploading] = useState(false);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // Fetch Orders
      const orderRes = await fetch(getApiUrl('/api/orders'));
      const orderJson = await orderRes.json();
      if (orderJson.success) setOrders(orderJson.data);

      // Fetch Messages & reviews
      const messageRes = await fetch(getApiUrl('/api/contacts'));
      const messageJson = await messageRes.json();
      if (messageJson.success) setMessages(messageJson.data);

      // Fetch Portfolio items
      const pfRes = await fetch(getApiUrl('/api/portfolio'));
      const pfJson = await pfRes.json();
      if (pfJson.success && pfJson.data) {
        const flatList = [];
        Object.keys(pfJson.data).forEach(cat => {
          (pfJson.data[cat] || []).forEach(item => flatList.push({ ...item, category: cat }));
        });
        setPortfolioItems(flatList);
      }
    } catch (err) {
      console.error('Failed to load admin logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePortfolioUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Please select an image or video file to upload.');
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('name', uploadName || uploadFile.name);
      formData.append('category', uploadCategory);
      formData.append('type', uploadType);

      const res = await fetch(getApiUrl('/api/portfolio/upload'), {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        alert('Item uploaded successfully to Cloudinary / Portfolio Database!');
        setUploadName('');
        setUploadFile(null);
        fetchAdminData();
      } else {
        alert(json.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const deletePortfolioItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      const res = await fetch(getApiUrl(`/api/portfolio/${itemId}`), {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setPortfolioItems(prev => prev.filter(i => i._id !== itemId && i.id !== itemId));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleWebFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWebFile(file);
      setWebPreview(URL.createObjectURL(file));
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFile(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    if (!webName.trim()) {
      alert('Website Name is required.');
      return;
    }
    if (!webLink.trim()) {
      alert('Website Link is required.');
      return;
    }
    if (!isValidUrl(webLink)) {
      alert('Please enter a valid website URL starting with http:// or https://');
      return;
    }
    if (!webFile) {
      alert('Website Image is required.');
      return;
    }

    try {
      setWebUploading(true);
      const formData = new FormData();
      formData.append('file', webFile);
      formData.append('name', webName);
      formData.append('category', 'websites');
      formData.append('type', 'image');
      formData.append('link', webLink);

      const res = await fetch(getApiUrl('/api/portfolio/upload'), {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        alert('Website added successfully!');
        setWebName('');
        setWebLink('');
        setWebFile(null);
        setWebPreview('');
        fetchAdminData();
      } else {
        alert(json.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setWebUploading(false);
    }
  };

  const startEditing = (site) => {
    setEditingId(site._id || site.id);
    setEditName(site.name);
    setEditLink(site.link || '');
    setEditFile(null);
    setEditPreview(site.url);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditLink('');
    setEditFile(null);
    setEditPreview('');
  };

  const handleUpdateWebsite = async (site) => {
    if (!editName.trim()) {
      alert('Website Name is required.');
      return;
    }
    if (!editLink.trim()) {
      alert('Website Link is required.');
      return;
    }
    if (!isValidUrl(editLink)) {
      alert('Please enter a valid website URL starting with http:// or https://');
      return;
    }

    try {
      setEditUploading(true);
      const formData = new FormData();
      if (editFile) {
        formData.append('file', editFile);
      }
      formData.append('name', editName);
      formData.append('category', 'websites');
      formData.append('type', 'image');
      formData.append('link', editLink);
      if (site.public_id) {
        formData.append('old_public_id', site.public_id);
      }

      const itemId = site._id || site.id;
      const res = await fetch(getApiUrl(`/api/portfolio/${itemId}`), {
        method: 'PUT',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        alert('Website updated successfully!');
        cancelEditing();
        fetchAdminData();
      } else {
        alert(json.message || 'Update failed');
      }
    } catch (err) {
      alert('Update error: ' + err.message);
    } finally {
      setEditUploading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Update order status API call
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(getApiUrl(`/api/orders/${orderId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await response.json();
      if (json.success) {
        // Update local state smoothly
        setOrders(prev => prev.map(o => o._id === orderId || o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      alert('Failed to update status on server.');
    }
  };

  // Delete Order
  const deleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to discard this quote proposal?')) return;
    try {
      const response = await fetch(getApiUrl(`/api/orders/${orderId}`), {
        method: 'DELETE'
      });
      const json = await response.json();
      if (json.success) {
        setOrders(prev => prev.filter(o => o._id !== orderId && o.id !== orderId));
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Delete Message/Feedback
  const deleteMessage = async (msgId) => {
    if (!confirm('Are you sure you want to delete this message record?')) return;
    try {
      const response = await fetch(getApiUrl(`/api/contacts/${msgId}`), {
        method: 'DELETE'
      });
      const json = await response.json();
      if (json.success) {
        setMessages(prev => prev.filter(m => m._id !== msgId && m.id !== msgId));
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Calculate Metrics
  const totalPipelineRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  
  const averageRating = () => {
    const feedbackItems = messages.filter(m => m.type === 'Feedback');
    if (feedbackItems.length === 0) return 5.0;
    const sum = feedbackItems.reduce((acc, f) => acc + (f.rating || 5), 0);
    return (sum / feedbackItems.length).toFixed(1);
  };

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'All') return true;
    return order.status === orderFilter;
  });

  return (
    <section style={{ padding: '60px 0 100px 0' }} className="fade-in">
      <div className="container">
        
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield style={{ color: 'var(--secondary)' }} /> Vutuber Design Management Panel
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              Track pipeline revenue, manage custom client rigging intakes, and review client comments.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-outline btn-sm" onClick={fetchAdminData}>
              <RefreshCw size={14} /> Sync Server Data
            </button>
            {onLogout && (
              <button 
                className="btn btn-sm" 
                onClick={onLogout}
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.15)', 
                  border: '1px solid rgba(239, 68, 68, 0.4)', 
                  color: '#f87171' 
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-glow)', borderTop: '4px solid var(--secondary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px auto' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Synchronizing administrative logs...</p>
          </div>
        ) : (
          <>
            {/* 1. Statistics Row */}
            <div className="grid-3" style={{ marginBottom: '40px' }}>
              <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(13, 110, 253, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <DollarSign size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pipeline Revenue</span>
                  <h3 style={{ fontSize: '1.75rem', marginTop: '2px', color: 'var(--accent)' }}>${totalPipelineRevenue} USD</h3>
                </div>
              </GlassCard>

              <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                  <Activity size={24} style={{ color: '#f472b6' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Proposals</span>
                  <h3 style={{ fontSize: '1.75rem', marginTop: '2px' }}>{pendingOrdersCount} Requests</h3>
                </div>
              </GlassCard>

              <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Star size={24} style={{ color: '#22d3ee', fill: '#22d3ee' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Satisfaction</span>
                  <h3 style={{ fontSize: '1.75rem', marginTop: '2px' }}>{averageRating()} / 5.0 Rating</h3>
                </div>
              </GlassCard>
            </div>

            {/* 2. Sub-navigation tabs */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                borderBottom: '1px solid var(--border-glow)',
                marginBottom: '32px',
                flexWrap: 'wrap'
              }}
            >
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeSubTab === 'orders' ? '2.5px solid var(--primary)' : 'none',
                  color: activeSubTab === 'orders' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onClick={() => setActiveSubTab('orders')}
              >
                Custom Order Quotes ({orders.length})
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeSubTab === 'messages' ? '2.5px solid var(--primary)' : 'none',
                  color: activeSubTab === 'messages' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onClick={() => setActiveSubTab('messages')}
              >
                Messages & Feedback Reviews ({messages.length})
              </button>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeSubTab === 'portfolio' ? '2.5px solid var(--primary)' : 'none',
                  color: activeSubTab === 'portfolio' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onClick={() => setActiveSubTab('portfolio')}
              >
                Portfolio Manager ({portfolioItems.filter(i => i.category !== 'websites').length})
              </button>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeSubTab === 'websites' ? '2.5px solid var(--primary)' : 'none',
                  color: activeSubTab === 'websites' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onClick={() => setActiveSubTab('websites')}
              >
                Website Manager ({portfolioItems.filter(i => i.category === 'websites').length})
              </button>
            </div>

            {/* 3. Panel Content */}
            {activeSubTab === 'orders' && (
              /* ORDERS LOG */
              <div>
                
                {/* Status Filter */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {['All', 'Pending', 'Contacted', 'In Progress', 'Completed'].map(st => (
                    <button
                      key={st}
                      className={`btn ${orderFilter === st ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      style={{ borderRadius: '16px' }}
                      onClick={() => setOrderFilter(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {filteredOrders.length === 0 ? (
                  <GlassCard style={{ textAlign: 'center', padding: '48px' }}>
                    <FileText size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>No client quote requests match your filter.</p>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredOrders.map((order) => {
                      const orderId = order._id || order.id;
                      
                      return (
                        <GlassCard
                          key={orderId}
                          style={{
                            borderLeft: `4px solid ${
                              order.status === 'Completed' ? '#10b981' : 
                              order.status === 'In Progress' ? '#3b82f6' : 
                              order.status === 'Contacted' ? '#f59e0b' : 'var(--secondary)'
                            }`
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '16px', marginBottom: '16px' }}>
                            <div>
                              <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                                {order.clientName}
                              </h4>
                              <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                <span>Discord: <strong style={{ color: 'var(--secondary)' }}>@{order.discord}</strong></span>
                                <span>Email: <strong>{order.email}</strong></span>
                                <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent)' }}>
                                ${order.totalPrice} USD
                              </span>
                              
                              {/* Status Persistor Dropdown */}
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(orderId, e.target.value)}
                                style={{
                                  backgroundColor: '#0c0f17',
                                  border: '1px solid var(--border-light)',
                                  borderRadius: '6px',
                                  color: '#ffffff',
                                  padding: '6px 12px',
                                  fontFamily: 'inherit',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>

                              {/* Delete button */}
                              <button
                                onClick={() => deleteOrder(orderId)}
                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Order Details Body */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2.5fr', gap: '24px' }} className="admin-order-split">
                            <div style={{ borderRight: '1px solid var(--border-glow)', paddingRight: '20px' }}>
                              <h5 style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                                Selections:
                              </h5>
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <li>VTuber: <strong style={{ color: '#ffffff' }}>{order.vtuberPackage}</strong></li>
                                <li>Branding: <strong style={{ color: '#ffffff' }}>{order.brandingPackage}</strong></li>
                                {order.selectedAddons && order.selectedAddons.length > 0 && (
                                  <li style={{ marginTop: '6px' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Add-ons:</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                      {order.selectedAddons.map((ad, i) => (
                                        <span key={i} style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glow)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px' }}>
                                          {ad}
                                        </span>
                                      ))}
                                    </div>
                                  </li>
                                )}
                              </ul>

                              {order.references && (
                                <a
                                  href={order.references}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-outline btn-sm"
                                  style={{ marginTop: '16px', width: '100%', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', gap: '4px' }}
                                >
                                  Client References <ExternalLink size={12} />
                                </a>
                              )}
                              {order.description && (
                                <div style={{ marginTop: '12px' }}>
                                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Notes & Instructions</span>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                                    {order.description}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Right Col: Pricing & Package selections */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Configured Scope</h5>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', marginBottom: '16px' }}>
                                  {order.vtuberPackage && (
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <CheckCircle size={14} style={{ color: 'var(--neon-green)' }} /> <strong>VTuber:</strong> {order.vtuberPackage}
                                    </li>
                                  )}
                                  {order.brandingPackage && (
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <CheckCircle size={14} style={{ color: 'var(--neon-green)' }} /> <strong>Branding:</strong> {order.brandingPackage}
                                    </li>
                                  )}
                                  {order.selectedAddons && order.selectedAddons.length > 0 && (
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                      <CheckCircle size={14} style={{ color: 'var(--secondary)', marginTop: '3px' }} /> 
                                      <div>
                                        <strong>Upgrades:</strong> {order.selectedAddons.join(', ')}
                                      </div>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glow)', paddingTop: '12px', marginBottom: '16px' }}>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Calculated Total</span>
                                  <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: 'var(--accent)' }}>${order.totalPrice} USD</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(orderId, e.target.value)}
                                    style={{ flexGrow: 1, padding: '8px 12px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#ffffff', borderRadius: '6px', cursor: 'pointer' }}
                                  >
                                    <option value="Pending">Status: Pending</option>
                                    <option value="Contacted">Status: Contacted</option>
                                    <option value="In Progress">Status: In Progress</option>
                                    <option value="Completed">Status: Completed</option>
                                  </select>

                                  <button 
                                    onClick={() => deleteOrder(orderId)}
                                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <Trash2 size={14} /> Discard
                                  </button>
                                </div>
                              </div>

                            </div>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'messages' && (
              /* MESSAGES & FEEDBACK REVIEW */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.length === 0 ? (
                  <GlassCard style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No messages or feedback reviews received yet.</p>
                  </GlassCard>
                ) : (
                  messages.map((msg) => {
                    const msgId = msg._id || msg.id;
                    const isFeedback = msg.type === 'Feedback';
                    
                    return (
                      <GlassCard
                        key={msgId}
                        style={{
                          background: isFeedback ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, var(--bg-card) 100%)' : 'var(--bg-card)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-glow)', paddingBottom: '12px', marginBottom: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h4 style={{ fontSize: '1.15rem' }}>{msg.name}</h4>
                              <span style={{ fontSize: '0.7rem', backgroundColor: isFeedback ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)', color: isFeedback ? 'var(--accent)' : 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                                {msg.type}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email: {msg.email} | {new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {isFeedback && (
                              <div style={{ display: 'flex', gap: '2px' }}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} size={14} style={{ color: (msg.rating || 5) >= s ? 'var(--accent)' : 'var(--text-muted)', fill: (msg.rating || 5) >= s ? 'var(--accent)' : 'none' }} />
                                ))}
                              </div>
                            )}

                            <button
                              onClick={() => deleteMessage(msgId)}
                              style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div>
                          {!isFeedback && <h5 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '4px' }}>Subject: {msg.subject}</h5>}
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            {msg.message}
                          </p>
                        </div>
                      </GlassCard>
                    );
                  })
                )}
              </div>
            )}

            {activeSubTab === 'portfolio' && (
              /* PORTFOLIO MANAGER */
              <div>
                {/* Upload Card Form */}
                <GlassCard style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield style={{ color: 'var(--accent)' }} /> Add / Upload New Portfolio Work
                  </h3>
                  <form onSubmit={handlePortfolioUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Category</label>
                        <select
                          value={uploadCategory}
                          onChange={(e) => setUploadCategory(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                        >
                          <option value="3d-models">3D Models</option>
                          <option value="3d-animations">3D Animations</option>
                          <option value="2d-models">2D Models</option>
                          <option value="2d-animations">2D Animations</option>
                          <option value="2d-rigging">2D Rigging</option>
                          <option value="branding">Branding & Graphics</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Media Type</label>
                        <select
                          value={uploadType}
                          onChange={(e) => setUploadType(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                        >
                          <option value="image">Image (JPEG / PNG / WEBP)</option>
                          <option value="video">Video (MP4 / WEBM)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Display Title</label>
                        <input
                          type="text"
                          placeholder="e.g. VTuber Rig Model #12"
                          value={uploadName}
                          onChange={(e) => setUploadName(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Upload File (Pushes to Cloudinary CDN)</label>
                      <input
                        type="file"
                        accept={uploadType === 'video' ? 'video/*' : 'image/*'}
                        onChange={(e) => setUploadFile(e.target.files[0])}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="btn btn-primary btn-sm"
                      style={{ alignSelf: 'flex-start', padding: '10px 24px' }}
                    >
                      {uploading ? 'Uploading to Cloudinary...' : 'Upload & Save to Portfolio'}
                    </button>
                  </form>
                </GlassCard>

                {/* Portfolio Item List */}
                <h4 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Current Portfolio Items ({portfolioItems.filter(i => i.category !== 'websites').length})</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {portfolioItems.filter(i => i.category !== 'websites').map((item) => {
                    const itemId = item._id || item.id;
                    return (
                      <GlassCard key={itemId} padding={false} style={{ overflow: 'hidden' }}>
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', backgroundColor: '#000' }}>
                          {item.type === 'video' ? (
                            <video src={item.url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <img src={item.url} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                        </div>
                        <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ overflow: 'hidden' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.category}</span>
                            <h5 style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>{item.name}</h5>
                          </div>
                          {item._id && (
                            <button
                              onClick={() => deletePortfolioItem(itemId)}
                              style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSubTab === 'websites' && (
              /* WEBSITE MANAGER */
              <div>
                {/* Add Website Form */}
                <GlassCard style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield style={{ color: 'var(--accent)' }} /> Add Website
                  </h3>
                  <form onSubmit={handleAddWebsite} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Website Name</label>
                        <input
                          type="text"
                          placeholder="e.g. My Portfolio"
                          required
                          value={webName}
                          onChange={(e) => setWebName(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Website Link</label>
                        <input
                          type="url"
                          placeholder="e.g. https://example.com"
                          required
                          value={webLink}
                          onChange={(e) => setWebLink(e.target.value)}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Website Image (PNG, JPG, JPEG, WEBP)</label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        required
                        onChange={handleWebFileChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff', marginBottom: '12px' }}
                      />
                      {webPreview && (
                        <div style={{ marginTop: '10px' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Image Preview:</span>
                          <img
                            src={webPreview}
                            alt="Website Preview"
                            style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '8px', border: '1px solid var(--border-glow)', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={webUploading}
                      className="btn btn-primary btn-sm"
                      style={{ alignSelf: 'flex-start', padding: '10px 24px' }}
                    >
                      {webUploading ? 'Adding Website...' : 'Add Website'}
                    </button>
                  </form>
                </GlassCard>

                {/* Website List */}
                <h4 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>
                  Current Websites ({portfolioItems.filter(i => i.category === 'websites').length})
                </h4>
                {portfolioItems.filter(i => i.category === 'websites').length === 0 ? (
                  <GlassCard style={{ textAlign: 'center', padding: '48px' }}>
                    <ExternalLink size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>No websites have been added yet.</p>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {portfolioItems.filter(i => i.category === 'websites').map((item) => {
                      const itemId = item._id || item.id;
                      const isEditing = editingId === itemId;

                      return (
                        <GlassCard key={itemId} padding={false} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          {/* Image area */}
                          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#000', overflow: 'hidden' }}>
                            <img
                              src={isEditing ? editPreview : item.url}
                              alt={item.name}
                              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>

                          {/* Detail / Form area */}
                          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, justifyContent: 'space-between' }}>
                            {isEditing ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Name</label>
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff', fontSize: '0.85rem' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Link</label>
                                  <input
                                    type="url"
                                    value={editLink}
                                    onChange={(e) => setEditLink(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff', fontSize: '0.85rem' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Replace Image</label>
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={handleEditFileChange}
                                    style={{ width: '100%', padding: '6px', borderRadius: '6px', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glow)', color: '#fff', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                  <button
                                    onClick={() => handleUpdateWebsite(item)}
                                    disabled={editUploading}
                                    className="btn btn-primary btn-sm"
                                    style={{ flexGrow: 1, padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    {editUploading ? 'Saving...' : 'Save'}
                                  </button>
                                  <button
                                    onClick={cancelEditing}
                                    className="btn btn-outline btn-sm"
                                    style={{ flexGrow: 1, padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h5 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                                    {item.name}
                                  </h5>
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '0.75rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px', textDecoration: 'none' }}
                                  >
                                    {item.link} <ExternalLink size={10} />
                                  </a>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-glow)', paddingTop: '12px', marginTop: '4px' }}>
                                  <button
                                    onClick={() => startEditing(item)}
                                    className="btn btn-outline btn-sm"
                                    style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px' }}
                                  >
                                    <Edit size={12} /> Edit
                                  </button>
                                  <button
                                    onClick={() => deletePortfolioItem(itemId)}
                                    className="btn btn-sm"
                                    style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}
                                  >
                                    <Trash2 size={12} /> Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-order-split {
            grid-template-columns: 1fr !important;
          }
          .admin-order-split div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border-glow);
            padding-right: 0 !important;
            padding-bottom: 20px;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default AdminDashboard;
