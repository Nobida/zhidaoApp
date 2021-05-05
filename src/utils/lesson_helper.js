



export function getCourseCategoryName(cat){
  switch (cat){
    case 'in':
      return '导读课'
    case 'cl':
      return '研读课'
    case 'dl':
      return '日读课'
    default:
      return ''
  }
}

export function getTodayCourseLessonInfo(courseId,today){
  let lessons = today.lessons;
  for(let i=0;i<lessons.length;i++){
    if(lessons[i]&&lessons[i].course){
      if(lessons[i].course == courseId){
        return lessons[i]
      }
    }
  }
  return null;
}

export function getCourseIndex(courses,courseId){
  let courseIndex = -1;
  if(courseId && courses && courses.courses.length){
    let coursesData = courses.courses;
    for(let i=0;i<coursesData.length;i++) {
      if (coursesData[i]['uuid'] == courseId) {
        courseIndex = i;
        break;
      }
    }
  }
  return courseIndex

}
export function getBookIndex(booksData,bookId){
  let bookIndex = -1;
  if(booksData && booksData.length){
    for(let i=0;i<booksData.length;i++){
      if(booksData[i]['uri'] == bookId){
        bookIndex = i;
        break;
      }
    }
  }
  return bookIndex;
}

export function getCourseBooks(course, books){
  if (!course || !books) {
    return [];
  }
  const booksData = books.books;
  if(!booksData || !booksData.length){
    return [];
  }
  const schedule = course.schedule;
  if(!schedule || !schedule.length){
    return [];
  }

  let courseBooks = [];
  for(let i=0;i<schedule.length;i++){
    if(schedule[i]['books']) {
      let bookId = schedule[i]['books'][0];
      let bookIndex = getBookIndex(booksData, bookId);
      if (bookIndex == -1) {
        return [];
      }
      let bookItem = booksData[bookIndex];
      bookItem.begdt = schedule[i].begdt;
      bookItem.enddt = schedule[i].enddt;
      courseBooks.push(bookItem);
    }
  }
  return courseBooks;
}

export function getCourseState(course){
  let {enddt,begdt,enrolled,registerable,uuid,computed_status} = course;
  let nowDate = new Date();
  let endDate = new Date(enddt);
  let begDate = new Date(begdt);

  // const courseStatus = {
  //   'course3a': 'ONGOING',
  //   'course3b': 'ONGOING',
  //   'course3c': 'ONGOING',
  //   'course3d': 'ONGOING',
  //   'course3e': 'ONGOING',
  //   'history1a': 'ONGOING',
  //   'in1001': 'ONGOING',
  //   'in1002': 'WAITING'
  // }
  // const courseAvailableStatus = {
  //   'history1a': true,
  //   'in1001': true
  // }
  if(computed_status){
    const  {enrolled, can_view, on_shelf, progress, trial, suggest_register}  = computed_status;
    if(enrolled||trial){
      if(progress=='going'){
        return 'ONGOING'
      }
      if(progress=='ended'){
        return can_view?'ENDED':'INVISIBLE'
      }
      if(progress=='released'){
        return enrolled?'WAITING':'TRIAL_WAITING'
      }
    }
    if(!enrolled||trial){
      if(on_shelf&&suggest_register){
        return 'AVAILABLE'
      }else{
        return 'DISABLE'
      }
    }
  }else{
    return 'DISABLE'
  }
}

export function getValidCourseIndex(today,courses){
  const courseId = getValidCourseIndex(today,courses);
  return getCourseIndex(courses,courseId);
}
export function getValidCourseId(today,courses){
  const fetching_today = today.fetching_today;
  let courseId = null;
  if (!fetching_today && today.courses &&today.courses.length && today.course_state!='NEW_COURSE'){
    for(let i=0;i<today.courses.length;i++){
        if(today.lessons[i]){
          courseId = today.courses[i];
          break;
        }
      }
      if(!courseId){
        courseId = today.courses[0];
      }
  }
  if(!courseId && courses && courses.courses.length){
    courseId = courses.courses[courses.courses.length-1]['uuid'];
  }
  return courseId
}

export function getDefaultLessons(today,courses,lessons,fetchLessons){
  let courseId = getValidCourseId(today,courses);
  console.log('valid course id');
  console.log(courseId);
  if(courseId)
    getLessonsByCourseId(courses,lessons,fetchLessons,courseId);
}

export function isDataLoaded(courses,lessons,today){
  let dataLoaded = true;
  const fetching_courses = courses.fetching_courses;
  const fetching_lessons = lessons.fetching_lessons;
  const fetching_today = today.fetching_today;
  const coursesData = courses.courses;
  const lessonsData = lessons.lessons;
  return (coursesData.length  && today.date &&
    !fetching_today && !fetching_lessons && !fetching_courses)
}

export function getLessonsByCourseId(courses,lessons,fetchLessons,courseId){

  const fetching_courses = courses.fetching_courses;
  const fetching_lessons = lessons.fetching_lessons;
  const coursesData = courses.courses;
  const lessonsData = lessons.lessons;

  if(!fetching_courses && !fetching_lessons && coursesData.length && courseId){
    if(lessons.course != courseId ){
      fetchLessons(courseId);
    }
  }
}


export function getDefaultScheduleHelper (courses,today,curCourseIndex){


      let defaultSchedule = null;
      const coursesData = courses.courses;

      if(coursesData.length && curCourseIndex!=-1 && today.date){

          let course = coursesData[curCourseIndex];
          let schedule = course.schedule;
          let date = new Date(today.date);
          if(course && schedule && schedule.length){
              for(let i=0;i<schedule.length;i++){
                  let begDt = new Date(schedule[i].begdt);
                  let endDt = new Date(schedule[i].enddt);
                  if(endDt>=date && begDt<=date){
                      defaultSchedule = schedule[i];
                      break;
                  }
              }
              if(!defaultSchedule){
                  defaultSchedule = schedule[0]
            }
          }
      }
      return defaultSchedule
}

export function getCurLessonsData(courses,lessons,today){
  if(!(today && today.courses)){
    return null;
  }

  let lesson_days =  getLessonsData(courses,lessons);
  if(!lesson_days){
    return null;
  }
  let todayIndex = -1;
  for(let i=0;i<lesson_days.length;i++){
    for(let j=0;j<today.lessons.length;j++){
      if(lesson_days[i].id == today.lessons[j]){
          todayIndex = i;
          break;
      }
    }
  }
  if(todayIndex == -1 && lesson_days.length){
    let lastLesson = lesson_days[lesson_days.length-1];
    let fisrtLesson = lesson_days[0];
    let curDate = new Date(today.date);
    if(lastLesson.date>curDate){
      todayIndex = -1;
    }else{
      if(fisrtLesson.date<curDate)
        todayIndex = lesson_days.length+1;
    }
  }
  return {lesson_days:lesson_days,todayIndex:todayIndex}
}

export function getLessonsData(courses,lessons){
   let coursesData = courses.courses;
   let lessonsData = lessons.lessons;
   let courseId = lessons.course;
   if(!coursesData.length || !courseId){
     return null
   }
   let courseIndex = -1;
   for(let i=0;i<coursesData.length;i++){
    if(coursesData[i]['uuid'] == courseId){
      courseIndex = i;
      break;
    }
  }
  if(courseIndex ==-1){
    return null;
  }
   let course = coursesData[courseIndex];
   if(!course){
     return null;
   }
   let courseBegDt = course.begdt;
   let courseEndDt = course.enddt;
   if(!courseBegDt|| !courseEndDt){
    return null;
  }
  courseBegDt = new Date(courseBegDt);
  courseEndDt = new Date(courseEndDt);

  lessonsData.sort(function (a,b) {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return (aDate > bDate)?1:-1;
  });
  let lesson_days = [];
  let d = 1;
  for(let i=0;i<lessonsData.length;i++){
    let date = new Date(lessonsData[i].date);
    if(date>= courseBegDt && date<=courseEndDt){
      let lesson_item = lessonsData[i];
      lesson_item.date = date;
      lesson_item.lesson_num = d;
      d=d+1;
      lesson_days.push(lesson_item);
    }
  }
  console.log('lessonDays');
  console.log(lesson_days);
  return lesson_days;
}


export function getLessonsCalendarData(courses,lessons,curCourseIndex,curSchedule,curLesson,today){
   let coursesData = courses.courses;
   let lessonsData = lessons.lessons;

   if(!coursesData.length || curCourseIndex==-1 ){
        return null
    }

    let course = coursesData[curCourseIndex];
    if(!course){
        return null;
    }
    let courseBegDt = course.begdt;
    let courseEndDt = course.enddt;
    let lesson_days = [];
    let curDt = today.date;
    if(!courseBegDt || !courseEndDt || !curDt || !today || !curSchedule){
        return null
    }
    courseBegDt = new Date(courseBegDt);
    courseEndDt = new Date(courseEndDt);
    let courseBegMonth = courseBegDt.getMonth();
    let courseBegYear = courseBegDt.getFullYear();
    let courseEndMonth = courseEndDt.getMonth();
    let courseEndYear = courseEndDt.getFullYear();
    curDt = new Date(curDt);

    let endDt = new Date(courseEndYear,courseEndMonth+1,0);
    let date = new Date(courseBegYear,courseBegMonth,1);

    let curBegDt = new Date(curSchedule.begdt);
    let curEndDt = new Date(curSchedule.enddt);
    let d = 0 ;

    let lesson_num = 1;

    if(courseBegDt.getDate()!=1) {
        while (date < courseBegDt) {
            lesson_days.push({date: date});
            d = d + 1;
            date = new Date(courseBegYear, courseBegMonth, 1);
            date.setDate(date.getDate() + d);
        }
    }
    lessonsData.sort(function (a,b) {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return (aDate > bDate)?1:-1;
    });
    d=0;
    for(let i=0;i<lessonsData.length;i++){
       let date =  new Date(lessonsData[i].date);
       if(date>=courseBegDt && date<=curDt){
           d=i;
           lessonsData[i]['date'] = new Date(lessonsData[i]['date']);
           if(lessonsData[i]['date']>=curBegDt && lessonsData[i]['date']<=curEndDt)
               lessonsData[i].highlight = true;
           else
               lessonsData[i].highlight = false;
           if(curLesson){
             if(curLesson.date == lessonsData[i].date){
               lessonsData[i].selected = true;
             }else{
               lessonsData[i].selected = false;
             }
           }
           lessonsData[i].lesson_num = lesson_num;
           lesson_days.push(lessonsData[i]);
           lesson_num+=1;
       }
    }
    let lastDate;
    if(d>0){
       lastDate = lessonsData[d]['date'];
    }else{
      lastDate = courseBegDt;
    }
    d = 0;

    date = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate()+1);

    while(date<=courseEndDt){
        let lesson_item = {date:date,status:'not_come',highlight:false,lesson_num:lesson_num};

        if(date>=curBegDt && date<=curEndDt)
               lesson_item.highlight = true;
        if(curLesson){
             if(curLesson.date == date){
               lesson_item.selected = true;
             }else{
               lesson_item.selected = false;
             }
        }
         lesson_days.push(lesson_item);
         d=d+1;
         lesson_num+=1;
         date = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate()+1);
         date.setDate(date.getDate()+d);
    }
    while(date<endDt){
        lesson_days.push({date:date});
        d=d+1;
        date = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate()+1);
        date.setDate(date.getDate()+d);

    }
    console.log('lesson days');
    console.log(lesson_days);
    return lesson_days;
}
