import {
  LIST_ARTICLES,
  LIST_TOPICS,
  TARGET_ARTICLE,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  TOGGLE_PAGE_NAME,
  SET_SECTION_LIST,
  SET_LIST_QTY,
  SET_IMAGES_UPLOADED,
  DO_IMAGES,
  UPLOAD_AVATAR,
  IMAGE_CHECK,
  EXISTING_IMAGES,
  EXISTING_IMAGE_KEYS,
  RESET_STATES,
  POST_SUCESS,
  SET_ARTICLE_FILTER,
  SET_ARTICLE,
} from "../actions/articlesActions";

const initialState = {
  topics: [],
  articles: [],
  pageName: "",
  error: "",
  loading: false,
  success: false,
  article: {},
  sectionList: [],
  qty: 0,
  imagesUploaded: [],
  doImages: false,
  avatar: "",
  existingImages: [],
  imgKeys: [],
  postSuccess: false,
  articleFilter: "",
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATES:
      return {
        ...state,
        loading: false,
        success: false,
        article: {},
        sectionList: [],
        qty: 0,
        imagesUploaded: [],
        doImages: false,
        avatar: "",
        existingImages: [],
        imgKeys: [],
        postSuccess: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_PAGE_NAME:
      return {
        ...state,
        pageName: action.payload,
      };
    case LIST_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    case LIST_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case TARGET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case SET_SECTION_LIST:
      return {
        ...state,
        sectionList: action.payload,
      };
    case SET_LIST_QTY:
      return {
        ...state,
        qty: action.payload,
      };
    case SET_IMAGES_UPLOADED:
      return {
        ...state,
        imagesUploaded: action.payload,
      };
    case DO_IMAGES:
      return {
        ...state,
        doImages: action.payload,
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case EXISTING_IMAGES:
      return {
        ...state,
        existingImages: action.payload,
      };
    case EXISTING_IMAGE_KEYS:
      return {
        ...state,
        imgKeys: action.payload,
      };
    case POST_SUCESS:
      return {
        ...state,
        postSuccess: true
      };
    case SET_ARTICLE_FILTER:
      return {
        ...state,
        articleFilter: action.payload
      };
    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    default:
      return state;
  }
};

export default articleReducer;
