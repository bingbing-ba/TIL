'use strict';
const jsondata = JSON.parse(data);
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return `You liked this.${jsondata.c}`;
    }

    return (
      <button onClick={() => this.setState({ liked: true }) }>
        Like
      </button>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<LikeButton />, domContainer);