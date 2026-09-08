import MainLayout from './components/MainLayout/Main'
import Header from './components/MainLayout/Header'
import Footer from './components/MainLayout/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <MainLayout>
      <Header />
      <Home />
      <Footer />
    </MainLayout>
  )
}
