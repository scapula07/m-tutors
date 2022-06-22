import {useState,useEffect,useRef} from 'react'
import { io } from "socket.io-client";
import Peer from 'simple-peer';
import VideoPlayer from '../components/videochat/videoplayer';
import Controls from '../components/videochat/controls';
import Notifications from "../components/videochat/notifications"
 const VideoMeet=()=> {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const socket = useRef();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const [trigger,setTrigger]=useState(false)

    useEffect(() => {
      socket.current = io("ws://localhost:5000");
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

     socket.current.on('me', (id) => setMe(id));

     socket.current.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    },[])

    const answerCall = () => {
      setCallAccepted(true);
  
      const peer = new Peer({ initiator: false, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.current.emit('answerCall', { signal: data, to: call.from });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      peer.signal(call.signal);
  
      connectionRef.current = peer;
    };

    const callUser = (id) => {
      const peer = new Peer({ initiator: true, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.current.emit('callUser', { userToCall: id, signalData: data, from: me, name });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      socket.current.on('callAccepted', (signal) => {
        setCallAccepted(true);
  
        peer.signal(signal);
      });
  
      connectionRef.current = peer;
    };
    const leaveCall = () => {
      setCallEnded(true);
  
      connectionRef.current.destroy();
  
      window.location.reload();
    };



  console.log(me,">>>>>>>>>>>>>>>>..")
  return (

    <>
    <div className='flex flex-row'>
     
      <Controls 
      answerCall={answerCall}
      callAccepted={callAccepted}
      setTrigger={setTrigger}
      callEnded={callEnded}
      leaveCall={leaveCall}
      callUser={callUser}
      call={call}
      />
       <VideoPlayer
       name={name} 
       callAccepted={callAccepted}
       myVideo={myVideo}
       userVideo={userVideo}
       callEnded={callEnded}
       stream={stream}
       call={call}
       
       />
    </div>
    {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
        </div>
      )}
  {trigger&&(
     <Notifications 
     name={name} 
     setName={setName}
     me={me}
     callUser={callUser}
     callEnded={callEnded}
     callAccepted={callAccepted}
     />
  )

    
  }
  

    </>
  )
}
export default VideoMeet