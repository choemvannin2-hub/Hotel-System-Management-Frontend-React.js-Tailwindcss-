import { Toaster } from "react-hot-toast"
import AppRoute from "./routes/AppRoute"

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        containerClassName="!top-24 !right-6"
        gutter={10}
      />
      <AppRoute/>
    </>
  )
}

export default App
