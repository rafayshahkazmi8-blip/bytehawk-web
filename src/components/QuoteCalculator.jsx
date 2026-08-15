import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Minus, Send, ClipboardList, HelpCircle, Sparkles, Smile } from 'lucide-react';
import GlassCard from './GlassCard';
import { getApiUrl } from '../apiConfig';

const QuoteCalculator = ({ preSelected }) => {
  // 1. Package Pricing Specs
  const vtuberOptions = [
    { id: 'none', name: 'No VTuber Model', price: 0 },
    { id: 'vtuber_basic', name: 'Starter VTuber (Bust-up)', price: 199 },
    { id: 'vtuber_standard', name: 'Standard VTuber (Half/Full)', price: 499 },
    { id: 'vtuber_premium', name: 'Premium VTuber (Pro Level)', price: 899 }
  ];

  const brandingOptions = [
    { id: 'none', name: 'No Branding Pack', price: 0 },
    { id: 'branding_starter', name: 'Starter Branding', price: 79 },
    { id: 'branding_creator', name: 'Creator Branding Pack', price: 189 },
    { id: 'branding_pro', name: 'Pro Streamer Branding', price: 349 }
  ];

  const ultimateOptions = [
    { id: 'none', name: 'No Agency Package', price: 0 },
    { id: 'ultimate_agency', name: '💎 Ultimate Package (Agency Level)', price: 1499 }
  ];

  // 2. State management
  const [vtuberPkg, setVtuberPkg] = useState('none');
  const [brandingPkg, setBrandingPkg] = useState('none');
  const [ultimatePkg, setUltimatePkg] = useState('none');

  // Multi-counters for fine-grained toggles
  const [extraExpressions, setExtraExpressions] = useState(0);
  const [extraOutfits, setExtraOutfits] = useState(0);
  const [extraToggles, setExtraToggles] = useState(0);

  // Standalone Add-ons
  const [addons, setAddons] = useState({
    model3d: false, // $500
    customAnimations: false, // $150
    loreWriting: false, // $80
    debutEditing: false // $120
  });

  // Load pre-selections from package page redirects
  useEffect(() => {
    if (preSelected) {
      if (preSelected.type === 'vtuber') {
        setVtuberPkg(preSelected.id);
        setBrandingPkg('none');
        setUltimatePkg('none');
      } else if (preSelected.type === 'branding') {
        setBrandingPkg(preSelected.id);
        setVtuberPkg('none');
        setUltimatePkg('none');
      } else if (preSelected.type === 'ultimate') {
        setUltimatePkg(preSelected.id);
        setVtuberPkg('none');
        setBrandingPkg('none');
      }
    }
  }, [preSelected]);

  // Handle mutual exclusivity of Ultimate vs Core selections
  useEffect(() => {
    if (ultimatePkg !== 'none') {
      setVtuberPkg('none');
      setBrandingPkg('none');
    }
  }, [ultimatePkg]);

  useEffect(() => {
    if (vtuberPkg !== 'none' || brandingPkg !== 'none') {
      setUltimatePkg('none');
    }
  }, [vtuberPkg, brandingPkg]);

  // Form Details
  const [formData, setFormData] = useState({
    clientName: '',
    discord: '',
    email: '',
    notes: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 3. Price Calculation Logic
  const calculateTotal = () => {
    let total = 0;

    // Base packages
    const vt = vtuberOptions.find(o => o.id === vtuberPkg);
    const br = brandingOptions.find(o => o.id === brandingPkg);
    const ult = ultimateOptions.find(o => o.id === ultimatePkg);

    if (vt) total += vt.price;
    if (br) total += br.price;
    if (ult) total += ult.price;

    // Counter increments
    total += extraExpressions * 25;
    total += extraOutfits * 75;
    total += extraToggles * 20;

    // Checklist add-ons
    if (addons.model3d) total += 500;
    if (addons.customAnimations) total += 150;
    if (addons.loreWriting) total += 80;
    if (addons.debutEditing) total += 120;

    return total;
  };

  const totalPrice = calculateTotal();

  // 4. Form inputs listener
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddonChange = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.discord || !formData.email) {
      setErrorMsg('Please fulfill all mandatory client contact inputs (Name, Discord, Email).');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    const activeVtuberName = vtuberOptions.find(o => o.id === vtuberPkg)?.name || 'None';
    const activeBrandingName = brandingOptions.find(o => o.id === brandingPkg)?.name || 'None';
    const activeUltimateName = ultimateOptions.find(o => o.id === ultimatePkg)?.name || 'None';

    // Build selected add-ons list for db schema
    const selectedAddonsList = [];
    if (addons.model3d) selectedAddonsList.push('3D VTuber Model ($500)');
    if (addons.customAnimations) selectedAddonsList.push('Custom Animations ($150)');
    if (addons.loreWriting) selectedAddonsList.push('Lore Writing ($80)');
    if (addons.debutEditing) selectedAddonsList.push('Debut Video Editing ($120)');
    if (extraExpressions > 0) selectedAddonsList.push(`${extraExpressions}x Extra Expressions ($${extraExpressions * 25})`);
    if (extraOutfits > 0) selectedAddonsList.push(`${extraOutfits}x Extra Outfits ($${extraOutfits * 75})`);
    if (extraToggles > 0) selectedAddonsList.push(`${extraToggles}x Extra Toggles ($${extraToggles * 20})`);

    function activeUltimatePkgName() {
      return activeUltimateName !== 'No Agency Package' ? activeUltimateName : 'None';
    }

    const orderPayload = {
      ...formData,
      vtuberPackage: activeUltimatePkgName() !== 'None' ? 'Included in Ultimate' : activeVtuberName,
      brandingPackage: activeUltimatePkgName() !== 'None' ? 'Included in Ultimate' : activeBrandingName,
      selectedAddons: selectedAddonsList,
      totalPrice
    };

    try {
      const response = await fetch(getApiUrl('/api/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to file your quote order.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to the backend server API. Please check if backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Interactive <span className="gradient-text-primary">Quote Builder</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Configure your VTuber model, select secondary branding files, and append unique extra services. Get an instant budget quote breakdown.
          </p>
        </div>

        {formSubmitted ? (
          /* Submission Success State */
          <GlassCard style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', padding: '48px 32px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
              }}
            >
              <ShieldCheck size={36} />
            </div>
            
            <h3 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Commission Proposal Filed!</h3>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
              Hi <strong style={{ color: '#ffffff' }}>{formData.clientName}</strong>, your quote request of <strong style={{ color: 'var(--accent)' }}>${totalPrice} USD</strong> has been securely filed at Vutuber Design. Our art lead will contact you via Discord (<strong style={{ color: 'var(--secondary)' }}>@{formData.discord}</strong>) or email shortly to review character designs!
            </p>

            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-glow)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '32px',
                textAlign: 'left'
              }}
            >
              <h5 style={{ color: '#ffffff', marginBottom: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} style={{ color: 'var(--accent)' }} /> Next Intake Steps:
              </h5>
              <ol style={{ listStyle: 'decimal', paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Gather your character art references (Pinterest, character sheets, design details).</li>
                <li>Wait for our Discord DM (keep private DMs open for new servers).</li>
                <li>We'll review your custom features, approve the quote, and start drafting sketches!</li>
              </ol>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setFormSubmitted(false);
                setVtuberPkg('none');
                setBrandingPkg('none');
                setUltimatePkg('none');
                setExtraExpressions(0);
                setExtraOutfits(0);
                setExtraToggles(0);
                setAddons({ model3d: false, customAnimations: false, loreWriting: false, debutEditing: false });
                setFormData({ clientName: '', discord: '', email: '', references: '', description: '' });
              }}
            >
              Build Another Quote
            </button>
          </GlassCard>
        ) : (
          /* Core Interactive Form State */
          <div className="grid-2">
            
            {/* Left Side: Custom Selection Engine */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Core VTuber Packages */}
              <GlassCard>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(89, 50, 230, 0.2)', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#ffffff', fontWeight: 'bold' }}>1</span>
                  VTuber Model Core Service
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {vtuberOptions.map(option => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: vtuberPkg === option.id ? 'rgba(89, 50, 230, 0.15)' : 'rgba(255,255,255,0.02)',
                        border: vtuberPkg === option.id ? '1px solid var(--primary)' : '1px solid var(--border-glow)',
                        borderRadius: '8px',
                        padding: '14px 18px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="radio"
                          name="vtuberPkg"
                          value={option.id}
                          checked={vtuberPkg === option.id}
                          onChange={(e) => setVtuberPkg(e.target.value)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{option.name}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: vtuberPkg === option.id ? 'var(--accent)' : 'var(--text-secondary)' }}>
                        {option.price === 0 ? 'Free' : `$${option.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </GlassCard>

              {/* Branding Packages */}
              <GlassCard>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(89, 50, 230, 0.2)', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#ffffff', fontWeight: 'bold' }}>2</span>
                  Branding Pack Selection
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {brandingOptions.map(option => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: brandingPkg === option.id ? 'rgba(89, 50, 230, 0.15)' : 'rgba(255,255,255,0.02)',
                        border: brandingPkg === option.id ? '1px solid var(--primary)' : '1px solid var(--border-glow)',
                        borderRadius: '8px',
                        padding: '14px 18px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="radio"
                          name="brandingPkg"
                          value={option.id}
                          checked={brandingPkg === option.id}
                          onChange={(e) => setBrandingPkg(e.target.value)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{option.name}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: brandingPkg === option.id ? 'var(--accent)' : 'var(--text-secondary)' }}>
                        {option.price === 0 ? 'Free' : `$${option.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </GlassCard>

              {/* Agency Level Pack OR Multiplier */}
              <GlassCard style={{ border: ultimatePkg !== 'none' ? '1px solid var(--accent)' : '1px solid var(--border-glow)' }}>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.2)', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#ffffff', fontWeight: 'bold' }}>3</span>
                  💎 Ultimate Agency Package
                </h4>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
                  Selecting this package provides the ultimate AAA-tier bundle and disables individual Core models and branding choices above.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ultimateOptions.map(option => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: ultimatePkg === option.id ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255,255,255,0.02)',
                        border: ultimatePkg === option.id ? '1px solid var(--accent)' : '1px solid var(--border-glow)',
                        borderRadius: '8px',
                        padding: '14px 18px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="radio"
                          name="ultimatePkg"
                          value={option.id}
                          checked={ultimatePkg === option.id}
                          onChange={(e) => setUltimatePkg(e.target.value)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>{option.name}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: ultimatePkg === option.id ? 'var(--accent)' : 'var(--text-secondary)' }}>
                        {option.price === 0 ? 'None' : `$${option.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </GlassCard>

              {/* Extra Items Add-ons (Up-sell features!) */}
              <GlassCard>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(89, 50, 230, 0.2)', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#ffffff', fontWeight: 'bold' }}>4</span>
                  Extra Add-on Upsells & Upgrades
                </h4>

                {/* Counters */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600 }}>Extra Expressions</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Custom rigged emotions (happy, cry, pouts)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setExtraExpressions(p => Math.max(0, p - 1))}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{extraExpressions}</span>
                      <button
                        type="button"
                        onClick={() => setExtraExpressions(p => p + 1)}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold', width: '50px', textAlign: 'right' }}>
                        +${extraExpressions * 25}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600 }}>Extra Outfits</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Additional character clothes (maid dress, casuals)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setExtraOutfits(p => Math.max(0, p - 1))}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{extraOutfits}</span>
                      <button
                        type="button"
                        onClick={() => setExtraOutfits(p => p + 1)}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold', width: '50px', textAlign: 'right' }}>
                        +${extraOutfits * 75}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600 }}>Extra Physics Toggles</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rigging switches (remove hats, wings, jackets)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setExtraToggles(p => Math.max(0, p - 1))}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{extraToggles}</span>
                      <button
                        type="button"
                        onClick={() => setExtraToggles(p => p + 1)}
                        style={{ border: '1px solid var(--border-light)', width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'transparent', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold', width: '50px', textAlign: 'right' }}>
                        +${extraToggles * 20}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checklist Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { key: 'model3d', name: '3D VTuber Model Upgrade', price: 500, desc: 'Receive high-fidelity vrm file for VRChat & 3D apps.' },
                    { key: 'customAnimations', name: 'Custom Idle/Intro Animations', price: 150, desc: 'Special custom breathing/physics animation loops.' },
                    { key: 'loreWriting', name: 'VTuber Lore & Story Writing', price: 80, desc: 'Complete back-story, chat rules, and stream themes.' },
                    { key: 'debutEditing', name: 'Debut Showcase Video Editing', price: 120, desc: 'Professional 1-2min teaser trailer clip.' }
                  ].map(item => (
                    <label
                      key={item.key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: addons[item.key] ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: '1px solid var(--border-glow)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          checked={addons[item.key]}
                          onChange={() => handleAddonChange(item.key)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <div>
                          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{item.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent)', marginLeft: '12px' }}>
                        +${item.price}
                      </span>
                    </label>
                  ))}
                </div>
              </GlassCard>

            </div>

            {/* Right Side: Receipt Breakdown & Intake Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Receipt Summary Card */}
              <GlassCard
                style={{
                  border: '1.5px solid var(--primary)',
                  boxShadow: '0 8px 30px var(--primary-glow)',
                  background: 'linear-gradient(135deg, rgba(89, 50, 230, 0.05) 0%, var(--bg-card) 100%)'
                }}
              >
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardList size={18} style={{ color: 'var(--accent)' }} /> Receipt Breakdown Summary
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px' }}>
                  
                  {/* Itemized Lines */}
                  {vtuberPkg !== 'none' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{vtuberOptions.find(o => o.id === vtuberPkg)?.name}</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${vtuberOptions.find(o => o.id === vtuberPkg)?.price}</span>
                    </div>
                  )}

                  {brandingPkg !== 'none' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{brandingOptions.find(o => o.id === brandingPkg)?.name}</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${brandingOptions.find(o => o.id === brandingPkg)?.price}</span>
                    </div>
                  )}

                  {ultimatePkg !== 'none' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{ultimateOptions.find(o => o.id === ultimatePkg)?.name}</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${ultimateOptions.find(o => o.id === ultimatePkg)?.price}</span>
                    </div>
                  )}

                  {/* Counters */}
                  {extraExpressions > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{extraExpressions}x Extra Expressions</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+${extraExpressions * 25}</span>
                    </div>
                  )}

                  {extraOutfits > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{extraOutfits}x Extra Outfits</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+${extraOutfits * 75}</span>
                    </div>
                  )}

                  {extraToggles > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{extraToggles}x Extra Physics Toggles</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+${extraToggles * 20}</span>
                    </div>
                  )}

                  {/* Add-on checklists */}
                  {addons.model3d && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>3D Model Upgrade</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+$500</span>
                    </div>
                  )}

                  {addons.customAnimations && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Custom Animations Pack</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+$150</span>
                    </div>
                  )}

                  {addons.loreWriting && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Lore Writing Bundle</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+$80</span>
                    </div>
                  )}

                  {addons.debutEditing && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Debut Video Editing</span>
                      <span style={{ color: '#ffffff', fontWeight: 'bold' }}>+$120</span>
                    </div>
                  )}

                  {vtuberPkg === 'none' && brandingPkg === 'none' && ultimatePkg === 'none' && (
                    <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', border: '1px dashed var(--border-glow)', borderRadius: '6px' }}>
                      Select a base package to view details
                    </div>
                  )}
                </div>

                {/* Total Price display with floating glow */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '20px',
                    marginBottom: '10px'
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Estimated Total:</span>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))' }}>
                    ${totalPrice} USD
                  </span>
                </div>
              </GlassCard>

              {/* Intake Contact Information Form */}
              <GlassCard>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smile size={18} style={{ color: 'var(--secondary)' }} /> Client Intake Details
                </h4>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                      Intake Creator Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Kaori Ch."
                      required
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none', transition: 'var(--transition-fast)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        Discord Username *
                      </label>
                      <input
                        type="text"
                        name="discord"
                        value={formData.discord}
                        onChange={handleInputChange}
                        placeholder="e.g. kaori_vtuber"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="kaori@gmail.com"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                      Art / Character References Link
                    </label>
                    <input
                      type="url"
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      placeholder="e.g. Pinterest board, character folder url"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                      Brief Description / Character Lore
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g. A cybernetic hawk priestess who loves retro gaming. She wears high-tech robes with electric pink linings..."
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  {errorMsg && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={submitting}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    {submitting ? 'Filing Quote...' : 'Submit Quote Request'} <Send size={16} />
                  </button>

                </form>
              </GlassCard>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default QuoteCalculator;
