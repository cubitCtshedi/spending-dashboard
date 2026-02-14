import 'index.css'

import { createRoot } from 'react-dom/client'

import App from '@/app'

const container = document.getElementById('app') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
