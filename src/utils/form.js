import store from '../store';
export  function getNotePostData(type,selection,contents,title,roundTableId){
    type = type?type:'normal';
    title = title?title:'';
    contents = contents?contents:'';
    let is_public = contents.length?true:false;
    let postData = {
      type,
      title,
      contents,
      public: is_public,
    }
    const state = store.getState();
    const cur_lesson_info = state.cur_lesson.lesson_info.lesson_info;
    if (roundTableId) {
      return Object.assign(postData, {
        round_table: roundTableId
      });
    } else if (cur_lesson_info) {
      selection = selection.contents?selection:{};
      let book = (cur_lesson_info.section && cur_lesson_info.section.books)?cur_lesson_info.section.books[0]:null;
      let selection_page_type = selection.page_type?selection.page_type:'';
      let lesson_page = cur_lesson_info.id +'/'+ selection_page_type;
      console.log('contents.length');
      console.log(contents.length);
      let anchor = selection.uri_anchor?selection.uri_anchor:'';
      delete selection['page_type'];

      return Object.assign(postData, {
        selection,
        book,
        lesson_page,
        anchor
      });

    }else{
      return null
    }

}

export  function getQuestionPostData(sticky,type,selection,contents,title,course,roundTableId){
  type = type?type:'normal';
  title = title?title:'';
  contents = contents?contents:'';
  course = course?course:'';

  let postData = {
    type,
    title,
    contents,
    course,
    sticky,
  }
  const state = store.getState();
  const cur_lesson_info = state.cur_lesson.lesson_info.lesson_info;
  if (roundTableId) {
    return Object.assign(postData, {
      round_table: roundTableId
    });
  } else if (cur_lesson_info) {
    selection = selection.contents?selection:{};
    let book = (cur_lesson_info.section && cur_lesson_info.section.books)?cur_lesson_info.section.books[0]:null;
    let selection_page_type = selection.page_type?selection.page_type:'';
    let lesson_page = cur_lesson_info.id +'/'+ selection_page_type;
    let anchor = selection.uri_anchor?selection.uri_anchor:'';
    delete selection['page_type'];

    return Object.assign(postData, {
      selection,
      book,
      lesson_page,
      anchor
    });

  }else{
    return null
  }

}
/*
export  class NoteFormData{
  constructor(type,selection,content,title){
    const state = store.getState();
    const cur_lesson_info = state.cur_lesson.lesson_info;
    console.log(cur_lesson_info);
    console.log(content);
    console.log(selection);
    if(cur_lesson_info && cur_lesson_info.books && cur_lesson_info.books.length  && content){
      this.type = type?type:'normal';
      this.book = cur_lesson_info.books[0];
      this.lesson_page = cur_lesson_info.id;
      this.public = content.length?true:false;
      this.title = title?title:'';
      this.create_dt = new Date();
      this.selection = selection;
      this.anchor = selection.uri_anchor;
    }
  }
  getFormData(){
    if(this.type && this.book && this.selection && this.anchor){
      let formData = {
        type: this.type
      }
      let formData = new FormData();
      formData.append('type',this.type);
      formData.append('public',this.public);
      formData.append('anchor',this.anchor);
      formData.append('book',this.book);
      formData.append('content',this.content);
      formData.append('title',this.title);
      formData.append('create_dt',this.book);
      formData.append('lesson_page',this.lesson_page);
      formData.append('selection',this.selection);
      formData.append('create_dt',this.create_dt);
      console.log('form data');
      console.log(formData);
      return formData;

    }else {
      return null;
    }
  }
}
*/