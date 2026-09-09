import MainLayout from './components/MainLayout/Main'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <MainLayout>
      <Outlet/>
    </MainLayout>
  )
}
