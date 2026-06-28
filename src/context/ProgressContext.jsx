import { createContext, useContext, useState } from 'react'
import { getItem, setItem } from '../utils/localStorage'
import { getTodayString } from '../utils/dateHelpers'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'thrive_progress'

function defaultGroupProgress() {
  return {
    completedLessons: [],
    completedQuizzes: {},
    completedChallenges: [],
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
  }
}

function loadProgress() {
  const saved = getItem(STORAGE_KEY, {})
  return {
    elementary: { ...defaultGroupProgress(), ...saved.elementary },
    preteen: { ...defaultGroupProgress(), ...saved.preteen },
    teen: { ...defaultGroupProgress(), ...saved.teen },
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  function save(updated) {
    setProgress(updated)
    setItem(STORAGE_KEY, updated)
  }

  function markLessonComplete(ageGroup, lessonId) {
    const group = progress[ageGroup]
    if (group.completedLessons.includes(lessonId)) return
    const updated = {
      ...progress,
      [ageGroup]: {
        ...group,
        completedLessons: [...group.completedLessons, lessonId],
        badges: group.completedLessons.length === 0
          ? [...group.badges, 'first-lesson']
          : group.badges,
      },
    }
    save(updated)
  }

  function recordQuizResult(ageGroup, quizId, score, total) {
    const group = progress[ageGroup]
    const passed = score >= Math.ceil(total * 0.66)
    const isFirst = Object.keys(group.completedQuizzes).length === 0
    const updated = {
      ...progress,
      [ageGroup]: {
        ...group,
        completedQuizzes: {
          ...group.completedQuizzes,
          [quizId]: { score, total, passed, date: getTodayString() },
        },
        badges: isFirst && passed ? [...group.badges, 'first-quiz'] : group.badges,
      },
    }
    save(updated)
  }

  function markChallengeComplete(ageGroup) {
    const group = progress[ageGroup]
    const today = getTodayString()
    if (group.completedChallenges.includes(today)) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const streakContinues = group.completedChallenges.includes(yesterday)
    const newStreak = streakContinues ? group.currentStreak + 1 : 1
    const badges = [...group.badges]
    if (newStreak === 3 && !badges.includes('3-day-streak')) badges.push('3-day-streak')
    if (newStreak === 7 && !badges.includes('7-day-streak')) badges.push('7-day-streak')

    const updated = {
      ...progress,
      [ageGroup]: {
        ...group,
        completedChallenges: [...group.completedChallenges, today],
        currentStreak: newStreak,
        longestStreak: Math.max(group.longestStreak, newStreak),
        badges,
      },
    }
    save(updated)
  }

  return (
    <ProgressContext.Provider value={{ progress, markLessonComplete, recordQuizResult, markChallengeComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
