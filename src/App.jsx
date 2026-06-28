import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { ChatProvider } from './context/ChatContext'

import Home from './pages/Home'

import ParentLayout from './layouts/ParentLayout'
import ParentHome from './pages/parent/ParentHome'
import ParentSummary from './pages/parent/ParentSummary'
import ParentByAge from './pages/parent/ParentByAge'
import ParentAgeDetail from './pages/parent/ParentAgeDetail'
import ParentByTopic from './pages/parent/ParentByTopic'
import ParentTopicDetail from './pages/parent/ParentTopicDetail'
import ParentChapterDetail from './pages/parent/ParentChapterDetail'

import KidsHome from './pages/kids/KidsHome'
import KidsLayout from './layouts/KidsLayout'
import KidsGroupHome from './pages/kids/KidsGroupHome'
import KidsLessonList from './pages/kids/KidsLessonList'
import KidsLessonDetail from './pages/kids/KidsLessonDetail'
import KidsQuizList from './pages/kids/KidsQuizList'
import KidsQuizPage from './pages/kids/KidsQuizPage'
import KidsAffirmations from './pages/kids/KidsAffirmations'
import KidsProgress from './pages/kids/KidsProgress'

export default function App() {
  return (
    <ProgressProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Parent section */}
            <Route path="/parent" element={<ParentLayout />}>
              <Route index element={<ParentHome />} />
              <Route path="summary" element={<ParentSummary />} />
              <Route path="by-age" element={<ParentByAge />} />
              <Route path="by-age/:stageId" element={<ParentAgeDetail />} />
              <Route path="by-topic" element={<ParentByTopic />} />
              <Route path="by-topic/:themeId" element={<ParentTopicDetail />} />
              <Route path="books/:bookId/chapters/:chapterId" element={<ParentChapterDetail />} />
            </Route>

            {/* Kids section */}
            <Route path="/kids" element={<KidsHome />} />
            <Route path="/kids/:ageGroup" element={<KidsLayout />}>
              <Route index element={<KidsGroupHome />} />
              <Route path="lessons" element={<KidsLessonList />} />
              <Route path="lessons/:lessonId" element={<KidsLessonDetail />} />
              <Route path="quizzes" element={<KidsQuizList />} />
              <Route path="quizzes/:quizId" element={<KidsQuizPage />} />
              <Route path="affirmations" element={<KidsAffirmations />} />
              <Route path="progress" element={<KidsProgress />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </ProgressProvider>
  )
}
