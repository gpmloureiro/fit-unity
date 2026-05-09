import { useState } from 'react'
import '../styles/trainplan.css'

const EXERCISE_TYPES = [
  { label: 'Running', icon: '🏃' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'Gym', icon: '🏋️' },
  { label: 'Swimming', icon: '🏊' },
  { label: 'Yoga', icon: '🧘' },
  { label: 'HIIT', icon: '⚡' },
  { label: 'Walking', icon: '🚶' },
  { label: 'Football', icon: '⚽' },
  { label: 'Basketball', icon: '🏀' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const initialActivities = [
  { id: 1, type: 'Running', icon: '🏃', day: 'Mon', duration: 30, notes: 'Easy pace' },
  { id: 2, type: 'Gym', icon: '🏋️', day: 'Wed', duration: 60, notes: 'Push day' },
  { id: 3, type: 'Cycling', icon: '🚴', day: 'Fri', duration: 45, notes: '' },
]

function TrainPlanPage() {
  const [activities, setActivities] = useState(initialActivities)
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [form, setForm] = useState({ duration: '', notes: '' })
  const todayIndex = new Date().getDay()
  const todayLabel = DAYS[todayIndex === 0 ? 6 : todayIndex - 1]

  const openModal = (day) => {
    setSelectedDay(day)
    setSelectedType(null)
    setForm({ duration: '', notes: '' })
    setShowModal(true)
  }

  const handleAdd = () => {
    if (!selectedType || !form.duration) return
    const newActivity = {
      id: Date.now(),
      type: selectedType.label,
      icon: selectedType.icon,
      day: selectedDay,
      duration: parseInt(form.duration),
      notes: form.notes,
    }
    setActivities(prev => [...prev, newActivity])
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Train Plan</h2>
          <p className="page-subtitle">Plan and manage your weekly workout schedule.</p>
        </div>
        <button className="btn btn-accent" onClick={() => openModal(todayLabel)}>
          + Add activity
        </button>
      </div>

      {/* Weekly schedule */}
      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: '0.75rem' }}>Weekly schedule</p>
      <div className="week-grid">
        {DAYS.map(day => {
          const dayActivities = activities.filter(a => a.day === day)
          return (
            <div key={day} className={`day-card ${day === todayLabel ? 'today' : ''}`}>
              <p className="day-name">{day}</p>
              {dayActivities.length === 0
                ? <p className="day-rest">Rest</p>
                : dayActivities.map(a => (
                    <p key={a.id} className="day-activity">{a.icon} {a.type}</p>
                  ))
              }
              <span className="day-add" onClick={() => openModal(day)}>+</span>
            </div>
          )
        })}
      </div>

      {/* All activities */}
      <p style={{ fontSize: 15, fontWeight: 600, marginBottom: '0.75rem' }}>All activities</p>
      <div className="exercises-list">
        {activities.length === 0
          ? <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No activities yet. Add one above.</p>
          : activities.map(a => (
              <div key={a.id} className="exercise-card">
                <div className="exercise-icon">{a.icon}</div>
                <div className="exercise-info">
                  <p className="exercise-name">{a.type}</p>
                  <p className="exercise-detail">{a.day} · {a.duration} min{a.notes ? ` · ${a.notes}` : ''}</p>
                </div>
                <div className="exercise-actions">
                  <button className="btn-icon" onClick={() => handleDelete(a.id)}>🗑️</button>
                </div>
              </div>
            ))
        }
      </div>

      {/* Add activity modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Add activity — {selectedDay}</h3>

            <div className="form-group">
              <label>Exercise type</label>
              <div className="type-grid">
                {EXERCISE_TYPES.map(t => (
                  <div
                    key={t.label}
                    className={`type-option ${selectedType?.label === t.label ? 'selected' : ''}`}
                    onClick={() => setSelectedType(t)}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Notes (optional)</label>
              <input
                type="text"
                placeholder="e.g. Easy pace, focus on form"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-accent" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TrainPlanPage