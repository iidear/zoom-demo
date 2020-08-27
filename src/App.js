import React from 'react';
import './App.css';

class App extends React.Component {
  screenRef = React.createRef();
  canvasRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
      rate: 1,
      boardX: 100,
      boardY: 100,
      offsetX: 0,
      offsetY: 0,
    }
  }

  handleWheel = (evt) => {
    if (evt.ctrlKey) {
      evt.preventDefault();

      this.setState(({ scale, boardX, boardY, rate }) => {
        const offsetX = evt.pageX;
        const offsetY = evt.pageY;
        const deltaRate = 1 - evt.deltaY / 100;

        const newScale = scale * deltaRate;
        const newBoardX = deltaRate * (boardX - offsetX) + offsetX;
        const newBoardY = deltaRate * (boardY - offsetY) + offsetY;
        return {
          scale: newScale,
          boardX: newBoardX,
          boardY: newBoardY,
          offsetY,
          offsetX,
          rate: deltaRate * rate,
        };
      })

    }
  }

  componentDidMount() {
    this.screenRef.current.addEventListener('wheel', this.handleWheel, {
      passive: false,
    })
  }

  componentWillUnmount() {
    this.screenRef.current.removeEventListener('wheel', this.handleWheel);
  }

  render() {
    const {
      scale,
      rate,
      boardX,
      boardY,
      offsetX,
      offsetY,
    } = this.state;
    return (
      <div>
        <div
          ref={this.screenRef}
          style={{
            position: 'relative',
            width: '600px',
            height: '500px',
            overflow: 'auto',
            border: '1px solid #eee',
          }}
        >
          {/* <div
          style={{
            width: '5000px',
            height: '5000px',
            position: 'relative',
          }}
        > */}
          <div
            style={{
              position: 'absolute',
              left: `${boardX}px`,
              top: `${boardY}px`,
            }}
          >
            <div
              ref={this.screenRef}
              style={{
                position: 'absolute',
                width: `${300}px`,
                height: `${150}px`,
                backgroundColor: 'lightblue',
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
              }}
            ></div>
          </div>

          {/* </div> */}
        </div>

        <div>
          <p>scale: {scale} &nbsp;&nbsp; rate: {rate}</p>
          <p>boardX: {boardX} &nbsp;&nbsp; boardY: {boardY}</p>
          <p>offsetX: {offsetX} &nbsp;&nbsp; offsetY: {offsetY}</p>
        </div>
      </div>
    );
  }
}


export default App;
