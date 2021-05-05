import React from 'react';
import Loadings from '../../common_component/Loadings';
import FormItem from '../../common_component/FormItem';
import TextField from '../../common_component/TextField';
import {
  SelectionContainer,
  SelectionItem,
} from "../../common_component/Selection";
import Button from "../../common_component/Button";
import Toast from '../../common_component/Toast';
import cityData from '../../utils/cityData';
import "./style.scss";
import {trackRegiserEvent} from "../../utils/cnzz_helper";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      birthday: "",
      organization: "",
      stage: "",
      career: "",
      known_books: "",
      source: "",
      phone: "",
      email: "",
      province: "",
      city: "",
      QQ: "",
      wechat: "",
      join_group: "",
      join_volunteer: "",
      personal_talent: "",
      join_academic_team: "",
      academic_talent: "",
      warning: false,
    };
  }
  handleRegister(){
    const { actions, auth } = this.props;
    let o = this;
    const { name, birthday, stage, organization, career, known_books, source, phone, email, province, city, QQ, wechat, join_group, join_volunteer, personal_talent, join_academic_team, academic_talent } = this.state;
    console.log(this.state);
    if (name != "" && wechat!="" && stage!="" && career != "" && known_books != "" && source != "") {
      actions.userRegister({
        id: auth.user_info.id,
        name,
        birthday,
        organization,
        stage,
        career,
        known_books,
        source,
        phone,
        email,
        province,
        city,
        QQ,
        wechat,
        join_group,
        join_volunteer,
        skills: personal_talent,
        join_scholar: join_academic_team,
        scholarship: academic_talent,
      });
      trackRegiserEvent();
    } else {
      this.setState({ warning: true });
      setTimeout(function(){
        o.setState({warning: false});
      })
    }
  }
  handleNameTextChange(value){
    console.log(value)
    this.setState({ name: value })
  }
  handleBirthdayTextChange(value){
    console.log(value)
    this.setState({ birthday: value })
  }
  handleOrganTextChange(value){
    console.log(value)
    this.setState({ organization: value })
  }
  handleCareerTextChange(value){
    console.log(value)
    this.setState({ career: value })
  }
  handlePhoneTextChange(value){
    console.log(value)
    this.setState({ phone: value })
  }
  handleEmailTextChange(value){
    console.log(value)
    this.setState({ email: value })
  }
  handleQQTextChange(value){
    console.log(value)
    this.setState({ QQ: value })
  }
  handleWechatTextChange(value){
    console.log(value)
    this.setState({ wechat: value })
  }
  handleKnownBooksTextChange(value) {
    console.log(value)
    this.setState({ known_books: value })
  }
  handleSourceSelectionChange(value) {
    console.log(value)
    this.setState({ source: value })
  }
  handleStageSelectionChange(value){
    console.log(value)
    this.setState({ stage: value })
  }
  handleProvinceSelectionChange(value){
    console.log(value)
    this.setState({ province: value, city: "" })
    this.handleCitySelectionChange("")
  }
  handleCitySelectionChange(value){
    console.log(value)
    this.setState({ city: value })
  }
  handleJoinGroupSelectionChange(value){
    console.log(value)
    this.setState({
      join_group: value
    })
  }
  handleVolunteerSelectionChange(value){
    console.log(value)
    this.setState({
      join_volunteer: value,
      personal_talent: ""
    })
  }
  handlePersonalTalentTextChange(value) {
    console.log(value)
    this.setState({ personal_talent: value })
  }
  handleAcademicTeamSelectionChange(value){
    console.log(value)
    this.setState({
      join_academic_team: value,
      academic_talent: ""
    })
  }
  handleAcademicTalentTextChange(value){
    console.log(value)
    this.setState({ academic_talent: value })
  }

  redirectIfRegistered() {
    const { auth, history } = this.props;
    if (auth.user_info.is_registered) {
      history.replace("/main/home");
    }
  }

  componentDidMount() {
    console.log('Register did mount');
    this.redirectIfRegistered();
  }

  componentDidUpdate() {
    console.log('Register did update');
    this.redirectIfRegistered();
  }

  render() {
    console.log('Register render');
    const { auth } = this.props;
    // const { province } = this.state;
    // let cityList = province ? cityData.filter(item => {
    //   return province === item.name;
    // })[0].city : [];
    // console.log(cityList);
    if (auth.user_info.is_registered) {
      return (<Loadings show={true}/>);
    }
    return (
      <div className='register'>
        <div className="register-container">
          <p className="text-muted">
            在您进入课程之前，为了帮助我们更好地提升您的用户体验，需要您先填写以下信息
          </p>
          <FormItem>
            <TextField required={true} label="称呼" value={this.state.name} onInput={this.handleNameTextChange.bind(this)}/>
          </FormItem>
          <FormItem>
            <TextField required={true} label="微信号（不是昵称）" value={this.state.wechat} onInput={this.handleWechatTextChange.bind(this)}/>
          </FormItem>
          <FormItem required={true} label="工作学习状态">
            <SelectionContainer label="请选择" onSelectionChange={this.handleStageSelectionChange.bind(this)}>
              <SelectionItem value="work">工作</SelectionItem>
              <SelectionItem value="middle_school">在校中学生</SelectionItem>
              <SelectionItem value="undergraduate">在校大学生</SelectionItem>
              <SelectionItem value="graduate">在校研究生</SelectionItem>
              <SelectionItem value="phd">在校博士生</SelectionItem>
            </SelectionContainer>
          </FormItem>
          <FormItem>
            <TextField required={true} label="专业/职业" value={this.state.career} onInput={this.handleCareerTextChange.bind(this)}/>
          </FormItem>
          <FormItem>
            <TextField required={true} label="两本你读过的印象最深的书" value={this.state.known_books} onInput={this.handleKnownBooksTextChange.bind(this)}/>
          </FormItem>
          <FormItem required={true} label="你是如何了解到知道人文的">
            <SelectionContainer label="请选择" onSelectionChange={this.handleSourceSelectionChange.bind(this)}>
              <SelectionItem value="old_student">我是老学员</SelectionItem>
              <SelectionItem value="wechat_article">公众号文章</SelectionItem>
              <SelectionItem value="zhihu_article">知乎文章</SelectionItem>
              <SelectionItem value="friend_recommend">朋友推荐</SelectionItem>
              <SelectionItem value="wechat_moments">微信朋友圈</SelectionItem>
              <SelectionItem value="other">其他</SelectionItem>
            </SelectionContainer>
          </FormItem>
          <FormItem label="所在地">
            <SelectionContainer label="请选择省份或直辖市" onSelectionChange={this.handleProvinceSelectionChange.bind(this)}>
              {cityData.map(item => (
                <SelectionItem key={item.name} value={item.name}>
                  {item.name}
                </SelectionItem>
              ))}
            </SelectionContainer>
          </FormItem>
          {/* { cityList && cityList.length > 0 ? (
          <FormItem>
            <SelectionContainer label="请选择城市或直辖市区县" onSelectionChange={this.handleCitySelectionChange.bind(this)}>
              <SelectionItem value="">请选择</SelectionItem>
              {cityList.map(item => (
                <SelectionItem key={item.name} value={item.name}>
                  {item.name}
                </SelectionItem>
              ))}
            </SelectionContainer>
          </FormItem>
          ) : null} */}
          <FormItem>
            <TextField label="出生日期(如1990/01/01)" value={this.state.birthday} onInput={this.handleBirthdayTextChange.bind(this)}/>
          </FormItem>
          <FormItem>
            <TextField label="手机号" value={this.state.phone} onInput={this.handlePhoneTextChange.bind(this)}/>
          </FormItem>
          <FormItem>
            <TextField label="E-mail" value={this.state.email} onInput={this.handleEmailTextChange.bind(this)}/>
          </FormItem>
          <FormItem>
            <TextField label="院校/单位" value={this.state.organization} onInput={this.handleOrganTextChange.bind(this)}/>
          </FormItem>
          {/* <FormItem>
            <TextField label="QQ" value={this.state.QQ} onInput={this.handleQQTextChange.bind(this)}/>
          </FormItem> */}
          <br/>
          <FormItem label="是否愿意加入小组打卡学习">
            <SelectionContainer label="请选择" onSelectionChange={this.handleJoinGroupSelectionChange.bind(this)}>
              <SelectionItem value="yes">是</SelectionItem>
              <SelectionItem value="no">否</SelectionItem>
            </SelectionContainer>
          </FormItem>
          <FormItem label="是否愿意加入知道人文志愿者团队">
            <SelectionContainer label="请选择" onSelectionChange={this.handleVolunteerSelectionChange.bind(this)}>
              <SelectionItem value="yes">是</SelectionItem>
              <SelectionItem value="no">否</SelectionItem>
              <SelectionItem value="considering">考虑中</SelectionItem>
            </SelectionContainer>
          </FormItem>
          {this.state.join_volunteer=="yes"?(
          <FormItem>
            <TextField label="您的个人特长（如编辑校对、文字录入、诗歌朗诵、活动组织策划等等）" value={this.state.personal_talent} onInput={this.handlePersonalTalentTextChange.bind(this)}/>
          </FormItem>
          ):null}
          <p className="text-muted">注：志愿者可享受的福利待遇————实体书籍文创产品赠送、线下干货实录免费听等等</p>
          <br/>
          <FormItem label="是否愿意加入知道人文学术团队">
            <SelectionContainer label="请选择" onSelectionChange={this.handleAcademicTeamSelectionChange.bind(this)}>
              <SelectionItem value="yes">是</SelectionItem>
              <SelectionItem value="no">否</SelectionItem>
              <SelectionItem value="considering">考虑中</SelectionItem>
            </SelectionContainer>
          </FormItem>
          {this.state.join_academic_team=="yes"?(
          <FormItem>
            <TextField label="您的学术特长" value={this.state.academic_talent} onInput={this.handleAcademicTalentTextChange.bind(this)}/>
          </FormItem>
          ):null}
          <p className="text-muted">注：既可全职加入，也可以学生或在职工作者的身份兼职加入。如有兴趣，请将学术简历发送至统一招聘邮箱：tyrunnus@163.com</p>
          <p className="text-muted">学术简历应包括但不限于：个人基本信息、学校、学历、所学主要课程、主要兴趣领域、学术代表作（不限篇目和篇幅）、对知道《总书目》中至少两本的感受和理解等。</p>
          <br/>
          <Toast
            autoHide
            show={this.state.warning}
            message="填写信息不完整"
          />
          <Button onClick={this.handleRegister.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}
