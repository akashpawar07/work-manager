import React, { useState, useEffect } from 'react';
import Timer from '@/components/Timer';

const TimerContainer = ({ projectId, projectName }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeToday, setTotalTimeToday] = useState(0);
  const [dailyRecords, setDailyRecords] = useState({});
  const [lastActiveDay, setLastActiveDay] = useState(new Date().toISOString().split('T')[0]);

  const loadData = useCallback(() => {
    const savedData = localStorage.getItem(`project_${projectId}`);
    if (savedData) {
      const { totalTimeToday, dailyRecords, lastActiveDay: savedLastActiveDay } = JSON.parse(savedData);
      const today = new Date().toISOString().split('T')[0];

      if (savedLastActiveDay === today) {
        setTotalTimeToday(totalTimeToday);
      } else {
        setTotalTimeToday(0);
      }

      setDailyRecords(dailyRecords);
      setLastActiveDay(today);
    }
  }, [projectId]); // Add projectId as dependency since it's used in the function

  useEffect(() => {
    loadData();
  }, [loadData]); // Update dependency to include loadData

  const saveData = useCallback(() => {
    localStorage.setItem(`project_${projectId}`, JSON.stringify({
      totalTimeToday,
      dailyRecords,
      lastActiveDay
    }));
  }, [projectId, totalTimeToday, dailyRecords, lastActiveDay]); // Add dependencies used in the function

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const handleStop = () => {
    if (isRunning) {
      const endTime = Date.now();
      const sessionDuration = endTime - startTime;
      const today = new Date().toISOString().split('T')[0];

      let newTotalTimeToday;
      if (lastActiveDay !== today) {
        newTotalTimeToday = sessionDuration;
        setLastActiveDay(today);
      } else {
        newTotalTimeToday = totalTimeToday + sessionDuration;
      }

      setIsRunning(false);
      setStartTime(null);
      setTotalTimeToday(newTotalTimeToday);

      setDailyRecords(prevRecords => ({
        ...prevRecords,
        [today]: (prevRecords[today] || 0) + sessionDuration
      }));

      saveData();
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };


  return (
    <div className='gap-2 flex w-full h-auto justify-center items-center'>
      <div className="container mx-auto p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-[#171718]">
              <th className="py-2 w-[24%] h-auto px-4 border-b text-left">Project Name</th>
              <th className="py-2 w-[24%] h-auto px-4 border-b text-left">Timer</th>
              <th className="py-2 w-[24%] h-auto px-4 border-b text-left">Total Time Today</th>
              <th className="py-2 w-[24%] h-auto px-4 border-b text-right">Daily Records</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 w-[24%] h-auto px-4 border-b">{projectName}</td>
              <td className="py-2 px-4 items-center gap-4">
                <Timer isRunning={isRunning} startTime={startTime} />
                <button onClick={handleStart} disabled={isRunning} className='bg-[#19a522] px-4 cursor-pointer rounded-sm active:scale-95 transition mr-3  duration-300 ease-in-out'>
                  Start
                </button>
                <button onClick={handleStop} disabled={!isRunning} className='bg-red-600 px-4 cursor-pointer rounded-sm active:scale-95 transition duration-300 ease-in-out'>
                  Stop
                </button>
              </td>
              <td className="py-2 px-4 border-b">{formatTime(totalTimeToday)}</td>
              <td className="py-2 px-4 border-b text-right">
                <div>
                  {Object.entries(dailyRecords).map(([date, time]) => (
                    <div key={date}>{date}: {formatTime(time)}</div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimerContainer;