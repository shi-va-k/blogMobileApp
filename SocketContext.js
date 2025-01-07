// import { createContext, useContext, useEffect, useState } from 'react';
// import io from "socket.io-client";
// import getToken from './components/GetToken';

// const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext);
// }

// export const SocketContextProvider = ({ Children }) => {
//     const [tokenn, setTokenn] = useState(''); // Fixed the syntax here
//     const [socket, setSocket] = useState(null);
    
//     // Fetch token and store it
//     useEffect(() => {
//         const gettingToken = async () => {
//             const userdataa = await getToken();
//             setTokenn(userdataa);
//         };
//         gettingToken();
//     }, []);

//     const userId = tokenn?.userData?.id; // Ensure tokenn and userData are defined before accessing

//     // Establish socket connection
//     useEffect(() => {
//         if (tokenn) {
//             // http://localhost:5001
//             const socket = io("https://396c-183-82-105-21.ngrok-free.app", {
//                 query: {
//                     userId: userId
//                 }
//             });
//             setSocket(socket);
            
//             return () => socket.close(); // Clean up on unmount
//         } else {
//             if (socket) {
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     }, [tokenn]); // Add tokenn as a dependency to re-run when it changes

//     return (
//         <SocketContext.Provider value={{ socket, setSocket }}>
//             {Children}
//         </SocketContext.Provider>
//     );
// };


import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import getToken from './components/GetToken';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [tokenn, setTokenn] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const gettingToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa);
    };
    gettingToken();
  }, []);

  const userId = tokenn?.userData?.id;

  useEffect(() => {
    if (tokenn?.token) {
      const socketConnection = io('https://396c-183-82-105-21.ngrok-free.app', {
        query: {
          userId: userId,
        },
      });
      setSocket(socketConnection);
      
      return () => socketConnection.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [tokenn]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
