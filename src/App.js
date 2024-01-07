import React from "react";
import "./App.css";
import ContextAllPost from "./contextStore/AllPostContext";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import ContextAuth from "./contextStore/AuthContext";
import ContextPost from "./contextStore/PostContext";
import MainRoutes from "./Routes/MainRoutes";
import Toaster from "react-hot-toast";
import { DataProvider } from "./contextStore/DataContext";


function App() {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <DataProvider>

          <ContextAuth>

            <MainRoutes />

          </ContextAuth>

        </DataProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
