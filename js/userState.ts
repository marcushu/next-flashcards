import RandomOffset from './RandomOffset';

const initialUserState = {
  userTopics: <string[]>[],
  currentTopic: "",
  questionAnswer: {
    question: "",
    answer: ""
  },
  randomOffset: new RandomOffset(0)
}

type StateType = typeof initialUserState;
type Action = {
  type: "SETUP" | "ADDTOPIC" | "ADDQUESTION" | "SWITCHTOPIC" | "NEXTQUESTION" | "DELETETOPIC" | "UPDATETOPIC",
  payload: {
    topic?: string,
    userTopics?: string[]
    user?: string,
    numGen?: RandomOffset
    newQuestionAnswer?: { question: string, answer: string }
  }
}


const userReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "SETUP":
      if (action.payload.userTopics && action.payload.numGen) {
        return {
          ...state,
          userTopics: action.payload.userTopics,
          currentTopic: action.payload.userTopics[0],
          randomOffset: action.payload.numGen
        }
      }
    case "ADDTOPIC":
      if (action.payload.topic && action.payload.numGen) {
        return {
          ...state,
          userTopics: [action.payload.topic, ...state.userTopics],
          currentTopic: action.payload.topic,
          questionAnswer: { question: "", answer: ""},
          randomOffset: action.payload.numGen
        }
      }
    case "ADDQUESTION":
      if (action.payload.numGen)
        return { ...state, randomOffset: action.payload.numGen }
    case "SWITCHTOPIC":
      if (action.payload.topic && action.payload.numGen) {
        return {
          ...state,
          currentTopic: action.payload.topic,
          randomOffset: action.payload.numGen
        }
      }
    case "NEXTQUESTION":
      if (action.payload.newQuestionAnswer)
        return { ...state, questionAnswer: action.payload.newQuestionAnswer }
    case "DELETETOPIC":
      if (action.payload.topic) {
        const filteredTopics = state.userTopics.filter(el => el != action.payload.topic)

        return {
          ...state,
          userTopics: filteredTopics,
          currentTopic: filteredTopics[0]
        }
      }
    default:
      return state;
  }
}

export { initialUserState, userReducer }