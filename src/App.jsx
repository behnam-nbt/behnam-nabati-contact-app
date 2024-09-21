import MainContent from "./components/MainContent"
import { ContactProvider } from "./context/contactContext"


function App() {

  return (
    <ContactProvider>
      <MainContent />
    </ContactProvider>
  )
}

export default App
