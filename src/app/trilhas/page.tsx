'use client'

import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import TrailMap from '@/components/trilha/TrailMap'
import { TRILHAS } from '@/content/trilhas'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'

export default function TrilhasPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <TopBar />

      <main className="flex-1 overflow-y-auto px-4 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Atividade</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
        >
          <TrailMap trilhas={TRILHAS} />
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}
