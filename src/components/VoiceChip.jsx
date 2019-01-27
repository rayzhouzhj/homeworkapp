
import React from 'react';
import VoicePlayer from '../libs/VoicePlayer';
import Chip from '@material-ui/core/Chip';

class VoiceChip extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            started: false,
            playing: false,
            label: this.props.label,
            sound: this.props.sound
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
                <Chip
                    label={this.state.label}
                    onClick={this.changeState}
                    style={{fontSize: 18, margin: 8}}
                />
                <VoicePlayer
                    pause={!this.state.playing}
                    text={this.state.sound}
                    onEnd={this.onEnd}
                />
            </div>
        )
    }
}

export default VoiceChip;