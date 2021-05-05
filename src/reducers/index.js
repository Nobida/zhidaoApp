import { combineReducers } from 'redux';
import auth from './auth';
import reading_settings from './reading_settings';
import cur_selection from './cur_selection';
import courses from './courses';
import today from './today';
import lessons from './lessons';
import user_book_notes from './user_book_notes';
import cur_lesson from './cur_lesson';
import books from './books';
import cur_book from './cur_book';
import cur_post from './cur_post';
import cur_delete from './cur_delete';
import cur_submit_quiz from './cur_submit_quiz';
import quizset from './quizset';
import cur_highlight from './cur_highlight';
import user_stat from './user_stat';
import cur_note from './cur_note';
import comments from './comments';
import user_questions from './user_questions';
import answers from './answers';
import cur_question from './cur_question';
import cur_course from './cur_course';
import cur_schedule from './cur_schedule';
import gift from './gift';
import wechat from './wechat';
import products from './products';
import carts from './carts';
import cur_product from './cur_product';
import created_orderlist from './product_order';
import collect_order_ret from './product_order';
import created_order from './product_order';
import orderlist from './product_order';
import add_ret from './carts';
import item_order from './product_order';
import user_agent from './user_agent';
import alert_setting from './alert_setting';
import round_table from './round_table';
import round_table_content from './round_table_content';
import articles from './articles';
import article from './article';
import replys from './replys';
import cur_post_item from './cur_post_item';
import cur_product_discount from './cur_product_discount';
import retail from './retail'
import order from './order'

const rootReducer = combineReducers({
    auth,
    alert_setting,
    reading_settings,
    cur_selection,
    courses,
    today,
    lessons,
    user_book_notes,
    books,
    cur_lesson,
    cur_book,
    cur_post,
    cur_delete,
    cur_submit_quiz,
    quizset,
    cur_highlight,
    user_stat,
    cur_note,
    comments,
    user_questions,
    answers,
    cur_question,
    cur_course,
    cur_schedule,
    gift,
    wechat,
    products,
    carts,
    cur_product,
    created_orderlist,
    collect_order_ret,
    created_order,
    orderlist,
    add_ret,
    item_order,
    user_agent,
    round_table,
    round_table_content,
    articles,
    replys,
    cur_post_item,
    cur_product_discount,
    article,
    retail,
    order,
    article
});

export default rootReducer;
