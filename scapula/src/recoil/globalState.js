import {atom} from "recoil"

export const videoListState = atom({
    key: 'videoState',
    default: [],
  });

export const currentUserState =atom({
   key:"currentUser",
   default:{}
})

export const TutorsState =atom({
  key:"Tutors",
  default:[]
})