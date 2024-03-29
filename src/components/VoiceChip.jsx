
import React from 'react';
import VoicePlayer from '../libs/VoicePlayer';
import Chip from '@material-ui/core/Chip';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import VolumeUpRounded from '@material-ui/icons/VolumeUpRounded';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

class VoiceChip extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            started: false,
            playing: false,
            label: this.props.label,
            sound: this.props.sound,
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

    changeState = () => {
        let newSate = this.state;
        newSate.playing = !this.state.playing;
        console.log('change state');
        console.log(newSate);
        this.setState(newSate);
    }
    
    render() {
        return (
            
                <PopupState variant="popover" popupId="demoPopover">
                    {popupState => (
                    <React.Fragment>
                        <Chip
                            label={this.state.label}
                            style={{fontSize: 18, margin: 8}}
                            {...bindTrigger(popupState)}
                            onDelete={this.changeState}
                            deleteIcon={<VolumeUpRounded/>}
                        />
                        <VoicePlayer
                            pause={!this.state.playing}
                            text={this.state.sound}
                            onEnd={this.onEnd}
                        />
                        {
                            this.state.related.length > 0 && 
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
                                            <VoiceChip label={text} sound={text} key={`landing-list-item-related${nodeIndex}`} related={[]} />
                                        ))
                                    }
                                </Paper>
                            </Popover>
                        }
                        
                    </React.Fragment>
                )}
                </PopupState>
        )
    }
}

export default VoiceChip;