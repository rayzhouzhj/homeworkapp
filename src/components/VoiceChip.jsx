
import React from 'react';
import VoicePlayer from '../libs/VoicePlayer';
import Chip from '@material-ui/core/Chip';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

class VoiceChip extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            started: false,
            playing: false,
            label: this.props.label,
            sound: this.props.sound,
            anchorEl: null,
            open: false,
            related: this.props.related
        }

        this.changeState = this.changeState.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    onEnd = () => {
        let newSate = this.state;
        newSate.playing = !this.state.playing;
        this.setState(newSate);
    }

    changeState = (event) => {
        let newSate = this.state;
        newSate.playing = !this.state.playing;
        newSate.anchorEl = event.currentTarget;
        newSate.open = !this.state.open;
        this.setState(newSate);
    }
    
    render() {
        return (
            <React.Fragment>
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
                <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                {
                                    this.state.related.map((text, nodeIndex) => (
                                        <VoiceChip label={text} sound={text} key={`landing-list-item-related${nodeIndex}`} related={[]}/>
                                    ))
                                }
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </React.Fragment>
        )
    }
}

export default VoiceChip;