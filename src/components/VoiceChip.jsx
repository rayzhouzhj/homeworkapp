
import React from 'react';
import VoicePlayer from '../libs/VoicePlayer';
import Chip from '@material-ui/core/Chip';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

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
    
    dismissPopover = () => {
        let newSate = this.state;
        newSate.anchorEl = null;
        newSate.open = !this.state.open;
        this.setState(newSate);
    }

    render() {
        return (
            
                <PopupState variant="popover" popupId="demoPopover">
                    {popupState => (
                    <React.Fragment>
                        <Chip
                            label={this.state.label}
                            onClick={this.changeState}
                            style={{fontSize: 18, margin: 8}}
                            {...bindTrigger(popupState)}
                        />
                        <VoicePlayer
                            pause={!this.state.playing}
                            text={this.state.sound}
                            onEnd={this.onEnd}
                        />
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Paper>
                                {
                                    this.state.related.map((text, nodeIndex) => (
                                        <VoiceChip label={text} sound={text} key={`landing-list-item-related${nodeIndex}`} related={[]}/>
                                    ))
                                }
                            </Paper>
                        </Popover>
                    </React.Fragment>
                )}
                </PopupState>
        )
    }
}

export default VoiceChip;