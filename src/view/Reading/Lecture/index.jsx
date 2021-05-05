import React from 'react';
import { connect } from 'react-redux';
import { BookPage } from "../../../common_component/BookPage";

class Lecture extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BookPage
        fontSize={this.props.fontSize}
        selection={this.props.selection}
        content={this.props.content}
        id="lecture"
        apikey={this.props.apikey}
        highlight={this.props.highlight}
        page_type='Notes'
        onNoteItemClick={this.props.onNoteItemClick}
        highlights={this.props.highlights}
        onFootMarkClick={this.props.onFootMarkClick}
        theme={this.props.theme}
        handleSelection={this.props.handleSelection}>
        <div className="title-l2">讲义</div>
        <p>
          当知道了自己的命运，伊俄卡斯忒最终上吊自尽，俄狄浦斯则刺瞎了自己的双眼。俄狄浦斯在刺瞎自己双眼的时候说到：“你们再也看不见我所受的灾难，我所造的罪恶了！你们看够了你们不应当看的人，不认识我想认识的人；你们从此黑暗无光！”俄狄浦斯现在明白了他的眼睛虽然之前看到了自己想看的景象，但是现在才发现这些都是虚无，其实自己是瞎眼的，所以他要把自己的眼睛戳瞎。对于俄狄浦斯来说，他现在虽然瞎眼了，但是他却可以同先知一样不再注视世界上的景象。同时他还希望克瑞翁能够将他扔到喀泰戎，这是他最初被抛弃的地方，现在似乎又回到了原点。俄狄浦斯的这个决定无疑将他从整个城邦之中分离开来，他不再是忒拜城的国王，他要断绝身上拥有的一切的社会性，似乎只有这样能够更明白命运对自己到底意味着什么，只有回到自然才能够明白这一切。
        </p>
        <p>
          让我们重新回顾一下俄狄浦斯的命运吧。俄狄浦斯为了城邦，想要找到杀死老国王的凶手，这一做法我们无可指摘。从这个方面来看，俄狄浦斯并不是没有合法性的僭主，恰恰是一位心系城邦的君主，深得忒拜城民的尊敬。但为什么俄狄浦斯却要遭受这一苦难？首先是因为俄狄浦斯不断地追问事情的起源，从城邦的根基——礼法的角度来说，俄狄浦斯是在颠覆城邦的根基，对于俄狄浦斯来说，重要的是把瘟疫的事情解决好，不去管事情的起源到底是什么样子。俄狄浦斯作为国王，他就是整个政治体制的合法性的来源，现在却不断地想探究自己合法性的来源，这一态度不是国王应有的，而是哲学家应有的态度。哲学家应该做的就是要不断探究事情的本源，首先要做的就是把一切看上去理所当然的事物悬搁起来，只有这样才能回到事物本身，然而政治却不要求这一点。那么俄狄浦斯是否有方法解决这一点呢？他不是要成为一个哲学家，而放弃自己的统治，就是要放弃自己的哲学家身份，而成为僭主。
        </p>
        <p>
          但是追根溯源对俄狄浦斯来说是坏事吗？自然不是，只要是人都会有这一欲望，每个人都想知道起源到底是什么。而且俄狄浦斯面对是欲望的深渊，正是他想保住自己的王位并获得清白，所以不断地要去追问事情的真相。俄狄浦斯最后发现真相对他非常残忍，甚至可以说命运给他开了一个大玩笑，所以俄狄浦斯决定从这一切的欲望深渊中脱离开来。俄狄浦斯发现他的生命从此不再完整而变成了众多碎片，事实上这对俄狄浦斯来说并不是一件坏事。因为俄狄浦斯最终认识到了自己以及寻找到了自己，这是一般人所无法做到的。俄狄浦斯的生活并不能被称为幸福，甚至他的身份发生了突然的反转，但是在这条寻根的路上，难能可贵的是俄狄浦斯最终认识到了自己。这条路不是任何人都能踏上，只有那些真正想要寻求的人才会从中获得启示，最终俄狄浦斯走向了自我放逐的路，不过这是他对自己人生的选择。
        </p>
        <p>
          难道俄狄浦斯的决定对他的城邦来说不是太残忍了吗？但是在俄狄浦斯离开之后，忒拜城仍然能够在克瑞翁的统治之下维持，政治对于人来说永远是一个限制，但是对人的内在来说却始终是个身外之物。俄狄浦斯虽然不再能看到，但是他却明白了命运的启示，似乎他也知道不是任何事情都能够通过人的知识和智慧解决，因为每个人都不知道那显像下面的不可见物到底是什么。那就是人的命运，从俄狄浦斯那里我们能够清楚地看到人仍然要尊敬神明，尊重从神明那里来的启示，而不是过于相信自己。
        </p>
      </BookPage>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Lecture);