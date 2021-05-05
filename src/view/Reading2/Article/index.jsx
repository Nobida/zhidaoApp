import React from 'react';
import { connect } from 'react-redux';
import { BookPage } from "../../../common_component/BookPage";

const highlights = [{
  uri_anchors: 'DaXue/chp1',
  contents: '他亲自动手，抢走我的荣誉礼物。”\n他这样流着眼泪说，他的可敬的母亲\n在海水深处坐在她',
  pre_contents: '那位权力广泛的阿伽门农侮辱我，\n',
  post_contents: '在海水深处坐在她的老父亲身边，\n',
}, {
  //  uri_anchors: 'DaXue/chp1',
  contents: '程子曰：“大学，孔氏之遗书，而初学入德之门也。”于今可见古人为学次第者，独赖此篇之存，而论、孟次之。\n学者必由是而学焉，则庶乎其不差矣。\n大学之道，在明明德，在亲民，在止于至善。',
  pre_contents: '那位权力广泛的阿伽门农侮辱我，\n',
  post_contents: '在海水深处坐在她的老父亲身边，\n',
}];

class Article extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BookPage

        selection={this.props.selection}
        highlight={this.props.highlight}
        fontSize={this.props.fontSize}
        content={this.props.content}
        page_type='Text'
        id="article"
        onNoteItemClick={this.props.onNoteItemClick}
        apikey={this.props.apikey}
        highlights={this.props.highlights}
        onFootMarkClick={this.props.onFootMarkClick}
        handleSelection={this.props.handleSelection}>
        <div className="uri-anchor" id="DaXue/chp1" style={{ display: 'none' }} />
        <div className="title-l2">第一章
                <span className="comment">大，旧音泰，今读如字。
                </span>
        </div>

        <div className="comments">
          <p>子<sup className="footnote-mark" footnote_id="DaXue-chp1-1" data="1" />
            程子曰：“大学，孔氏之遗书，而初学入德之门也。”于今可见古人为学次第者，独赖此篇之存，而论、孟次之。
                    <sup className="footnote-mark" footnote_id="DaXue-chp1-2" data="2" />
            学者必由是而学焉，则庶乎其不差
                    <sup className="footnote-mark" footnote_id="DaXue-chp1-3" data="3" />
            矣。</p>
        </div>
        <p>大学之道，在明明德，在亲民，在止于至善。
            <span className="comment">
            程子曰：“亲，当作新。”大学者，大人之学也。明，明之也。明德者，人之所得乎天，而虚灵不昧，以具众理而应万事者也。但为气禀所拘，人欲所蔽，则有时而昏；然其本体之明，则有未尝息者。故学者当因其所发而遂明之，以复其初也。新者，革其旧之谓也，言既自明其明德，又当推以及人，使之亦有以去其旧染之污也。止者，必至于是
                <sup className="footnote-mark" footnote_id="DaXue-chp1-4" data="4" />
            而不迁之意。至善，则事理当然之极也。言明明德、新民，皆当至于至善之地而不迁。盖必其有以尽夫天理之极，而无一毫人欲之私也。此三者，大学之纲领也。
            </span>
        </p>
        <div className="uri-anchor" id="Iliad/chp1" style={{ display: "none" }} />
        <div className="title-l2">伊利亚特 第一讲</div>
        <div className="poem">
          <p>他这样说<sup className="footnote-mark" footnote_id="Iliad-vol1-ver345-363-1" data="1" />，帕特罗克洛斯<sup className="footnote-mark" footnote_id="Iliad-vol1-ver345-363-2" data="2" />服从吩咐，</p>
          <p>从营帐里把美颊的女子布里塞伊斯带出来，<span className="vn" data="345" /></p>
          <p>交给他们领走，回到阿开奥斯人的船边，</p>
          <p>和他们一起到达的是那个不愿意的女子。</p>
          <p>阿基琉斯却在流泪，远远地离开</p>
          <p> 他的伴侣，坐在灰色大海的岸边，<span className="vn" data="350" /></p>
          <p>遥望那酒色的海水。他伸手向母亲<sup className="footnote-mark" footnote_id="Iliad-vol1-ver345-363-3">3</sup>祈祷：</p>
          <p>“母亲啊，你既然生下我这个短命的儿子，</p>
          <p>奥林波斯的大神，在天空鸣雷的宙斯</p>
          <p>就该赐我荣誉，却没有给我一点，</p>
          <p> 那位权力广泛的阿伽门农侮辱我，<span className="vn" data="355" /></p>
          <p>他亲自动手，抢走我的荣誉礼物。”</p>
          <br />
        </div>
        <div className="uri-anchor" id="Iliad/chp2" style={{ display: "none" }} />
        <div className="poem">
          <p>他这样流着眼泪说，他的可敬的母亲</p>
          <p>在海水深处坐在她的老父亲身边，</p>
          <p>她听见了他的祈祷，急忙从灰色海水里</p>
          <p> 像一片云雾升起来，坐在儿子面前，<span className="vn" data="360" /></p>
          <p>他流泪，她拍拍他，呼唤他的名字说：</p>
          <p>“孩子，为什么哭？你心里有什么忧愁？</p>
          <p>说出来，让我知道，不要闷在心里。”</p>
          <br />
        </div>

        <div className="footnotes">
          <div className="footnote" footnote_id="Iliad-vol1-ver345-363-1"><div className="label">1</div><div className="content">指传令官到阿基琉斯的营帐，阿基琉斯心里明白是阿伽门农为布里塞伊斯派他们前来，随即吩咐帕特罗克洛斯，“把那个女子带出来交给他们送走；让他们两人在永乐的天神和有死的凡人面前作证，也在那个残酷的国王面前作证，总有一天需要我来为其他的战士阻挡那种可耻的毁灭。他心情恶毒，发泄怨愤，不知道同时向前看和向后看，使阿开奥斯人在船边战斗不受伤亡。”</div></div>
          <div className="footnote" footnote_id="Iliad-vol1-ver345-363-2"><div className="label">2</div><div className="content">帕特罗克洛斯：阿基琉斯从小的玩伴，也是阿基琉斯最信任的朋友，在阿基琉斯与阿伽门农争吵之后，阿基琉斯退出了特洛亚战争，帕特罗克洛斯是他与世界唯一的纽带。后帕特罗克洛斯穿着阿基琉斯的铠甲出战，被赫克托尔杀死。</div></div>
          <div className="footnote" footnote_id="Iliad-vol1-ver345-363-3"><div className="label">3</div><div className="content">母亲：指阿基琉斯的母亲，即海洋女神忒提斯。</div></div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Article);