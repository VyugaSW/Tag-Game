import React from "react";


export default class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: this.props.initialValue ?? 0 };
      this.timer = 0;

      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
    }

    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
      
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      
      return obj;
    }

    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      if(this.props.startRightAway)
        this.startTimer();
    }

    startTimer() {
      if(this.props.setIsPaused)
        this.props.setIsPaused(false);

      if (this.timer === 0) 
        this.timer = setInterval(this.countDown, 1000);
    }
    
    countDown() {
      if(this.props.stopRightNow)
        this.stopTimer();
      
      let seconds = this.state.seconds + (this.props.increaseValue ?? 1);
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      if ((seconds === this.props.timeLimit && this.props.timeLimit) || seconds === 0) 
        clearInterval(this.timer);      
    }

    stopTimer(){
      if(this.props.setIsPaused)
        this.props.setIsPaused(true);

      clearInterval(this.timer);
      this.timer = 0;  
    }

    pad = (chars, str) => (chars+str).slice(-2);

    render() {
      return(
        <div>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          {this.pad("0",this.state.time.m)}:{this.pad("0",this.state.time.s)}
        </div>
      );
    }
  }