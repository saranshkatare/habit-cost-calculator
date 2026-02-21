import React, { useState } from 'react';
import { Wallet, Plus, Trash2, IndianRupee, Sparkles } from 'lucide-react';

const indianHabits = [
  { name: 'Morning Chai', cost: 20, frequency: 'daily', icon: '☕' },
  { name: 'Swiggy/Zomato', cost: 300, frequency: 'weekly', icon: '🍔' },
  { name: 'Netflix', cost: 649, frequency: 'monthly', icon: '📺' },
  { name: 'Auto Rickshaw', cost: 60, frequency: 'daily', icon: '🛺' },
  { name: 'Smoking', cost: 30, frequency: 'daily', icon: '🚬' },
  { name: 'Mobile Recharge', cost: 299, frequency: 'monthly', icon: '📱' },
  { name: 'Gym Membership', cost: 500, frequency: 'monthly', icon: '🏋️' },
  { name: 'Amazon Prime', cost: 1499, frequency: 'yearly', icon: '📦' },
  { name: 'Daily Lunch', cost: 150, frequency: 'daily', icon: '🍛' },
  { name: 'Ola/Uber', cost: 200, frequency: 'weekly', icon: '🚗' },
  { name: 'Spotify', cost: 119, frequency: 'monthly', icon: '🎵' },
  { name: 'YouTube Premium', cost: 139, frequency: 'monthly', icon: '▶️' },
  { name: 'Petrol', cost: 500, frequency: 'weekly', icon: '⛽' },
];

const frequencyMultipliers = { daily: 30, weekly: 4.33, monthly: 1, yearly: 1/12 };

function App() {
  const [habits, setHabits] = useState([]);
  const [dailyIncome, setDailyIncome] = useState(1000);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', cost: '', frequency: 'daily', category: 'food', icon: '💰' });

  const addHabit = (habit) => {
    if (!habit.name || !habit.cost) return;
    setHabits([...habits, { ...habit, id: Date.now() }]);
    setShowAddForm(false);
    setNewHabit({ name: '', cost: '', frequency: 'daily', category: 'food', icon: '💰' });
  };

  const removeHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const monthlyTotal = habits.reduce((sum, h) => sum + (h.cost * frequencyMultipliers[h.frequency]), 0);
  const yearlyTotal = monthlyTotal * 12;
  const hourlyRate = dailyIncome / 8;
  const hoursWorked = monthlyTotal / hourlyRate;
  
  const monthlyRate = 0.07 / 12;
  const months = 20 * 12;
  const futureValue = monthlyTotal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const comparisonItems = [
    { name: 'iPhone 15 Pro', price: 134900, icon: '📱', get: () => Math.round(yearlyTotal / 134900 * 10) / 10 },
    { name: 'Royal Enfield', price: 150000, icon: '🏍️', get: () => Math.round(yearlyTotal / 150000 * 10) / 10 },
    { name: 'Flight Ticket', price: 8000, icon: '✈️', get: () => Math.round(yearlyTotal / 8000) },
    { name: 'Gold (10g)', price: 55000, icon: '🥇', get: () => Math.round(yearlyTotal / 55000 * 10) / 10 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '20px', marginBottom: '16px', boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)' }}>
            <Wallet style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Habit Cost Calculator</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            See the <span style={{ color: '#fbbf24', fontWeight: '600' }}>true cost</span> of your daily habits — in money and time
          </p>
        </header>

        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IndianRupee style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
            <span style={{ color: 'white', fontWeight: '500' }}>Your Daily Income (₹)</span>
            <input
              type="number"
              value={dailyIncome}
              onChange={(e) => setDailyIncome(Number(e.target.value))}
              style={{ padding: '8px 16px', background: '#334155', color: 'white', borderRadius: '8px', border: '1px solid #475569', marginLeft: 'auto' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '16px', padding: '20px', color: 'white' }}>
            <p style={{ color: '#c4b5fd', fontSize: '14px', marginBottom: '4px' }}>Monthly Cost</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{monthlyTotal.toLocaleString()}</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', borderRadius: '16px', padding: '20px', color: 'white' }}>
            <p style={{ color: '#fde68a', fontSize: '14px', marginBottom: '4px' }}>Yearly Cost</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{yearlyTotal.toLocaleString()}</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #0891b2)', borderRadius: '16px', padding: '20px', color: 'white' }}>
            <p style={{ color: '#bae6fd', fontSize: '14px', marginBottom: '4px' }}>Hours/Month</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{hoursWorked.toFixed(0)} hrs</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)', borderRadius: '16px', padding: '20px', color: 'white' }}>
            <p style={{ color: '#a7f3d0', fontSize: '14px', marginBottom: '4px' }}>20-Year Value</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{(futureValue / 100000).toFixed(1)}L</p>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>Your Habits</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowSuggestions(!showSuggestions)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#334155', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                <Sparkles style={{ width: '16px', height: '16px' }} /> Suggestions
              </button>
              <button onClick={() => setShowAddForm(!showAddForm)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#8b5cf6', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                <Plus style={{ width: '16px', height: '16px' }} /> Add
              </button>
            </div>
          </div>

          {showSuggestions && (
            <div style={{ background: '#334155', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>Tap to add:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {indianHabits.map((habit, idx) => (
                  <button key={idx} onClick={() => addHabit({ ...habit, id: Date.now() })} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#475569', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span>{habit.icon}</span>
                    <span style={{ color: 'white', fontSize: '14px', flex: 1 }}>{habit.name}</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>₹{habit.cost}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showAddForm && (
            <div style={{ background: '#334155', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <input type="text" placeholder="Habit name" value={newHabit.name} onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })} style={{ width: '100%', padding: '10px', background: '#475569', borderRadius: '8px', border: '1px solid #64748b', color: 'white', marginBottom: '10px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <input type="number" placeholder="Cost (₹)" value={newHabit.cost} onChange={(e) => setNewHabit({ ...newHabit, cost: e.target.value })} style={{ padding: '10px', background: '#475569', borderRadius: '8px', border: '1px solid #64748b', color: 'white' }} />
                <select value={newHabit.frequency} onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })} style={{ padding: '10px', background: '#475569', borderRadius: '8px', border: '1px solid #64748b', color: 'white' }}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <button onClick={() => addHabit(newHabit)} style={{ width: '100%', padding: '10px', background: '#8b5cf6', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Add Habit</button>
            </div>
          )}

          {habits.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>No habits added yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {habits.map((habit) => (
                <div key={habit.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#334155', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{habit.icon}</span>
                    <div>
                      <p style={{ color: 'white', fontWeight: '500' }}>{habit.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'capitalize' }}>{habit.frequency}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: 'white', fontWeight: '600' }}>₹{habit.cost}</p>
                      <p style={{ color: '#94a3b8', fontSize: '12px' }}>₹{(habit.cost * frequencyMultipliers[habit.frequency]).toFixed(0)}/mo</p>
                    </div>
                    <button onClick={() => removeHabit(habit.id)} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 style={{ width: '20px', height: '20px', color: '#f87171' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {habits.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '16px', padding: '24px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>What you could buy instead (Yearly)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {comparisonItems.map((item, idx) => (
                <div key={idx} style={{ background: '#334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{item.icon}</span>
                  <div>
                    <p style={{ color: 'white', fontWeight: '500' }}>{item.name}</p>
                    <p style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 'bold' }}>{item.get()} yrs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;