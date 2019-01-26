import React from 'react';
import VoicePlayer from '../libs/VoicePlayer';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseCircleFilledRounded from '@material-ui/icons/PauseCircleFilledRounded';

class VoiceButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            started: false,
            playing: false,
            text: this.props.text
        }

        this.changeState = this.changeState.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    onEnd = () => {
        this.changeState();
    }

    changeState = () => {
        let newSate = this.state;
        newSate.playing = !this.state.playing;
        this.setState(newSate);
    }
    
    render() {
        return (
            <div>
                {
                    !this.state.playing? 
                        <IconButton onClick={() => this.changeState()}><PlayArrowRounded /></IconButton> 
                        : <IconButton onClick={() => this.changeState()}><PauseCircleFilledRounded /></IconButton>
                }

                {
                    <VoicePlayer
                        pause={!this.state.playing}
                        text={this.state.text}
                        onEnd={this.onEnd}
                    />
                }
            </div>
        )
    }
}

export default VoiceButton;