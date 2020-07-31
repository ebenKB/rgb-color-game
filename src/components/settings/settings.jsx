import React from 'react';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

import './settings.css';

const Settings = ({ isMuted, handleMuteAction }) => {
  return (
    <div className="game-settings">
      <div onClick={handleMuteAction}>
        {isMuted && <VolumeOffIcon className="mute" />}
        {!isMuted &&  <VolumeDownIcon />}
      </div>
    </div>
  )
}

export default Settings
