import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const HabitTrackerApp = () => {
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(5);
  const [screenTime, setScreenTime] = useState(3);
  const [study, setStudy] = useState(2);
  const [workout, setWorkout] = useState(1);
  const [steps, setSteps] = useState(8000);
  const [streak, setStreak] = useState(4);

  const [goal, setGoal] = useState({ sleep: 7, water: 5, screenTime: 3, study: 2, workout: 1, steps: 8000 });
  const [goalMessage, setGoalMessage] = useState('');
  const [showGoalModal, setShowGoalModal] = useState(false);

  const data = [
    { day: 'Mon', sleep: 6, water: 4, screenTime: 2, study: 1, workout: 0, steps: 7000 },
    { day: 'Tue', sleep: 7, water: 6, screenTime: 3, study: 2, workout: 1, steps: 8000 },
    { day: 'Wed', sleep: 8, water: 5, screenTime: 2, study: 2, workout: 1, steps: 7500 },
    { day: 'Thu', sleep: 6, water: 4, screenTime: 4, study: 1, workout: 0, steps: 6000 },
    { day: 'Fri', sleep: 7, water: 6, screenTime: 3, study: 2, workout: 1, steps: 9000 },
    { day: 'Sat', sleep: 6, water: 7, screenTime: 2, study: 2, workout: 1, steps: 8500 },
    { day: 'Sun', sleep: 7, water: 5, screenTime: 3, study: 1, workout: 1, steps: 8000 },
  ];

  useEffect(() => {
    if (
      sleep >= goal.sleep &&
      water >= goal.water &&
      screenTime <= goal.screenTime &&
      study >= goal.study &&
      workout >= goal.workout &&
      steps >= goal.steps
    ) {
      setGoalMessage('🎉 Great job! You have achieved your goals today!');
    } else {
      setGoalMessage('⚠️ You are missing one or more goals today. Keep pushing!');
    }
  }, [sleep, water, screenTime, study, workout, steps, goal]);
  useEffect(() => {
    let streakCount = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      const day = data[i];
      if (
        day.sleep >= goal.sleep &&
        day.water >= goal.water &&
        day.screenTime <= goal.screenTime &&
        day.study >= goal.study &&
        day.workout >= goal.workout &&
        day.steps >= goal.steps
      ) {
        streakCount++;
      } else {
        break; // streak breaks
      }
    }
    setStreak(streakCount);
  }, [goal, data]);
  

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Habit Tracker</h1>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="h-10 w-10 rounded-full" alt="avatar" />
      </nav>

      <header className="text-center py-8 bg-gradient-to-r from-blue-100 to-purple-100">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-semibold">
          Track Your Daily Habits
        </motion.h2>
        <p className="text-gray-600 mt-2">Stay consistent. See your progress. Improve your life.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[{ label: 'Sleep (hrs)', value: sleep, set: setSleep }, { label: 'Water (glasses)', value: water, set: setWater }, { label: 'Screen Time (hrs)', value: screenTime, set: setScreenTime }, { label: 'Study (hrs)', value: study, set: setStudy }, { label: 'Workout (hrs)', value: workout, set: setWorkout }].map((item, idx) => (
          <motion.div key={idx} className="bg-white p-4 rounded-2xl shadow" whileHover={{ scale: 1.02 }}>
            <h3 className="text-lg font-medium mb-2">{item.label}</h3>
            <input type="range" min="0" max="12" value={item.value} onChange={(e) => item.set(parseInt(e.target.value))} className="w-full" />
            <p className="text-sm text-gray-500 mt-1">Logged: <strong>{item.value}</strong></p>
          </motion.div>
        ))}
        <motion.div className="bg-white p-4 rounded-2xl shadow" whileHover={{ scale: 1.02 }}>
          <h3 className="text-lg font-medium mb-2">Steps</h3>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(parseInt(e.target.value))}
            className="w-full border rounded px-2 py-1"
            placeholder="Enter steps"
          />
          <p className="text-sm text-gray-500 mt-1">Logged: <strong>{steps}</strong> steps</p>
        </motion.div>
      </div>

      <div className="p-6">
        <motion.div className="text-center mb-6">
          <button onClick={() => setShowGoalModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Set Daily Goals
          </button>
        </motion.div>
        <motion.div className="text-center">
          <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-lg font-semibold">🔥 You're on a {streak}-day streak!</p>
          </div>
        </motion.div>
      </div>

      {goalMessage && (
        <div className="p-4 text-green-600 text-center font-medium">
          {goalMessage}
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">📊 Weekly Progress (Sleep, Water, Screen, Study, Workout)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="Sleep" />
            <Line type="monotone" dataKey="water" stroke="#82ca9d" name="Water" />
            <Line type="monotone" dataKey="screenTime" stroke="#ff7300" name="Screen Time" />
            <Line type="monotone" dataKey="study" stroke="#FF6347" name="Study" />
            <Line type="monotone" dataKey="workout" stroke="#20B2AA" name="Workout" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">📈 Steps Progress</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#8A2BE2" name="Steps" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showGoalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Set Daily Goals</h3>
            {['sleep', 'water', 'screenTime', 'study', 'workout', 'steps'].map((key) => (
              <div className="mb-3" key={key}>
                <label className="block text-sm font-medium capitalize">{key} Goal</label>
                <input
                  type="number"
                  value={goal[key as keyof typeof goal]}
                  onChange={(e) => setGoal({ ...goal, [key]: parseInt(e.target.value) })}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
            ))}
            <div className="text-right">
              <button className="mr-2 text-gray-600" onClick={() => setShowGoalModal(false)}>Cancel</button>
              <button className="text-blue-600 font-semibold" onClick={() => setShowGoalModal(false)}>Save</button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center p-4 bg-white shadow-inner mt-4">
        <p className="text-sm text-gray-500">© 2025 Habit Tracker App</p>
      </footer>
    </div>
  );
};

export default HabitTrackerApp;
