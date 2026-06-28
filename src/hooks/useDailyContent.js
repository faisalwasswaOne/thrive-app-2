import { getDayOfYear } from '../utils/dateHelpers'
import { affirmations } from '../data/kidsAffirmations'
import { challenges } from '../data/kidsChallenges'

export function useDailyContent(ageGroup) {
  const dayIndex = getDayOfYear()
  const groupAffirmations = affirmations[ageGroup] || []
  const groupChallenges = challenges[ageGroup] || []

  const todayAffirmation = groupAffirmations[dayIndex % groupAffirmations.length] || null
  const todayChallenge = groupChallenges[dayIndex % groupChallenges.length] || null

  return { todayAffirmation, todayChallenge }
}
