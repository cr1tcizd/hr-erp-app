'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AnimatedWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={pathname}
				// initial={{ x: 20 }}
				// animate={{ x: 0 }}
				// exit={{ x: 20 }}
				// transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
