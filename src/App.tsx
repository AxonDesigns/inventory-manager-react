import { ThemeProvider } from "@/components/theme-provider";

function App() {
  /* useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: 'acciol400@gmail.com',
        password: 'acciol4004003131'
      }, { withCredentials: true });

      const response = await axios.get('http://localhost:3000/', { withCredentials: true });

      console.log(response.data);
    };

    fetchData();
  }, []); */

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>Vite + React</h1>
    </ThemeProvider>
  )
}

export default App
