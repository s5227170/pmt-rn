import agent from "../../api/agent";
import firebase from "../../firebase/firebase";
import uuid from "react-native-uuid";

export const SET_LOADING = "SET_LOADING";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_ERROR = "SET_ERROR";
export const TOGGLE_PAGE_NAME = "TOGGLE_PAGE_NAME";
export const LIST_TOPICS = "LIST_TOPICS";
export const LIST_ARTICLES = "LIST_ARTICLES";
export const TARGET_ARTICLE = "TARGET_ARTICLE";
export const SET_SECTION_LIST = "SET_SECTION_LIST";
export const SET_LIST_QTY = "SET_LIST_QTY";
export const SET_IMAGES_UPLOADED = "SET_IMAGES_UPLOADED";
export const DO_IMAGES = "DO_IMAGES";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";
export const IMAGE_CHECK = "IMAGE_CHECK";
export const EXISTING_IMAGES = "EXISTING_IMAGES";
export const EXISTING_IMAGE_KEYS = "EXISTING_IMAGE_KEYS";
export const RESET_STATES = "RESET_STATES";
export const POST_SUCESS = "POST_SUCCESS";
export const SET_ARTICLE_FILTER = "SET_ARTICLE_FILTER";
export const EMPTY_UPLOADED_IMAGES = "EMPTY_UPLOADED_IMAGES";
export const SET_ARTICLE = "SET_ARTICLE";

export const togglePageName = (name) => {
  return {
    type: TOGGLE_PAGE_NAME,
    payload: name,
  };
};

export const listTopics = () => {
  return async (dispatch) => {
    try {
      agent.Topics.list().then((res) => {
        dispatch({
          type: LIST_TOPICS,
          payload: res,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const createArticle = (article) => {
  return async (dispatch) => {
    try {
      agent.Articles.create({
        author: article.author,
        topic: article.topic,
        type: article.type,
        avatar: article.avatar,
        content: article.content,
        images: article.images,
        level: article.level,
      }).then(() => {
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const updateArticle = (id, article) => {
  return async (dispatch) => {
    try {
      agent.Articles.update(id, {
        author: article.author,
        topic: article.topic,
        type: article.type,
        avatar: article.avatar,
        content: article.content,
        images: article.images,
        level: article.level,
      }).then(() => {
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const viewArticle = (id) => {
  return async (dispatch) => {
    try {
      agent.Articles.details(id).then((res) => {
        dispatch({
          type: SET_PRODUCT,
          payload: res,
        });
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const deleteArticle = (id) => {
  return async (dispatch) => {
    try {
      agent.Articles.update(id).then(() => {
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const listArticle = () => {
  return async (dispatch) => {
    try {
      agent.Articles.list().then((res) => {
        dispatch({
          type: LIST_ARTICLES,
          payload: Object.values(res),
        });
        dispatch({
          type: SET_SUCCESS,
          payload: true,
        });
      });
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.Message,
      });
    }
  };
};

export const setSectionList = (section, index, sectionList, operation) => {
  return async (dispatch) => {
    if (operation == "add") {
      const newList = [...sectionList];
      newList.push(section);
      dispatch({
        type: SET_SECTION_LIST,
        payload: newList,
      });
    } else {
      newList = sectionList.splice(index, 1);
      dispatch({
        type: SET_SECTION_LIST,
        payload: newList,
      });
    }
  };
};

export const setSectionListQty = (qty) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LIST_QTY,
      payload: qty,
    });
  };
};

export const setDoImages = (val) => {
  return async (dispatch) => {
    dispatch({
      type: DO_IMAGES,
      payload: val,
    });
  };
};

export const imageExists = (file, section, currentImgs, imgKeys) => {
  return async (dispatch) => {
    let newArr = [...currentImgs];
    let imgKeysArr = [...imgKeys];
    newArr.push({ number: section, img: file });
    imgKeysArr.push(section);
    dispatch({
      type: EXISTING_IMAGE_KEYS,
      payload: imgKeysArr,
    });
    dispatch({
      type: EXISTING_IMAGES,
      payload: newArr,
    });
  };
};

export const deleteImgKey = (number, keyArr) => {
  return async (dispatch) => {
    keyArr.filter((item, i) => i !== number);
    dispatch({
      type: EXISTING_IMAGE_KEYS,
      payload: keyArr,
    });
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    const response = await fetch(file.uri);
    const blob = await response.blob();

    let ref = await firebase
      .storage()
      .ref()
      .child("sectionAvatars/" + uuid.v4());
    await ref.put(blob).then(async (res) => {
      await ref.getDownloadURL().then((url) => {
        dispatch({
          type: UPLOAD_AVATAR,
          payload: url,
        });
      });
    });
  };
};

export const uploadImg = (articleNumber, img, allImgs) => {
  return async (dispatch) => {
    const response = await fetch(img.uri);
    const blob = await response.blob();

    let ref = await firebase
      .storage()
      .ref()
      .child("sectionImages/" + uuid.v4());
    await ref.put(blob).then(async (res) => {
      await ref.getDownloadURL().then((url) => {
        allImgs.push({ number: articleNumber, url: url });

        dispatch({
          type: SET_IMAGES_UPLOADED,
          payload: allImgs,
        });
      });
    });
  };
};

export const resetStates = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_STATES,
    });
  };
};

export const setType = (type) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ARTICLE_FILTER,
      payload: type,
    });
  };
};

export const setArticle = (article) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ARTICLE,
      payload: article,
    });
  };
};

export const postArticle = (
  author,
  title,
  briefDesc,
  topic,
  level,
  avatar,
  sectionList,
  imagesUploaded,
  references
) => {
  return async (dispatch) => {
    const currentTime = new Date();
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(currentTime);
    const Article = {
      author: author,
      title: title,
      briefDesc: briefDesc,
      topic: topic,
      level: level,
      avatar: avatar,
      sectionList: sectionList,
      imagesUploaded: imagesUploaded,
      references: references,
      createdAt: currentTime,
    };
    await firebase
      .firestore()
      .collection("/articles")
      .add(Article)
      .then(async (response) => {
        const refinedArticle = {
          id: response.article.id,
          author: author,
          title: title,
          briefDesc: briefDesc,
          topic: topic,
          level: level,
          avatar: avatar,
          sectionList: sectionList,
          imagesUploaded: imagesUploaded,
          references: references,
          createdAt: currentTime,
        };
        await firebase
          .firestore()
          .collection("/articles")
          .doc(response.article.id)
          .set(refinedArticle);
        dispatch({
          type: POST_SUCESS,
        });
      });
  };
};
